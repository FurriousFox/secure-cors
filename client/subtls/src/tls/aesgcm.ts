import cs from '../util/cryptoProxy.js';

export class Crypter {
  recordsProcessed = 0n;
  priorPromise: Promise<any> = Promise.resolve(new Uint8Array());

  constructor(
    private mode: 'encrypt' | 'decrypt',
    private key: CryptoKey,
    private initialIv: Uint8Array
  ) { }

  // The `Promise`s returned by successive calls to this function always resolve in sequence,
  // which is not true for `processUnsequenced` in Node (even if it seems to be in browsers)
  async process(data: Uint8Array, authTagLength: number, additionalData: Uint8Array) {
    return this.sequence(this.processUnsequenced(data, authTagLength, additionalData));
  }

  async sequence<T>(promise: Promise<T>) {
    const sequenced = this.priorPromise.then(() => promise);
    this.priorPromise = sequenced;
    return sequenced;
  }

  // data is plainText for encrypt, concat(ciphertext, authTag) for decrypt
  async processUnsequenced(data: Uint8Array, authTagByteLength: number, additionalData: Uint8Array) {
    const recordIndex = this.recordsProcessed;
    this.recordsProcessed += 1n;

    const iv = this.initialIv.slice();
    const ivLength = BigInt(iv.length);

    const lastIndex = ivLength - 1n;
    for (let i = 0n; i < ivLength; i++) {
      const shifted = recordIndex >> (i << 3n);
      if (shifted === 0n) break;  // nothing more to be XORed
      iv[Number(lastIndex - i)] ^= Number(shifted & 0xffn);
    }

    const authTagBitLength = authTagByteLength << 3;  // byte count -> bit count
    const algorithm = { name: 'AES-GCM', iv, tagLength: authTagBitLength, additionalData };
    const resultBuffer = await cs[this.mode](algorithm, this.key, data);
    const result = new Uint8Array(resultBuffer);
    return result;
  }
}
