const https = require('https');
const fs = require('fs');

let argsa = process.argv.slice(2);
let args = [
    { flag: "-i, --insecure", description: "start server without SSL (useful when using a reverse proxy)", flags: ["-i", "--insecure"], parameters: 0 },
    { flag: "-p, --port <port>", description: "port to listen on", flags: ["-p", "--port"], parameters: 1 },
    { flag: "-k, --key <key>", description: "path to private SSL key", flags: ["-k", "--key"], parameters: 1 },
    { flag: "-c, --cert <cert>", description: "path to SSL certificate", flags: ["-c", "--cert"], parameters: 1 },
    { flag: "--ca <ca>", description: "path to SSL certificate authority (usually not needed)", flags: ["--ca"], parameters: 1 },
    { flag: "-h, --help", description: "display this help message", flags: ["-h", "--help"], parameters: 0 }
];


if (argsa.length < 1 || argsa.includes("--help") || argsa.includes("-h")) {
    console.log('Usage: node server.js [...options]');
    console.log(args.map(e => {
        return ` ${e.flag.padEnd(args.reduce((a, b) => a.flag.length > b.flag.length ? a : b).flag.length + 1)}${e.description}`;
    }).join("\n"));

    process.exit(argsa.length < 1 ? 1 : 0);
}