const https = require('https');
const http = require('http');
const fs = require('fs');
const { WebSocketServer } = require('ws');
const net = require('net');

let argsa = process.argv.slice(2);
let args = [
    { name: "insecure", flag: "-i, --insecure", description: "start server without SSL (useful when using a reverse proxy)", flags: ["-i", "--insecure"], parameters: 0 },
    { name: "port", flag: "-p, --port <port>", description: "port to listen on", flags: ["-p", "--port"], parameters: 1 },
    { name: "key", flag: "-k, --key <key>", description: "path to private SSL key", flags: ["-k", "--key"], parameters: 1 },
    { name: "cert", flag: "-c, --cert <cert>", description: "path to SSL certificate", flags: ["-c", "--cert"], parameters: 1 },
    { name: "ca", flag: "--ca <ca>", description: "path to SSL certificate authority (usually not needed)", flags: ["--ca"], parameters: 1 },
    { name: "help", flag: "-h, --help", description: "display this help message", flags: ["-h", "--help"], parameters: 0 }
];


function help() {
    console.log('Usage: node server.js [...options]');
    console.log(args.map(e => {
        return ` ${e.flag.padEnd(args.reduce((a, b) => a.flag.length > b.flag.length ? a : b).flag.length + 1)}${e.description}`;
    }).join("\n"));

    process.exit(argsa.length < 1 ? 1 : 0);
}

if (argsa.length < 1 || argsa.includes("--help") || argsa.includes("-h")) help();
else {
    let config = {
        port: undefined,
        key: undefined,
        cert: undefined,
        ca: undefined,
        insecure: undefined
    };


    let argn = ["", 0];
    for (let arg of argsa) {
        let thearg;
        if (argn[1] > 0) {
            if (args.find(e => e.flags.includes(arg))) {
                console.log(`Expected ${argn[1]} more parameter${argn[1] === 1 ? '' : 's'} for argument ${argn[0]}\n`);
                help();
                process.exit(1);
            }
            config[argn[0]] = isNaN(arg) ? arg : parseInt(arg);
            argn[1]--;
        } else if (thearg = args.find(e => e.flags.includes(arg))) {
            config[thearg.name] = true;
            argn = [thearg.name, thearg.parameters];
        } else {
            console.log(`Unknown argument: ${arg}\n`);
            help();
            process.exit(1);
        }
    }
    if (argn[1] > 0) {
        console.log(`Expected ${argn[1]} more parameter${argn[1] === 1 ? '' : 's'} for argument ${argn[0]}\n`);
        help();
        process.exit(1);
    } else if (config.port === undefined) {
        console.log("Port is required\n");
        help();
        process.exit(1);
    } else if (!config.insecure && (config.key === undefined || config.cert === undefined)) {
        console.log("Key and certificate are required\n");
        help();
        process.exit(1);
    }


    let server;

    if (config.insecure) {
        server = http.createServer();
    } else {
        const options = {
            key: fs.readFileSync(config.key),
            cert: fs.readFileSync(config.cert),
            ca: config.ca ? fs.readFileSync(config.ca) : undefined
        };
        server = https.createServer(options);
    }

    wss = new WebSocketServer({ server: server });

    wss.on('connection', function connection(ws) {
        let connections = []; // maybe make a global connection list, and make some sort of identification so that a client can reconnect to the websocket and still access the same connections

        ws.on('error', console.error);

        ws.on('message', async function message(data) {

            // message format (JSON):
            // {
            //     "action": "connect" || "close" || "data",
            //     "data": {
            //         "connection": if action == "connect": hostname or ip (string) || if (action == "close" || action == "data"): connection id (number),
            //         "data": string || buffer (if action == "data")
            //     }
            // }

            // response format (JSON):
            // {
            //     "error": string || undefined,
            //     "id": int || undefined, (corresponding connection id)
            //     "data": {
            //         "data": string || buffer || undefined,
            //         "action": "connect" || "close" || "data" || undefined,
            //     }
            // }

            try {
                data = JSON.parse(data);

                switch (data.action) {
                    case "connect":
                        let connectionId = connections.length;
                        let connection = connections[connectionId] = net.connect(data.data.connection, () => {
                            ws.send(JSON.stringify({ data: connectionId }));
                        });
                        break;
                }
            } catch (e) {
                ws.send(JSON.stringify({ error: "Invalid JSON" }));
                return;
            }


        });
    });

    server.listen(config.port, () => {
        console.log(`Server listening on port ${config.port}`);
    });
}