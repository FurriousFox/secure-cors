function base64Error(charCode) {
    throw new Error(`Invalid base 64 character: ${String.fromCharCode(charCode)}`);
}
export function stdCharCodes(charCode) {
    /*
    ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789  +  /  =';
    65                      90 97                     122 48      57 43 47 61
     0                      25 26                      51 52      61 62 63 64
    */
    return charCode > 64 && charCode < 91 ? charCode - 65 :
        charCode > 96 && charCode < 123 ? charCode - 71 :
            charCode > 47 && charCode < 58 ? charCode + 4 :
                charCode === 43 ? 62 :
                    charCode === 47 ? 63 :
                        charCode === 61 ? 64 :
                            base64Error(charCode);
}
export function urlCharCodes(charCode) {
    /*
    ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789  -  _  = .';
    65                      90 97                     122 48      57 45 95 61 46
     0                      25 26                      51 52      61 62 63 64 64
    */
    return charCode > 64 && charCode < 91 ? charCode - 65 :
        charCode > 96 && charCode < 123 ? charCode - 71 :
            charCode > 47 && charCode < 58 ? charCode + 4 :
                charCode === 45 ? 62 :
                    charCode === 95 ? 63 :
                        charCode === 61 || charCode === 46 ? 64 :
                            base64Error(charCode);
}
export function base64Decode(input, charCodes = stdCharCodes, autoPad = true) {
    const len = input.length;
    if (autoPad)
        input += '='.repeat(len % 4);
    let inputIdx = 0, outputIdx = 0;
    let enc1 = 64, enc2 = 64, enc3 = 64, enc4 = 64;
    const output = new Uint8Array(len * .75);
    while (inputIdx < len) {
        enc1 = charCodes(input.charCodeAt(inputIdx++));
        enc2 = charCodes(input.charCodeAt(inputIdx++));
        enc3 = charCodes(input.charCodeAt(inputIdx++));
        enc4 = charCodes(input.charCodeAt(inputIdx++));
        output[outputIdx++] = (enc1 << 2) | (enc2 >> 4);
        output[outputIdx++] = ((enc2 & 15) << 4) | (enc3 >> 2);
        output[outputIdx++] = ((enc3 & 3) << 6) | enc4;
    }
    const excessLength = enc2 === 64 ? 0 : // implies zero-length input
        enc3 === 64 ? 2 :
            enc4 === 64 ? 1 :
                0;
    return output.subarray(0, outputIdx - excessLength);
}
