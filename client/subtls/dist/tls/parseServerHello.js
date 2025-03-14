import { concat, equal } from '../util/array.js';
import { hexFromU8 } from '../util/hex.js';
export default function parseServerHello(h, sessionId) {
    let serverPublicKey;
    let tlsVersionSpecified;
    const [endServerHelloMessage] = h.expectLength(h.remaining());
    h.expectUint8(0x02, chatty && 'handshake type: server hello');
    const [endServerHello] = h.expectLengthUint24(chatty && 'server hello');
    h.expectUint16(0x0303, chatty && 'TLS version 1.2 (middlebox compatibility)');
    const serverRandom = h.readBytes(32);
    if (equal(serverRandom, [
        // SHA-256 of "HelloRetryRequest", https://datatracker.ietf.org/doc/html/rfc8446#page-32
        // see also: echo -n "HelloRetryRequest" | openssl dgst -sha256 -hex
        0xcf, 0x21, 0xad, 0x74, 0xe5, 0x9a, 0x61, 0x11,
        0xbe, 0x1d, 0x8c, 0x02, 0x1e, 0x65, 0xb8, 0x91,
        0xc2, 0xa2, 0x11, 0x16, 0x7a, 0xbb, 0x8c, 0x5e,
        0x07, 0x9e, 0x09, 0xe2, 0xc8, 0xa8, 0x33, 0x9c
    ]))
        throw new Error('Unexpected HelloRetryRequest');
    chatty && h.comment('server random — [not SHA256("HelloRetryRequest")](https://datatracker.ietf.org/doc/html/rfc8446#section-4.1.3)');
    h.expectUint8(sessionId.length, chatty && 'session ID length (matches client session ID)');
    h.expectBytes(sessionId, chatty && 'session ID (matches client session ID)');
    h.expectUint16(0x1301, chatty && 'cipher (matches client hello)');
    h.expectUint8(0x00, chatty && 'no compression');
    const [endExtensions, extensionsRemaining] = h.expectLengthUint16(chatty && 'extensions');
    while (extensionsRemaining() > 0) {
        const extensionType = h.readUint16(chatty && 'extension type:');
        chatty && h.comment(extensionType === 0x002b ? 'TLS version' :
            extensionType === 0x0033 ? 'key share' :
                'unknown');
        const [endExtension] = h.expectLengthUint16(chatty && 'extension');
        if (extensionType === 0x002b) {
            h.expectUint16(0x0304, chatty && 'TLS version: 1.3');
            tlsVersionSpecified = true;
        }
        else if (extensionType === 0x0033) {
            h.expectUint16(0x0017, chatty && 'key share type: secp256r1 (NIST P-256)');
            const [endKeyShare, keyShareRemaining] = h.expectLengthUint16('key share');
            const keyShareLength = keyShareRemaining();
            if (keyShareLength !== 65)
                throw new Error(`Expected 65 bytes of key share, but got ${keyShareLength}`);
            if (chatty) {
                h.expectUint8(4, 'legacy point format: always 4, which means uncompressed ([RFC 8446 §4.2.8.2](https://datatracker.ietf.org/doc/html/rfc8446#section-4.2.8.2) and [RFC 8422 §5.4.1](https://datatracker.ietf.org/doc/html/rfc8422#section-5.4.1))');
                const x = h.readBytes(32);
                h.comment('x coordinate');
                const y = h.readBytes(32);
                h.comment('y coordinate');
                serverPublicKey = concat([4], x, y);
            }
            else {
                serverPublicKey = h.readBytes(keyShareLength);
            }
            // TODO: will SubtleCrypto validate this for us when deriving the shared secret, or must we do it?
            // https://datatracker.ietf.org/doc/html/rfc8446#section-4.2.8.2
            // + e.g. https://neilmadden.blog/2017/05/17/so-how-do-you-validate-nist-ecdh-public-keys/
            endKeyShare();
        }
        else {
            throw new Error(`Unexpected extension 0x${hexFromU8([extensionType])}`);
        }
        endExtension();
    }
    endExtensions();
    endServerHello();
    endServerHelloMessage();
    if (tlsVersionSpecified !== true)
        throw new Error('No TLS version provided');
    if (serverPublicKey === undefined)
        throw new Error('No key provided');
    return serverPublicKey;
}
