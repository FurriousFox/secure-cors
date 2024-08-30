import cs from '../util/cryptoProxy.js';
export class Crypter {
    mode;
    key;
    initialIv;
    recordsProcessed = 0n;
    priorPromise = Promise.resolve(new Uint8Array());
    constructor(mode, key, initialIv) {
        this.mode = mode;
        this.key = key;
        this.initialIv = initialIv;
    }
    // The `Promise`s returned by successive calls to this function always resolve in sequence,
    // which is not true for `processUnsequenced` in Node (even if it seems to be in browsers)
    async process(data, authTagLength, additionalData) {
        return this.sequence(this.processUnsequenced(data, authTagLength, additionalData));
    }
    async sequence(promise) {
        const sequenced = this.priorPromise.then(() => promise);
        this.priorPromise = sequenced;
        return sequenced;
    }
    // data is plainText for encrypt, concat(ciphertext, authTag) for decrypt
    async processUnsequenced(data, authTagByteLength, additionalData) {
        const recordIndex = this.recordsProcessed;
        this.recordsProcessed += 1n;
        const iv = this.initialIv.slice();
        const ivLength = BigInt(iv.length);
        const lastIndex = ivLength - 1n;
        for (let i = 0n; i < ivLength; i++) {
            const shifted = recordIndex >> (i << 3n);
            if (shifted === 0n)
                break; // nothing more to be XORed
            iv[Number(lastIndex - i)] ^= Number(shifted & 0xffn);
        }
        const authTagBitLength = authTagByteLength << 3; // byte count -> bit count
        const algorithm = { name: 'AES-GCM', iv, tagLength: authTagBitLength, additionalData };
        const resultBuffer = await cs[this.mode](algorithm, this.key, data);
        const result = new Uint8Array(resultBuffer);
        return result;
    }
}
