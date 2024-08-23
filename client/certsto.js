const fs = require('fs');
const certs = fs.readFileSync('certs.bin').toString('base64');
const certsindex = fs.readFileSync('certs.index.json').toString('base64');

fs.writeFileSync('certs.js', `
    module.exports = {certs: Uint8Array.from(atob("${certs}"), c => c.charCodeAt(0)), certindex: JSON.parse(atob("${certsindex}"))};
`);