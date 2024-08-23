const nodefetch = require('node-fetch');

const http = require('http');
const https = require('https');
const httpAgent = new http.Agent({
    keepAlive: true
});
const httpsAgent = new https.Agent({
    keepAlive: true
});

const options = {
    agent: function (_parsedURL) {
        let tr;
        if (_parsedURL.protocol == 'http:') {
            tr = httpAgent;
        } else {
            tr = httpsAgent;
        }

        return new Proxy(tr, {
            get: function (target, prop) {
                if (prop == 'createConnection') {
                    return function (options, oncreate) {
                        let socket = new (options.protocol == 'http:' ? http : https).Agent({
                            keepAlive: true
                        }).createConnection(options, oncreate);
                        return socket;
                    };
                } else {
                    return target[prop];
                }
            }
        });

    }
};

const window = {};
window.fetch = function (url, ooptions) {
    url = new URL(url);
    url.hostname = '127.0.0.1';

    let goptions = Object.assign({}, options, ooptions);

    return nodefetch(url, goptions);
};

window.fetch("https://google.com");
