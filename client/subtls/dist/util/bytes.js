import { concat, equal } from './array.js';
import { indentChars } from '../presentation/appearance.js';
const txtEnc = new TextEncoder();
const txtDec = new TextDecoder();
export class Bytes {
    offset;
    dataView;
    data;
    comments;
    indents;
    indent;
    constructor(arrayOrMaxBytes) {
        this.offset = 0;
        this.data = typeof arrayOrMaxBytes === 'number' ? new Uint8Array(arrayOrMaxBytes) : arrayOrMaxBytes;
        this.dataView = new DataView(this.data.buffer, this.data.byteOffset, this.data.byteLength);
        this.comments = {};
        this.indents = {};
        this.indent = 0;
    }
    extend(arrayOrMaxBytes) {
        const newData = typeof arrayOrMaxBytes === 'number' ? new Uint8Array(arrayOrMaxBytes) : arrayOrMaxBytes;
        this.data = concat(this.data, newData);
        this.dataView = new DataView(this.data.buffer, this.data.byteOffset, this.data.byteLength);
    }
    remaining() {
        return this.data.length - this.offset;
    }
    subarray(length) {
        // this advances the offset and returns a subarray for external writing (e.g. with crypto.getRandomValues()) or reading
        return this.data.subarray(this.offset, this.offset += length);
    }
    skip(length, comment) {
        this.offset += length;
        if (comment)
            this.comment(comment);
        return this;
    }
    comment(s, offset = this.offset) {
        if (!chatty)
            throw new Error('No comments should be emitted outside of chatty mode');
        const existing = this.comments[offset];
        const result = (existing === undefined ? '' : existing + ' ') + s;
        this.comments[offset] = result;
        return this;
    }
    lengthComment(length, comment, inclusive = false) {
        return length === 1 ?
            `${length} byte${comment ? ` of ${comment}` : ''} ${inclusive ? 'starts here' : 'follows'}` :
            `${length === 0 ? 'no' : length} bytes${comment ? ` of ${comment}` : ''} ${inclusive ? 'start here' : 'follow'}`;
    }
    // reading
    readBytes(length) {
        return this.data.slice(this.offset, this.offset += length);
    }
    readUTF8String(length) {
        const bytes = this.subarray(length);
        const s = txtDec.decode(bytes);
        chatty && this.comment('"' + s.replace(/\r/g, '\\r').replace(/\n/g, '\\n') + '"');
        return s;
    }
    readUTF8StringNullTerminated() {
        let endOffset = this.offset;
        while (this.data[endOffset] !== 0)
            endOffset++;
        const str = this.readUTF8String(endOffset - this.offset);
        this.expectUint8(0x00, 'end of string');
        return str;
    }
    readUint8(comment) {
        const result = this.dataView.getUint8(this.offset);
        this.offset += 1;
        if (chatty && comment)
            this.comment(comment.replace(/%/g, String(result)));
        return result;
    }
    readUint16(comment) {
        const result = this.dataView.getUint16(this.offset);
        this.offset += 2;
        if (chatty && comment)
            this.comment(comment.replace(/%/g, String(result)));
        return result;
    }
    readUint24(comment) {
        const msb = this.readUint8();
        const lsbs = this.readUint16();
        const result = (msb << 16) + lsbs;
        if (chatty && comment)
            this.comment(comment.replace(/%/g, String(result)));
        return result;
    }
    readUint32(comment) {
        const result = this.dataView.getUint32(this.offset);
        this.offset += 4;
        if (chatty && comment)
            this.comment(comment.replace(/%/g, String(result)));
        return result;
    }
    expectBytes(expected, comment) {
        const actual = this.readBytes(expected.length);
        if (chatty && comment)
            this.comment(comment);
        if (!equal(actual, expected))
            throw new Error(`Unexpected bytes`);
    }
    expectUint8(expectedValue, comment) {
        const actualValue = this.readUint8();
        if (chatty && comment)
            this.comment(comment);
        if (actualValue !== expectedValue)
            throw new Error(`Expected ${expectedValue}, got ${actualValue}`);
    }
    expectUint16(expectedValue, comment) {
        const actualValue = this.readUint16();
        if (chatty && comment)
            this.comment(comment);
        if (actualValue !== expectedValue)
            throw new Error(`Expected ${expectedValue}, got ${actualValue}`);
    }
    expectUint24(expectedValue, comment) {
        const actualValue = this.readUint24();
        if (chatty && comment)
            this.comment(comment);
        if (actualValue !== expectedValue)
            throw new Error(`Expected ${expectedValue}, got ${actualValue}`);
    }
    expectUint32(expectedValue, comment) {
        const actualValue = this.readUint32();
        if (chatty && comment)
            this.comment(comment);
        if (actualValue !== expectedValue)
            throw new Error(`Expected ${expectedValue}, got ${actualValue}`);
    }
    expectLength(length, indentDelta = 1) {
        const startOffset = this.offset;
        const endOffset = startOffset + length;
        if (endOffset > this.data.length)
            throw new Error('Expected length exceeds remaining data length');
        this.indent += indentDelta;
        this.indents[startOffset] = this.indent;
        return [
            () => {
                this.indent -= indentDelta;
                this.indents[this.offset] = this.indent;
                if (this.offset !== endOffset)
                    throw new Error(`${length} bytes expected but ${this.offset - startOffset} read`);
            },
            () => endOffset - this.offset,
        ];
    }
    expectLengthUint8(comment) {
        const length = this.readUint8();
        chatty && this.comment(this.lengthComment(length, comment));
        return this.expectLength(length);
    }
    expectLengthUint16(comment) {
        const length = this.readUint16();
        chatty && this.comment(this.lengthComment(length, comment));
        return this.expectLength(length);
    }
    expectLengthUint24(comment) {
        const length = this.readUint24();
        chatty && this.comment(this.lengthComment(length, comment));
        return this.expectLength(length);
    }
    expectLengthUint32(comment) {
        const length = this.readUint32();
        chatty && this.comment(this.lengthComment(length, comment));
        return this.expectLength(length);
    }
    expectLengthUint8Incl(comment) {
        const length = this.readUint8();
        chatty && this.comment(this.lengthComment(length, comment, true));
        return this.expectLength(length - 1);
    }
    expectLengthUint16Incl(comment) {
        const length = this.readUint16();
        chatty && this.comment(this.lengthComment(length, comment, true));
        return this.expectLength(length - 2);
    }
    expectLengthUint24Incl(comment) {
        const length = this.readUint24();
        chatty && this.comment(this.lengthComment(length, comment, true));
        return this.expectLength(length - 3);
    }
    expectLengthUint32Incl(comment) {
        const length = this.readUint32();
        chatty && this.comment(this.lengthComment(length, comment, true));
        return this.expectLength(length - 4);
    }
    // writing
    writeBytes(bytes) {
        this.data.set(bytes, this.offset);
        this.offset += bytes.length;
        return this;
    }
    writeUTF8String(s) {
        const bytes = txtEnc.encode(s);
        this.writeBytes(bytes);
        chatty && this.comment('"' + s.replace(/\r/g, '\\r').replace(/\n/g, '\\n') + '"');
        return this;
    }
    writeUTF8StringNullTerminated(s) {
        const bytes = txtEnc.encode(s);
        this.writeBytes(bytes);
        chatty && this.comment('"' + s.replace(/\r/g, '\\r').replace(/\n/g, '\\n') + '"');
        this.writeUint8(0x00);
        chatty && this.comment('end of string');
        return this;
    }
    writeUint8(value, comment) {
        this.dataView.setUint8(this.offset, value);
        this.offset += 1;
        if (chatty && comment)
            this.comment(comment);
        return this;
    }
    writeUint16(value, comment) {
        this.dataView.setUint16(this.offset, value);
        this.offset += 2;
        if (chatty && comment)
            this.comment(comment);
        return this;
    }
    writeUint24(value, comment) {
        this.writeUint8((value & 0xff0000) >> 16);
        this.writeUint16(value & 0x00ffff, comment);
        return this;
    }
    writeUint32(value, comment) {
        this.dataView.setUint32(this.offset, value);
        this.offset += 4;
        if (chatty && comment)
            this.comment(comment);
        return this;
    }
    // forward-looking lengths
    _writeLengthGeneric(lengthBytes, inclusive, comment) {
        const startOffset = this.offset;
        this.offset += lengthBytes;
        const endOffset = this.offset;
        this.indent += 1;
        this.indents[endOffset] = this.indent;
        return () => {
            const length = this.offset - (inclusive ? startOffset : endOffset);
            if (lengthBytes === 1)
                this.dataView.setUint8(startOffset, length);
            else if (lengthBytes === 2)
                this.dataView.setUint16(startOffset, length);
            else if (lengthBytes === 3) {
                this.dataView.setUint8(startOffset, (length & 0xff0000) >> 16);
                this.dataView.setUint16(startOffset + 1, length & 0xffff);
            }
            else if (lengthBytes === 4)
                this.dataView.setUint32(startOffset, length);
            else
                throw new Error(`Invalid length for length field: ${lengthBytes}`);
            chatty && this.comment(this.lengthComment(length, comment, inclusive), endOffset);
            this.indent -= 1;
            this.indents[this.offset] = this.indent;
        };
    }
    writeLengthUint8(comment) {
        return this._writeLengthGeneric(1, false, comment);
    }
    writeLengthUint16(comment) {
        return this._writeLengthGeneric(2, false, comment);
    }
    writeLengthUint24(comment) {
        return this._writeLengthGeneric(3, false, comment);
    }
    writeLengthUint32(comment) {
        return this._writeLengthGeneric(4, false, comment);
    }
    writeLengthUint8Incl(comment) {
        return this._writeLengthGeneric(1, true, comment);
    }
    writeLengthUint16Incl(comment) {
        return this._writeLengthGeneric(2, true, comment);
    }
    writeLengthUint24Incl(comment) {
        return this._writeLengthGeneric(3, true, comment);
    }
    writeLengthUint32Incl(comment) {
        return this._writeLengthGeneric(4, true, comment);
    }
    // output
    array() {
        return this.data.subarray(0, this.offset);
    }
    commentedString(all = false) {
        let s = this.indents[0] !== undefined ? indentChars.repeat(this.indents[0]) : '';
        let indent = this.indents[0] ?? 0;
        const len = all ? this.data.length : this.offset;
        for (let i = 0; i < len; i++) {
            s += this.data[i].toString(16).padStart(2, '0') + ' ';
            const comment = this.comments[i + 1];
            if (this.indents[i + 1] !== undefined)
                indent = this.indents[i + 1];
            if (comment)
                s += ` ${comment}\n${indentChars.repeat(indent)}`;
        }
        return s;
    }
}
