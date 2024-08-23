const forge = require('node-tls');
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
};

window.fetch = fetch;