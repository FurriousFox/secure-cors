const forge = require('node-tls');
const origfetch = window.fetch;
require('./node_modules/node-tls/lib/http.js');

// const subtls = require('subtls');
// let subtls = import('./subtls/dist/export.js');

window.chatty = false;

import { startTls } from './subtls/dist/export.js';
import { Buffer } from 'buffer';

const httpMessageParser = require('http-message-parser');


// console.log(subtls);

const certs = require('./certs');
// console.log(certs);

forge.options.usePureJavaScript = true;

let messagecounter = 1;


let conf = {
    host: '127.0.0.1',
    port: 11711,
    secure: false,
    doh: false,
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
    ws.onclose = function (event) {
        wsa = false;
        ws = undefined;

        // console.log('ws connection closed', event);
    };
}
function config(config) {
    if (config.port != conf.port || config.host != conf.host || config.secure != conf.secure) {
        Object.assign(conf, config);

        // restart connection if endpoint changes
        if (ws || wsac) {
            try {
                ws.onclose = () => { };
                ws?.close();
            } catch (e) { }

            search.splice(0, search.length);

            wsa = false;
            wsac = false;
            ws = undefined;

            connect(conf);
        }
    } else {
        Object.assign(conf, config);
    }
}

async function sendWs(payload) {
    if (!wsa) {
        if (!wsac) connect(conf);
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

const fetch = function (gurl, options = {}, redirect = false) {
    return new Promise(async (resolve, reject) => {
        let url = new URL(gurl, document.baseURI);
        let resolvedip;

        if (!url.hostname.match(/^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$/g) && conf.doh) {
            try {
                let aresolvedip = ((await (await origfetch(`https://cloudflare-dns.com/dns-query?name=${url.hostname}&type=A`, {
                    method: "GET",
                    headers: {
                        "Accept": "application/dns-json",
                    }
                })).json()).Answer[0] ?? []).filter(e => e.type == 1)[0].data;
                resolvedip = aresolvedip;
            } catch (e) { }
        }


        let conn = await sendWs({
            action: "connect",
            data: {
                destination: `${resolvedip ?? url.hostname}:${url.port.length > 0 ? url.port : (url.protocol === "https:" ? 443 : 80)}`,
            }
        });

        // console.log(conn);

        // console.log(forge);


        // options: 
        // body: string, arraybuffer, blob, DataView, File, FormData, TypedArray or URLSearchParams
        // headers: Headers object, or an object literal
        // method: string
        // redirect: follow, error, manual


        if (options.redirect === undefined) {
            options.redirect = "follow";
        }

        let headers = {
            "Host": url.hostname,
            "User-Agent": navigator.userAgent,
            "Connection": "close",
        };
        if (options.headers) {
            if (options.headers instanceof Headers) {
                options.headers.forEach((v, k) => headers[k] = v);
            } else if (typeof options.headers === "object") {
                Object.assign(headers, options.headers);
            }
        }
        if (options.body) {
            options.body = new Uint8Array(await new Response(options.body).arrayBuffer()).reduce((acc, i) => acc += String.fromCharCode.apply(null, [i]), '');
        }

        let rawHttpReq = forge.http.createRequest({
            method: options.method ?? "GET", path: url.pathname, headers, body: options.body,
        }).toString() + options.body + "\r\n";

        // console.log(rawHttpReq);

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
                        // console.log('[socket] disconnected');
                        sdconn = true;
                    //     // sb = true;
                    //     break;
                }
                // if (sb) break;
            }
        })();

        // console.log({ index: certs.certindex, data: new Uint8Array(certs.certs) });


        // subtls = await subtls;

        let ddd = new Date();
        const [uread, uwrite] = await startTls(url.hostname, { index: certs.certindex, data: certs.certs }, async function (bytes) {
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

            if (!sdconn) {
                await sendWs({
                    action: "close",
                    data: {
                        id: conn.id,
                    }
                });
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
        let stringdata = responsebuffer.reduce((acc, i) => acc += String.fromCharCode.apply(null, [i]), '');
        // console.log("received response", responsebuffer, "\n", stringdata);
        let parsedHttp = httpMessageParser(stringdata);
        // console.log(parsedHttp);

        if (parsedHttp.statusCode >= 300 && parsedHttp.statusCode < 400 && options.redirect === "follow") {
            let location = Object.entries(parsedHttp.headers).find(e => e[0].toLowerCase() === "location")?.[1];
            if (location) {
                if (parsedHttp.statusCode == 307 || parsedHttp.statusCode == 308) resolve(fetch(location, options, true));
                else {
                    options.method = "GET";
                    options.body = undefined;
                    resolve(fetch(location, options, true));
                }
            }
        } else if (parsedHttp.statusCode >= 300 && parsedHttp.statusCode < 400 && options.redirect === "error") {
            reject(new Error("Redirect error"));
        }


        // handle Chunked Transfer Encoding
        if (Object.entries(parsedHttp.headers).find(e => e[0].toLowerCase() === "transfer-encoding" && e[1].toLowerCase() === "chunked")) {
            let a = stringdata.split("\r\n\r\n");
            let preParse = a.slice(1).join("\r\n\r\n");
            let chunks = [];

            while (preParse.length > 0) {
                let chunkSize = parseInt(preParse.slice(0, preParse.indexOf("\r\n")), 16);
                if (isNaN(chunkSize)) break;
                preParse = preParse.slice(preParse.indexOf("\r\n") + 2);
                chunks.push(preParse.slice(0, chunkSize));
                preParse = preParse.slice(chunkSize + 2);
            }

            parsedHttp.body = chunks.join("");
        }

        // console.log(parsedHttp);

        let response = new Response(parsedHttp.body ?? null, {
            status: parsedHttp.statusCode,
            statusText: parsedHttp.statusMessage,
            headers: new Headers(parsedHttp.headers),
        });
        try {
            Object.defineProperty(response, "url", { value: url.href });
        } catch (e) { }
        try {
            Object.defineProperty(response, "redirected", { value: redirect });
        } catch (e) { }
        resolve(response);
    });
};

function unhook() {
    window.fetch = origfetch;
}

if (window?.sfetch == undefined) window.fetch = fetch;
window.sfetch = fetch;
fetch.config = config;
fetch.unhook = unhook;