export function u8FromHex(hex) {
    return new Uint8Array(Array.from(hex.matchAll(/[0-9a-f]/g)).map(hex => parseInt(hex[0], 16)));
}
export function hexFromU8(u8, spacer = '') {
    return [...u8].map(n => n.toString(16).padStart(2, '0')).join(spacer);
}
