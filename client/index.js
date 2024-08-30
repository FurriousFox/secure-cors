const forge = require('node-tls');
require('./node_modules/node-tls/lib/http.js');

// const subtls = require('subtls');
chatty = false;
let subtls = import('./subtls/dist/export.js');

// console.log(subtls);

const certs = require('./certs');
// console.log(certs);

forge.options.usePureJavaScript = true;

let messagecounter = 1;


const config = {
    host: 'localhost',
    port: 11711,
    secure: false,
};

let search = [];

let wsa = false;
let wsac = false;
let wsas = [];
let ws;
function connect(config) {
    ws = new WebSocket(`ws${config.secure ? 's' : ''}://${config.host ?? "localhost"}:${config.port ?? 11711}`);
    wsac = true;
    ws.onopen = function () {
        wsa = true;
        wsac = false;

        while (wsas.length > 0) {
            wsas.shift()();
        }
    };
    ws.onmessage = function (event) {
        let data = JSON.parse(event.data);

        let index = search.findIndex(e => e.id === data.id);
        if (index !== -1) {
            if (data.error) search[index].reject(data.error);
            else search[index].resolve(data.data);
            search.splice(index, 1);
        } else {
            let index = search.findIndex(e => (e.connid === data?.data?.id) && (e.connid !== undefined));
            if (index !== -1) {
                if (data.error) search[index].reject(data.error);
                else search[index].resolve(data.data);
                search.splice(index, 1);
            }
        }
    };
    ws.onclose = function () {
        wsa = false;
        ws = undefined;
    };
}

async function sendWs(payload) {
    if (!wsa) {
        if (!wsac) connect(config);
        await new Promise(r => wsas.push(r));
    }

    payload.id = messagecounter++;
    ws.send(JSON.stringify(payload));

    return await awaitResponse(payload.id);
}

async function awaitResponse(id) {
    return new Promise((resolve, reject) => {
        search.push({ id, resolve, reject });
    });
}

async function awaitDataOrClosure(connid) {
    return new Promise((resolve, reject) => {
        search.push({ connid: connid, resolve, reject });
    });
}

const fetch2 = async function (gurl, options) {
    let url = new URL(gurl);

    // optional: DoH, todo

    let conn = await sendWs({
        action: "connect",
        data: {
            destination: `${url.hostname}:${url.port.length > 0 ? url.port : (url.protocol === "https:" ? 443 : 80)}`,
        }
    });

    console.log(conn);

    // console.log(forge);
    let rawHttpReq = forge.http.createRequest({
        method: 'GET', path: url.pathname, headers: {
            "Host": url.hostname,
            "User-Agent": navigator.userAgent,
            "Connection": "close",
        }
    }).toString();

    console.log(rawHttpReq);

    let closed = { c: false };
    let responsebuffer = new Uint8Array(0);
    let responsepromiser;
    let responsepromise = new Promise((resolve, reject) => { responsepromiser = resolve; });

    let dataness = new Uint8Array(0);
    let sdconn = false;
    (async () => {
        while (true) {
            let data = await awaitDataOrClosure(conn.id);

            let sb = false;
            switch (data.action) {
                case "data":
                    // console.log(data.data);
                    dataness = new Uint8Array([...dataness, ...Uint8Array.from(atob(data.data), c => c.charCodeAt(0))]);

                    break;
                case "close":
                    console.log('[socket] disconnected');
                    sdconn = true;
                //     // sb = true;
                //     break;
            }
            // if (sb) break;
        }
    })();

    // console.log({ index: certs.certindex, data: new Uint8Array(certs.certs) });


    subtls = await subtls;

    let ddd = new Date();
    const [uread, uwrite] = await subtls.startTls(url.hostname, { index: certs.certindex, data: certs.certs }, async function (bytes) {
        let a = false;
        while (!closed.c || responsebuffer.length > 0) {
            if (a) await new Promise(r => setTimeout(r, 10)); // jshint ignore:line
            a = true;

            if (dataness.length >= bytes) {
                let data = dataness.slice(0, bytes);
                dataness = dataness.slice(bytes);
                return data;
            } else {
                if ((new Date() - ddd > 25000 || responsebuffer.length > 0) && bytes == 5) {
                    return undefined;
                }
            }
        }
        return undefined;
    }, async function (bytes) {
        let response = await sendWs({
            action: "data",
            data: {
                id: conn.id,
                data: btoa(String.fromCharCode.apply(null, bytes)),
            }
        });

        return;
    }, closed);

    (async () => {
        while (!closed.c) {
            let data = await uread();
            if (data === undefined) {
                closed.c = true;
                break;
            } else {
                responsebuffer = new Uint8Array([...responsebuffer, ...data]);
            }
        }
        // close the connection server-side!!

        responsepromiser(responsebuffer);
    })();

    let write = function (input) {
        if (typeof input === "string") {
            uwrite(Uint8Array.from(input, c => c.charCodeAt(0)));
        } else if (input instanceof Uint8Array) {
            uwrite(input);
        }
    };

    write(rawHttpReq);

    await responsepromise;
    console.log("received response", responsebuffer, "\n", String.fromCharCode.apply(null, responsebuffer));


    // let response = await sendWs({
    //     action: "data",
    //     data: {
    //         id: conn.id,
    //         data: forge.http.createRequest({ method: 'GET', path: url.pathname }).toString(),
    //     }
    // });
};

window.fetch2 = fetch2;