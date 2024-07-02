const https = require('https');
const http = require('http');
const fs = require('fs');
const { WebSocketServer } = require('ws');

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
        ws.on('error', console.error);

        ws.on('message', function message(data) {
            console.log('received: %s', data);
        });

        ws.send('something');
    });

    server.listen(config.port, () => {
        console.log(`Server listening on port ${config.port}`);
    });
}