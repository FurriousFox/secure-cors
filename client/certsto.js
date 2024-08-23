const fs = require('fs');
const certs = fs.readFileSync('certs.bin').toString('base64');
const certsindex = fs.readFileSync('certs.index.json');

fs.writeFileSync('certs.js', `
    function base64ToArrayBuffer(base64String) {
        const binaryString = atob(base64String);
        const buffer = new ArrayBuffer(binaryString.length);
        const view = new Uint8Array(buffer);

        for (let i = 0; i < binaryString.length; i++) {
            view[i] = binaryString.charCodeAt(i);
        }

        return buffer;
    }

    module.exports = {certs: base64ToArrayBuffer("${certs}"), certindex: ${certsindex}};
`);