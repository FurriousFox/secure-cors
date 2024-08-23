const forge = require('node-tls');
require('./node_modules/node-tls/lib/http.js');
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

    console.log(forge);
    let rawHttpReq = forge.http.createRequest({ method: 'GET', path: url.pathname }).toString();

    console.log(forge.http.createRequest({ method: 'GET', path: url.pathname }).toString());

    let client = forge.tls.createConnection({
        server: false,
        virtualHost: url.hostname,

        // sessionCache: {},
        // cipherSuites: forge.tls.CipherSuites.ALL,

        // caStore,
        verify: function (connection, verified, depth, certs) {
            // skip verification for testing
            return true;
        },
        connected: function (connection) {
            console.log('[tls] connected');
            // prepare some data to send (note that the string is interpreted as
            // 'binary' encoded, which works for HTTP which only uses ASCII, use
            // util.encodeUtf8(str) otherwise
            // client.prepare('GET / HTTP/1.0\r\n\r\n');
            client.prepare(forge.http.createRequest({ method: 'GET', path: url.pathname }).toString());
        },
        tlsDataReady: function (connection) {
            // encrypted data is ready to be sent to the server
            console.log("trying to send data:", connection.tlsData);
            // var data = connection.tlsData.getBytes();
            var data = connection.tlsData.bytes();
            console.log("trying to send data:", data);
            // socket.write(data, 'binary'); // encoding should be 'binary'

            sendWs({
                action: "data",
                data: {
                    id: conn.id,
                    data: data,
                }
            });
        },
        dataReady: function (connection) {
            // clear data from the server is ready
            var data = connection.data.getBytes();
            console.log('[tls] data received from the server: ' + data);
        },
        closed: function () {
            console.log('[tls] disconnected');
        },
        error: function (connection, error) {
            console.log('[tls] error', error.message);
        }
    });

    client.handshake(); // socket is connected already

    while (true) {
        let data = await awaitDataOrClosure(conn.id);

        let sb = false;
        switch (data.action) {
            case "data":
                client.process(data.data.toString('binary')); // encoding should be 'binary'
                break;
            case "close":
                console.log('[socket] disconnected');
                client.close();
                sb = true;
                break;
        }
        if (sb) break;
    }

    // let response = await sendWs({
    //     action: "data",
    //     data: {
    //         id: conn.id,
    //         data: forge.http.createRequest({ method: 'GET', path: url.pathname }).toString(),
    //     }
    // });
};

window.fetch = fetch;