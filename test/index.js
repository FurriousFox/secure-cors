let httppayload = `GET / HTTP/1.1
Host: google.com
User-Agent: forge.http 1.0
Accept: */*
Connection: keep-alive
Keep-Alive: 115\r\n\r\n`;

let net = require('net');
let subtls = import('./subtls/dist/export.js');

let certs = {};
const fs = require('fs');
certs.certindex = JSON.parse(fs.readFileSync('./certs.index.json', 'utf8'));
certs.certs = new Uint8Array(fs.readFileSync('./certs.bin'));
// process.exit();


(async () => {
    chatty = false;
    subtls = await subtls;

    let conn = await new Promise((resolve) => {
        let aa = net.connect(443, 'google.com', async () => {
            resolve(aa);
        });
    });
    let conndata = new Uint8Array(0);
    conn.on('data', (data) => {
        data = new Uint8Array(data);
        conndata = new Uint8Array([...conndata, ...data]);
    });

    let url = new URL('https://google.com');

    let closed = { c: false };
    let responsebuffer = new Uint8Array(0);
    let responsepromiser;
    let responsepromise = new Promise((resolve, reject) => { responsepromiser = resolve; });

    conn.on('close', () => {
        console.log('[socket] disconnected');
        closed.c = true;
    });

    // console.log({ index: certs.certindex, data: new Uint8Array(certs.certs) });

    let ddd = new Date();
    const [uread, uwrite] = await subtls.startTls(url.hostname, { index: certs.certindex, data: certs.certs }, async function (bytes) {
        let a = false;
        while (!closed.c) {
            if (a) await new Promise(r => setTimeout(r, 10)); // jshint ignore:line
            a = true;

            if (conndata.length >= bytes) {
                let data = conndata.slice(0, bytes);
                conndata = conndata.slice(bytes);

                // console.log("read", data);
                ddd = new Date();

                return data;
            } else {
                if (new Date() - ddd > 250 && bytes == 5) {
                    return undefined;
                }
            }
        }
        return undefined;
    }, async function (bytes) {
        // write
        conn.write(bytes);

        return;
    }, closed);

    (async () => {
        while (!closed.c) {
            let data = await uread();
            // console.log("read", String.fromCharCode.apply(null, data));
            if (data === undefined) {
                // console.log("read", data);
                closed.c = true;
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

    write(httppayload);

    await responsepromise;
    console.log("received response", String.fromCharCode.apply(null, responsebuffer));
})();