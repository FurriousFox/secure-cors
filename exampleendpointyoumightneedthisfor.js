const http = require('http');

const server = http.createServer((req, res) => {
    if (req.method != "POST") {
        res.writeHead(405);
        res.end();
    } else {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            if (body === "secret" || body === "secret".repeat(10000)) {
                res.writeHead(200);
                res.end("correct secret");
            } else {
                res.writeHead(403);
                res.end("wrong secret");
            }
        });
    }
});

// put this behind a https reverse proxy for example
server.listen(1712, () => {
    console.log("listening on port 1712");
});