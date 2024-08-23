const forge = require('node-tls');
require('./node_modules/node-tls/lib/http.js');

const subtls = require('subtls');
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

const fetch = async function (gurl, options) {
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
    let rawHttpReq = forge.http.createRequest({ method: 'GET', path: url.pathname }).toString();

    console.log(forge.http.createRequest({ method: 'GET', path: url.pathname }).toString());

    let ddd;

    let closed = false;
    let responsebuffer = new Uint8Array(0);
    let responsepromiser;
    let responsepromise = new Promise((resolve, reject) => { responsepromiser = resolve; });

    (async () => {
        while (true) {
            let data = await awaitDataOrClosure(conn.id);

            let sb = false;
            switch (data.action) {
                case "data":
                    // console.log(data.data);

                    if (ddd != undefined) ddd(Uint8Array.from(atob(data.data), c => c.charCodeAt(0)));
                    else console.error("uhh, no ddd");
                    setTimeout(ddd, 100);
                    break;
                case "close":
                    console.log('[socket] disconnected');
                    sb = true;
                    closed = true;
                    break;
            }
            if (sb) break;
        }
    })();

    const [uread, uwrite] = await subtls.startTls(url.pathname, { index: certs.certindex, certs: certs.certs }, async function (bytes) {
        let aaa = new Promise((resolve, reject) => {
            ddd = resolve;
        });
        return await aaa;
    }, async function (bytes) {
        // write
        let response = await sendWs({
            action: "data",
            data: {
                id: conn.id,
                data: btoa(String.fromCharCode.apply(null, bytes)),
            }
        });

        return;
    });

    (async () => {
        while (!closed) {
            let data = await uread();
            if (data === undefined) {
                closed = true;
                break;
            } else {
                responsebuffer = new Uint8Array([...responsebuffer, ...data]);
            }
        }
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

window.fetch = fetch;