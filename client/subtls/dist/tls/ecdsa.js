import { log } from '../presentation/log.js';
import { concat } from '../util/array.js';
import { constructedUniversalTypeSequence, universalTypeInteger } from './certUtils.js';
import cs from '../util/cryptoProxy.js';
export async function ecdsaVerify(sb /* signature */, publicKey, signedData, namedCurve, hash) {
    sb.expectUint8(constructedUniversalTypeSequence, chatty && 'sequence');
    const [endSigDer] = sb.expectASN1Length(chatty && 'sequence');
    sb.expectUint8(universalTypeInteger, chatty && 'integer');
    const [endSigRBytes, sigRBytesRemaining] = sb.expectASN1Length(chatty && 'integer');
    let sigR = sb.readBytes(sigRBytesRemaining());
    chatty && sb.comment('signature: r');
    endSigRBytes();
    sb.expectUint8(universalTypeInteger, chatty && 'integer');
    const [endSigSBytes, sigSBytesRemaining] = sb.expectASN1Length(chatty && 'integer');
    let sigS = sb.readBytes(sigSBytesRemaining());
    chatty && sb.comment('signature: s');
    endSigSBytes();
    endSigDer();
    /*
    WebCrypto expects a 64- or 96-byte P1363 signature, which sometimes discards a leading zero on r and s that's added to indicate positive sign
    - https://crypto.stackexchange.com/questions/57731/ecdsa-signature-rs-to-asn1-der-encoding-question
    - https://crypto.stackexchange.com/questions/1795/how-can-i-convert-a-der-ecdsa-signature-to-asn-1/1797#1797
    - https://stackoverflow.com/a/65403229
    */
    const clampToLength = (x, clampLength) => x.length > clampLength ? x.subarray(x.length - clampLength) : // too long? cut off leftmost bytes (msb)
        x.length < clampLength ? concat(new Uint8Array(clampLength - x.length), x) : // too short? left pad with zeroes
            x; // right length: pass through
    const intLength = namedCurve === 'P-256' ? 32 : 48;
    const signature = concat(clampToLength(sigR, intLength), clampToLength(sigS, intLength));
    const signatureKey = await cs.importKey('spki', publicKey, { name: 'ECDSA', namedCurve }, false, ['verify']);
    const certVerifyResult = await cs.verify({ name: 'ECDSA', hash }, signatureKey, signature, signedData);
    if (certVerifyResult !== true)
        throw new Error('ECDSA-SECP256R1-SHA256 certificate verify failed');
    chatty && log(`%c✓ ECDSA signature verified (curve ${namedCurve}, hash ${hash})`, 'color: #8c8;');
}
