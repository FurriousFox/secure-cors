// prevent process from exiting on uncaught exceptions
process.on('uncaughtException', function (err) { });
process.on('unhandledRejection', function (err) { });

const https = require('https');
const http = require('http');
const fs = require('fs');
const { WebSocketServer } = require('ws');
const net = require('net');

let argsa = process.argv.slice(2);
let args = [
    { name: "insecure", flag: "-i, --insecure", description: "start server without SSL (useful when using a reverse proxy)", flags: ["-i", "--insecure"], parameters: 0 },
    { name: "port", flag: "-p, --port <port>", description: "port to listen on (11711 by default)", flags: ["-p", "--port"], parameters: 1 },
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
        port: 11711,
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
        let messagecounter = -1; // unsolicited server messages count negatively, client messages count positively, responses to client messages will match the client message id
        let connections = [];

        ws.on('error', console.error);

        ws.on('message', async function message(data) {

            // message format (JSON):
            // {
            //     "action": "connect" || "close" || "data",
            //     "data": {
            //         "destination": (if action == "connect") hostname:port or ip:port (string),
            //         "data": string || buffer (if action == "data")
            //         "id": int || undefined, (corresponding connection id (if action != "connect"))
            //     },
            //     "id": int (message id)
            // }

            // response format (JSON):
            // {
            //     "error": string || undefined,
            //     "data": {
            //         "data": string || buffer || undefined,
            //         "action": "connect" || "close" || "data" || undefined,
            //         "id": int || undefined, (corresponding connection id)
            //     },
            //     "id": int (message id)
            // }


            // i kinda really need input validation here, else it's probably insecure as heck
            try {
                data = JSON.parse(data);

                switch (data.action) { // connect, close, data
                    case "connect":
                        let connectionId = connections.length;
                        let connection = connections[connectionId] = net.connect(data.data.destination.split(":")[1], data.data.destination.split(":")[0], () => {
                            ws.send(JSON.stringify({ data: { id: connectionId, action: "connect" }, id: data.id }));
                        });
                        connection.on('data', (data) => {
                            ws.send(JSON.stringify({ data: { id: connectionId, action: "data", data: data.toString("base64") }, id: messagecounter-- }));
                        });
                        connection.on('close', () => {
                            ws.send(JSON.stringify({ data: { id: connectionId, action: "close" }, id: messagecounter-- }));
                        });
                        break;
                    case "close":
                        connections[data.data.id].end();
                        ws.send(JSON.stringify({ data: { id: data.data.id, action: "close" }, id: data.id }));
                        break;
                    case "data":
                        connections[data.data.id].write(new Buffer.from(data.data.data, "base64"));
                        ws.send(JSON.stringify({ data: { id: data.data.id, action: "data" }, id: data.id }));
                        break;
                }
            } catch (e) {
                ws.send(JSON.stringify({ error: "Failed to process request", id: data.id }));
                console.log(e);
                return;
            }


        });
    });

    server.listen(config.port, () => {
        console.log(`Server listening on port ${config.port}`);
    });
}