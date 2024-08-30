"use strict";
(self["webpackChunksecure_cors_client"] = self["webpackChunksecure_cors_client"] || []).push([["subtls_dist_export_js"],{

/***/ "./subtls/dist/export.js":
/*!*******************************!*\
  !*** ./subtls/dist/export.js ***!
  \*******************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SocketReadQueue: () => (/* reexport safe */ _util_readqueue_js__WEBPACK_IMPORTED_MODULE_2__.SocketReadQueue),
/* harmony export */   TrustedCert: () => (/* reexport safe */ _tls_cert_js__WEBPACK_IMPORTED_MODULE_1__.TrustedCert),
/* harmony export */   WebSocketReadQueue: () => (/* reexport safe */ _util_readqueue_js__WEBPACK_IMPORTED_MODULE_2__.WebSocketReadQueue),
/* harmony export */   base64Decode: () => (/* reexport safe */ _util_base64_js__WEBPACK_IMPORTED_MODULE_3__.base64Decode),
/* harmony export */   hexFromU8: () => (/* reexport safe */ _util_hex_js__WEBPACK_IMPORTED_MODULE_4__.hexFromU8),
/* harmony export */   stableStringify: () => (/* reexport safe */ _util_stableStringify_js__WEBPACK_IMPORTED_MODULE_5__["default"]),
/* harmony export */   startTls: () => (/* reexport safe */ _tls_startTls_js__WEBPACK_IMPORTED_MODULE_0__.startTls),
/* harmony export */   u8FromHex: () => (/* reexport safe */ _util_hex_js__WEBPACK_IMPORTED_MODULE_4__.u8FromHex)
/* harmony export */ });
/* harmony import */ var _tls_startTls_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tls/startTls.js */ "./subtls/dist/tls/startTls.js");
/* harmony import */ var _tls_cert_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tls/cert.js */ "./subtls/dist/tls/cert.js");
/* harmony import */ var _util_readqueue_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./util/readqueue.js */ "./subtls/dist/util/readqueue.js");
/* harmony import */ var _util_base64_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./util/base64.js */ "./subtls/dist/util/base64.js");
/* harmony import */ var _util_hex_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./util/hex.js */ "./subtls/dist/util/hex.js");
/* harmony import */ var _util_stableStringify_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./util/stableStringify.js */ "./subtls/dist/util/stableStringify.js");








/***/ }),

/***/ "./subtls/dist/presentation/appearance.js":
/*!************************************************!*\
  !*** ./subtls/dist/presentation/appearance.js ***!
  \************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LogColours: () => (/* binding */ LogColours),
/* harmony export */   indentChars: () => (/* binding */ indentChars)
/* harmony export */ });
var LogColours;
(function (LogColours) {
    LogColours["client"] = "#8cc";
    LogColours["server"] = "#88c";
    LogColours["header"] = "#c88";
})(LogColours || (LogColours = {}));
const indentChars = '·· '; // careful: this has complex interactions with highlightBytes


/***/ }),

/***/ "./subtls/dist/presentation/highlights.js":
/*!************************************************!*\
  !*** ./subtls/dist/presentation/highlights.js ***!
  \************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   highlightBytes: () => (/* binding */ highlightBytes),
/* harmony export */   highlightColonList: () => (/* binding */ highlightColonList)
/* harmony export */ });
/* harmony import */ var _appearance_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./appearance.js */ "./subtls/dist/presentation/appearance.js");

const regex = new RegExp(`  .+|^(${_appearance_js__WEBPACK_IMPORTED_MODULE_0__.indentChars})+`, 'gm');
const dotColour = 'color: #ddd';
const textColour = 'color: #111';
const mutedColour = 'color: #777';
function highlightBytes(s, colour) {
    const css = [textColour];
    s = '%c' + s.replace(regex, m => {
        css.push(m.startsWith(_appearance_js__WEBPACK_IMPORTED_MODULE_0__.indentChars) ? dotColour : `color: ${colour}`, textColour);
        return `%c\u200b${m}\u200b%c`; // note: the zero-length spaces, \u200b, prevent URLs getting mangled
    });
    return [s, ...css];
}
function highlightColonList(s) {
    const css = [];
    s = s.replace(/^[^:]+:.*$/gm, m => {
        const colonIndex = m.indexOf(':');
        css.push(mutedColour, textColour);
        return `%c${m.slice(0, colonIndex + 1)}%c${m.slice(colonIndex + 1)}`;
    });
    return [s, ...css];
}


/***/ }),

/***/ "./subtls/dist/presentation/log.js":
/*!*****************************************!*\
  !*** ./subtls/dist/presentation/log.js ***!
  \*****************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   log: () => (/* binding */ log)
/* harmony export */ });
function htmlEscape(s, linkUrls = true) {
    const escapes = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&apos;',
    };
    const urlre = /\bhttps?:[/][/][^\s\u200b"'<>)]+[^\s\u200b"'<>).,:;?!]\b/;
    const regexp = new RegExp((linkUrls ? `\\[[^\\]\\n]+\\]\\(${urlre.source}\\)|${urlre.source}|` : '') +
        '[' + Object.keys(escapes).join('') + ']', 'gi');
    const replaced = s.replace(regexp, match => {
        if (match.length === 1)
            return escapes[match];
        let linkText, url;
        if (match.charAt(0) === '[') {
            const closeBracketPos = match.indexOf(']');
            linkText = htmlEscape(match.substring(1, closeBracketPos), false);
            url = htmlEscape(match.substring(closeBracketPos + 2, match.length - 1), false);
        }
        else {
            url = linkText = htmlEscape(match, false);
        }
        return `<a href="${url}" target="_blank">${linkText}</a>`;
    });
    return replaced;
}
;
function htmlFromLogArgs(...args) {
    let result = '<span>', arg, matchArr, separator = '';
    while ((arg = args.shift()) !== undefined) {
        arg = separator + htmlEscape(String(arg));
        separator = ' '; // omit space only for first arg
        const formatRegExp = /([\s\S]*?)%([csoOidf])|[\s\S]+/g; // define it here so lastIndex === 0
        while ((matchArr = formatRegExp.exec(arg)) !== null) {
            const [whole, literal, sub] = matchArr;
            if (sub === undefined) { // last portion
                result += whole;
            }
            else {
                result += literal;
                if (sub === 'c') {
                    result += `</span><span style="${args.shift()}">`;
                }
                else if (sub === 's') {
                    result += htmlEscape(args.shift());
                }
                else if (sub === 'o' || sub === 'O') {
                    result += JSON.stringify(args.shift(), undefined, sub === 'O' ? 2 : undefined);
                }
                else if (sub === 'i' || sub === 'd' || sub === 'f') {
                    // TODO: stop ignoring number formatting for i/d/f
                    result += String(args.shift());
                }
            }
        }
    }
    result += '</span>';
    return result;
}
let c = 0;
function log(...args) {
    // if (!chatty) throw new Error('No logs should be emitted outside of chatty mode');
    console.log(...args, '\n');
    if (typeof document === 'undefined')
        return;
    const docEl = document.documentElement;
    const fullyScrolled = docEl.scrollTop >= docEl.scrollHeight - docEl.clientHeight - 1 || // the -1 makes this work in Edge
        docEl.clientHeight >= docEl.scrollHeight;
    const element = document.querySelector('#logs'); // initialize here, not globally, or this appears in exported output
    element.innerHTML += `<label><input type="checkbox" name="c${c++}" checked="checked"><div class="section">` + htmlFromLogArgs(...args) + `</div></label>`;
    if (fullyScrolled)
        window.scrollTo({ top: 99999, behavior: 'auto' });
}


/***/ }),

/***/ "./subtls/dist/tls/aesgcm.js":
/*!***********************************!*\
  !*** ./subtls/dist/tls/aesgcm.js ***!
  \***********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Crypter: () => (/* binding */ Crypter)
/* harmony export */ });
/* harmony import */ var _util_cryptoProxy_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/cryptoProxy.js */ "./subtls/dist/util/cryptoProxy.js");

class Crypter {
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
        const resultBuffer = await _util_cryptoProxy_js__WEBPACK_IMPORTED_MODULE_0__["default"][this.mode](algorithm, this.key, data);
        const result = new Uint8Array(resultBuffer);
        return result;
    }
}


/***/ }),

/***/ "./subtls/dist/tls/cert.js":
/*!*********************************!*\
  !*** ./subtls/dist/tls/cert.js ***!
  \*********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Cert: () => (/* binding */ Cert),
/* harmony export */   TrustedCert: () => (/* binding */ TrustedCert)
/* harmony export */ });
/* harmony import */ var _util_base64_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/base64.js */ "./subtls/dist/util/base64.js");
/* harmony import */ var _util_asn1bytes_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/asn1bytes.js */ "./subtls/dist/util/asn1bytes.js");
/* harmony import */ var _certUtils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./certUtils.js */ "./subtls/dist/tls/certUtils.js");
/* harmony import */ var _util_hex_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../util/hex.js */ "./subtls/dist/util/hex.js");
/* harmony import */ var _util_array_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../util/array.js */ "./subtls/dist/util/array.js");





const allKeyUsages = [
    // https://www.rfc-editor.org/rfc/rfc3280#section-4.2.1.3
    'digitalSignature', // (0)
    'nonRepudiation', // (1)
    'keyEncipherment', // (2)
    'dataEncipherment', // (3)
    'keyAgreement', // (4)
    'keyCertSign', // (5)
    'cRLSign', // (6)
    'encipherOnly', // (7)
    'decipherOnly', // (8)
];
class Cert {
    serialNumber;
    algorithm;
    issuer;
    validityPeriod;
    subject;
    publicKey;
    signature;
    keyUsage;
    subjectAltNames;
    extKeyUsage;
    authorityKeyIdentifier;
    subjectKeyIdentifier;
    basicConstraints;
    // nameConstraints?: { critical?: boolean; permitted?: string[]; excluded?: string[] };
    signedData;
    static distinguishedNamesAreEqual(dn1, dn2) {
        return this.stringFromDistinguishedName(dn1) === this.stringFromDistinguishedName(dn2);
    }
    static stringFromDistinguishedName(dn) {
        return Object.entries(dn)
            .map(([k, vs]) => typeof vs === 'string' ? `${k}=${vs.trim().replace(/[\\,]/g, '\\$&')}` :
            vs.map(v => `${k}=${v.trim().replace(/[\\,]/g, '\\$&')}`).join(', ')).join(', ');
    }
    constructor(certData) {
        if (certData instanceof _util_asn1bytes_js__WEBPACK_IMPORTED_MODULE_1__.ASN1Bytes || certData instanceof Uint8Array) {
            const cb = certData instanceof _util_asn1bytes_js__WEBPACK_IMPORTED_MODULE_1__.ASN1Bytes ? certData : new _util_asn1bytes_js__WEBPACK_IMPORTED_MODULE_1__.ASN1Bytes(certData);
            cb.expectUint8(_certUtils_js__WEBPACK_IMPORTED_MODULE_2__.constructedUniversalTypeSequence, chatty && 'sequence (certificate)');
            const [endCertSeq] = cb.expectASN1Length(chatty && 'certificate sequence');
            const tbsCertStartOffset = cb.offset;
            cb.expectUint8(_certUtils_js__WEBPACK_IMPORTED_MODULE_2__.constructedUniversalTypeSequence, chatty && 'sequence (certificate info)');
            const [endCertInfoSeq] = cb.expectASN1Length(chatty && 'certificate info');
            cb.expectBytes([0xa0, 0x03, 0x02, 0x01, 0x02], chatty && 'certificate version 3'); // must be v3 to have extensions
            // serial number
            cb.expectUint8(_certUtils_js__WEBPACK_IMPORTED_MODULE_2__.universalTypeInteger, chatty && 'integer');
            const [endSerialNumber, serialNumberRemaining] = cb.expectASN1Length(chatty && 'serial number');
            this.serialNumber = cb.subarray(serialNumberRemaining());
            chatty && cb.comment('serial number');
            endSerialNumber();
            // algorithm
            cb.expectUint8(_certUtils_js__WEBPACK_IMPORTED_MODULE_2__.constructedUniversalTypeSequence, chatty && 'sequence (algorithm)');
            const [endAlgo, algoRemaining] = cb.expectASN1Length(chatty && 'algorithm sequence');
            cb.expectUint8(_certUtils_js__WEBPACK_IMPORTED_MODULE_2__.universalTypeOID, chatty && 'OID');
            this.algorithm = cb.readASN1OID();
            chatty && cb.comment(`${this.algorithm} = ${(0,_certUtils_js__WEBPACK_IMPORTED_MODULE_2__.descriptionForAlgorithm)((0,_certUtils_js__WEBPACK_IMPORTED_MODULE_2__.algorithmWithOID)(this.algorithm))}`);
            if (algoRemaining() > 0) { // null parameters
                cb.expectUint8(_certUtils_js__WEBPACK_IMPORTED_MODULE_2__.universalTypeNull, chatty && 'null');
                cb.expectUint8(0x00, chatty && 'null length');
            }
            endAlgo();
            // issuer
            this.issuer = (0,_certUtils_js__WEBPACK_IMPORTED_MODULE_2__.readSeqOfSetOfSeq)(cb, 'issuer');
            // validity
            let notBefore, notAfter;
            cb.expectUint8(_certUtils_js__WEBPACK_IMPORTED_MODULE_2__.constructedUniversalTypeSequence, chatty && 'sequence (validity)');
            const [endValiditySeq] = cb.expectASN1Length(chatty && 'validity sequence');
            const startTimeType = cb.readUint8();
            if (startTimeType === _certUtils_js__WEBPACK_IMPORTED_MODULE_2__.universalTypeUTCTime) {
                chatty && cb.comment('UTC time (not before)');
                notBefore = cb.readASN1UTCTime();
            }
            else if (startTimeType === _certUtils_js__WEBPACK_IMPORTED_MODULE_2__.universalTypeGeneralizedTime) {
                chatty && cb.comment('generalized time (not before)');
                notBefore = cb.readASN1GeneralizedTime();
            }
            else {
                throw new Error(`Unexpected validity start type 0x${(0,_util_hex_js__WEBPACK_IMPORTED_MODULE_3__.hexFromU8)([startTimeType])}`);
            }
            const endTimeType = cb.readUint8();
            if (endTimeType === _certUtils_js__WEBPACK_IMPORTED_MODULE_2__.universalTypeUTCTime) {
                chatty && cb.comment('UTC time (not after)');
                notAfter = cb.readASN1UTCTime();
            }
            else if (endTimeType === _certUtils_js__WEBPACK_IMPORTED_MODULE_2__.universalTypeGeneralizedTime) {
                chatty && cb.comment('generalized time (not after)');
                notAfter = cb.readASN1GeneralizedTime();
            }
            else {
                throw new Error(`Unexpected validity end type 0x${(0,_util_hex_js__WEBPACK_IMPORTED_MODULE_3__.hexFromU8)([endTimeType])}`);
            }
            this.validityPeriod = { notBefore, notAfter };
            endValiditySeq();
            // subject
            this.subject = (0,_certUtils_js__WEBPACK_IMPORTED_MODULE_2__.readSeqOfSetOfSeq)(cb, 'subject');
            // public key
            const publicKeyStartOffset = cb.offset;
            cb.expectUint8(_certUtils_js__WEBPACK_IMPORTED_MODULE_2__.constructedUniversalTypeSequence, chatty && 'sequence (public key)');
            const [endPublicKeySeq] = cb.expectASN1Length(chatty && 'public key sequence');
            cb.expectUint8(_certUtils_js__WEBPACK_IMPORTED_MODULE_2__.constructedUniversalTypeSequence, chatty && 'sequence (public key params)');
            const [endKeyOID, keyOIDRemaining] = cb.expectASN1Length(chatty && 'public key params sequence');
            const publicKeyOIDs = [];
            while (keyOIDRemaining() > 0) {
                const keyParamRecordType = cb.readUint8();
                if (keyParamRecordType === _certUtils_js__WEBPACK_IMPORTED_MODULE_2__.universalTypeOID) {
                    chatty && cb.comment('OID');
                    const keyOID = cb.readASN1OID();
                    chatty && cb.comment(`${keyOID} = ${_certUtils_js__WEBPACK_IMPORTED_MODULE_2__.keyOIDMap[keyOID]}`);
                    publicKeyOIDs.push(keyOID);
                }
                else if (keyParamRecordType === _certUtils_js__WEBPACK_IMPORTED_MODULE_2__.universalTypeNull) {
                    chatty && cb.comment('null');
                    cb.expectUint8(0x00, chatty && 'null length');
                }
            }
            endKeyOID();
            cb.expectUint8(_certUtils_js__WEBPACK_IMPORTED_MODULE_2__.universalTypeBitString, chatty && 'bit string');
            const publicKeyData = cb.readASN1BitString();
            chatty && cb.comment('public key');
            this.publicKey = { identifiers: publicKeyOIDs, data: publicKeyData, all: cb.data.subarray(publicKeyStartOffset, cb.offset) };
            endPublicKeySeq();
            // extensions
            cb.expectUint8(_certUtils_js__WEBPACK_IMPORTED_MODULE_2__.constructedContextSpecificType, chatty && 'constructed context-specific type: extensions');
            const [endExtsData] = cb.expectASN1Length();
            cb.expectUint8(_certUtils_js__WEBPACK_IMPORTED_MODULE_2__.constructedUniversalTypeSequence, chatty && 'sequence (certificate extensions)');
            const [endExts, extsRemaining] = cb.expectASN1Length(chatty && 'sequence');
            while (extsRemaining() > 0) {
                cb.expectUint8(_certUtils_js__WEBPACK_IMPORTED_MODULE_2__.constructedUniversalTypeSequence, chatty && 'sequence (certificate extension)');
                const [endExt, extRemaining] = cb.expectASN1Length();
                cb.expectUint8(_certUtils_js__WEBPACK_IMPORTED_MODULE_2__.universalTypeOID, chatty && 'OID (extension type)');
                const extOID = cb.readASN1OID();
                chatty && cb.comment(`${extOID} = ${_certUtils_js__WEBPACK_IMPORTED_MODULE_2__.extOIDMap[extOID]}`);
                if (extOID === "2.5.29.17") { // subjectAltName
                    cb.expectUint8(_certUtils_js__WEBPACK_IMPORTED_MODULE_2__.universalTypeOctetString, chatty && 'octet string');
                    const [endSanDerDoc] = cb.expectASN1Length(chatty && 'DER document');
                    cb.expectUint8(_certUtils_js__WEBPACK_IMPORTED_MODULE_2__.constructedUniversalTypeSequence, chatty && 'sequence (names)');
                    const allSubjectAltNames = (0,_certUtils_js__WEBPACK_IMPORTED_MODULE_2__.readNamesSeq)(cb, _certUtils_js__WEBPACK_IMPORTED_MODULE_2__.contextSpecificType);
                    this.subjectAltNames = allSubjectAltNames
                        .filter((san) => san.type === (_certUtils_js__WEBPACK_IMPORTED_MODULE_2__.GeneralName.dNSName | _certUtils_js__WEBPACK_IMPORTED_MODULE_2__.contextSpecificType))
                        .map((san) => san.name);
                    endSanDerDoc();
                }
                else if (extOID === '2.5.29.15') { // keyUsage
                    let keyUsageCritical;
                    let nextType = cb.readUint8();
                    if (nextType === _certUtils_js__WEBPACK_IMPORTED_MODULE_2__.universalTypeBoolean) {
                        chatty && cb.comment('boolean');
                        keyUsageCritical = cb.readASN1Boolean(chatty && 'critical: %');
                        nextType = cb.readUint8();
                    }
                    if (nextType !== _certUtils_js__WEBPACK_IMPORTED_MODULE_2__.universalTypeOctetString)
                        throw new Error(`Expected 0x${(0,_util_hex_js__WEBPACK_IMPORTED_MODULE_3__.hexFromU8)([_certUtils_js__WEBPACK_IMPORTED_MODULE_2__.universalTypeOctetString])}, got 0x${(0,_util_hex_js__WEBPACK_IMPORTED_MODULE_3__.hexFromU8)([nextType])}`);
                    chatty && cb.comment('octet string');
                    const [endKeyUsageDer] = cb.expectASN1Length(chatty && 'DER document');
                    cb.expectUint8(_certUtils_js__WEBPACK_IMPORTED_MODULE_2__.universalTypeBitString, chatty && 'bit string');
                    const keyUsageBitStr = cb.readASN1BitString();
                    const keyUsageBitmask = (0,_certUtils_js__WEBPACK_IMPORTED_MODULE_2__.intFromBitString)(keyUsageBitStr);
                    const keyUsageNames = new Set(allKeyUsages.filter((u, i) => keyUsageBitmask & (1 << i)));
                    chatty && cb.comment(`key usage: ${keyUsageBitmask} = ${[...keyUsageNames]}`);
                    endKeyUsageDer();
                    this.keyUsage = {
                        critical: keyUsageCritical,
                        usages: keyUsageNames,
                    };
                }
                else if (extOID === '2.5.29.37') { // extKeyUsage
                    this.extKeyUsage = {};
                    cb.expectUint8(_certUtils_js__WEBPACK_IMPORTED_MODULE_2__.universalTypeOctetString, chatty && 'octet string');
                    const [endExtKeyUsageDer] = cb.expectASN1Length(chatty && 'DER document');
                    cb.expectUint8(_certUtils_js__WEBPACK_IMPORTED_MODULE_2__.constructedUniversalTypeSequence, chatty && 'sequence');
                    const [endExtKeyUsage, extKeyUsageRemaining] = cb.expectASN1Length(chatty && 'key usage OIDs');
                    while (extKeyUsageRemaining() > 0) {
                        cb.expectUint8(_certUtils_js__WEBPACK_IMPORTED_MODULE_2__.universalTypeOID, chatty && 'OID');
                        const extKeyUsageOID = cb.readASN1OID();
                        chatty && cb.comment(`${extKeyUsageOID} = ${_certUtils_js__WEBPACK_IMPORTED_MODULE_2__.extKeyUsageOIDMap[extKeyUsageOID]}`);
                        if (extKeyUsageOID === '1.3.6.1.5.5.7.3.1')
                            this.extKeyUsage.serverTls = true;
                        if (extKeyUsageOID === '1.3.6.1.5.5.7.3.2')
                            this.extKeyUsage.clientTls = true;
                    }
                    endExtKeyUsage();
                    endExtKeyUsageDer();
                }
                else if (extOID === '2.5.29.35') { // authorityKeyIdentifier
                    cb.expectUint8(_certUtils_js__WEBPACK_IMPORTED_MODULE_2__.universalTypeOctetString, chatty && 'octet string');
                    const [endAuthKeyIdDer] = cb.expectASN1Length(chatty && 'DER document');
                    cb.expectUint8(_certUtils_js__WEBPACK_IMPORTED_MODULE_2__.constructedUniversalTypeSequence, chatty && 'sequence');
                    const [endAuthKeyIdSeq, authKeyIdSeqRemaining] = cb.expectASN1Length(chatty && 'sequence');
                    while (authKeyIdSeqRemaining() > 0) {
                        const authKeyIdDatumType = cb.readUint8();
                        if (authKeyIdDatumType === (_certUtils_js__WEBPACK_IMPORTED_MODULE_2__.contextSpecificType | 0)) {
                            chatty && cb.comment('context-specific type: key identifier');
                            const [endAuthKeyId, authKeyIdRemaining] = cb.expectASN1Length(chatty && 'authority key identifier');
                            this.authorityKeyIdentifier = cb.readBytes(authKeyIdRemaining());
                            chatty && cb.comment('authority key identifier');
                            endAuthKeyId();
                        }
                        else if (authKeyIdDatumType === (_certUtils_js__WEBPACK_IMPORTED_MODULE_2__.contextSpecificType | 1)) {
                            chatty && cb.comment('context-specific type: authority cert issuer');
                            const [endAuthKeyIdCertIssuer, authKeyIdCertIssuerRemaining] = cb.expectASN1Length(chatty && 'authority cert issuer');
                            cb.skip(authKeyIdCertIssuerRemaining(), chatty && 'ignored');
                            endAuthKeyIdCertIssuer();
                        }
                        else if (authKeyIdDatumType === (_certUtils_js__WEBPACK_IMPORTED_MODULE_2__.contextSpecificType | 2)) {
                            chatty && cb.comment('context-specific type: authority cert serial number');
                            const [endAuthKeyIdCertSerialNo, authKeyIdCertSerialNoRemaining] = cb.expectASN1Length(chatty && 'authority cert issuer or authority cert serial number');
                            cb.skip(authKeyIdCertSerialNoRemaining(), chatty && 'ignored');
                            endAuthKeyIdCertSerialNo();
                        }
                        else if (authKeyIdDatumType === (_certUtils_js__WEBPACK_IMPORTED_MODULE_2__.contextSpecificType | 33)) { // where is this documented?!
                            chatty && cb.comment('context-specific type: DirName');
                            const [endDirName, dirNameRemaining] = cb.expectASN1Length(chatty && 'DirName');
                            cb.skip(dirNameRemaining(), chatty && 'ignored');
                            chatty && console.log(cb.commentedString());
                            endDirName();
                        }
                        else {
                            throw new Error(`Unexpected data type ${authKeyIdDatumType} in authorityKeyIdentifier certificate extension`);
                        }
                    }
                    endAuthKeyIdSeq();
                    endAuthKeyIdDer();
                }
                else if (extOID === '2.5.29.14') { // subjectKeyIdentifier
                    cb.expectUint8(_certUtils_js__WEBPACK_IMPORTED_MODULE_2__.universalTypeOctetString, chatty && 'octet string');
                    const [endSubjectKeyIdDer] = cb.expectASN1Length(chatty && 'DER document');
                    cb.expectUint8(_certUtils_js__WEBPACK_IMPORTED_MODULE_2__.universalTypeOctetString, chatty && 'octet string');
                    const [endSubjectKeyId, subjectKeyIdRemaining] = cb.expectASN1Length(chatty && 'subject key identifier');
                    this.subjectKeyIdentifier = cb.readBytes(subjectKeyIdRemaining());
                    chatty && cb.comment('subject key identifier');
                    endSubjectKeyId();
                    endSubjectKeyIdDer();
                }
                else if (extOID === '2.5.29.19') { // basicConstraints
                    let basicConstraintsCritical;
                    let bcNextType = cb.readUint8();
                    if (bcNextType === _certUtils_js__WEBPACK_IMPORTED_MODULE_2__.universalTypeBoolean) {
                        chatty && cb.comment('boolean');
                        basicConstraintsCritical = cb.readASN1Boolean(chatty && 'critical: %');
                        bcNextType = cb.readUint8();
                    }
                    if (bcNextType !== _certUtils_js__WEBPACK_IMPORTED_MODULE_2__.universalTypeOctetString)
                        throw new Error('Unexpected type in certificate basic constraints');
                    chatty && cb.comment('octet string');
                    const [endBasicConstraintsDer] = cb.expectASN1Length(chatty && 'DER document');
                    cb.expectUint8(_certUtils_js__WEBPACK_IMPORTED_MODULE_2__.constructedUniversalTypeSequence, chatty && 'sequence');
                    const [endConstraintsSeq, constraintsSeqRemaining] = cb.expectASN1Length();
                    let basicConstraintsCa = undefined;
                    if (constraintsSeqRemaining() > 0) {
                        cb.expectUint8(_certUtils_js__WEBPACK_IMPORTED_MODULE_2__.universalTypeBoolean, chatty && 'boolean');
                        basicConstraintsCa = cb.readASN1Boolean(chatty && 'certificate authority: %');
                    }
                    let basicConstraintsPathLength;
                    if (constraintsSeqRemaining() > 0) {
                        cb.expectUint8(_certUtils_js__WEBPACK_IMPORTED_MODULE_2__.universalTypeInteger, chatty && 'integer');
                        const maxPathLengthLength = cb.readASN1Length(chatty && 'max path length');
                        basicConstraintsPathLength =
                            maxPathLengthLength === 1 ? cb.readUint8() :
                                maxPathLengthLength === 2 ? cb.readUint16() :
                                    maxPathLengthLength === 3 ? cb.readUint24() :
                                        undefined;
                        if (basicConstraintsPathLength === undefined)
                            throw new Error('Too many bytes in max path length in certificate basicConstraints');
                        chatty && cb.comment('max path length');
                    }
                    endConstraintsSeq();
                    endBasicConstraintsDer();
                    this.basicConstraints = {
                        critical: basicConstraintsCritical,
                        ca: basicConstraintsCa,
                        pathLength: basicConstraintsPathLength,
                    };
                }
                else if (chatty && extOID === '1.3.6.1.5.5.7.1.1') { // authorityInfoAccess -- only parsed for annotation purposes
                    cb.expectUint8(_certUtils_js__WEBPACK_IMPORTED_MODULE_2__.universalTypeOctetString, chatty && 'octet string');
                    const [endAuthInfoAccessDER] = cb.expectASN1Length(chatty && 'DER document');
                    cb.expectUint8(_certUtils_js__WEBPACK_IMPORTED_MODULE_2__.constructedUniversalTypeSequence, chatty && 'sequence');
                    const [endAuthInfoAccessSeq, authInfoAccessSeqRemaining] = cb.expectASN1Length(chatty && 'sequence');
                    while (authInfoAccessSeqRemaining() > 0) {
                        cb.expectUint8(_certUtils_js__WEBPACK_IMPORTED_MODULE_2__.constructedUniversalTypeSequence, chatty && 'sequence');
                        const [endAuthInfoAccessInnerSeq] = cb.expectASN1Length(chatty && 'sequence');
                        cb.expectUint8(_certUtils_js__WEBPACK_IMPORTED_MODULE_2__.universalTypeOID, chatty && 'OID');
                        const accessMethodOID = cb.readASN1OID();
                        chatty && cb.comment(`${accessMethodOID} = access method: ${_certUtils_js__WEBPACK_IMPORTED_MODULE_2__.extAccessMethodOIDMap[accessMethodOID] ?? 'unknown method'} `);
                        cb.expectUint8(_certUtils_js__WEBPACK_IMPORTED_MODULE_2__.contextSpecificType | _certUtils_js__WEBPACK_IMPORTED_MODULE_2__.GeneralName.uniformResourceIdentifier, chatty && 'context-specific type: URI');
                        const [endMethodURI, methodURIRemaining] = cb.expectASN1Length(chatty && 'access location');
                        cb.readUTF8String(methodURIRemaining());
                        endMethodURI();
                        endAuthInfoAccessInnerSeq();
                    }
                    endAuthInfoAccessSeq();
                    endAuthInfoAccessDER();
                }
                else if (chatty && extOID === '2.5.29.32') { // certificatePolicies -- only parsed for annotation purposes
                    cb.expectUint8(_certUtils_js__WEBPACK_IMPORTED_MODULE_2__.universalTypeOctetString, chatty && 'octet string');
                    const [endCertPolDER] = cb.expectASN1Length(chatty && 'DER document');
                    cb.expectUint8(_certUtils_js__WEBPACK_IMPORTED_MODULE_2__.constructedUniversalTypeSequence, chatty && 'sequence (CertificatePolicies)');
                    const [endCertPolSeq, certPolSeqRemaining] = cb.expectASN1Length(chatty && 'sequence');
                    while (certPolSeqRemaining() > 0) {
                        cb.expectUint8(_certUtils_js__WEBPACK_IMPORTED_MODULE_2__.constructedUniversalTypeSequence, chatty && 'sequence (PolicyInformation)');
                        const [endCertPolInnerSeq, certPolInnerSeqRemaining] = cb.expectASN1Length(chatty && 'sequence');
                        cb.expectUint8(_certUtils_js__WEBPACK_IMPORTED_MODULE_2__.universalTypeOID, chatty && 'OID (CertPolicyID)');
                        const certPolOID = cb.readASN1OID();
                        chatty && cb.comment(`${certPolOID} = policy: ${_certUtils_js__WEBPACK_IMPORTED_MODULE_2__.certPolOIDMap[certPolOID] ?? 'unknown policy'} `);
                        while (certPolInnerSeqRemaining() > 0) {
                            cb.expectUint8(_certUtils_js__WEBPACK_IMPORTED_MODULE_2__.constructedUniversalTypeSequence, chatty && 'sequence');
                            const [endCertPolInner2Seq, certPolInner2SeqRemaining] = cb.expectASN1Length(chatty && 'sequence');
                            while (certPolInner2SeqRemaining() > 0) {
                                cb.expectUint8(_certUtils_js__WEBPACK_IMPORTED_MODULE_2__.constructedUniversalTypeSequence, chatty && 'sequence (PolicyQualifierInformation)');
                                const [endCertPolInner3Seq, certPolInner3SeqRemaining] = cb.expectASN1Length(chatty && 'sequence');
                                cb.expectUint8(_certUtils_js__WEBPACK_IMPORTED_MODULE_2__.universalTypeOID, chatty && 'OID (policyQualifierId)');
                                const certPolQualOID = cb.readASN1OID();
                                chatty && cb.comment(`${certPolQualOID} = qualifier: ${_certUtils_js__WEBPACK_IMPORTED_MODULE_2__.certPolQualOIDMap[certPolQualOID] ?? 'unknown qualifier'} `);
                                const qualType = cb.readUint8();
                                if (chatty && qualType === _certUtils_js__WEBPACK_IMPORTED_MODULE_2__.universalTypeIA5String) {
                                    cb.comment('IA5String');
                                    const [endQualStr, qualStrRemaining] = cb.expectASN1Length('string');
                                    cb.readUTF8String(qualStrRemaining());
                                    endQualStr();
                                }
                                else {
                                    if (certPolInner3SeqRemaining())
                                        cb.skip(certPolInner3SeqRemaining(), 'skipped policy qualifier data');
                                }
                                endCertPolInner3Seq();
                            }
                            endCertPolInner2Seq();
                        }
                        endCertPolInnerSeq();
                    }
                    endCertPolSeq();
                    endCertPolDER();
                    // } else if (chatty && extOID === '2.5.29.31') {  // CRLDistributionPoints -- only parsed for annotation purposes
                    //   cb.expectUint8(universalTypeOctetString, chatty && 'octet string');
                    //   const [endCRLDPDER] = cb.expectASN1Length(chatty && 'DER document');
                    //   cb.expectUint8(constructedUniversalTypeSequence, chatty && 'sequence (DistributionPoints)');
                    //   const [endCRLDPSeq, CRLDPRemaining] = cb.expectASN1Length(chatty && 'sequence');
                    // TODO
                }
                else {
                    /**
                     * ignored extensions include:
                     * - Name Constraints -- important! see https://bettertls.com/
                     * - CRL Distribution Points -- started implementation above
                     * - Signed Certificate Timestamp (SCT) List
                     */
                    // TODO: check for criticality, throw if critical
                    cb.skip(extRemaining(), chatty && 'ignored extension data');
                }
                endExt();
            }
            endExts();
            endExtsData();
            endCertInfoSeq();
            // to-be-signed cert data: https://crypto.stackexchange.com/questions/42345/what-information-is-signed-by-a-certification-authority
            this.signedData = cb.data.subarray(tbsCertStartOffset, cb.offset);
            // signature algorithm
            cb.expectUint8(_certUtils_js__WEBPACK_IMPORTED_MODULE_2__.constructedUniversalTypeSequence, chatty && 'sequence (signature algorithm)');
            const [endSigAlgo, sigAlgoRemaining] = cb.expectASN1Length(chatty && 'signature algorithm sequence');
            cb.expectUint8(_certUtils_js__WEBPACK_IMPORTED_MODULE_2__.universalTypeOID, chatty && 'OID');
            const sigAlgoOID = cb.readASN1OID(chatty && '% (must be same as above)');
            if (sigAlgoRemaining() > 0) {
                cb.expectUint8(_certUtils_js__WEBPACK_IMPORTED_MODULE_2__.universalTypeNull, chatty && 'null');
                cb.expectUint8(0x00, chatty && 'null length');
            }
            endSigAlgo();
            if (sigAlgoOID !== this.algorithm)
                throw new Error(`Certificate specifies different signature algorithms inside(${this.algorithm}) and out(${sigAlgoOID})`);
            // signature
            cb.expectUint8(_certUtils_js__WEBPACK_IMPORTED_MODULE_2__.universalTypeBitString, chatty && 'bitstring (signature)');
            this.signature = cb.readASN1BitString();
            chatty && cb.comment('signature');
            endCertSeq();
        }
        else {
            this.serialNumber = (0,_util_hex_js__WEBPACK_IMPORTED_MODULE_3__.u8FromHex)(certData.serialNumber);
            this.algorithm = certData.algorithm;
            this.issuer = certData.issuer;
            this.validityPeriod = {
                notBefore: new Date(certData.validityPeriod.notBefore),
                notAfter: new Date(certData.validityPeriod.notAfter),
            };
            this.subject = certData.subject;
            this.publicKey = {
                identifiers: certData.publicKey.identifiers,
                data: (0,_util_hex_js__WEBPACK_IMPORTED_MODULE_3__.u8FromHex)(certData.publicKey.data),
                all: (0,_util_hex_js__WEBPACK_IMPORTED_MODULE_3__.u8FromHex)(certData.publicKey.all),
            };
            this.signature = (0,_util_hex_js__WEBPACK_IMPORTED_MODULE_3__.u8FromHex)(certData.signature);
            this.keyUsage = {
                critical: certData.keyUsage.critical,
                usages: new Set(certData.keyUsage.usages),
            };
            this.subjectAltNames = certData.subjectAltNames;
            this.extKeyUsage = certData.extKeyUsage;
            if (certData.authorityKeyIdentifier)
                this.authorityKeyIdentifier = (0,_util_hex_js__WEBPACK_IMPORTED_MODULE_3__.u8FromHex)(certData.authorityKeyIdentifier);
            if (certData.subjectKeyIdentifier)
                this.subjectKeyIdentifier = (0,_util_hex_js__WEBPACK_IMPORTED_MODULE_3__.u8FromHex)(certData.subjectKeyIdentifier);
            this.basicConstraints = certData.basicConstraints;
            this.signedData = (0,_util_hex_js__WEBPACK_IMPORTED_MODULE_3__.u8FromHex)(certData.signedData);
        }
    }
    subjectAltNameMatchingHost(host) {
        const twoDotRegex = /[.][^.]+[.][^.]+$/;
        // console.log(this.subjectAltNames);
        return (this.subjectAltNames ?? []).find(cert => {
            let certName = cert;
            let hostName = host;
            // wildcards: https://en.wikipedia.org/wiki/Wildcard_certificate
            if (twoDotRegex.test(host) && twoDotRegex.test(certName) && certName.startsWith('*.')) {
                certName = certName.slice(1);
                hostName = hostName.slice(hostName.indexOf('.'));
            }
            if (certName === hostName)
                return true;
        });
    }
    isValidAtMoment(moment = new Date()) {
        return moment >= this.validityPeriod.notBefore && moment <= this.validityPeriod.notAfter;
    }
    description() {
        return 'subject: ' + Cert.stringFromDistinguishedName(this.subject) +
            (this.subjectAltNames ? '\nsubject alt names: ' + this.subjectAltNames.join(', ') : '') +
            (this.subjectKeyIdentifier ? `\nsubject key id: ${(0,_util_hex_js__WEBPACK_IMPORTED_MODULE_3__.hexFromU8)(this.subjectKeyIdentifier, ' ')}` : '') +
            '\nissuer: ' + Cert.stringFromDistinguishedName(this.issuer) +
            (this.authorityKeyIdentifier ? `\nauthority key id: ${(0,_util_hex_js__WEBPACK_IMPORTED_MODULE_3__.hexFromU8)(this.authorityKeyIdentifier, ' ')}` : '') +
            '\nvalidity: ' + this.validityPeriod.notBefore.toISOString() + ' – ' + this.validityPeriod.notAfter.toISOString() + ` (${this.isValidAtMoment() ? 'currently valid' : 'not valid'})` +
            (this.keyUsage ? `\nkey usage (${this.keyUsage.critical ? 'critical' : 'non-critical'}): ` +
                [...this.keyUsage.usages].join(', ') : '') +
            (this.extKeyUsage ? `\nextended key usage: TLS server — ${this.extKeyUsage.serverTls}, TLS client — ${this.extKeyUsage.clientTls}` : '') +
            (this.basicConstraints ? `\nbasic constraints (${this.basicConstraints.critical ? 'critical' : 'non-critical'}): ` +
                `CA — ${this.basicConstraints.ca}, path length — ${this.basicConstraints.pathLength}` : '') +
            '\nsignature algorithm: ' + (0,_certUtils_js__WEBPACK_IMPORTED_MODULE_2__.descriptionForAlgorithm)((0,_certUtils_js__WEBPACK_IMPORTED_MODULE_2__.algorithmWithOID)(this.algorithm));
    }
    toJSON() {
        return {
            serialNumber: (0,_util_hex_js__WEBPACK_IMPORTED_MODULE_3__.hexFromU8)(this.serialNumber),
            algorithm: this.algorithm,
            issuer: this.issuer,
            validityPeriod: {
                notBefore: this.validityPeriod.notBefore.toISOString(),
                notAfter: this.validityPeriod.notAfter.toISOString(),
            },
            subject: this.subject,
            publicKey: {
                identifiers: this.publicKey.identifiers,
                data: (0,_util_hex_js__WEBPACK_IMPORTED_MODULE_3__.hexFromU8)(this.publicKey.data),
                all: (0,_util_hex_js__WEBPACK_IMPORTED_MODULE_3__.hexFromU8)(this.publicKey.all),
            },
            signature: (0,_util_hex_js__WEBPACK_IMPORTED_MODULE_3__.hexFromU8)(this.signature),
            keyUsage: {
                critical: this.keyUsage?.critical,
                usages: [...(this.keyUsage?.usages ?? [])],
            },
            subjectAltNames: this.subjectAltNames,
            extKeyUsage: this.extKeyUsage,
            authorityKeyIdentifier: this.authorityKeyIdentifier && (0,_util_hex_js__WEBPACK_IMPORTED_MODULE_3__.hexFromU8)(this.authorityKeyIdentifier),
            subjectKeyIdentifier: this.subjectKeyIdentifier && (0,_util_hex_js__WEBPACK_IMPORTED_MODULE_3__.hexFromU8)(this.subjectKeyIdentifier),
            basicConstraints: this.basicConstraints,
            signedData: (0,_util_hex_js__WEBPACK_IMPORTED_MODULE_3__.hexFromU8)(this.signedData),
        };
    }
    static uint8ArraysFromPEM(pem) {
        const tag = "[A-Z0-9 ]+";
        const pattern = new RegExp(`-----BEGIN ${tag}-----([a-zA-Z0-9=+\\/\\n\\r]+)-----END ${tag}-----`, 'g');
        const res = [];
        let matches = null;
        while (matches = pattern.exec(pem)) {
            const base64 = matches[1].replace(/[\r\n]/g, '');
            const binary = (0,_util_base64_js__WEBPACK_IMPORTED_MODULE_0__.base64Decode)(base64);
            res.push(binary);
        }
        return res;
    }
    static fromPEM(pem) {
        return this.uint8ArraysFromPEM(pem).map(arr => new this(arr));
    }
}
class TrustedCert extends Cert {
    static databaseFromPEM(pem) {
        const certsData = this.uint8ArraysFromPEM(pem);
        const offsets = [0];
        const subjects = {};
        const growable = new _util_array_js__WEBPACK_IMPORTED_MODULE_4__.GrowableData();
        for (const certData of certsData) {
            const cert = new this(certData);
            const offsetIndex = offsets.length - 1;
            if (cert.subjectKeyIdentifier)
                subjects[(0,_util_hex_js__WEBPACK_IMPORTED_MODULE_3__.hexFromU8)(cert.subjectKeyIdentifier)] = offsetIndex;
            subjects[this.stringFromDistinguishedName(cert.subject)] = offsetIndex;
            growable.append(certData);
            offsets[offsets.length] = offsets[offsetIndex] + certData.length;
        }
        const data = growable.getData();
        return { index: { offsets, subjects }, data };
    }
    static findInDatabase(subjectOrSubjectKeyId, db) {
        const { index: { subjects, offsets }, data } = db;
        const key = typeof subjectOrSubjectKeyId === 'string' ?
            subjectOrSubjectKeyId : Cert.stringFromDistinguishedName(subjectOrSubjectKeyId);
        const offsetIndex = subjects[key];
        if (offsetIndex === undefined)
            return;
        const start = offsets[offsetIndex];
        const end = offsets[offsetIndex + 1];
        const certData = data.subarray(start, end);
        const cert = new this(certData);
        return cert;
    }
}


/***/ }),

/***/ "./subtls/dist/tls/certUtils.js":
/*!**************************************!*\
  !*** ./subtls/dist/tls/certUtils.js ***!
  \**************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DNOIDMap: () => (/* binding */ DNOIDMap),
/* harmony export */   GeneralName: () => (/* binding */ GeneralName),
/* harmony export */   algorithmWithOID: () => (/* binding */ algorithmWithOID),
/* harmony export */   certPolOIDMap: () => (/* binding */ certPolOIDMap),
/* harmony export */   certPolQualOIDMap: () => (/* binding */ certPolQualOIDMap),
/* harmony export */   constructedContextSpecificType: () => (/* binding */ constructedContextSpecificType),
/* harmony export */   constructedUniversalTypeSequence: () => (/* binding */ constructedUniversalTypeSequence),
/* harmony export */   constructedUniversalTypeSet: () => (/* binding */ constructedUniversalTypeSet),
/* harmony export */   contextSpecificType: () => (/* binding */ contextSpecificType),
/* harmony export */   descriptionForAlgorithm: () => (/* binding */ descriptionForAlgorithm),
/* harmony export */   extAccessMethodOIDMap: () => (/* binding */ extAccessMethodOIDMap),
/* harmony export */   extKeyUsageOIDMap: () => (/* binding */ extKeyUsageOIDMap),
/* harmony export */   extOIDMap: () => (/* binding */ extOIDMap),
/* harmony export */   intFromBitString: () => (/* binding */ intFromBitString),
/* harmony export */   keyOIDMap: () => (/* binding */ keyOIDMap),
/* harmony export */   readNamesSeq: () => (/* binding */ readNamesSeq),
/* harmony export */   readSeqOfSetOfSeq: () => (/* binding */ readSeqOfSetOfSeq),
/* harmony export */   universalTypeBitString: () => (/* binding */ universalTypeBitString),
/* harmony export */   universalTypeBoolean: () => (/* binding */ universalTypeBoolean),
/* harmony export */   universalTypeGeneralizedTime: () => (/* binding */ universalTypeGeneralizedTime),
/* harmony export */   universalTypeIA5String: () => (/* binding */ universalTypeIA5String),
/* harmony export */   universalTypeInteger: () => (/* binding */ universalTypeInteger),
/* harmony export */   universalTypeNull: () => (/* binding */ universalTypeNull),
/* harmony export */   universalTypeOID: () => (/* binding */ universalTypeOID),
/* harmony export */   universalTypeOctetString: () => (/* binding */ universalTypeOctetString),
/* harmony export */   universalTypePrintableString: () => (/* binding */ universalTypePrintableString),
/* harmony export */   universalTypeTeletexString: () => (/* binding */ universalTypeTeletexString),
/* harmony export */   universalTypeUTCTime: () => (/* binding */ universalTypeUTCTime),
/* harmony export */   universalTypeUTF8String: () => (/* binding */ universalTypeUTF8String)
/* harmony export */ });
/* harmony import */ var _util_hex_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/hex.js */ "./subtls/dist/util/hex.js");

const universalTypeBoolean = 0x01;
const universalTypeInteger = 0x02;
const constructedUniversalTypeSequence = 0x30;
const constructedUniversalTypeSet = 0x31;
const universalTypeOID = 0x06;
const universalTypePrintableString = 0x13;
const universalTypeTeletexString = 0x14;
const universalTypeUTF8String = 0x0c;
const universalTypeIA5String = 0x16;
const universalTypeUTCTime = 0x17;
const universalTypeGeneralizedTime = 0x18;
const universalTypeNull = 0x05;
const universalTypeOctetString = 0x04;
const universalTypeBitString = 0x03;
const constructedContextSpecificType = 0xa3; // context-specific is 0x80 (1 in bit 8, 0 in bit 7); constructed is 0x20 (1 in bit 6)
const contextSpecificType = 0x80;
var GeneralName;
(function (GeneralName) {
    GeneralName[GeneralName["otherName"] = 0] = "otherName";
    GeneralName[GeneralName["rfc822Name"] = 1] = "rfc822Name";
    GeneralName[GeneralName["dNSName"] = 2] = "dNSName";
    GeneralName[GeneralName["x400Address"] = 3] = "x400Address";
    GeneralName[GeneralName["directoryName"] = 4] = "directoryName";
    GeneralName[GeneralName["ediPartyName"] = 5] = "ediPartyName";
    GeneralName[GeneralName["uniformResourceIdentifier"] = 6] = "uniformResourceIdentifier";
    GeneralName[GeneralName["iPAddress"] = 7] = "iPAddress";
    GeneralName[GeneralName["registeredID"] = 8] = "registeredID";
})(GeneralName || (GeneralName = {}));
const DNOIDMap = {
    "2.5.4.6": "C", // country
    "2.5.4.10": "O", // organisation
    "2.5.4.11": "OU", // organisational unit
    "2.5.4.3": "CN", // common name
    "2.5.4.7": "L", // locality
    "2.5.4.8": "ST", // state/province
    "2.5.4.12": "T", // title
    "2.5.4.42": "GN", // given name
    "2.5.4.43": "I", // initials
    "2.5.4.4": "SN", // surname
    "1.2.840.113549.1.9.1": "MAIL",
    "2.5.4.5": "SERIALNUMBER",
};
const keyOIDMap = {
    "1.2.840.10045.2.1": "ECPublicKey",
    "1.2.840.10045.3.1.7": "secp256r1",
    "1.3.132.0.34": "secp384r1",
    "1.2.840.113549.1.1.1": "RSAES-PKCS1-v1_5",
};
const extOIDMap = {
    "2.5.29.15": "KeyUsage",
    "2.5.29.37": "ExtKeyUsage",
    "2.5.29.19": "BasicConstraints",
    "2.5.29.30": "NameConstraints",
    "2.5.29.14": "SubjectKeyIdentifier",
    "2.5.29.35": "AuthorityKeyIdentifier",
    "1.3.6.1.5.5.7.1.1": "AuthorityInfoAccess",
    "2.5.29.17": "SubjectAltName",
    "2.5.29.32": "CertificatePolicies",
    "1.3.6.1.4.1.11129.2.4.2": "SignedCertificateTimestampList",
    "2.5.29.31": "CRLDistributionPoints (Certificate Revocation List)",
};
const extKeyUsageOIDMap = {
    "1.3.6.1.5.5.7.3.2": "TLSClientAuth",
    "1.3.6.1.5.5.7.3.1": "TLSServerAuth",
};
const extAccessMethodOIDMap = {
    '1.3.6.1.5.5.7.48.1': 'OCSP',
    '1.3.6.1.5.5.7.48.2': 'certificate authority issuers',
};
const certPolOIDMap = {
    '2.23.140.1.2.1': 'domain validated',
    '2.23.140.1.2.2': 'subject identity validated',
    '1.3.6.1.4.1.44947.1.1.1': 'ISRG domain validated',
};
const certPolQualOIDMap = {
    '1.3.6.1.5.5.7.2.1': 'Certificate Practice Statement',
};
function intFromBitString(bs) {
    const { length } = bs;
    if (length > 4)
        throw new Error(`Bit string length ${length} would overflow JS bit operators`);
    // implement bigIntFromBitString if longer is needed
    let result = 0;
    let leftShift = 0;
    for (let i = bs.length - 1; i >= 0; i--) {
        result |= bs[i] << leftShift;
        leftShift += 8;
    }
    return result;
}
function readSeqOfSetOfSeq(cb, seqType) {
    const result = {};
    cb.expectUint8(constructedUniversalTypeSequence, chatty && `sequence (${seqType})`);
    const [endSeq, seqRemaining] = cb.expectASN1Length(chatty && 'sequence');
    while (seqRemaining() > 0) {
        cb.expectUint8(constructedUniversalTypeSet, chatty && 'set');
        const [endItemSet] = cb.expectASN1Length(chatty && 'set');
        cb.expectUint8(constructedUniversalTypeSequence, chatty && 'sequence');
        const [endItemSeq] = cb.expectASN1Length(chatty && 'sequence');
        cb.expectUint8(universalTypeOID, chatty && 'OID');
        const itemOID = cb.readASN1OID();
        const itemName = DNOIDMap[itemOID] ?? itemOID;
        chatty && cb.comment(`${itemOID} = ${itemName}`);
        const valueType = cb.readUint8();
        if (valueType === universalTypePrintableString) {
            chatty && cb.comment('printable string');
        }
        else if (valueType === universalTypeUTF8String) {
            chatty && cb.comment('UTF8 string');
        }
        else if (valueType === universalTypeIA5String) {
            chatty && cb.comment('IA5 string');
        }
        else if (valueType === universalTypeTeletexString) {
            chatty && cb.comment('Teletex string');
        }
        else {
            throw new Error(`Unexpected item type in certificate ${seqType}: 0x${(0,_util_hex_js__WEBPACK_IMPORTED_MODULE_0__.hexFromU8)([valueType])}`);
        }
        const [endItemString, itemStringRemaining] = cb.expectASN1Length(chatty && 'UTF8 string');
        const itemValue = cb.readUTF8String(itemStringRemaining());
        endItemString();
        endItemSeq();
        endItemSet();
        const existingValue = result[itemName];
        if (existingValue === undefined)
            result[itemName] = itemValue;
        else if (typeof existingValue === 'string')
            result[itemName] = [existingValue, itemValue];
        else
            existingValue.push(itemValue);
    }
    endSeq();
    return result;
}
function readNamesSeq(cb, typeUnionBits = 0x00) {
    const names = [];
    const [endNamesSeq, namesSeqRemaining] = cb.expectASN1Length(chatty && 'names sequence');
    while (namesSeqRemaining() > 0) {
        const type = cb.readUint8(chatty && 'GeneralNames type');
        const [endName, nameRemaining] = cb.expectASN1Length(chatty && 'name');
        let name;
        if (type === (typeUnionBits | GeneralName.dNSName)) {
            name = cb.readUTF8String(nameRemaining());
            chatty && cb.comment('= DNS name');
        }
        else {
            name = cb.readBytes(nameRemaining());
            chatty && cb.comment(`= name (type 0x${(0,_util_hex_js__WEBPACK_IMPORTED_MODULE_0__.hexFromU8)([type])})`);
        }
        names.push({ name, type });
        endName();
    }
    endNamesSeq();
    return names;
}
function algorithmWithOID(oid) {
    const algo = {
        "1.2.840.113549.1.1.1": {
            name: "RSAES-PKCS1-v1_5"
        },
        "1.2.840.113549.1.1.5": {
            name: "RSASSA-PKCS1-v1_5",
            hash: {
                name: "SHA-1"
            }
        },
        "1.2.840.113549.1.1.11": {
            name: "RSASSA-PKCS1-v1_5",
            hash: {
                name: "SHA-256"
            }
        },
        "1.2.840.113549.1.1.12": {
            name: "RSASSA-PKCS1-v1_5",
            hash: {
                name: "SHA-384"
            }
        },
        "1.2.840.113549.1.1.13": {
            name: "RSASSA-PKCS1-v1_5",
            hash: {
                name: "SHA-512"
            }
        },
        "1.2.840.113549.1.1.10": {
            name: "RSA-PSS"
        },
        "1.2.840.113549.1.1.7": {
            name: "RSA-OAEP"
        },
        "1.2.840.10045.2.1": {
            name: "ECDSA",
            hash: {
                name: "SHA-1"
            }
        },
        "1.2.840.10045.4.1": {
            name: "ECDSA",
            hash: {
                name: "SHA-1"
            }
        },
        "1.2.840.10045.4.3.2": {
            name: "ECDSA",
            hash: {
                name: "SHA-256"
            }
        },
        "1.2.840.10045.4.3.3": {
            name: "ECDSA", hash: {
                name: "SHA-384"
            }
        },
        "1.2.840.10045.4.3.4": {
            name: "ECDSA",
            hash: {
                name: "SHA-512"
            }
        },
        "1.3.133.16.840.63.0.2": {
            name: "ECDH",
            kdf: "SHA-1"
        },
        "1.3.132.1.11.1": {
            name: "ECDH",
            kdf: "SHA-256"
        },
        "1.3.132.1.11.2": {
            name: "ECDH",
            kdf: "SHA-384"
        },
        "1.3.132.1.11.3": {
            name: "ECDH",
            kdf: "SHA-512"
        },
        "2.16.840.1.101.3.4.1.2": {
            name: "AES-CBC",
            length: 128
        },
        "2.16.840.1.101.3.4.1.22": {
            name: "AES-CBC",
            length: 192
        },
        "2.16.840.1.101.3.4.1.42": {
            name: "AES-CBC",
            length: 256
        },
        "2.16.840.1.101.3.4.1.6": {
            name: "AES-GCM",
            length: 128
        },
        "2.16.840.1.101.3.4.1.26": {
            name: "AES-GCM",
            length: 192
        },
        "2.16.840.1.101.3.4.1.46": {
            name: "AES-GCM",
            length: 256
        },
        "2.16.840.1.101.3.4.1.4": {
            name: "AES-CFB",
            length: 128
        },
        "2.16.840.1.101.3.4.1.24": {
            name: "AES-CFB",
            length: 192
        },
        "2.16.840.1.101.3.4.1.44": {
            name: "AES-CFB",
            length: 256
        },
        "2.16.840.1.101.3.4.1.5": {
            name: "AES-KW",
            length: 128
        },
        "2.16.840.1.101.3.4.1.25": {
            name: "AES-KW",
            length: 192
        },
        "2.16.840.1.101.3.4.1.45": {
            name: "AES-KW",
            length: 256
        },
        "1.2.840.113549.2.7": {
            name: "HMAC",
            hash: {
                name: "SHA-1"
            }
        },
        "1.2.840.113549.2.9": {
            name: "HMAC",
            hash: {
                name: "SHA-256"
            }
        },
        "1.2.840.113549.2.10": {
            name: "HMAC",
            hash: {
                name: "SHA-384"
            }
        },
        "1.2.840.113549.2.11": {
            name: "HMAC",
            hash: {
                name: "SHA-512"
            }
        },
        "1.2.840.113549.1.9.16.3.5": {
            name: "DH"
        },
        "1.3.14.3.2.26": {
            name: "SHA-1"
        },
        "2.16.840.1.101.3.4.2.1": {
            name: "SHA-256"
        },
        "2.16.840.1.101.3.4.2.2": {
            name: "SHA-384"
        },
        "2.16.840.1.101.3.4.2.3": {
            name: "SHA-512"
        },
        "1.2.840.113549.1.5.12": {
            name: "PBKDF2"
        },
        // special case: OIDs for ECC curves
        "1.2.840.10045.3.1.7": {
            name: "P-256"
        },
        "1.3.132.0.34": {
            name: "P-384"
        },
        "1.3.132.0.35": {
            name: "P-521"
        },
    }[oid];
    if (algo === undefined)
        throw new Error(`Unsupported algorithm identifier: ${oid}`);
    return algo;
}
function _descriptionForAlgorithm(algo, desc = []) {
    Object.values(algo).forEach(value => {
        if (typeof value === 'string')
            desc = [...desc, value];
        else
            desc = _descriptionForAlgorithm(value, desc);
    });
    return desc;
}
function descriptionForAlgorithm(algo) {
    return _descriptionForAlgorithm(algo).join(' / ');
}


/***/ }),

/***/ "./subtls/dist/tls/ecdsa.js":
/*!**********************************!*\
  !*** ./subtls/dist/tls/ecdsa.js ***!
  \**********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ecdsaVerify: () => (/* binding */ ecdsaVerify)
/* harmony export */ });
/* harmony import */ var _presentation_log_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../presentation/log.js */ "./subtls/dist/presentation/log.js");
/* harmony import */ var _util_array_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/array.js */ "./subtls/dist/util/array.js");
/* harmony import */ var _certUtils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./certUtils.js */ "./subtls/dist/tls/certUtils.js");
/* harmony import */ var _util_cryptoProxy_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../util/cryptoProxy.js */ "./subtls/dist/util/cryptoProxy.js");




async function ecdsaVerify(sb /* signature */, publicKey, signedData, namedCurve, hash) {
    sb.expectUint8(_certUtils_js__WEBPACK_IMPORTED_MODULE_2__.constructedUniversalTypeSequence, chatty && 'sequence');
    const [endSigDer] = sb.expectASN1Length(chatty && 'sequence');
    sb.expectUint8(_certUtils_js__WEBPACK_IMPORTED_MODULE_2__.universalTypeInteger, chatty && 'integer');
    const [endSigRBytes, sigRBytesRemaining] = sb.expectASN1Length(chatty && 'integer');
    let sigR = sb.readBytes(sigRBytesRemaining());
    chatty && sb.comment('signature: r');
    endSigRBytes();
    sb.expectUint8(_certUtils_js__WEBPACK_IMPORTED_MODULE_2__.universalTypeInteger, chatty && 'integer');
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
        x.length < clampLength ? (0,_util_array_js__WEBPACK_IMPORTED_MODULE_1__.concat)(new Uint8Array(clampLength - x.length), x) : // too short? left pad with zeroes
            x; // right length: pass through
    const intLength = namedCurve === 'P-256' ? 32 : 48;
    const signature = (0,_util_array_js__WEBPACK_IMPORTED_MODULE_1__.concat)(clampToLength(sigR, intLength), clampToLength(sigS, intLength));
    const signatureKey = await _util_cryptoProxy_js__WEBPACK_IMPORTED_MODULE_3__["default"].importKey('spki', publicKey, { name: 'ECDSA', namedCurve }, false, ['verify']);
    const certVerifyResult = await _util_cryptoProxy_js__WEBPACK_IMPORTED_MODULE_3__["default"].verify({ name: 'ECDSA', hash }, signatureKey, signature, signedData);
    if (certVerifyResult !== true)
        throw new Error('ECDSA-SECP256R1-SHA256 certificate verify failed');
    chatty && (0,_presentation_log_js__WEBPACK_IMPORTED_MODULE_0__.log)(`%c✓ ECDSA signature verified (curve ${namedCurve}, hash ${hash})`, 'color: #8c8;');
}


/***/ }),

/***/ "./subtls/dist/tls/hkdf.js":
/*!*********************************!*\
  !*** ./subtls/dist/tls/hkdf.js ***!
  \*********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   hkdfExpand: () => (/* binding */ hkdfExpand),
/* harmony export */   hkdfExpandLabel: () => (/* binding */ hkdfExpandLabel),
/* harmony export */   hkdfExtract: () => (/* binding */ hkdfExtract)
/* harmony export */ });
/* harmony import */ var _util_array_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/array.js */ "./subtls/dist/util/array.js");
/* harmony import */ var _util_cryptoProxy_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/cryptoProxy.js */ "./subtls/dist/util/cryptoProxy.js");


const txtEnc = new TextEncoder();
async function hkdfExtract(salt, keyMaterial, hashBits) {
    /*
    from https://www.ietf.org/rfc/rfc5869.txt:
   
    HKDF-Extract(salt, IKM) -> PRK
   
    Options:
      Hash     a hash function; HashLen denotes the length of the
                hash function output in octets
   
    Inputs:
      salt     optional salt value (a non-secret random value);
                if not provided, it is set to a string of HashLen zeros.
      IKM      input keying material
   
    Output:
      PRK      a pseudorandom key (of HashLen octets)
   
    The output PRK is calculated as follows:
   
    PRK = HMAC-Hash(salt, IKM)
    */
    const hmacKey = await _util_cryptoProxy_js__WEBPACK_IMPORTED_MODULE_1__["default"].importKey('raw', salt, { name: 'HMAC', hash: { name: `SHA-${hashBits}` } }, false, ['sign']);
    var prk = new Uint8Array(await _util_cryptoProxy_js__WEBPACK_IMPORTED_MODULE_1__["default"].sign('HMAC', hmacKey, keyMaterial)); // yes, the key material is used as the input data, not the key
    return prk;
}
async function hkdfExpand(key, info, length, hashBits) {
    /*
    from https://www.ietf.org/rfc/rfc5869.txt:
   
    HKDF-Expand(PRK, info, L) -> OKM
   
    Options:
      Hash     a hash function; HashLen denotes the length of the
                hash function output in octets
   
    Inputs:
      PRK      a pseudorandom key of at least HashLen octets
                (usually, the output from the extract step)
      info     optional context and application specific information
                (can be a zero-length string)
      L        length of output keying material in octets
                (<= 255*HashLen)
   
    Output:
      OKM      output keying material (of L octets)
   
    The output OKM is calculated as follows:
   
    N = ceil(L/HashLen)
    T = T(1) | T(2) | T(3) | ... | T(N)
    OKM = first L octets of T
   
    where:
    T(0) = empty string (zero length)
    T(1) = HMAC-Hash(PRK, T(0) | info | 0x01)
    T(2) = HMAC-Hash(PRK, T(1) | info | 0x02)
    T(3) = HMAC-Hash(PRK, T(2) | info | 0x03)
    ...
   
    (where the constant concatenated to the end of each T(n) is a
    single octet.)
    */
    const hashBytes = hashBits >> 3;
    const n = Math.ceil(length / hashBytes);
    const okm = new Uint8Array(n * hashBytes);
    const hmacKey = await _util_cryptoProxy_js__WEBPACK_IMPORTED_MODULE_1__["default"].importKey('raw', key, { name: 'HMAC', hash: { name: `SHA-${hashBits}` } }, false, ['sign']);
    let tPrev = new Uint8Array(0);
    for (let i = 0; i < n; i++) {
        const hmacData = (0,_util_array_js__WEBPACK_IMPORTED_MODULE_0__.concat)(tPrev, info, [i + 1]);
        const tiBuffer = await _util_cryptoProxy_js__WEBPACK_IMPORTED_MODULE_1__["default"].sign('HMAC', hmacKey, hmacData);
        const ti = new Uint8Array(tiBuffer);
        okm.set(ti, hashBytes * i);
        tPrev = ti;
    }
    return okm.subarray(0, length);
}
const tls13_Bytes = txtEnc.encode('tls13 ');
async function hkdfExpandLabel(key, label, context, length, hashBits) {
    /*
    from https://www.rfc-editor.org/rfc/rfc8446#section-7.1:
   
    HKDF-Expand-Label(Secret, Label, Context, Length) =
            HKDF-Expand(Secret, HkdfLabel, Length)
   
        Where HkdfLabel is specified as:
   
        struct {
            uint16 length = Length;
            opaque label<7..255> = "tls13 " + Label;
            opaque context<0..255> = Context;
        } HkdfLabel;
    */
    const labelData = txtEnc.encode(label);
    const hkdfLabel = (0,_util_array_js__WEBPACK_IMPORTED_MODULE_0__.concat)([(length & 0xff00) >> 8, length & 0xff], [tls13_Bytes.length + labelData.length], tls13_Bytes, labelData, [context.length], context);
    return hkdfExpand(key, hkdfLabel, length, hashBits);
}


/***/ }),

/***/ "./subtls/dist/tls/keys.js":
/*!*********************************!*\
  !*** ./subtls/dist/tls/keys.js ***!
  \*********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getApplicationKeys: () => (/* binding */ getApplicationKeys),
/* harmony export */   getHandshakeKeys: () => (/* binding */ getHandshakeKeys)
/* harmony export */ });
/* harmony import */ var _util_hex_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/hex.js */ "./subtls/dist/util/hex.js");
/* harmony import */ var _presentation_log_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../presentation/log.js */ "./subtls/dist/presentation/log.js");
/* harmony import */ var _presentation_highlights_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../presentation/highlights.js */ "./subtls/dist/presentation/highlights.js");
/* harmony import */ var _util_cryptoProxy_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../util/cryptoProxy.js */ "./subtls/dist/util/cryptoProxy.js");
/* harmony import */ var _hkdf_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./hkdf.js */ "./subtls/dist/tls/hkdf.js");





async function getHandshakeKeys(serverPublicKey, privateKey, hellos, hashBits, keyLength) {
    const hashBytes = hashBits >>> 3;
    const zeroKey = new Uint8Array(hashBytes);
    const publicKey = await _util_cryptoProxy_js__WEBPACK_IMPORTED_MODULE_3__["default"].importKey('raw', serverPublicKey, { name: 'ECDH', namedCurve: 'P-256' }, false /* extractable */, []);
    const sharedSecretBuffer = await _util_cryptoProxy_js__WEBPACK_IMPORTED_MODULE_3__["default"].deriveBits({ name: 'ECDH', public: publicKey }, privateKey, 256);
    const sharedSecret = new Uint8Array(sharedSecretBuffer);
    chatty && (0,_presentation_log_js__WEBPACK_IMPORTED_MODULE_1__.log)(...(0,_presentation_highlights_js__WEBPACK_IMPORTED_MODULE_2__.highlightColonList)('shared secret (via ECDH): ' + (0,_util_hex_js__WEBPACK_IMPORTED_MODULE_0__.hexFromU8)(sharedSecret)));
    const hellosHashBuffer = await _util_cryptoProxy_js__WEBPACK_IMPORTED_MODULE_3__["default"].digest('SHA-256', hellos);
    const hellosHash = new Uint8Array(hellosHashBuffer);
    chatty && (0,_presentation_log_js__WEBPACK_IMPORTED_MODULE_1__.log)(...(0,_presentation_highlights_js__WEBPACK_IMPORTED_MODULE_2__.highlightColonList)('hellos hash: ' + (0,_util_hex_js__WEBPACK_IMPORTED_MODULE_0__.hexFromU8)(hellosHash)));
    const earlySecret = await (0,_hkdf_js__WEBPACK_IMPORTED_MODULE_4__.hkdfExtract)(new Uint8Array(1), zeroKey, hashBits);
    chatty && (0,_presentation_log_js__WEBPACK_IMPORTED_MODULE_1__.log)(...(0,_presentation_highlights_js__WEBPACK_IMPORTED_MODULE_2__.highlightColonList)('early secret: ' + (0,_util_hex_js__WEBPACK_IMPORTED_MODULE_0__.hexFromU8)(new Uint8Array(earlySecret))));
    const emptyHashBuffer = await _util_cryptoProxy_js__WEBPACK_IMPORTED_MODULE_3__["default"].digest(`SHA-${hashBits}`, new Uint8Array(0));
    const emptyHash = new Uint8Array(emptyHashBuffer);
    chatty && (0,_presentation_log_js__WEBPACK_IMPORTED_MODULE_1__.log)(...(0,_presentation_highlights_js__WEBPACK_IMPORTED_MODULE_2__.highlightColonList)('empty hash: ' + (0,_util_hex_js__WEBPACK_IMPORTED_MODULE_0__.hexFromU8)(emptyHash)));
    const derivedSecret = await (0,_hkdf_js__WEBPACK_IMPORTED_MODULE_4__.hkdfExpandLabel)(earlySecret, 'derived', emptyHash, hashBytes, hashBits);
    chatty && (0,_presentation_log_js__WEBPACK_IMPORTED_MODULE_1__.log)(...(0,_presentation_highlights_js__WEBPACK_IMPORTED_MODULE_2__.highlightColonList)('derived secret: ' + (0,_util_hex_js__WEBPACK_IMPORTED_MODULE_0__.hexFromU8)(derivedSecret)));
    const handshakeSecret = await (0,_hkdf_js__WEBPACK_IMPORTED_MODULE_4__.hkdfExtract)(derivedSecret, sharedSecret, hashBits);
    chatty && (0,_presentation_log_js__WEBPACK_IMPORTED_MODULE_1__.log)(...(0,_presentation_highlights_js__WEBPACK_IMPORTED_MODULE_2__.highlightColonList)('handshake secret: ' + (0,_util_hex_js__WEBPACK_IMPORTED_MODULE_0__.hexFromU8)(handshakeSecret)));
    const clientSecret = await (0,_hkdf_js__WEBPACK_IMPORTED_MODULE_4__.hkdfExpandLabel)(handshakeSecret, 'c hs traffic', hellosHash, hashBytes, hashBits);
    chatty && (0,_presentation_log_js__WEBPACK_IMPORTED_MODULE_1__.log)(...(0,_presentation_highlights_js__WEBPACK_IMPORTED_MODULE_2__.highlightColonList)('client secret: ' + (0,_util_hex_js__WEBPACK_IMPORTED_MODULE_0__.hexFromU8)(clientSecret)));
    const serverSecret = await (0,_hkdf_js__WEBPACK_IMPORTED_MODULE_4__.hkdfExpandLabel)(handshakeSecret, 's hs traffic', hellosHash, hashBytes, hashBits);
    chatty && (0,_presentation_log_js__WEBPACK_IMPORTED_MODULE_1__.log)(...(0,_presentation_highlights_js__WEBPACK_IMPORTED_MODULE_2__.highlightColonList)('server secret: ' + (0,_util_hex_js__WEBPACK_IMPORTED_MODULE_0__.hexFromU8)(serverSecret)));
    const clientHandshakeKey = await (0,_hkdf_js__WEBPACK_IMPORTED_MODULE_4__.hkdfExpandLabel)(clientSecret, 'key', new Uint8Array(0), keyLength, hashBits);
    chatty && (0,_presentation_log_js__WEBPACK_IMPORTED_MODULE_1__.log)(...(0,_presentation_highlights_js__WEBPACK_IMPORTED_MODULE_2__.highlightColonList)('client handshake key: ' + (0,_util_hex_js__WEBPACK_IMPORTED_MODULE_0__.hexFromU8)(clientHandshakeKey)));
    const serverHandshakeKey = await (0,_hkdf_js__WEBPACK_IMPORTED_MODULE_4__.hkdfExpandLabel)(serverSecret, 'key', new Uint8Array(0), keyLength, hashBits);
    chatty && (0,_presentation_log_js__WEBPACK_IMPORTED_MODULE_1__.log)(...(0,_presentation_highlights_js__WEBPACK_IMPORTED_MODULE_2__.highlightColonList)('server handshake key: ' + (0,_util_hex_js__WEBPACK_IMPORTED_MODULE_0__.hexFromU8)(serverHandshakeKey)));
    const clientHandshakeIV = await (0,_hkdf_js__WEBPACK_IMPORTED_MODULE_4__.hkdfExpandLabel)(clientSecret, 'iv', new Uint8Array(0), 12, hashBits);
    chatty && (0,_presentation_log_js__WEBPACK_IMPORTED_MODULE_1__.log)(...(0,_presentation_highlights_js__WEBPACK_IMPORTED_MODULE_2__.highlightColonList)('client handshake iv: ' + (0,_util_hex_js__WEBPACK_IMPORTED_MODULE_0__.hexFromU8)(clientHandshakeIV)));
    const serverHandshakeIV = await (0,_hkdf_js__WEBPACK_IMPORTED_MODULE_4__.hkdfExpandLabel)(serverSecret, 'iv', new Uint8Array(0), 12, hashBits);
    chatty && (0,_presentation_log_js__WEBPACK_IMPORTED_MODULE_1__.log)(...(0,_presentation_highlights_js__WEBPACK_IMPORTED_MODULE_2__.highlightColonList)('server handshake iv: ' + (0,_util_hex_js__WEBPACK_IMPORTED_MODULE_0__.hexFromU8)(serverHandshakeIV)));
    return { serverHandshakeKey, serverHandshakeIV, clientHandshakeKey, clientHandshakeIV, handshakeSecret, clientSecret, serverSecret };
}
async function getApplicationKeys(handshakeSecret, handshakeHash, hashBits, keyLength) {
    const hashBytes = hashBits >>> 3;
    const zeroKey = new Uint8Array(hashBytes);
    const emptyHashBuffer = await _util_cryptoProxy_js__WEBPACK_IMPORTED_MODULE_3__["default"].digest(`SHA-${hashBits}`, new Uint8Array(0));
    const emptyHash = new Uint8Array(emptyHashBuffer);
    chatty && (0,_presentation_log_js__WEBPACK_IMPORTED_MODULE_1__.log)(...(0,_presentation_highlights_js__WEBPACK_IMPORTED_MODULE_2__.highlightColonList)('empty hash: ' + (0,_util_hex_js__WEBPACK_IMPORTED_MODULE_0__.hexFromU8)(emptyHash)));
    const derivedSecret = await (0,_hkdf_js__WEBPACK_IMPORTED_MODULE_4__.hkdfExpandLabel)(handshakeSecret, 'derived', emptyHash, hashBytes, hashBits);
    chatty && (0,_presentation_log_js__WEBPACK_IMPORTED_MODULE_1__.log)(...(0,_presentation_highlights_js__WEBPACK_IMPORTED_MODULE_2__.highlightColonList)('derived secret: ' + (0,_util_hex_js__WEBPACK_IMPORTED_MODULE_0__.hexFromU8)(derivedSecret)));
    const masterSecret = await (0,_hkdf_js__WEBPACK_IMPORTED_MODULE_4__.hkdfExtract)(derivedSecret, zeroKey, hashBits);
    chatty && (0,_presentation_log_js__WEBPACK_IMPORTED_MODULE_1__.log)(...(0,_presentation_highlights_js__WEBPACK_IMPORTED_MODULE_2__.highlightColonList)('master secret: ' + (0,_util_hex_js__WEBPACK_IMPORTED_MODULE_0__.hexFromU8)(masterSecret)));
    const clientSecret = await (0,_hkdf_js__WEBPACK_IMPORTED_MODULE_4__.hkdfExpandLabel)(masterSecret, 'c ap traffic', handshakeHash, hashBytes, hashBits);
    chatty && (0,_presentation_log_js__WEBPACK_IMPORTED_MODULE_1__.log)(...(0,_presentation_highlights_js__WEBPACK_IMPORTED_MODULE_2__.highlightColonList)('client secret: ' + (0,_util_hex_js__WEBPACK_IMPORTED_MODULE_0__.hexFromU8)(clientSecret)));
    const serverSecret = await (0,_hkdf_js__WEBPACK_IMPORTED_MODULE_4__.hkdfExpandLabel)(masterSecret, 's ap traffic', handshakeHash, hashBytes, hashBits);
    chatty && (0,_presentation_log_js__WEBPACK_IMPORTED_MODULE_1__.log)(...(0,_presentation_highlights_js__WEBPACK_IMPORTED_MODULE_2__.highlightColonList)('server secret: ' + (0,_util_hex_js__WEBPACK_IMPORTED_MODULE_0__.hexFromU8)(serverSecret)));
    const clientApplicationKey = await (0,_hkdf_js__WEBPACK_IMPORTED_MODULE_4__.hkdfExpandLabel)(clientSecret, 'key', new Uint8Array(0), keyLength, hashBits);
    chatty && (0,_presentation_log_js__WEBPACK_IMPORTED_MODULE_1__.log)(...(0,_presentation_highlights_js__WEBPACK_IMPORTED_MODULE_2__.highlightColonList)('client application key: ' + (0,_util_hex_js__WEBPACK_IMPORTED_MODULE_0__.hexFromU8)(clientApplicationKey)));
    const serverApplicationKey = await (0,_hkdf_js__WEBPACK_IMPORTED_MODULE_4__.hkdfExpandLabel)(serverSecret, 'key', new Uint8Array(0), keyLength, hashBits);
    chatty && (0,_presentation_log_js__WEBPACK_IMPORTED_MODULE_1__.log)(...(0,_presentation_highlights_js__WEBPACK_IMPORTED_MODULE_2__.highlightColonList)('server application key: ' + (0,_util_hex_js__WEBPACK_IMPORTED_MODULE_0__.hexFromU8)(serverApplicationKey)));
    const clientApplicationIV = await (0,_hkdf_js__WEBPACK_IMPORTED_MODULE_4__.hkdfExpandLabel)(clientSecret, 'iv', new Uint8Array(0), 12, hashBits);
    chatty && (0,_presentation_log_js__WEBPACK_IMPORTED_MODULE_1__.log)(...(0,_presentation_highlights_js__WEBPACK_IMPORTED_MODULE_2__.highlightColonList)('client application iv: ' + (0,_util_hex_js__WEBPACK_IMPORTED_MODULE_0__.hexFromU8)(clientApplicationIV)));
    const serverApplicationIV = await (0,_hkdf_js__WEBPACK_IMPORTED_MODULE_4__.hkdfExpandLabel)(serverSecret, 'iv', new Uint8Array(0), 12, hashBits);
    chatty && (0,_presentation_log_js__WEBPACK_IMPORTED_MODULE_1__.log)(...(0,_presentation_highlights_js__WEBPACK_IMPORTED_MODULE_2__.highlightColonList)('server application iv: ' + (0,_util_hex_js__WEBPACK_IMPORTED_MODULE_0__.hexFromU8)(serverApplicationIV)));
    return { serverApplicationKey, serverApplicationIV, clientApplicationKey, clientApplicationIV };
}


/***/ }),

/***/ "./subtls/dist/tls/makeClientHello.js":
/*!********************************************!*\
  !*** ./subtls/dist/tls/makeClientHello.js ***!
  \********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ makeClientHello)
/* harmony export */ });
/* harmony import */ var _util_bytes_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/bytes.js */ "./subtls/dist/util/bytes.js");

function makeClientHello(host, publicKey, sessionId, useSNI = true) {
    const h = new _util_bytes_js__WEBPACK_IMPORTED_MODULE_0__.Bytes(1024);
    h.writeUint8(0x16, chatty && 'record type: handshake');
    h.writeUint16(0x0301, chatty && 'TLS legacy record version 1.0 ([RFC 8446 §5.1](https://datatracker.ietf.org/doc/html/rfc8446#section-5.1))');
    const endRecordHeader = h.writeLengthUint16('TLS record');
    h.writeUint8(0x01, chatty && 'handshake type: client hello');
    const endHandshakeHeader = h.writeLengthUint24();
    h.writeUint16(0x0303, chatty && 'TLS version 1.2 (middlebox compatibility: see [blog.cloudflare.com](https://blog.cloudflare.com/why-tls-1-3-isnt-in-browsers-yet))');
    crypto.getRandomValues(h.subarray(32));
    chatty && h.comment('client random');
    const endSessionId = h.writeLengthUint8(chatty && 'session ID');
    h.writeBytes(sessionId);
    chatty && h.comment('session ID (middlebox compatibility again: [RFC 8446 appendix D4](https://datatracker.ietf.org/doc/html/rfc8446#appendix-D.4))');
    endSessionId();
    const endCiphers = h.writeLengthUint16(chatty && 'ciphers ([RFC 8446 appendix B4](https://datatracker.ietf.org/doc/html/rfc8446#appendix-B.4))');
    h.writeUint16(0x1301, chatty && 'cipher: TLS_AES_128_GCM_SHA256');
    endCiphers();
    const endCompressionMethods = h.writeLengthUint8(chatty && 'compression methods');
    h.writeUint8(0x00, chatty && 'compression method: none');
    endCompressionMethods();
    const endExtensions = h.writeLengthUint16(chatty && 'extensions ([RFC 8446 §4.2](https://datatracker.ietf.org/doc/html/rfc8446#section-4.2))');
    if (useSNI) {
        h.writeUint16(0x0000, chatty && 'extension type: Server Name Indication, or SNI ([RFC 6066 §3](https://datatracker.ietf.org/doc/html/rfc6066#section-3))');
        const endSNIExt = h.writeLengthUint16(chatty && 'SNI data');
        const endSNI = h.writeLengthUint16(chatty && 'SNI records');
        h.writeUint8(0x00, chatty && 'list entry type: DNS hostname');
        const endHostname = h.writeLengthUint16(chatty && 'hostname');
        h.writeUTF8String(host);
        endHostname();
        endSNI();
        endSNIExt();
    }
    h.writeUint16(0x000b, chatty && 'extension type: supported Elliptic Curve point formats (for middlebox compatibility, from TLS 1.2: [RFC 8422 §5.1.2](https://datatracker.ietf.org/doc/html/rfc8422#section-5.1.2))');
    const endFormatTypesExt = h.writeLengthUint16(chatty && 'point formats data');
    const endFormatTypes = h.writeLengthUint8(chatty && 'point formats');
    h.writeUint8(0x00, chatty && 'point format: uncompressed');
    endFormatTypes();
    endFormatTypesExt();
    h.writeUint16(0x000a, chatty && 'extension type: supported groups for key exchange ([RFC 8446 §4.2.7](https://datatracker.ietf.org/doc/html/rfc8446#section-4.2.7))');
    const endGroupsExt = h.writeLengthUint16(chatty && 'groups data');
    const endGroups = h.writeLengthUint16(chatty && 'groups');
    h.writeUint16(0x0017, chatty && 'group: elliptic curve secp256r1');
    endGroups();
    endGroupsExt();
    h.writeUint16(0x000d, chatty && 'extension type: signature algorithms ([RFC 8446 §4.2.3](https://datatracker.ietf.org/doc/html/rfc8446#section-4.2.3))');
    const endSigsExt = h.writeLengthUint16(chatty && 'signature algorithms data');
    const endSigs = h.writeLengthUint16(chatty && 'signature algorithms');
    h.writeUint16(0x0403, chatty && 'algorithm: ecdsa_secp256r1_sha256');
    h.writeUint16(0x0804, chatty && 'algorithm: rsa_pss_rsae_sha256');
    endSigs();
    endSigsExt();
    h.writeUint16(0x002b, chatty && 'extension type: supported TLS versions ([RFC 8446 §4.2.1](https://datatracker.ietf.org/doc/html/rfc8446#section-4.2.1))');
    const endVersionsExt = h.writeLengthUint16(chatty && 'TLS versions data');
    const endVersions = h.writeLengthUint8(chatty && 'TLS versions');
    h.writeUint16(0x0304, chatty && 'TLS version: 1.3');
    endVersions();
    endVersionsExt();
    h.writeUint16(0x0033, chatty && 'extension type: key share ([RFC 8446 §4.2.8](https://datatracker.ietf.org/doc/html/rfc8446#section-4.2.8))');
    const endKeyShareExt = h.writeLengthUint16(chatty && 'key share data');
    const endKeyShares = h.writeLengthUint16(chatty && 'key shares');
    h.writeUint16(0x0017, chatty && 'secp256r1 (NIST P-256) key share ([RFC 8446 §4.2.7](https://datatracker.ietf.org/doc/html/rfc8446#section-4.2.7))');
    const endKeyShare = h.writeLengthUint16(chatty && 'key share');
    if (chatty) {
        h.writeUint8(publicKey[0], 'legacy point format: always 4, which means uncompressed ([RFC 8446 §4.2.8.2](https://datatracker.ietf.org/doc/html/rfc8446#section-4.2.8.2) and [RFC 8422 §5.4.1](https://datatracker.ietf.org/doc/html/rfc8422#section-5.4.1))');
        h.writeBytes(publicKey.subarray(1, 33));
        h.comment('x coordinate');
        h.writeBytes(publicKey.subarray(33, 65));
        h.comment('y coordinate');
    }
    else {
        h.writeBytes(publicKey);
    }
    endKeyShare();
    endKeyShares();
    endKeyShareExt();
    endExtensions();
    endHandshakeHeader();
    endRecordHeader();
    return h;
}


/***/ }),

/***/ "./subtls/dist/tls/parseServerHello.js":
/*!*********************************************!*\
  !*** ./subtls/dist/tls/parseServerHello.js ***!
  \*********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ parseServerHello)
/* harmony export */ });
/* harmony import */ var _util_array_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/array.js */ "./subtls/dist/util/array.js");
/* harmony import */ var _util_hex_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/hex.js */ "./subtls/dist/util/hex.js");


function parseServerHello(h, sessionId) {
    let serverPublicKey;
    let tlsVersionSpecified;
    const [endServerHelloMessage] = h.expectLength(h.remaining());
    h.expectUint8(0x02, chatty && 'handshake type: server hello');
    const [endServerHello] = h.expectLengthUint24(chatty && 'server hello');
    h.expectUint16(0x0303, chatty && 'TLS version 1.2 (middlebox compatibility)');
    const serverRandom = h.readBytes(32);
    if ((0,_util_array_js__WEBPACK_IMPORTED_MODULE_0__.equal)(serverRandom, [
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
                serverPublicKey = (0,_util_array_js__WEBPACK_IMPORTED_MODULE_0__.concat)([4], x, y);
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
            throw new Error(`Unexpected extension 0x${(0,_util_hex_js__WEBPACK_IMPORTED_MODULE_1__.hexFromU8)([extensionType])}`);
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


/***/ }),

/***/ "./subtls/dist/tls/readEncryptedHandshake.js":
/*!***************************************************!*\
  !*** ./subtls/dist/tls/readEncryptedHandshake.js ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   readEncryptedHandshake: () => (/* binding */ readEncryptedHandshake)
/* harmony export */ });
/* harmony import */ var _presentation_appearance_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../presentation/appearance.js */ "./subtls/dist/presentation/appearance.js");
/* harmony import */ var _hkdf_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./hkdf.js */ "./subtls/dist/tls/hkdf.js");
/* harmony import */ var _util_array_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/array.js */ "./subtls/dist/util/array.js");
/* harmony import */ var _util_cryptoProxy_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../util/cryptoProxy.js */ "./subtls/dist/util/cryptoProxy.js");
/* harmony import */ var _cert_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./cert.js */ "./subtls/dist/tls/cert.js");
/* harmony import */ var _presentation_highlights_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../presentation/highlights.js */ "./subtls/dist/presentation/highlights.js");
/* harmony import */ var _presentation_log_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../presentation/log.js */ "./subtls/dist/presentation/log.js");
/* harmony import */ var _util_asn1bytes_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../util/asn1bytes.js */ "./subtls/dist/util/asn1bytes.js");
/* harmony import */ var _util_hex_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../util/hex.js */ "./subtls/dist/util/hex.js");
/* harmony import */ var _ecdsa_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./ecdsa.js */ "./subtls/dist/tls/ecdsa.js");
/* harmony import */ var _verifyCerts_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./verifyCerts.js */ "./subtls/dist/tls/verifyCerts.js");











const txtEnc = new TextEncoder();
async function readEncryptedHandshake(host, readHandshakeRecord, serverSecret, hellos, rootCertsDatabase, requireServerTlsExtKeyUsage = true, requireDigitalSigKeyUsage = true) {
    const hs = new _util_asn1bytes_js__WEBPACK_IMPORTED_MODULE_7__.ASN1Bytes(await readHandshakeRecord());
    hs.expectUint8(0x08, chatty && 'handshake record type: encrypted extensions ([RFC 8446 §4.3.1](https://datatracker.ietf.org/doc/html/rfc8446#section-4.3.1))');
    const [eeMessageEnd] = hs.expectLengthUint24();
    const [extEnd, extRemaining] = hs.expectLengthUint16(chatty && 'extensions');
    while (extRemaining() > 0) {
        const extType = hs.readUint16(chatty && 'extension type:');
        if (extType === 0x0000) {
            /*
            "A server that receives a client hello containing the "server_name"
            extension MAY use the information contained in the extension to guide
            its selection of an appropriate certificate to return to the client,
            and / or other aspects of security policy. In this event, the server
            SHALL include an extension of type "server_name" in the (extended)
            server hello. The "extension_data" field of this extension SHALL be empty.
            - https://datatracker.ietf.org/doc/html/rfc6066#section-3
            */
            chatty && hs.comment('SNI');
            hs.expectUint16(0x0000, chatty && 'no extension data ([RFC 6066 §3](https://datatracker.ietf.org/doc/html/rfc6066#section-3))');
        }
        else if (extType === 0x000a) {
            /*
            As of TLS 1.3, servers are permitted to send the "supported_groups"
            extension to the client.  Clients MUST NOT act upon any information
            found in "supported_groups" prior to successful completion of the
            handshake but MAY use the information learned from a successfully
            completed handshake to change what groups they use in their
            "key_share" extension in subsequent connections.  If the server has a
            group it prefers to the ones in the "key_share" extension but is
            still willing to accept the ClientHello, it SHOULD send
            "supported_groups" to update the client's view of its preferences;
            this extension SHOULD contain all groups the server supports,
            regardless of whether they are currently supported by the client.
            - https://www.rfc-editor.org/rfc/rfc8446#section-4.2
            */
            chatty && hs.comment('supported groups ([RFC 8446 §4.2](https://www.rfc-editor.org/rfc/rfc8446#section-4.2), [§4.2.7](https://datatracker.ietf.org/doc/html/rfc8446#section-4.2.7))');
            const [endGroupsData] = hs.expectLengthUint16(chatty && 'groups data');
            const [endGroups, groupsRemaining] = hs.expectLengthUint16(chatty && 'groups');
            chatty && hs.comment('(most preferred first)');
            while (groupsRemaining() > 0) {
                const group = hs.readUint16();
                if (chatty) {
                    const groupName = {
                        0x0017: 'secp256r1',
                        0x0018: 'secp384r1',
                        0x0019: 'secp521r1',
                        0x001D: 'x25519',
                        0x001E: 'x448',
                        0x0100: 'ffdhe2048',
                        0x0101: 'ffdhe3072',
                        0x0102: 'ffdhe4096',
                        0x0103: 'ffdhe6144',
                        0x0104: 'ffdhe8192',
                    }[group] ?? 'unrecognised group';
                    hs.comment(`group: ${groupName}`);
                }
            }
            endGroups();
            endGroupsData();
        }
        else {
            throw new Error(`Unsupported server encrypted extension type 0x${(0,_util_hex_js__WEBPACK_IMPORTED_MODULE_8__.hexFromU8)([extType]).padStart(4, '0')}`);
        }
    }
    extEnd();
    eeMessageEnd();
    if (hs.remaining() === 0)
        hs.extend(await readHandshakeRecord()); // e.g. Vercel sends certs in a separate record
    let clientCertRequested = false;
    // certificate request (unusual)
    let certMsgType = hs.readUint8();
    if (certMsgType === 0x0d) {
        chatty && hs.comment('handshake record type: certificate request ([RFC 8446 §4.3.2](https://datatracker.ietf.org/doc/html/rfc8446#section-4.3.2))');
        clientCertRequested = true;
        const [endCertReq] = hs.expectLengthUint24('certificate request data');
        // this field SHALL be zero length unless used for the post-handshake authentication exchanges described in Section 4.6.2
        hs.expectUint8(0x00, chatty && 'length of certificate request context');
        const [endCertReqExts, certReqExtsRemaining] = hs.expectLengthUint16('certificate request extensions');
        hs.skip(certReqExtsRemaining(), chatty && 'certificate request extensions (ignored)');
        endCertReqExts();
        endCertReq();
        if (hs.remaining() === 0)
            hs.extend(await readHandshakeRecord());
        certMsgType = hs.readUint8();
    }
    // certificates
    if (certMsgType !== 0x0b)
        throw new Error(`Unexpected handshake message type 0x${(0,_util_hex_js__WEBPACK_IMPORTED_MODULE_8__.hexFromU8)([certMsgType])}`);
    chatty && hs.comment('handshake record type: certificate ([RFC 8446 §4.4.2](https://datatracker.ietf.org/doc/html/rfc8446#section-4.4.2))');
    const [endCertPayload] = hs.expectLengthUint24(chatty && 'certificate payload');
    hs.expectUint8(0x00, chatty && 'no bytes of request context follow');
    const [endCerts, certsRemaining] = hs.expectLengthUint24(chatty && 'certificates');
    const certs = [];
    while (certsRemaining() > 0) {
        const [endCert] = hs.expectLengthUint24(chatty && 'certificate');
        const cert = new _cert_js__WEBPACK_IMPORTED_MODULE_4__.Cert(hs); // this parses the cert and advances the Bytes object offset
        certs.push(cert);
        endCert();
        const [endCertExt, certExtRemaining] = hs.expectLengthUint16('certificate extensions');
        hs.skip(certExtRemaining());
        endCertExt();
    }
    endCerts();
    endCertPayload();
    if (certs.length === 0)
        throw new Error('No certificates supplied');
    const userCert = certs[0];
    // certificate verify
    const certVerifyHandshakeData = hs.data.subarray(0, hs.offset);
    const certVerifyData = (0,_util_array_js__WEBPACK_IMPORTED_MODULE_2__.concat)(hellos, certVerifyHandshakeData);
    const certVerifyHashBuffer = await _util_cryptoProxy_js__WEBPACK_IMPORTED_MODULE_3__["default"].digest('SHA-256', certVerifyData);
    const certVerifyHash = new Uint8Array(certVerifyHashBuffer);
    const certVerifySignedData = (0,_util_array_js__WEBPACK_IMPORTED_MODULE_2__.concat)(txtEnc.encode(' '.repeat(64) + 'TLS 1.3, server CertificateVerify'), [0x00], certVerifyHash);
    if (hs.remaining() === 0)
        hs.extend(await readHandshakeRecord());
    hs.expectUint8(0x0f, chatty && 'handshake message type: certificate verify ([RFC 8446 §4.4.3](https://datatracker.ietf.org/doc/html/rfc8446#section-4.4.3))');
    const [endCertVerifyPayload] = hs.expectLengthUint24(chatty && 'handshake message data');
    const sigType = hs.readUint16();
    chatty && (0,_presentation_log_js__WEBPACK_IMPORTED_MODULE_6__.log)('verifying end-user certificate ...');
    if (sigType === 0x0403) {
        chatty && hs.comment('signature type ECDSA-SECP256R1-SHA256'); // https://datatracker.ietf.org/doc/html/rfc8446#section-4.2.3
        const [endSignature] = hs.expectLengthUint16();
        await (0,_ecdsa_js__WEBPACK_IMPORTED_MODULE_9__.ecdsaVerify)(hs, userCert.publicKey.all, certVerifySignedData, 'P-256', 'SHA-256');
        endSignature();
    }
    else if (sigType === 0x0804) {
        chatty && hs.comment('signature type RSA-PSS-RSAE-SHA256');
        const [endSignature, signatureRemaining] = hs.expectLengthUint16();
        const signature = hs.subarray(signatureRemaining());
        chatty && hs.comment('signature');
        endSignature();
        /*
        RSASSA-PSS RSAE algorithms:  Indicates a signature algorithm using
        RSASSA-PSS [RFC8017] with mask generation function 1.  The digest
        used in the mask generation function and the digest being signed
        are both the corresponding hash algorithm as defined in [SHS].
        The length of the Salt MUST be equal to the length of the output
        of the digest algorithm.  If the public key is carried in an X.509
        certificate, it MUST use the rsaEncryption OID [RFC5280].
        -- https://www.rfc-editor.org/rfc/rfc8446#section-4.2.3
        */
        const signatureKey = await _util_cryptoProxy_js__WEBPACK_IMPORTED_MODULE_3__["default"].importKey('spki', userCert.publicKey.all, { name: 'RSA-PSS', hash: 'SHA-256' }, false, ['verify']);
        const certVerifyResult = await _util_cryptoProxy_js__WEBPACK_IMPORTED_MODULE_3__["default"].verify({ name: 'RSA-PSS', saltLength: 32 /* SHA-256 length in bytes */ }, signatureKey, signature, certVerifySignedData);
        if (certVerifyResult !== true)
            throw new Error('RSA-PSS-RSAE-SHA256 certificate verify failed');
    }
    else {
        throw new Error(`Unsupported certificate verify signature type 0x${(0,_util_hex_js__WEBPACK_IMPORTED_MODULE_8__.hexFromU8)([sigType]).padStart(4, '0')}`);
    }
    chatty && (0,_presentation_log_js__WEBPACK_IMPORTED_MODULE_6__.log)('%c✓ end-user certificate verified (server has private key)', 'color: #8c8;'); // if not, we'd have thrown by now
    endCertVerifyPayload();
    // handshake verify
    const verifyHandshakeData = hs.data.subarray(0, hs.offset);
    const verifyData = (0,_util_array_js__WEBPACK_IMPORTED_MODULE_2__.concat)(hellos, verifyHandshakeData);
    const finishedKey = await (0,_hkdf_js__WEBPACK_IMPORTED_MODULE_1__.hkdfExpandLabel)(serverSecret, 'finished', new Uint8Array(0), 32, 256);
    const finishedHash = await _util_cryptoProxy_js__WEBPACK_IMPORTED_MODULE_3__["default"].digest('SHA-256', verifyData);
    const hmacKey = await _util_cryptoProxy_js__WEBPACK_IMPORTED_MODULE_3__["default"].importKey('raw', finishedKey, { name: 'HMAC', hash: { name: `SHA-256` } }, false, ['sign']);
    const correctVerifyHashBuffer = await _util_cryptoProxy_js__WEBPACK_IMPORTED_MODULE_3__["default"].sign('HMAC', hmacKey, finishedHash);
    const correctVerifyHash = new Uint8Array(correctVerifyHashBuffer);
    if (hs.remaining() === 0)
        hs.extend(await readHandshakeRecord());
    hs.expectUint8(0x14, chatty && 'handshake message type: finished ([RFC 8446 §4.4.4](https://datatracker.ietf.org/doc/html/rfc8446#section-4.4.4))');
    const [endHsFinishedPayload, hsFinishedPayloadRemaining] = hs.expectLengthUint24(chatty && 'verify hash');
    const verifyHash = hs.readBytes(hsFinishedPayloadRemaining());
    chatty && hs.comment('verify hash');
    endHsFinishedPayload();
    if (hs.remaining() !== 0)
        throw new Error('Unexpected extra bytes in server handshake');
    const verifyHashVerified = (0,_util_array_js__WEBPACK_IMPORTED_MODULE_2__.equal)(verifyHash, correctVerifyHash);
    if (verifyHashVerified !== true)
        throw new Error('Invalid server verify hash');
    chatty && (0,_presentation_log_js__WEBPACK_IMPORTED_MODULE_6__.log)('Decrypted using the server handshake key, the server’s handshake messages are parsed as follows ([source](https://github.com/jawj/subtls/blob/main/src/tls/readEncryptedHandshake.ts)). This is a long section, since X.509 certificates are quite complex and there will be several of them:');
    chatty && (0,_presentation_log_js__WEBPACK_IMPORTED_MODULE_6__.log)(...(0,_presentation_highlights_js__WEBPACK_IMPORTED_MODULE_5__.highlightBytes)(hs.commentedString(true), _presentation_appearance_js__WEBPACK_IMPORTED_MODULE_0__.LogColours.server));
    const verifiedToTrustedRoot = await (0,_verifyCerts_js__WEBPACK_IMPORTED_MODULE_10__.verifyCerts)(host, certs, rootCertsDatabase, requireServerTlsExtKeyUsage, requireDigitalSigKeyUsage);
    if (!verifiedToTrustedRoot)
        throw new Error('Validated certificate chain did not end in a trusted root');
    return [hs.data, clientCertRequested];
}


/***/ }),

/***/ "./subtls/dist/tls/sessionTicket.js":
/*!******************************************!*\
  !*** ./subtls/dist/tls/sessionTicket.js ***!
  \******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   parseSessionTicket: () => (/* binding */ parseSessionTicket)
/* harmony export */ });
/* harmony import */ var _util_bytes_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/bytes.js */ "./subtls/dist/util/bytes.js");
/* harmony import */ var _presentation_log_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../presentation/log.js */ "./subtls/dist/presentation/log.js");
/* harmony import */ var _presentation_highlights_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../presentation/highlights.js */ "./subtls/dist/presentation/highlights.js");
/* harmony import */ var _presentation_appearance_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../presentation/appearance.js */ "./subtls/dist/presentation/appearance.js");




function parseSessionTicket(record) {
    if (chatty) {
        const ticket = new _util_bytes_js__WEBPACK_IMPORTED_MODULE_0__.Bytes(record);
        ticket.expectUint8(0x04, 'session ticket message ([RFC 8846 §4.6.1](https://datatracker.ietf.org/doc/html/rfc8446#section-4.6.1))');
        const [endTicketRecord] = ticket.expectLengthUint24('session ticket message');
        const ticketSeconds = ticket.readUint32();
        ticket.comment(`ticket lifetime in seconds: ${ticketSeconds} = ${ticketSeconds / 3600} hours`);
        ticket.readUint32('ticket age add');
        const [endTicketNonce, ticketNonceRemaining] = ticket.expectLengthUint8('ticket nonce');
        ticket.readBytes(ticketNonceRemaining());
        ticket.comment('ticket nonce');
        endTicketNonce();
        const [endTicket, ticketRemaining] = ticket.expectLengthUint16('ticket');
        ticket.readBytes(ticketRemaining());
        ticket.comment('ticket');
        endTicket();
        const [endTicketExts, ticketExtsRemaining] = ticket.expectLengthUint16('ticket extensions');
        if (ticketExtsRemaining() > 0) {
            ticket.readBytes(ticketExtsRemaining());
            ticket.comment('ticket extensions (ignored)');
        }
        endTicketExts();
        endTicketRecord();
        (0,_presentation_log_js__WEBPACK_IMPORTED_MODULE_1__.log)(...(0,_presentation_highlights_js__WEBPACK_IMPORTED_MODULE_2__.highlightBytes)(ticket.commentedString(), _presentation_appearance_js__WEBPACK_IMPORTED_MODULE_3__.LogColours.server));
    }
}


/***/ }),

/***/ "./subtls/dist/tls/startTls.js":
/*!*************************************!*\
  !*** ./subtls/dist/tls/startTls.js ***!
  \*************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   startTls: () => (/* binding */ startTls)
/* harmony export */ });
/* harmony import */ var _makeClientHello_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./makeClientHello.js */ "./subtls/dist/tls/makeClientHello.js");
/* harmony import */ var _parseServerHello_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./parseServerHello.js */ "./subtls/dist/tls/parseServerHello.js");
/* harmony import */ var _tlsRecord_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tlsRecord.js */ "./subtls/dist/tls/tlsRecord.js");
/* harmony import */ var _keys_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./keys.js */ "./subtls/dist/tls/keys.js");
/* harmony import */ var _hkdf_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./hkdf.js */ "./subtls/dist/tls/hkdf.js");
/* harmony import */ var _aesgcm_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./aesgcm.js */ "./subtls/dist/tls/aesgcm.js");
/* harmony import */ var _readEncryptedHandshake_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./readEncryptedHandshake.js */ "./subtls/dist/tls/readEncryptedHandshake.js");
/* harmony import */ var _util_bytes_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../util/bytes.js */ "./subtls/dist/util/bytes.js");
/* harmony import */ var _util_array_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../util/array.js */ "./subtls/dist/util/array.js");
/* harmony import */ var _util_hex_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../util/hex.js */ "./subtls/dist/util/hex.js");
/* harmony import */ var _presentation_appearance_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../presentation/appearance.js */ "./subtls/dist/presentation/appearance.js");
/* harmony import */ var _presentation_highlights_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../presentation/highlights.js */ "./subtls/dist/presentation/highlights.js");
/* harmony import */ var _presentation_log_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../presentation/log.js */ "./subtls/dist/presentation/log.js");
/* harmony import */ var _cert_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./cert.js */ "./subtls/dist/tls/cert.js");
/* harmony import */ var _util_base64_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../util/base64.js */ "./subtls/dist/util/base64.js");
/* harmony import */ var _util_cryptoProxy_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../util/cryptoProxy.js */ "./subtls/dist/util/cryptoProxy.js");
















async function startTls(host, rootCertsDatabase, networkRead, networkWrite, closed, { useSNI, requireServerTlsExtKeyUsage, requireDigitalSigKeyUsage, writePreData, expectPreData, commentPreData } = {}) {
    useSNI ??= true;
    requireServerTlsExtKeyUsage ??= true;
    requireDigitalSigKeyUsage ??= true;
    if (typeof rootCertsDatabase === 'string')
        rootCertsDatabase = _cert_js__WEBPACK_IMPORTED_MODULE_13__.TrustedCert.databaseFromPEM(rootCertsDatabase);
    const ecdhKeys = await _util_cryptoProxy_js__WEBPACK_IMPORTED_MODULE_15__["default"].generateKey({ name: 'ECDH', namedCurve: 'P-256' }, true, ['deriveKey', 'deriveBits']);
    const rawPublicKeyBuffer = await _util_cryptoProxy_js__WEBPACK_IMPORTED_MODULE_15__["default"].exportKey('raw', ecdhKeys.publicKey);
    const rawPublicKey = new Uint8Array(rawPublicKeyBuffer);
    if (chatty) {
        const privateKeyJWK = await _util_cryptoProxy_js__WEBPACK_IMPORTED_MODULE_15__["default"].exportKey('jwk', ecdhKeys.privateKey);
        (0,_presentation_log_js__WEBPACK_IMPORTED_MODULE_12__.log)('We begin the TLS connection by generating an [ECDH](https://en.wikipedia.org/wiki/Elliptic-curve_Diffie%E2%80%93Hellman) key pair using curve [P-256](https://neuromancer.sk/std/nist/P-256). The private key, d, is simply a 256-bit integer picked at random:');
        (0,_presentation_log_js__WEBPACK_IMPORTED_MODULE_12__.log)(...(0,_presentation_highlights_js__WEBPACK_IMPORTED_MODULE_11__.highlightColonList)('d: ' + (0,_util_hex_js__WEBPACK_IMPORTED_MODULE_9__.hexFromU8)((0,_util_base64_js__WEBPACK_IMPORTED_MODULE_14__.base64Decode)(privateKeyJWK.d, _util_base64_js__WEBPACK_IMPORTED_MODULE_14__.urlCharCodes))));
        (0,_presentation_log_js__WEBPACK_IMPORTED_MODULE_12__.log)('The public key is a point on the curve. The point is [derived from d and a base point](https://curves.xargs.org). It’s identified by coordinates x and y.');
        (0,_presentation_log_js__WEBPACK_IMPORTED_MODULE_12__.log)(...(0,_presentation_highlights_js__WEBPACK_IMPORTED_MODULE_11__.highlightColonList)('x: ' + (0,_util_hex_js__WEBPACK_IMPORTED_MODULE_9__.hexFromU8)((0,_util_base64_js__WEBPACK_IMPORTED_MODULE_14__.base64Decode)(privateKeyJWK.x, _util_base64_js__WEBPACK_IMPORTED_MODULE_14__.urlCharCodes))));
        (0,_presentation_log_js__WEBPACK_IMPORTED_MODULE_12__.log)(...(0,_presentation_highlights_js__WEBPACK_IMPORTED_MODULE_11__.highlightColonList)('y: ' + (0,_util_hex_js__WEBPACK_IMPORTED_MODULE_9__.hexFromU8)((0,_util_base64_js__WEBPACK_IMPORTED_MODULE_14__.base64Decode)(privateKeyJWK.y, _util_base64_js__WEBPACK_IMPORTED_MODULE_14__.urlCharCodes))));
    }
    chatty && (0,_presentation_log_js__WEBPACK_IMPORTED_MODULE_12__.log)('Now we have a public/private key pair, we can start the TLS handshake by sending a client hello message ([source](https://github.com/jawj/subtls/blob/main/src/tls/makeClientHello.ts)). This includes the public key:');
    // client hello
    const sessionId = new Uint8Array(32);
    crypto.getRandomValues(sessionId);
    const clientHello = (0,_makeClientHello_js__WEBPACK_IMPORTED_MODULE_0__["default"])(host, rawPublicKey, sessionId, useSNI);
    chatty && (0,_presentation_log_js__WEBPACK_IMPORTED_MODULE_12__.log)(...(0,_presentation_highlights_js__WEBPACK_IMPORTED_MODULE_11__.highlightBytes)(clientHello.commentedString(), _presentation_appearance_js__WEBPACK_IMPORTED_MODULE_10__.LogColours.client));
    const clientHelloData = clientHello.array();
    const initialData = writePreData ? (0,_util_array_js__WEBPACK_IMPORTED_MODULE_8__.concat)(writePreData, clientHelloData) : clientHelloData;
    networkWrite(initialData);
    chatty && (0,_presentation_log_js__WEBPACK_IMPORTED_MODULE_12__.log)('The server returns a response, which includes its own public key, and we parse it ([source](https://github.com/jawj/subtls/blob/main/src/tls/parseServerHello.ts)):');
    if (expectPreData) {
        const receivedPreData = await networkRead(expectPreData.length);
        if (!receivedPreData || !(0,_util_array_js__WEBPACK_IMPORTED_MODULE_8__.equal)(receivedPreData, expectPreData))
            throw new Error('Pre data did not match expectation');
        chatty && (0,_presentation_log_js__WEBPACK_IMPORTED_MODULE_12__.log)(...(0,_presentation_highlights_js__WEBPACK_IMPORTED_MODULE_11__.highlightBytes)((0,_util_hex_js__WEBPACK_IMPORTED_MODULE_9__.hexFromU8)(receivedPreData) + '  ' + commentPreData, _presentation_appearance_js__WEBPACK_IMPORTED_MODULE_10__.LogColours.server));
    }
    // parse server hello
    const serverHelloRecord = await (0,_tlsRecord_js__WEBPACK_IMPORTED_MODULE_2__.readTlsRecord)(networkRead, _tlsRecord_js__WEBPACK_IMPORTED_MODULE_2__.RecordType.Handshake);
    if (serverHelloRecord === undefined)
        throw new Error('Connection closed while awaiting server hello');
    const serverHello = new _util_bytes_js__WEBPACK_IMPORTED_MODULE_7__.Bytes(serverHelloRecord.content);
    const serverPublicKey = (0,_parseServerHello_js__WEBPACK_IMPORTED_MODULE_1__["default"])(serverHello, sessionId);
    chatty && (0,_presentation_log_js__WEBPACK_IMPORTED_MODULE_12__.log)(...(0,_presentation_highlights_js__WEBPACK_IMPORTED_MODULE_11__.highlightBytes)(serverHelloRecord.header.commentedString() + serverHello.commentedString(), _presentation_appearance_js__WEBPACK_IMPORTED_MODULE_10__.LogColours.server));
    // parse dummy cipher change
    const changeCipherRecord = await (0,_tlsRecord_js__WEBPACK_IMPORTED_MODULE_2__.readTlsRecord)(networkRead, _tlsRecord_js__WEBPACK_IMPORTED_MODULE_2__.RecordType.ChangeCipherSpec);
    if (changeCipherRecord === undefined)
        throw new Error('Connection closed awaiting server cipher change');
    const ccipher = new _util_bytes_js__WEBPACK_IMPORTED_MODULE_7__.Bytes(changeCipherRecord.content);
    const [endCipherPayload] = ccipher.expectLength(1);
    ccipher.expectUint8(0x01, chatty && 'dummy ChangeCipherSpec payload (middlebox compatibility)');
    endCipherPayload();
    chatty && (0,_presentation_log_js__WEBPACK_IMPORTED_MODULE_12__.log)('For the benefit of badly-written middleboxes that are following along expecting TLS 1.2, the server sends us a meaningless cipher change record:');
    chatty && (0,_presentation_log_js__WEBPACK_IMPORTED_MODULE_12__.log)(...(0,_presentation_highlights_js__WEBPACK_IMPORTED_MODULE_11__.highlightBytes)(changeCipherRecord.header.commentedString() + ccipher.commentedString(), _presentation_appearance_js__WEBPACK_IMPORTED_MODULE_10__.LogColours.server));
    // handshake keys, encryption/decryption instances
    chatty && (0,_presentation_log_js__WEBPACK_IMPORTED_MODULE_12__.log)('Both sides of the exchange now have everything they need to calculate the keys and IVs that will protect the rest of the handshake:');
    chatty && (0,_presentation_log_js__WEBPACK_IMPORTED_MODULE_12__.log)('%c%s', `color: ${_presentation_appearance_js__WEBPACK_IMPORTED_MODULE_10__.LogColours.header}`, 'handshake key computations ([source](https://github.com/jawj/subtls/blob/main/src/tls/keys.ts))');
    const clientHelloContent = clientHelloData.subarray(5); // cut off the 5-byte record header
    const serverHelloContent = serverHelloRecord.content; // 5-byte record header is already excluded
    const hellos = (0,_util_array_js__WEBPACK_IMPORTED_MODULE_8__.concat)(clientHelloContent, serverHelloContent);
    const handshakeKeys = await (0,_keys_js__WEBPACK_IMPORTED_MODULE_3__.getHandshakeKeys)(serverPublicKey, ecdhKeys.privateKey, hellos, 256, 16); // would be 384, 32 for AES256_SHA384
    const serverHandshakeKey = await _util_cryptoProxy_js__WEBPACK_IMPORTED_MODULE_15__["default"].importKey('raw', handshakeKeys.serverHandshakeKey, { name: 'AES-GCM' }, false, ['decrypt']);
    const handshakeDecrypter = new _aesgcm_js__WEBPACK_IMPORTED_MODULE_5__.Crypter('decrypt', serverHandshakeKey, handshakeKeys.serverHandshakeIV);
    const clientHandshakeKey = await _util_cryptoProxy_js__WEBPACK_IMPORTED_MODULE_15__["default"].importKey('raw', handshakeKeys.clientHandshakeKey, { name: 'AES-GCM' }, false, ['encrypt']);
    const handshakeEncrypter = new _aesgcm_js__WEBPACK_IMPORTED_MODULE_5__.Crypter('encrypt', clientHandshakeKey, handshakeKeys.clientHandshakeIV);
    chatty && (0,_presentation_log_js__WEBPACK_IMPORTED_MODULE_12__.log)('The server continues by sending one or more encrypted records containing the rest of its handshake messages. These include the ‘certificate verify’ message, which we check on the spot, and the full certificate chain, which we verify a bit later on:');
    const readHandshakeRecord = async () => {
        const tlsRecord = await (0,_tlsRecord_js__WEBPACK_IMPORTED_MODULE_2__.readEncryptedTlsRecord)(closed, networkRead, handshakeDecrypter, _tlsRecord_js__WEBPACK_IMPORTED_MODULE_2__.RecordType.Handshake);
        if (tlsRecord === undefined)
            throw new Error('Premature end of encrypted server handshake');
        return tlsRecord;
    };
    const [serverHandshake, clientCertRequested] = await (0,_readEncryptedHandshake_js__WEBPACK_IMPORTED_MODULE_6__.readEncryptedHandshake)(host, readHandshakeRecord, handshakeKeys.serverSecret, hellos, rootCertsDatabase, requireServerTlsExtKeyUsage, requireDigitalSigKeyUsage);
    // dummy cipher change
    chatty && (0,_presentation_log_js__WEBPACK_IMPORTED_MODULE_12__.log)('For the benefit of badly-written middleboxes that are following along expecting TLS 1.2, it’s the client’s turn to send a meaningless cipher change record:');
    const clientCipherChange = new _util_bytes_js__WEBPACK_IMPORTED_MODULE_7__.Bytes(6);
    clientCipherChange.writeUint8(0x14, chatty && 'record type: ChangeCipherSpec');
    clientCipherChange.writeUint16(0x0303, chatty && 'TLS version 1.2 (middlebox compatibility)');
    const endClientCipherChangePayload = clientCipherChange.writeLengthUint16();
    clientCipherChange.writeUint8(0x01, chatty && 'dummy ChangeCipherSpec payload (middlebox compatibility)');
    endClientCipherChangePayload();
    chatty && (0,_presentation_log_js__WEBPACK_IMPORTED_MODULE_12__.log)(...(0,_presentation_highlights_js__WEBPACK_IMPORTED_MODULE_11__.highlightBytes)(clientCipherChange.commentedString(), _presentation_appearance_js__WEBPACK_IMPORTED_MODULE_10__.LogColours.client));
    const clientCipherChangeData = clientCipherChange.array(); // to be sent below
    // empty client certificate, if requested
    let clientCertRecordData = new Uint8Array(0);
    if (clientCertRequested) {
        const clientCertRecord = new _util_bytes_js__WEBPACK_IMPORTED_MODULE_7__.Bytes(8);
        clientCertRecord.writeUint8(0x0b, chatty && 'handshake message type: client certificate');
        const endClientCerts = clientCertRecord.writeLengthUint24('client certificate data');
        clientCertRecord.writeUint8(0x00, chatty && 'certificate context: none');
        clientCertRecord.writeUint24(0x000000, chatty && 'certificate list: empty');
        endClientCerts();
        clientCertRecordData = clientCertRecord.array();
        chatty && (0,_presentation_log_js__WEBPACK_IMPORTED_MODULE_12__.log)('Since a client cert was requested, we’re obliged to send a blank one. Here it is unencrypted:');
        chatty && (0,_presentation_log_js__WEBPACK_IMPORTED_MODULE_12__.log)(...(0,_presentation_highlights_js__WEBPACK_IMPORTED_MODULE_11__.highlightBytes)(clientCertRecord.commentedString(), _presentation_appearance_js__WEBPACK_IMPORTED_MODULE_10__.LogColours.client));
    }
    chatty && (0,_presentation_log_js__WEBPACK_IMPORTED_MODULE_12__.log)('Next, we send a ‘handshake finished’ message, which includes an HMAC of the handshake to date. This is how it looks before encryption:');
    // hash of whole handshake (note: dummy cipher change is excluded)
    const wholeHandshake = (0,_util_array_js__WEBPACK_IMPORTED_MODULE_8__.concat)(hellos, serverHandshake, clientCertRecordData);
    const wholeHandshakeHashBuffer = await _util_cryptoProxy_js__WEBPACK_IMPORTED_MODULE_15__["default"].digest('SHA-256', wholeHandshake);
    const wholeHandshakeHash = new Uint8Array(wholeHandshakeHashBuffer);
    // client handshake finished
    const finishedKey = await (0,_hkdf_js__WEBPACK_IMPORTED_MODULE_4__.hkdfExpandLabel)(handshakeKeys.clientSecret, 'finished', new Uint8Array(0), 32 /* = hashBytes */, 256);
    const verifyHmacKey = await _util_cryptoProxy_js__WEBPACK_IMPORTED_MODULE_15__["default"].importKey('raw', finishedKey, { name: 'HMAC', hash: { name: 'SHA-256' } }, false, ['sign']);
    const verifyDataBuffer = await _util_cryptoProxy_js__WEBPACK_IMPORTED_MODULE_15__["default"].sign('HMAC', verifyHmacKey, wholeHandshakeHash);
    const verifyData = new Uint8Array(verifyDataBuffer);
    const clientFinishedRecord = new _util_bytes_js__WEBPACK_IMPORTED_MODULE_7__.Bytes(36);
    clientFinishedRecord.writeUint8(0x14, chatty && 'handshake message type: finished');
    const clientFinishedRecordEnd = clientFinishedRecord.writeLengthUint24(chatty && 'handshake finished data');
    clientFinishedRecord.writeBytes(verifyData);
    chatty && clientFinishedRecord.comment('verify data');
    clientFinishedRecordEnd();
    const clientFinishedRecordData = clientFinishedRecord.array();
    chatty && (0,_presentation_log_js__WEBPACK_IMPORTED_MODULE_12__.log)(...(0,_presentation_highlights_js__WEBPACK_IMPORTED_MODULE_11__.highlightBytes)(clientFinishedRecord.commentedString(), _presentation_appearance_js__WEBPACK_IMPORTED_MODULE_10__.LogColours.client));
    chatty && (0,_presentation_log_js__WEBPACK_IMPORTED_MODULE_12__.log)('And here’s the client certificate (if requested) and handshake finished messages encrypted with the client’s handshake key and ready to go:');
    const encryptedClientFinished = await (0,_tlsRecord_js__WEBPACK_IMPORTED_MODULE_2__.makeEncryptedTlsRecords)((0,_util_array_js__WEBPACK_IMPORTED_MODULE_8__.concat)(clientCertRecordData, clientFinishedRecordData), handshakeEncrypter, _tlsRecord_js__WEBPACK_IMPORTED_MODULE_2__.RecordType.Handshake); // to be sent below
    // note: if a client cert was requested, the application keys are calculated using a different (smaller) set of messages
    // than the handshake finished message; namely, the (empty) client cert record is omitted
    let partialHandshakeHash = wholeHandshakeHash;
    if (clientCertRecordData.length > 0) {
        const partialHandshake = wholeHandshake.subarray(0, wholeHandshake.length - clientCertRecordData.length);
        const partialHandshakeHashBuffer = await _util_cryptoProxy_js__WEBPACK_IMPORTED_MODULE_15__["default"].digest('SHA-256', partialHandshake);
        partialHandshakeHash = new Uint8Array(partialHandshakeHashBuffer);
    }
    // application keys, encryption/decryption instances
    chatty && (0,_presentation_log_js__WEBPACK_IMPORTED_MODULE_12__.log)('Both parties now have what they need to calculate the keys and IVs that will protect the application data:');
    chatty && (0,_presentation_log_js__WEBPACK_IMPORTED_MODULE_12__.log)('%c%s', `color: ${_presentation_appearance_js__WEBPACK_IMPORTED_MODULE_10__.LogColours.header}`, 'application key computations ([source](https://github.com/jawj/subtls/blob/main/src/tls/keys.ts))');
    const applicationKeys = await (0,_keys_js__WEBPACK_IMPORTED_MODULE_3__.getApplicationKeys)(handshakeKeys.handshakeSecret, partialHandshakeHash, 256, 16);
    const clientApplicationKey = await _util_cryptoProxy_js__WEBPACK_IMPORTED_MODULE_15__["default"].importKey('raw', applicationKeys.clientApplicationKey, { name: 'AES-GCM' }, true /* TODO make false */, ['encrypt']);
    const applicationEncrypter = new _aesgcm_js__WEBPACK_IMPORTED_MODULE_5__.Crypter('encrypt', clientApplicationKey, applicationKeys.clientApplicationIV);
    const serverApplicationKey = await _util_cryptoProxy_js__WEBPACK_IMPORTED_MODULE_15__["default"].importKey('raw', applicationKeys.serverApplicationKey, { name: 'AES-GCM' }, true /* TODO make false */, ['decrypt']);
    const applicationDecrypter = new _aesgcm_js__WEBPACK_IMPORTED_MODULE_5__.Crypter('decrypt', serverApplicationKey, applicationKeys.serverApplicationIV);
    let wroteFinishedRecords = false;
    chatty && (0,_presentation_log_js__WEBPACK_IMPORTED_MODULE_12__.log)('The TLS connection is established, and server and client can start exchanging encrypted application data.');
    const read = () => {
        if (!wroteFinishedRecords) {
            const finishedRecords = (0,_util_array_js__WEBPACK_IMPORTED_MODULE_8__.concat)(clientCipherChangeData, ...encryptedClientFinished);
            networkWrite(finishedRecords);
            wroteFinishedRecords = true;
        }
        return (0,_tlsRecord_js__WEBPACK_IMPORTED_MODULE_2__.readEncryptedTlsRecord)(closed, networkRead, applicationDecrypter);
    };
    const write = async (data) => {
        const localWroteFinishedRecords = wroteFinishedRecords;
        wroteFinishedRecords = true;
        const encryptedRecords = await (0,_tlsRecord_js__WEBPACK_IMPORTED_MODULE_2__.makeEncryptedTlsRecords)(data, applicationEncrypter, _tlsRecord_js__WEBPACK_IMPORTED_MODULE_2__.RecordType.Application);
        const allRecords = localWroteFinishedRecords ?
            (0,_util_array_js__WEBPACK_IMPORTED_MODULE_8__.concat)(...encryptedRecords) :
            (0,_util_array_js__WEBPACK_IMPORTED_MODULE_8__.concat)(clientCipherChangeData, ...encryptedClientFinished, ...encryptedRecords);
        networkWrite(allRecords);
    };
    return [read, write];
}


/***/ }),

/***/ "./subtls/dist/tls/tlsRecord.js":
/*!**************************************!*\
  !*** ./subtls/dist/tls/tlsRecord.js ***!
  \**************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RecordType: () => (/* binding */ RecordType),
/* harmony export */   RecordTypeName: () => (/* binding */ RecordTypeName),
/* harmony export */   makeEncryptedTlsRecords: () => (/* binding */ makeEncryptedTlsRecords),
/* harmony export */   readEncryptedTlsRecord: () => (/* binding */ readEncryptedTlsRecord),
/* harmony export */   readTlsRecord: () => (/* binding */ readTlsRecord)
/* harmony export */ });
/* harmony import */ var _util_bytes_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/bytes.js */ "./subtls/dist/util/bytes.js");
/* harmony import */ var _util_array_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/array.js */ "./subtls/dist/util/array.js");
/* harmony import */ var _sessionTicket_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./sessionTicket.js */ "./subtls/dist/tls/sessionTicket.js");
/* harmony import */ var _presentation_appearance_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../presentation/appearance.js */ "./subtls/dist/presentation/appearance.js");
/* harmony import */ var _presentation_highlights_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../presentation/highlights.js */ "./subtls/dist/presentation/highlights.js");
/* harmony import */ var _presentation_log_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../presentation/log.js */ "./subtls/dist/presentation/log.js");
/* harmony import */ var _util_hex_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../util/hex.js */ "./subtls/dist/util/hex.js");







var RecordType;
(function (RecordType) {
    RecordType[RecordType["ChangeCipherSpec"] = 20] = "ChangeCipherSpec";
    RecordType[RecordType["Alert"] = 21] = "Alert";
    RecordType[RecordType["Handshake"] = 22] = "Handshake";
    RecordType[RecordType["Application"] = 23] = "Application";
    RecordType[RecordType["Heartbeat"] = 24] = "Heartbeat";
})(RecordType || (RecordType = {}));
const RecordTypeName = {
    [RecordType.ChangeCipherSpec]: 'ChangeCipherSpec',
    [RecordType.Alert]: 'Alert',
    [RecordType.Handshake]: 'Handshake',
    [RecordType.Application]: 'Application',
    [RecordType.Heartbeat]: 'Heartbeat',
};
const maxPlaintextRecordLength = 1 << 14;
const maxCiphertextRecordLength = maxPlaintextRecordLength + 1 /* record type */ + 255 /* max aead */;
async function readTlsRecord(read, expectedType, maxLength = maxPlaintextRecordLength) {
    const headerLength = 5;
    const headerData = await read(headerLength);
    if (headerData === undefined)
        return;
    if (headerData.length < headerLength)
        throw new Error('TLS record header truncated');
    const header = new _util_bytes_js__WEBPACK_IMPORTED_MODULE_0__.Bytes(headerData);
    const type = header.readUint8();
    if (type < 0x14 || type > 0x18)
        throw new Error(`Illegal TLS record type 0x${type.toString(16)}`);
    if (expectedType !== undefined && type !== expectedType)
        throw new Error(`Unexpected TLS record type 0x${type.toString(16).padStart(2, '0')} (expected 0x${expectedType.toString(16).padStart(2, '0')})`);
    chatty && header.comment(`record type: ${RecordTypeName[type]}`);
    header.expectUint16(0x0303, 'TLS record version 1.2 (middlebox compatibility)');
    const length = header.readUint16();
    chatty && header.comment(`${length === 0 ? 'no' : length} byte${length === 1 ? '' : 's'} of TLS record follow${length === 1 ? 's' : ''}`);
    if (length > maxLength)
        throw new Error(`Record too long: ${length} bytes`);
    const content = await read(length);
    if (content === undefined || content.length < length) {
        // throw new Error('TLS record content truncated');
        console.log(Error('TLS record content truncated'));
        return undefined;
    }
    return { headerData, header, type, length, content };
}
async function readEncryptedTlsRecord(closed, read, decrypter, expectedType) {
    const encryptedRecord = await readTlsRecord(read, RecordType.Application, maxCiphertextRecordLength);
    if (encryptedRecord === undefined)
        return;
    const encryptedBytes = new _util_bytes_js__WEBPACK_IMPORTED_MODULE_0__.Bytes(encryptedRecord.content);
    const [endEncrypted] = encryptedBytes.expectLength(encryptedBytes.remaining());
    encryptedBytes.skip(encryptedRecord.length - 16, chatty && 'encrypted payload');
    encryptedBytes.skip(16, chatty && 'auth tag');
    endEncrypted();
    chatty && (0,_presentation_log_js__WEBPACK_IMPORTED_MODULE_5__.log)(...(0,_presentation_highlights_js__WEBPACK_IMPORTED_MODULE_4__.highlightBytes)(encryptedRecord.header.commentedString() + encryptedBytes.commentedString(), _presentation_appearance_js__WEBPACK_IMPORTED_MODULE_3__.LogColours.server));
    const decryptedRecord = await decrypter.process(encryptedRecord.content, 16, encryptedRecord.headerData);
    // strip zero-padding at end
    let recordTypeIndex = decryptedRecord.length - 1;
    while (decryptedRecord[recordTypeIndex] === 0)
        recordTypeIndex -= 1;
    if (recordTypeIndex < 0)
        throw new Error('Decrypted message has no record type indicator (all zeroes)');
    const type = decryptedRecord[recordTypeIndex];
    const record = decryptedRecord.subarray(0, recordTypeIndex /* exclusive */);
    if (type === RecordType.Alert) {
        const closeNotify = record.length === 2 && record[0] === 0x01 && record[1] === 0x00;
        chatty && (0,_presentation_log_js__WEBPACK_IMPORTED_MODULE_5__.log)(`%cTLS 0x15 alert record: ${(0,_util_hex_js__WEBPACK_IMPORTED_MODULE_6__.hexFromU8)(record, ' ')}` + (closeNotify ? ' (close notify)' : ''), `color: ${_presentation_appearance_js__WEBPACK_IMPORTED_MODULE_3__.LogColours.header}`);
        if (closeNotify) {
            closed.c = true;
        }
        if (closeNotify)
            return undefined; // 0x00 is close_notify
    }
    chatty && (0,_presentation_log_js__WEBPACK_IMPORTED_MODULE_5__.log)(`... decrypted payload (see below) ... %s%c  %s`, type.toString(16).padStart(2, '0'), `color: ${_presentation_appearance_js__WEBPACK_IMPORTED_MODULE_3__.LogColours.server}`, `actual decrypted record type: ${RecordTypeName[type]}`);
    if (type === RecordType.Handshake && record[0] === 0x04) { // new session ticket message: always ignore these
        (0,_sessionTicket_js__WEBPACK_IMPORTED_MODULE_2__.parseSessionTicket)(record);
        return readEncryptedTlsRecord(closed, read, decrypter, expectedType);
    }
    if (expectedType !== undefined && type !== expectedType)
        throw new Error(`Unexpected TLS record type 0x${type.toString(16).padStart(2, '0')} (expected 0x${expectedType.toString(16).padStart(2, '0')})`);
    return record;
}
async function makeEncryptedTlsRecord(plaintext, encrypter, type) {
    const data = (0,_util_array_js__WEBPACK_IMPORTED_MODULE_1__.concat)(plaintext, [type]);
    const headerLength = 5;
    const dataLength = data.length;
    const authTagLength = 16;
    const payloadLength = dataLength + authTagLength;
    const encryptedRecord = new _util_bytes_js__WEBPACK_IMPORTED_MODULE_0__.Bytes(headerLength + payloadLength);
    encryptedRecord.writeUint8(0x17, chatty && 'record type: Application (middlebox compatibility)');
    encryptedRecord.writeUint16(0x0303, chatty && 'TLS version 1.2 (middlebox compatibility)');
    encryptedRecord.writeUint16(payloadLength, `${payloadLength} bytes follow`);
    const [endEncryptedRecord] = encryptedRecord.expectLength(payloadLength); // unusual (but still useful) when writing
    const header = encryptedRecord.array();
    const encryptedData = await encrypter.process(data, 16, header);
    encryptedRecord.writeBytes(encryptedData.subarray(0, encryptedData.length - 16));
    chatty && encryptedRecord.comment('encrypted data');
    encryptedRecord.writeBytes(encryptedData.subarray(encryptedData.length - 16));
    chatty && encryptedRecord.comment('auth tag');
    endEncryptedRecord();
    chatty && (0,_presentation_log_js__WEBPACK_IMPORTED_MODULE_5__.log)(...(0,_presentation_highlights_js__WEBPACK_IMPORTED_MODULE_4__.highlightBytes)(encryptedRecord.commentedString(), _presentation_appearance_js__WEBPACK_IMPORTED_MODULE_3__.LogColours.client));
    return encryptedRecord.array();
}
async function makeEncryptedTlsRecords(plaintext, encrypter, type) {
    const recordCount = Math.ceil(plaintext.length / maxPlaintextRecordLength);
    const encryptedRecords = [];
    for (let i = 0; i < recordCount; i++) {
        const data = plaintext.subarray(i * maxPlaintextRecordLength, (i + 1) * maxPlaintextRecordLength);
        const encryptedRecord = await makeEncryptedTlsRecord(data, encrypter, type);
        encryptedRecords.push(encryptedRecord);
    }
    return encryptedRecords;
}


/***/ }),

/***/ "./subtls/dist/tls/verifyCerts.js":
/*!****************************************!*\
  !*** ./subtls/dist/tls/verifyCerts.js ***!
  \****************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   verifyCerts: () => (/* binding */ verifyCerts)
/* harmony export */ });
/* harmony import */ var _cert_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cert.js */ "./subtls/dist/tls/cert.js");
/* harmony import */ var _util_hex_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/hex.js */ "./subtls/dist/util/hex.js");
/* harmony import */ var _presentation_appearance_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../presentation/appearance.js */ "./subtls/dist/presentation/appearance.js");
/* harmony import */ var _presentation_highlights_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../presentation/highlights.js */ "./subtls/dist/presentation/highlights.js");
/* harmony import */ var _presentation_log_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../presentation/log.js */ "./subtls/dist/presentation/log.js");
/* harmony import */ var _util_asn1bytes_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../util/asn1bytes.js */ "./subtls/dist/util/asn1bytes.js");
/* harmony import */ var _ecdsa_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ecdsa.js */ "./subtls/dist/tls/ecdsa.js");
/* harmony import */ var _util_cryptoProxy_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../util/cryptoProxy.js */ "./subtls/dist/util/cryptoProxy.js");








async function verifyCerts(host, certs, rootCertsDatabase, requireServerTlsExtKeyUsage = true, requireDigitalSigKeyUsage = true) {
    // end-user certificate checks
    chatty && (0,_presentation_log_js__WEBPACK_IMPORTED_MODULE_4__.log)('%c%s', `color: ${_presentation_appearance_js__WEBPACK_IMPORTED_MODULE_2__.LogColours.header}`, 'certificates received from host');
    for (const cert of certs)
        chatty && (0,_presentation_log_js__WEBPACK_IMPORTED_MODULE_4__.log)(...(0,_presentation_highlights_js__WEBPACK_IMPORTED_MODULE_3__.highlightColonList)(cert.description()));
    chatty && (0,_presentation_log_js__WEBPACK_IMPORTED_MODULE_4__.log)('Now we have all the certificates, which are summarised above. First, we do some basic checks on the end-user certificate — i.e. the one this server is presenting as its own ([source](https://github.com/jawj/subtls/blob/main/src/tls/verifyCerts.ts)):');
    const userCert = certs[0];
    const matchingSubjectAltName = userCert.subjectAltNameMatchingHost(host);
    if (matchingSubjectAltName === undefined)
        throw new Error(`No matching subjectAltName for ${host}`);
    chatty && (0,_presentation_log_js__WEBPACK_IMPORTED_MODULE_4__.log)(`%c✓ matched host to subjectAltName "${matchingSubjectAltName}"`, 'color: #8c8;');
    const validNow = userCert.isValidAtMoment();
    if (!validNow)
        throw new Error('End-user certificate is not valid now');
    chatty && (0,_presentation_log_js__WEBPACK_IMPORTED_MODULE_4__.log)(`%c✓ end-user certificate is valid now`, 'color: #8c8;');
    if (requireServerTlsExtKeyUsage) {
        if (!userCert.extKeyUsage?.serverTls)
            throw new Error('End-user certificate has no TLS server extKeyUsage');
        chatty && (0,_presentation_log_js__WEBPACK_IMPORTED_MODULE_4__.log)(`%c✓ end-user certificate has TLS server extKeyUsage`, 'color: #8c8;');
    }
    // certificate chain checks
    chatty && (0,_presentation_log_js__WEBPACK_IMPORTED_MODULE_4__.log)('Next, we verify the signature of each certificate using the public key of the next certificate in the chain. This carries on until we find a certificate we can verify using one of our own trusted root certificates (or until we reach the end of the chain and therefore fail):');
    let verifiedToTrustedRoot = false;
    chatty && (0,_presentation_log_js__WEBPACK_IMPORTED_MODULE_4__.log)('%c%s', `color: ${_presentation_appearance_js__WEBPACK_IMPORTED_MODULE_2__.LogColours.header}`, `trusted root certificates in store: ${rootCertsDatabase.index.offsets.length - 1}`);
    for (let i = 0, len = certs.length; i < len; i++) {
        const subjectCert = certs[i];
        const subjectAuthKeyId = subjectCert.authorityKeyIdentifier;
        // if (subjectAuthKeyId === undefined) throw new Error('Certificates without an authorityKeyIdentifier are not supported');
        let signingCert;
        // first, see if any trusted root cert has a subjKeyId matching the authKeyId, or if there's no subjKeyId, an issuer matching the subject
        if (subjectAuthKeyId === undefined) {
            signingCert = _cert_js__WEBPACK_IMPORTED_MODULE_0__.TrustedCert.findInDatabase(subjectCert.issuer, rootCertsDatabase);
            chatty && signingCert && (0,_presentation_log_js__WEBPACK_IMPORTED_MODULE_4__.log)('matched a trusted root cert on subject/issuer distinguished name: %s', _cert_js__WEBPACK_IMPORTED_MODULE_0__.Cert.stringFromDistinguishedName(signingCert.subject));
        }
        else {
            signingCert = _cert_js__WEBPACK_IMPORTED_MODULE_0__.TrustedCert.findInDatabase((0,_util_hex_js__WEBPACK_IMPORTED_MODULE_1__.hexFromU8)(subjectAuthKeyId), rootCertsDatabase);
            chatty && signingCert && (0,_presentation_log_js__WEBPACK_IMPORTED_MODULE_4__.log)('matched a trusted root cert on key id: %s', (0,_util_hex_js__WEBPACK_IMPORTED_MODULE_1__.hexFromU8)(subjectAuthKeyId, ' '));
        }
        if (signingCert !== undefined) {
            chatty && (0,_presentation_log_js__WEBPACK_IMPORTED_MODULE_4__.log)('%c%s', `color: ${_presentation_appearance_js__WEBPACK_IMPORTED_MODULE_2__.LogColours.header}`, `trusted root certificate`);
            chatty && signingCert && (0,_presentation_log_js__WEBPACK_IMPORTED_MODULE_4__.log)(...(0,_presentation_highlights_js__WEBPACK_IMPORTED_MODULE_3__.highlightColonList)(signingCert.description()));
        }
        // if not, try the next supplied certificate
        if (signingCert === undefined)
            signingCert = certs[i + 1];
        // if we still didn't find a signing certificate, give up
        if (signingCert === undefined)
            throw new Error('Ran out of certificates before reaching trusted root');
        const signingCertIsTrustedRoot = signingCert instanceof _cert_js__WEBPACK_IMPORTED_MODULE_0__.TrustedCert;
        chatty && (0,_presentation_log_js__WEBPACK_IMPORTED_MODULE_4__.log)(`checking ${signingCertIsTrustedRoot ? 'trusted root' : 'intermediate'} signing certificate CN "${signingCert.subject.CN}" ...`);
        if (signingCert.isValidAtMoment() !== true)
            throw new Error('Signing certificate is not valid now');
        chatty && (0,_presentation_log_js__WEBPACK_IMPORTED_MODULE_4__.log)(`%c✓ certificate is valid now`, 'color: #8c8;');
        if (requireDigitalSigKeyUsage) {
            if (signingCert.keyUsage?.usages.has('digitalSignature') !== true)
                throw new Error('Signing certificate keyUsage does not include digital signatures');
            chatty && (0,_presentation_log_js__WEBPACK_IMPORTED_MODULE_4__.log)(`%c✓ certificate keyUsage includes digital signatures`, 'color: #8c8;');
        }
        if (signingCert.basicConstraints?.ca !== true)
            throw new Error('Signing certificate basicConstraints do not indicate a CA certificate');
        chatty && (0,_presentation_log_js__WEBPACK_IMPORTED_MODULE_4__.log)(`%c✓ certificate basicConstraints indicate a CA certificate`, 'color: #8c8;');
        const { pathLength } = signingCert.basicConstraints;
        if (pathLength === undefined) {
            chatty && (0,_presentation_log_js__WEBPACK_IMPORTED_MODULE_4__.log)(`%c✓ certificate pathLength is not constrained`, 'color: #8c8;');
        }
        else {
            if (pathLength < i)
                throw new Error('Exceeded certificate pathLength');
            chatty && (0,_presentation_log_js__WEBPACK_IMPORTED_MODULE_4__.log)(`%c✓ certificate pathLength is not exceeded`, 'color: #8c8;');
        }
        // verify cert chain signature
        chatty && (0,_presentation_log_js__WEBPACK_IMPORTED_MODULE_4__.log)(`verifying certificate CN "${subjectCert.subject.CN}" is signed by %c${signingCertIsTrustedRoot ? 'trusted root' : 'intermediate'}%c certificate CN "${signingCert.subject.CN}" ...`, `background: ${signingCertIsTrustedRoot ? '#ffc' : '#eee'}`, 'background: inherit');
        if (subjectCert.algorithm === '1.2.840.10045.4.3.2' || subjectCert.algorithm === '1.2.840.10045.4.3.3') { // ECDSA + SHA256/384
            const hash = subjectCert.algorithm === '1.2.840.10045.4.3.2' ? 'SHA-256' : 'SHA-384';
            const signingKeyOIDs = signingCert.publicKey.identifiers;
            const namedCurve = signingKeyOIDs.includes('1.2.840.10045.3.1.7') ? 'P-256' : signingKeyOIDs.includes('1.3.132.0.34') ? 'P-384' : undefined;
            if (namedCurve === undefined)
                throw new Error('Unsupported signing key curve');
            const sb = new _util_asn1bytes_js__WEBPACK_IMPORTED_MODULE_5__.ASN1Bytes(subjectCert.signature);
            await (0,_ecdsa_js__WEBPACK_IMPORTED_MODULE_6__.ecdsaVerify)(sb, signingCert.publicKey.all, subjectCert.signedData, namedCurve, hash);
        }
        else if (subjectCert.algorithm === '1.2.840.113549.1.1.11' || subjectCert.algorithm === '1.2.840.113549.1.1.12') { // RSASSA_PKCS1-v1_5 + SHA-256/384
            const hash = subjectCert.algorithm === '1.2.840.113549.1.1.11' ? 'SHA-256' : 'SHA-384';
            const signatureKey = await _util_cryptoProxy_js__WEBPACK_IMPORTED_MODULE_7__["default"].importKey('spki', signingCert.publicKey.all, { name: 'RSASSA-PKCS1-v1_5', hash }, false, ['verify']);
            const certVerifyResult = await _util_cryptoProxy_js__WEBPACK_IMPORTED_MODULE_7__["default"].verify({ name: 'RSASSA-PKCS1-v1_5' }, signatureKey, subjectCert.signature, subjectCert.signedData);
            if (certVerifyResult !== true)
                throw new Error('RSASSA_PKCS1-v1_5-SHA256 certificate verify failed');
            chatty && (0,_presentation_log_js__WEBPACK_IMPORTED_MODULE_4__.log)(`%c✓ RSASAA-PKCS1-v1_5 signature verified`, 'color: #8c8;');
        }
        else {
            throw new Error('Unsupported signing algorithm');
        }
        if (signingCertIsTrustedRoot) {
            chatty && (0,_presentation_log_js__WEBPACK_IMPORTED_MODULE_4__.log)(`%c✓ chain of trust validated back to a trusted root`, 'color: #8c8;');
            verifiedToTrustedRoot = true;
            break;
        }
    }
    return verifiedToTrustedRoot;
}


/***/ }),

/***/ "./subtls/dist/util/array.js":
/*!***********************************!*\
  !*** ./subtls/dist/util/array.js ***!
  \***********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GrowableData: () => (/* binding */ GrowableData),
/* harmony export */   concat: () => (/* binding */ concat),
/* harmony export */   equal: () => (/* binding */ equal),
/* harmony export */   range: () => (/* binding */ range)
/* harmony export */ });
function concat(...arrs) {
    if (arrs.length === 1 && arrs[0] instanceof Uint8Array)
        return arrs[0];
    const length = arrs.reduce((memo, arr) => memo + arr.length, 0);
    const result = new Uint8Array(length);
    let offset = 0;
    for (const arr of arrs) {
        result.set(arr, offset);
        offset += arr.length;
    }
    return result;
}
function equal(a, b) {
    const aLength = a.length;
    if (aLength !== b.length)
        return false;
    for (let i = 0; i < aLength; i++)
        if (a[i] !== b[i])
            return false;
    return true;
}
function range(start, stop, step) {
    if (stop === undefined) {
        stop = start;
        start = 0;
    }
    if (step === undefined)
        step = 1;
    const result = [];
    for (let i = start; i < stop; i += step)
        result.push(i);
    return result;
}
class GrowableData {
    length;
    data;
    constructor() {
        this.length = 0;
        this.data = new Uint8Array();
    }
    append(newData) {
        const newDataLength = newData.length;
        if (this.length + newDataLength > this.data.length) {
            const prevData = this.data;
            this.data = new Uint8Array(this.length * 2 + newDataLength);
            this.data.set(prevData);
        }
        this.data.set(newData, this.length);
        this.length += newData.length;
    }
    getData() {
        return this.data.subarray(0, this.length);
    }
}


/***/ }),

/***/ "./subtls/dist/util/asn1bytes.js":
/*!***************************************!*\
  !*** ./subtls/dist/util/asn1bytes.js ***!
  \***************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ASN1Bytes: () => (/* binding */ ASN1Bytes)
/* harmony export */ });
/* harmony import */ var _bytes_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bytes.js */ "./subtls/dist/util/bytes.js");
/* harmony import */ var _hex_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./hex.js */ "./subtls/dist/util/hex.js");


class ASN1Bytes extends _bytes_js__WEBPACK_IMPORTED_MODULE_0__.Bytes {
    readASN1Length(comment) {
        const byte1 = this.readUint8();
        if (byte1 < 0x80) {
            chatty && this.comment(`${byte1} bytes${comment ? ` of ${comment}` : ''} follow (ASN.1)`);
            return byte1; // highest bit unset: simple one-byte value
        }
        const lengthBytes = byte1 & 0x7f;
        const fullComment = chatty && `% bytes${comment ? ` of ${comment}` : ''} follow (ASN.1)`;
        if (lengthBytes === 1)
            return this.readUint8(fullComment);
        if (lengthBytes === 2)
            return this.readUint16(fullComment);
        if (lengthBytes === 3)
            return this.readUint24(fullComment);
        if (lengthBytes === 4)
            return this.readUint32(fullComment);
        throw new Error(`ASN.1 length fields are only supported up to 4 bytes (this one is ${lengthBytes} bytes)`);
    }
    expectASN1Length(comment) {
        const length = this.readASN1Length(comment);
        return this.expectLength(length);
    }
    readASN1OID(comment) {
        const [endOID, OIDRemaining] = this.expectASN1Length(chatty && 'OID');
        const byte1 = this.readUint8();
        let oid = `${Math.floor(byte1 / 40)}.${byte1 % 40}`;
        while (OIDRemaining() > 0) { // loop over numbers in OID
            let value = 0;
            while (true) { // loop over bytes in number
                const nextByte = this.readUint8();
                value <<= 7;
                value += nextByte & 0x7f;
                if (nextByte < 0x80)
                    break;
            }
            oid += `.${value}`;
        }
        if (chatty && comment)
            this.comment(comment.replace(/%/g, oid));
        endOID();
        return oid;
    }
    readASN1Boolean(comment) {
        const [endBoolean, booleanRemaining] = this.expectASN1Length(chatty && 'boolean');
        const length = booleanRemaining();
        if (length !== 1)
            throw new Error(`Boolean has weird length: ${length}`);
        const byte = this.readUint8();
        let result;
        if (byte === 0xff)
            result = true;
        else if (byte === 0x00)
            result = false;
        else
            throw new Error(`Boolean has weird value: 0x${(0,_hex_js__WEBPACK_IMPORTED_MODULE_1__.hexFromU8)([byte])}`);
        if (chatty && comment)
            this.comment(comment.replace(/%/g, String(result)));
        endBoolean();
        return result;
    }
    readASN1UTCTime() {
        const [endTime, timeRemaining] = this.expectASN1Length(chatty && 'UTC time');
        const timeStr = this.readUTF8String(timeRemaining());
        const parts = timeStr.match(/^(\d\d)(\d\d)(\d\d)(\d\d)(\d\d)(\d\d)Z$/);
        if (!parts)
            throw new Error('Unrecognised ASN.1 UTC time format');
        const [, yr2dstr, mth, dy, hr, min, sec] = parts;
        const yr2d = parseInt(yr2dstr, 10);
        const yr = yr2d + (yr2d >= 50 ? 1900 : 2000); // range is 1950 – 2049
        const time = new Date(`${yr}-${mth}-${dy}T${hr}:${min}:${sec}Z`); // ISO8601 should be safe to parse
        chatty && this.comment('= ' + time.toISOString());
        endTime();
        return time;
    }
    readASN1GeneralizedTime() {
        const [endTime, timeRemaining] = this.expectASN1Length(chatty && 'generalized time');
        const timeStr = this.readUTF8String(timeRemaining());
        const parts = timeStr.match(/^([0-9]{4})([0-9]{2})([0-9]{2})([0-9]{2})([0-9]{2})?([0-9]{2})?([.][0-9]+)?(Z)?([-+][0-9]+)?$/);
        if (!parts)
            throw new Error('Unrecognised ASN.1 generalized time format');
        const [, yr, mth, dy, hr, min, sec, fracsec, z, tz] = parts;
        if (sec === undefined && fracsec !== undefined)
            throw new Error('Invalid ASN.1 generalized time format (fraction without seconds)');
        if (z !== undefined && tz !== undefined)
            throw new Error('Invalid ASN.1 generalized time format (Z and timezone)');
        const time = new Date(`${yr}-${mth}-${dy}T${hr}:${min ?? '00'}:${sec ?? '00'}${fracsec ?? ''}${tz ?? 'Z'}`); // ISO8601 should be safe to parse
        chatty && this.comment('= ' + time.toISOString());
        endTime();
        return time;
    }
    readASN1BitString() {
        const [endBitString, bitStringRemaining] = this.expectASN1Length(chatty && 'bit string');
        const rightPadBits = this.readUint8(chatty && 'right-padding bits');
        const bytesLength = bitStringRemaining();
        const bitString = this.readBytes(bytesLength);
        if (rightPadBits > 7)
            throw new Error(`Invalid right pad value: ${rightPadBits}`);
        if (rightPadBits > 0) { // (this was surprisingly hard to get right)
            const leftPadNext = 8 - rightPadBits;
            for (let i = bytesLength - 1; i > 0; i--) {
                bitString[i] = (0xff & (bitString[i - 1] << leftPadNext)) | (bitString[i] >>> rightPadBits);
            }
            bitString[0] = bitString[0] >>> rightPadBits;
        }
        endBitString();
        return bitString;
    }
}


/***/ }),

/***/ "./subtls/dist/util/base64.js":
/*!************************************!*\
  !*** ./subtls/dist/util/base64.js ***!
  \************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   base64Decode: () => (/* binding */ base64Decode),
/* harmony export */   stdCharCodes: () => (/* binding */ stdCharCodes),
/* harmony export */   urlCharCodes: () => (/* binding */ urlCharCodes)
/* harmony export */ });
function base64Error(charCode) {
    throw new Error(`Invalid base 64 character: ${String.fromCharCode(charCode)}`);
}
function stdCharCodes(charCode) {
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
function urlCharCodes(charCode) {
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
function base64Decode(input, charCodes = stdCharCodes, autoPad = true) {
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


/***/ }),

/***/ "./subtls/dist/util/bytes.js":
/*!***********************************!*\
  !*** ./subtls/dist/util/bytes.js ***!
  \***********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Bytes: () => (/* binding */ Bytes)
/* harmony export */ });
/* harmony import */ var _array_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./array.js */ "./subtls/dist/util/array.js");
/* harmony import */ var _presentation_appearance_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../presentation/appearance.js */ "./subtls/dist/presentation/appearance.js");


const txtEnc = new TextEncoder();
const txtDec = new TextDecoder();
class Bytes {
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
        this.data = (0,_array_js__WEBPACK_IMPORTED_MODULE_0__.concat)(this.data, newData);
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
        if (!(0,_array_js__WEBPACK_IMPORTED_MODULE_0__.equal)(actual, expected))
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
        let s = this.indents[0] !== undefined ? _presentation_appearance_js__WEBPACK_IMPORTED_MODULE_1__.indentChars.repeat(this.indents[0]) : '';
        let indent = this.indents[0] ?? 0;
        const len = all ? this.data.length : this.offset;
        for (let i = 0; i < len; i++) {
            s += this.data[i].toString(16).padStart(2, '0') + ' ';
            const comment = this.comments[i + 1];
            if (this.indents[i + 1] !== undefined)
                indent = this.indents[i + 1];
            if (comment)
                s += ` ${comment}\n${_presentation_appearance_js__WEBPACK_IMPORTED_MODULE_1__.indentChars.repeat(indent)}`;
        }
        return s;
    }
}


/***/ }),

/***/ "./subtls/dist/util/cryptoProxy.js":
/*!*****************************************!*\
  !*** ./subtls/dist/util/cryptoProxy.js ***!
  \*****************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (crypto.subtle);
/*
// this setup allows monitoring/proxying

function cryptoMethod(method: string, args: any[]) {
  return (crypto.subtle as any)[method](...args);
}

export default new Proxy({}, {
  get(target, property: string, receiver) {
    return (...args: any[]) => cryptoMethod(property, args);
  }
}) as SubtleCrypto;
*/


/***/ }),

/***/ "./subtls/dist/util/hex.js":
/*!*********************************!*\
  !*** ./subtls/dist/util/hex.js ***!
  \*********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   hexFromU8: () => (/* binding */ hexFromU8),
/* harmony export */   u8FromHex: () => (/* binding */ u8FromHex)
/* harmony export */ });
function u8FromHex(hex) {
    return new Uint8Array(Array.from(hex.matchAll(/[0-9a-f]/g)).map(hex => parseInt(hex[0], 16)));
}
function hexFromU8(u8, spacer = '') {
    return [...u8].map(n => n.toString(16).padStart(2, '0')).join(spacer);
}


/***/ }),

/***/ "./subtls/dist/util/readqueue.js":
/*!***************************************!*\
  !*** ./subtls/dist/util/readqueue.js ***!
  \***************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SocketReadQueue: () => (/* binding */ SocketReadQueue),
/* harmony export */   WebSocketReadQueue: () => (/* binding */ WebSocketReadQueue)
/* harmony export */ });
var WebSocketReadyState;
(function (WebSocketReadyState) {
    WebSocketReadyState[WebSocketReadyState["CONNECTING"] = 0] = "CONNECTING";
    WebSocketReadyState[WebSocketReadyState["OPEN"] = 1] = "OPEN";
    WebSocketReadyState[WebSocketReadyState["CLOSING"] = 2] = "CLOSING";
    WebSocketReadyState[WebSocketReadyState["CLOSED"] = 3] = "CLOSED";
})(WebSocketReadyState || (WebSocketReadyState = {}));
class ReadQueue {
    queue;
    outstandingRequest;
    constructor() {
        this.queue = [];
    }
    enqueue(data) {
        this.queue.push(data);
        this.dequeue();
    }
    dequeue() {
        if (this.outstandingRequest === undefined)
            return;
        let { resolve, bytes } = this.outstandingRequest;
        const bytesInQueue = this.bytesInQueue();
        if (bytesInQueue < bytes && this.socketIsNotClosed())
            return; // if socket remains open, wait until requested data size is available
        bytes = Math.min(bytes, bytesInQueue);
        if (bytes === 0)
            return resolve(undefined);
        this.outstandingRequest = undefined;
        const firstItem = this.queue[0];
        const firstItemLength = firstItem.length;
        if (firstItemLength === bytes) {
            this.queue.shift();
            return resolve(firstItem);
        }
        else if (firstItemLength > bytes) {
            this.queue[0] = firstItem.subarray(bytes);
            return resolve(firstItem.subarray(0, bytes));
        }
        else { // i.e. firstItem.length < bytes
            const result = new Uint8Array(bytes);
            let outstandingBytes = bytes;
            let offset = 0;
            while (outstandingBytes > 0) {
                const nextItem = this.queue[0];
                const nextItemLength = nextItem.length;
                if (nextItemLength <= outstandingBytes) {
                    this.queue.shift();
                    result.set(nextItem, offset);
                    offset += nextItemLength;
                    outstandingBytes -= nextItemLength;
                }
                else { // nextItemLength > outstandingBytes
                    this.queue[0] = nextItem.subarray(outstandingBytes);
                    result.set(nextItem.subarray(0, outstandingBytes), offset);
                    outstandingBytes -= outstandingBytes; // i.e. zero
                    offset += outstandingBytes; // not technically necessary
                }
            }
            return resolve(result);
        }
    }
    bytesInQueue() {
        return this.queue.reduce((memo, arr) => memo + arr.length, 0);
    }
    async read(bytes) {
        if (this.outstandingRequest !== undefined)
            throw new Error('Can’t read while already awaiting read');
        return new Promise((resolve) => {
            this.outstandingRequest = { resolve, bytes };
            this.dequeue();
        });
    }
}
class WebSocketReadQueue extends ReadQueue {
    socket;
    constructor(socket) {
        super();
        this.socket = socket;
        socket.addEventListener('message', (msg) => this.enqueue(new Uint8Array(msg.data)));
        socket.addEventListener('close', () => this.dequeue());
    }
    socketIsNotClosed() {
        const { socket } = this;
        const { readyState } = socket;
        return readyState <= WebSocketReadyState.OPEN;
    }
}
class SocketReadQueue extends ReadQueue {
    socket;
    constructor(socket) {
        super();
        this.socket = socket;
        socket.on('data', (data) => this.enqueue(new Uint8Array(data)));
        socket.on('close', () => this.dequeue());
    }
    socketIsNotClosed() {
        const { socket } = this;
        const { readyState } = socket;
        return readyState === 'opening' || readyState === 'open';
    }
}


/***/ }),

/***/ "./subtls/dist/util/stableStringify.js":
/*!*********************************************!*\
  !*** ./subtls/dist/util/stableStringify.js ***!
  \*********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ stableStringify)
/* harmony export */ });
function stableStringify(x, replacer = (_, v) => v, indent) {
    const deterministicReplacer = (k, v) => replacer(k, typeof v !== 'object' || v === null || Array.isArray(v) ? v :
        Object.fromEntries(Object.entries(v).sort(([ka], [kb]) => ka < kb ? -1 : ka > kb ? 1 : 0)));
    return JSON.stringify(x, deterministicReplacer, indent);
}


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNBLDZEQUE2RCxJ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TztBQUNQO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLGtEQUFrRDtBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsaUJBQWlCO0FBQy9CO0FBQ0E7QUFDQSxvQkFBb0I7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUI7QUFDdkI7QUFDQTtBQUNBLDBEQUEwRDtBQUMxRCxnREFBZ0Q7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDO0FBQ3hDO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsU0FBUztBQUN6QixnQkFBZ0IsYUFBYTtBQUM3QjtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsU0FBUztBQUN6QixnQkFBZ0IsYUFBYTtBQUM3QjtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ3BHZTtBQUNmO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc2VjdXJlLWNvcnMtY2xpZW50Ly4vc3VidGxzL2Rpc3QvZXhwb3J0LmpzIiwid2VicGFjazovL3NlY3VyZS1jb3JzLWNsaWVudC8uL3N1YnRscy9kaXN0L3ByZXNlbnRhdGlvbi9hcHBlYXJhbmNlLmpzIiwid2VicGFjazovL3NlY3VyZS1jb3JzLWNsaWVudC8uL3N1YnRscy9kaXN0L3ByZXNlbnRhdGlvbi9oaWdobGlnaHRzLmpzIiwid2VicGFjazovL3NlY3VyZS1jb3JzLWNsaWVudC8uL3N1YnRscy9kaXN0L3ByZXNlbnRhdGlvbi9sb2cuanMiLCJ3ZWJwYWNrOi8vc2VjdXJlLWNvcnMtY2xpZW50Ly4vc3VidGxzL2Rpc3QvdGxzL2Flc2djbS5qcyIsIndlYnBhY2s6Ly9zZWN1cmUtY29ycy1jbGllbnQvLi9zdWJ0bHMvZGlzdC90bHMvY2VydC5qcyIsIndlYnBhY2s6Ly9zZWN1cmUtY29ycy1jbGllbnQvLi9zdWJ0bHMvZGlzdC90bHMvY2VydFV0aWxzLmpzIiwid2VicGFjazovL3NlY3VyZS1jb3JzLWNsaWVudC8uL3N1YnRscy9kaXN0L3Rscy9lY2RzYS5qcyIsIndlYnBhY2s6Ly9zZWN1cmUtY29ycy1jbGllbnQvLi9zdWJ0bHMvZGlzdC90bHMvaGtkZi5qcyIsIndlYnBhY2s6Ly9zZWN1cmUtY29ycy1jbGllbnQvLi9zdWJ0bHMvZGlzdC90bHMva2V5cy5qcyIsIndlYnBhY2s6Ly9zZWN1cmUtY29ycy1jbGllbnQvLi9zdWJ0bHMvZGlzdC90bHMvbWFrZUNsaWVudEhlbGxvLmpzIiwid2VicGFjazovL3NlY3VyZS1jb3JzLWNsaWVudC8uL3N1YnRscy9kaXN0L3Rscy9wYXJzZVNlcnZlckhlbGxvLmpzIiwid2VicGFjazovL3NlY3VyZS1jb3JzLWNsaWVudC8uL3N1YnRscy9kaXN0L3Rscy9yZWFkRW5jcnlwdGVkSGFuZHNoYWtlLmpzIiwid2VicGFjazovL3NlY3VyZS1jb3JzLWNsaWVudC8uL3N1YnRscy9kaXN0L3Rscy9zZXNzaW9uVGlja2V0LmpzIiwid2VicGFjazovL3NlY3VyZS1jb3JzLWNsaWVudC8uL3N1YnRscy9kaXN0L3Rscy9zdGFydFRscy5qcyIsIndlYnBhY2s6Ly9zZWN1cmUtY29ycy1jbGllbnQvLi9zdWJ0bHMvZGlzdC90bHMvdGxzUmVjb3JkLmpzIiwid2VicGFjazovL3NlY3VyZS1jb3JzLWNsaWVudC8uL3N1YnRscy9kaXN0L3Rscy92ZXJpZnlDZXJ0cy5qcyIsIndlYnBhY2s6Ly9zZWN1cmUtY29ycy1jbGllbnQvLi9zdWJ0bHMvZGlzdC91dGlsL2FycmF5LmpzIiwid2VicGFjazovL3NlY3VyZS1jb3JzLWNsaWVudC8uL3N1YnRscy9kaXN0L3V0aWwvYXNuMWJ5dGVzLmpzIiwid2VicGFjazovL3NlY3VyZS1jb3JzLWNsaWVudC8uL3N1YnRscy9kaXN0L3V0aWwvYmFzZTY0LmpzIiwid2VicGFjazovL3NlY3VyZS1jb3JzLWNsaWVudC8uL3N1YnRscy9kaXN0L3V0aWwvYnl0ZXMuanMiLCJ3ZWJwYWNrOi8vc2VjdXJlLWNvcnMtY2xpZW50Ly4vc3VidGxzL2Rpc3QvdXRpbC9jcnlwdG9Qcm94eS5qcyIsIndlYnBhY2s6Ly9zZWN1cmUtY29ycy1jbGllbnQvLi9zdWJ0bHMvZGlzdC91dGlsL2hleC5qcyIsIndlYnBhY2s6Ly9zZWN1cmUtY29ycy1jbGllbnQvLi9zdWJ0bHMvZGlzdC91dGlsL3JlYWRxdWV1ZS5qcyIsIndlYnBhY2s6Ly9zZWN1cmUtY29ycy1jbGllbnQvLi9zdWJ0bHMvZGlzdC91dGlsL3N0YWJsZVN0cmluZ2lmeS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgeyBzdGFydFRscyB9IGZyb20gJy4vdGxzL3N0YXJ0VGxzLmpzJztcbmV4cG9ydCB7IFRydXN0ZWRDZXJ0IH0gZnJvbSAnLi90bHMvY2VydC5qcyc7XG5leHBvcnQgeyBXZWJTb2NrZXRSZWFkUXVldWUsIFNvY2tldFJlYWRRdWV1ZSB9IGZyb20gJy4vdXRpbC9yZWFkcXVldWUuanMnO1xuZXhwb3J0IHsgYmFzZTY0RGVjb2RlIH0gZnJvbSAnLi91dGlsL2Jhc2U2NC5qcyc7XG5leHBvcnQgeyBoZXhGcm9tVTgsIHU4RnJvbUhleCB9IGZyb20gJy4vdXRpbC9oZXguanMnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBzdGFibGVTdHJpbmdpZnkgfSBmcm9tICcuL3V0aWwvc3RhYmxlU3RyaW5naWZ5LmpzJztcbiIsImV4cG9ydCB2YXIgTG9nQ29sb3VycztcbihmdW5jdGlvbiAoTG9nQ29sb3Vycykge1xuICAgIExvZ0NvbG91cnNbXCJjbGllbnRcIl0gPSBcIiM4Y2NcIjtcbiAgICBMb2dDb2xvdXJzW1wic2VydmVyXCJdID0gXCIjODhjXCI7XG4gICAgTG9nQ29sb3Vyc1tcImhlYWRlclwiXSA9IFwiI2M4OFwiO1xufSkoTG9nQ29sb3VycyB8fCAoTG9nQ29sb3VycyA9IHt9KSk7XG5leHBvcnQgY29uc3QgaW5kZW50Q2hhcnMgPSAnwrfCtyAnOyAvLyBjYXJlZnVsOiB0aGlzIGhhcyBjb21wbGV4IGludGVyYWN0aW9ucyB3aXRoIGhpZ2hsaWdodEJ5dGVzXG4iLCJpbXBvcnQgeyBpbmRlbnRDaGFycyB9IGZyb20gJy4vYXBwZWFyYW5jZS5qcyc7XG5jb25zdCByZWdleCA9IG5ldyBSZWdFeHAoYCAgLit8Xigke2luZGVudENoYXJzfSkrYCwgJ2dtJyk7XG5jb25zdCBkb3RDb2xvdXIgPSAnY29sb3I6ICNkZGQnO1xuY29uc3QgdGV4dENvbG91ciA9ICdjb2xvcjogIzExMSc7XG5jb25zdCBtdXRlZENvbG91ciA9ICdjb2xvcjogIzc3Nyc7XG5leHBvcnQgZnVuY3Rpb24gaGlnaGxpZ2h0Qnl0ZXMocywgY29sb3VyKSB7XG4gICAgY29uc3QgY3NzID0gW3RleHRDb2xvdXJdO1xuICAgIHMgPSAnJWMnICsgcy5yZXBsYWNlKHJlZ2V4LCBtID0+IHtcbiAgICAgICAgY3NzLnB1c2gobS5zdGFydHNXaXRoKGluZGVudENoYXJzKSA/IGRvdENvbG91ciA6IGBjb2xvcjogJHtjb2xvdXJ9YCwgdGV4dENvbG91cik7XG4gICAgICAgIHJldHVybiBgJWNcXHUyMDBiJHttfVxcdTIwMGIlY2A7IC8vIG5vdGU6IHRoZSB6ZXJvLWxlbmd0aCBzcGFjZXMsIFxcdTIwMGIsIHByZXZlbnQgVVJMcyBnZXR0aW5nIG1hbmdsZWRcbiAgICB9KTtcbiAgICByZXR1cm4gW3MsIC4uLmNzc107XG59XG5leHBvcnQgZnVuY3Rpb24gaGlnaGxpZ2h0Q29sb25MaXN0KHMpIHtcbiAgICBjb25zdCBjc3MgPSBbXTtcbiAgICBzID0gcy5yZXBsYWNlKC9eW146XSs6LiokL2dtLCBtID0+IHtcbiAgICAgICAgY29uc3QgY29sb25JbmRleCA9IG0uaW5kZXhPZignOicpO1xuICAgICAgICBjc3MucHVzaChtdXRlZENvbG91ciwgdGV4dENvbG91cik7XG4gICAgICAgIHJldHVybiBgJWMke20uc2xpY2UoMCwgY29sb25JbmRleCArIDEpfSVjJHttLnNsaWNlKGNvbG9uSW5kZXggKyAxKX1gO1xuICAgIH0pO1xuICAgIHJldHVybiBbcywgLi4uY3NzXTtcbn1cbiIsImZ1bmN0aW9uIGh0bWxFc2NhcGUocywgbGlua1VybHMgPSB0cnVlKSB7XG4gICAgY29uc3QgZXNjYXBlcyA9IHtcbiAgICAgICAgJyYnOiAnJmFtcDsnLFxuICAgICAgICAnPCc6ICcmbHQ7JyxcbiAgICAgICAgJz4nOiAnJmd0OycsXG4gICAgICAgICdcIic6ICcmcXVvdDsnLFxuICAgICAgICBcIidcIjogJyZhcG9zOycsXG4gICAgfTtcbiAgICBjb25zdCB1cmxyZSA9IC9cXGJodHRwcz86Wy9dWy9dW15cXHNcXHUyMDBiXCInPD4pXStbXlxcc1xcdTIwMGJcIic8PikuLDo7PyFdXFxiLztcbiAgICBjb25zdCByZWdleHAgPSBuZXcgUmVnRXhwKChsaW5rVXJscyA/IGBcXFxcW1teXFxcXF1cXFxcbl0rXFxcXF1cXFxcKCR7dXJscmUuc291cmNlfVxcXFwpfCR7dXJscmUuc291cmNlfXxgIDogJycpICtcbiAgICAgICAgJ1snICsgT2JqZWN0LmtleXMoZXNjYXBlcykuam9pbignJykgKyAnXScsICdnaScpO1xuICAgIGNvbnN0IHJlcGxhY2VkID0gcy5yZXBsYWNlKHJlZ2V4cCwgbWF0Y2ggPT4ge1xuICAgICAgICBpZiAobWF0Y2gubGVuZ3RoID09PSAxKVxuICAgICAgICAgICAgcmV0dXJuIGVzY2FwZXNbbWF0Y2hdO1xuICAgICAgICBsZXQgbGlua1RleHQsIHVybDtcbiAgICAgICAgaWYgKG1hdGNoLmNoYXJBdCgwKSA9PT0gJ1snKSB7XG4gICAgICAgICAgICBjb25zdCBjbG9zZUJyYWNrZXRQb3MgPSBtYXRjaC5pbmRleE9mKCddJyk7XG4gICAgICAgICAgICBsaW5rVGV4dCA9IGh0bWxFc2NhcGUobWF0Y2guc3Vic3RyaW5nKDEsIGNsb3NlQnJhY2tldFBvcyksIGZhbHNlKTtcbiAgICAgICAgICAgIHVybCA9IGh0bWxFc2NhcGUobWF0Y2guc3Vic3RyaW5nKGNsb3NlQnJhY2tldFBvcyArIDIsIG1hdGNoLmxlbmd0aCAtIDEpLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB1cmwgPSBsaW5rVGV4dCA9IGh0bWxFc2NhcGUobWF0Y2gsIGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYDxhIGhyZWY9XCIke3VybH1cIiB0YXJnZXQ9XCJfYmxhbmtcIj4ke2xpbmtUZXh0fTwvYT5gO1xuICAgIH0pO1xuICAgIHJldHVybiByZXBsYWNlZDtcbn1cbjtcbmZ1bmN0aW9uIGh0bWxGcm9tTG9nQXJncyguLi5hcmdzKSB7XG4gICAgbGV0IHJlc3VsdCA9ICc8c3Bhbj4nLCBhcmcsIG1hdGNoQXJyLCBzZXBhcmF0b3IgPSAnJztcbiAgICB3aGlsZSAoKGFyZyA9IGFyZ3Muc2hpZnQoKSkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBhcmcgPSBzZXBhcmF0b3IgKyBodG1sRXNjYXBlKFN0cmluZyhhcmcpKTtcbiAgICAgICAgc2VwYXJhdG9yID0gJyAnOyAvLyBvbWl0IHNwYWNlIG9ubHkgZm9yIGZpcnN0IGFyZ1xuICAgICAgICBjb25zdCBmb3JtYXRSZWdFeHAgPSAvKFtcXHNcXFNdKj8pJShbY3NvT2lkZl0pfFtcXHNcXFNdKy9nOyAvLyBkZWZpbmUgaXQgaGVyZSBzbyBsYXN0SW5kZXggPT09IDBcbiAgICAgICAgd2hpbGUgKChtYXRjaEFyciA9IGZvcm1hdFJlZ0V4cC5leGVjKGFyZykpICE9PSBudWxsKSB7XG4gICAgICAgICAgICBjb25zdCBbd2hvbGUsIGxpdGVyYWwsIHN1Yl0gPSBtYXRjaEFycjtcbiAgICAgICAgICAgIGlmIChzdWIgPT09IHVuZGVmaW5lZCkgeyAvLyBsYXN0IHBvcnRpb25cbiAgICAgICAgICAgICAgICByZXN1bHQgKz0gd2hvbGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgKz0gbGl0ZXJhbDtcbiAgICAgICAgICAgICAgICBpZiAoc3ViID09PSAnYycpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ICs9IGA8L3NwYW4+PHNwYW4gc3R5bGU9XCIke2FyZ3Muc2hpZnQoKX1cIj5gO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChzdWIgPT09ICdzJykge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQgKz0gaHRtbEVzY2FwZShhcmdzLnNoaWZ0KCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChzdWIgPT09ICdvJyB8fCBzdWIgPT09ICdPJykge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQgKz0gSlNPTi5zdHJpbmdpZnkoYXJncy5zaGlmdCgpLCB1bmRlZmluZWQsIHN1YiA9PT0gJ08nID8gMiA6IHVuZGVmaW5lZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHN1YiA9PT0gJ2knIHx8IHN1YiA9PT0gJ2QnIHx8IHN1YiA9PT0gJ2YnKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IHN0b3AgaWdub3JpbmcgbnVtYmVyIGZvcm1hdHRpbmcgZm9yIGkvZC9mXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCArPSBTdHJpbmcoYXJncy5zaGlmdCgpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmVzdWx0ICs9ICc8L3NwYW4+JztcbiAgICByZXR1cm4gcmVzdWx0O1xufVxubGV0IGMgPSAwO1xuZXhwb3J0IGZ1bmN0aW9uIGxvZyguLi5hcmdzKSB7XG4gICAgLy8gaWYgKCFjaGF0dHkpIHRocm93IG5ldyBFcnJvcignTm8gbG9ncyBzaG91bGQgYmUgZW1pdHRlZCBvdXRzaWRlIG9mIGNoYXR0eSBtb2RlJyk7XG4gICAgY29uc29sZS5sb2coLi4uYXJncywgJ1xcbicpO1xuICAgIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09ICd1bmRlZmluZWQnKVxuICAgICAgICByZXR1cm47XG4gICAgY29uc3QgZG9jRWwgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG4gICAgY29uc3QgZnVsbHlTY3JvbGxlZCA9IGRvY0VsLnNjcm9sbFRvcCA+PSBkb2NFbC5zY3JvbGxIZWlnaHQgLSBkb2NFbC5jbGllbnRIZWlnaHQgLSAxIHx8IC8vIHRoZSAtMSBtYWtlcyB0aGlzIHdvcmsgaW4gRWRnZVxuICAgICAgICBkb2NFbC5jbGllbnRIZWlnaHQgPj0gZG9jRWwuc2Nyb2xsSGVpZ2h0O1xuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbG9ncycpOyAvLyBpbml0aWFsaXplIGhlcmUsIG5vdCBnbG9iYWxseSwgb3IgdGhpcyBhcHBlYXJzIGluIGV4cG9ydGVkIG91dHB1dFxuICAgIGVsZW1lbnQuaW5uZXJIVE1MICs9IGA8bGFiZWw+PGlucHV0IHR5cGU9XCJjaGVja2JveFwiIG5hbWU9XCJjJHtjKyt9XCIgY2hlY2tlZD1cImNoZWNrZWRcIj48ZGl2IGNsYXNzPVwic2VjdGlvblwiPmAgKyBodG1sRnJvbUxvZ0FyZ3MoLi4uYXJncykgKyBgPC9kaXY+PC9sYWJlbD5gO1xuICAgIGlmIChmdWxseVNjcm9sbGVkKVxuICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oeyB0b3A6IDk5OTk5LCBiZWhhdmlvcjogJ2F1dG8nIH0pO1xufVxuIiwiaW1wb3J0IGNzIGZyb20gJy4uL3V0aWwvY3J5cHRvUHJveHkuanMnO1xuZXhwb3J0IGNsYXNzIENyeXB0ZXIge1xuICAgIG1vZGU7XG4gICAga2V5O1xuICAgIGluaXRpYWxJdjtcbiAgICByZWNvcmRzUHJvY2Vzc2VkID0gMG47XG4gICAgcHJpb3JQcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKG5ldyBVaW50OEFycmF5KCkpO1xuICAgIGNvbnN0cnVjdG9yKG1vZGUsIGtleSwgaW5pdGlhbEl2KSB7XG4gICAgICAgIHRoaXMubW9kZSA9IG1vZGU7XG4gICAgICAgIHRoaXMua2V5ID0ga2V5O1xuICAgICAgICB0aGlzLmluaXRpYWxJdiA9IGluaXRpYWxJdjtcbiAgICB9XG4gICAgLy8gVGhlIGBQcm9taXNlYHMgcmV0dXJuZWQgYnkgc3VjY2Vzc2l2ZSBjYWxscyB0byB0aGlzIGZ1bmN0aW9uIGFsd2F5cyByZXNvbHZlIGluIHNlcXVlbmNlLFxuICAgIC8vIHdoaWNoIGlzIG5vdCB0cnVlIGZvciBgcHJvY2Vzc1Vuc2VxdWVuY2VkYCBpbiBOb2RlIChldmVuIGlmIGl0IHNlZW1zIHRvIGJlIGluIGJyb3dzZXJzKVxuICAgIGFzeW5jIHByb2Nlc3MoZGF0YSwgYXV0aFRhZ0xlbmd0aCwgYWRkaXRpb25hbERhdGEpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VxdWVuY2UodGhpcy5wcm9jZXNzVW5zZXF1ZW5jZWQoZGF0YSwgYXV0aFRhZ0xlbmd0aCwgYWRkaXRpb25hbERhdGEpKTtcbiAgICB9XG4gICAgYXN5bmMgc2VxdWVuY2UocHJvbWlzZSkge1xuICAgICAgICBjb25zdCBzZXF1ZW5jZWQgPSB0aGlzLnByaW9yUHJvbWlzZS50aGVuKCgpID0+IHByb21pc2UpO1xuICAgICAgICB0aGlzLnByaW9yUHJvbWlzZSA9IHNlcXVlbmNlZDtcbiAgICAgICAgcmV0dXJuIHNlcXVlbmNlZDtcbiAgICB9XG4gICAgLy8gZGF0YSBpcyBwbGFpblRleHQgZm9yIGVuY3J5cHQsIGNvbmNhdChjaXBoZXJ0ZXh0LCBhdXRoVGFnKSBmb3IgZGVjcnlwdFxuICAgIGFzeW5jIHByb2Nlc3NVbnNlcXVlbmNlZChkYXRhLCBhdXRoVGFnQnl0ZUxlbmd0aCwgYWRkaXRpb25hbERhdGEpIHtcbiAgICAgICAgY29uc3QgcmVjb3JkSW5kZXggPSB0aGlzLnJlY29yZHNQcm9jZXNzZWQ7XG4gICAgICAgIHRoaXMucmVjb3Jkc1Byb2Nlc3NlZCArPSAxbjtcbiAgICAgICAgY29uc3QgaXYgPSB0aGlzLmluaXRpYWxJdi5zbGljZSgpO1xuICAgICAgICBjb25zdCBpdkxlbmd0aCA9IEJpZ0ludChpdi5sZW5ndGgpO1xuICAgICAgICBjb25zdCBsYXN0SW5kZXggPSBpdkxlbmd0aCAtIDFuO1xuICAgICAgICBmb3IgKGxldCBpID0gMG47IGkgPCBpdkxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBzaGlmdGVkID0gcmVjb3JkSW5kZXggPj4gKGkgPDwgM24pO1xuICAgICAgICAgICAgaWYgKHNoaWZ0ZWQgPT09IDBuKVxuICAgICAgICAgICAgICAgIGJyZWFrOyAvLyBub3RoaW5nIG1vcmUgdG8gYmUgWE9SZWRcbiAgICAgICAgICAgIGl2W051bWJlcihsYXN0SW5kZXggLSBpKV0gXj0gTnVtYmVyKHNoaWZ0ZWQgJiAweGZmbik7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgYXV0aFRhZ0JpdExlbmd0aCA9IGF1dGhUYWdCeXRlTGVuZ3RoIDw8IDM7IC8vIGJ5dGUgY291bnQgLT4gYml0IGNvdW50XG4gICAgICAgIGNvbnN0IGFsZ29yaXRobSA9IHsgbmFtZTogJ0FFUy1HQ00nLCBpdiwgdGFnTGVuZ3RoOiBhdXRoVGFnQml0TGVuZ3RoLCBhZGRpdGlvbmFsRGF0YSB9O1xuICAgICAgICBjb25zdCByZXN1bHRCdWZmZXIgPSBhd2FpdCBjc1t0aGlzLm1vZGVdKGFsZ29yaXRobSwgdGhpcy5rZXksIGRhdGEpO1xuICAgICAgICBjb25zdCByZXN1bHQgPSBuZXcgVWludDhBcnJheShyZXN1bHRCdWZmZXIpO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbn1cbiIsImltcG9ydCB7IGJhc2U2NERlY29kZSB9IGZyb20gJy4uL3V0aWwvYmFzZTY0LmpzJztcbmltcG9ydCB7IEFTTjFCeXRlcyB9IGZyb20gJy4uL3V0aWwvYXNuMWJ5dGVzLmpzJztcbmltcG9ydCB7IHVuaXZlcnNhbFR5cGVCaXRTdHJpbmcsIHVuaXZlcnNhbFR5cGVCb29sZWFuLCB1bml2ZXJzYWxUeXBlSW50ZWdlciwgdW5pdmVyc2FsVHlwZU51bGwsIHVuaXZlcnNhbFR5cGVPY3RldFN0cmluZywgdW5pdmVyc2FsVHlwZU9JRCwgdW5pdmVyc2FsVHlwZVVUQ1RpbWUsIGNvbnN0cnVjdGVkQ29udGV4dFNwZWNpZmljVHlwZSwgY29uc3RydWN0ZWRVbml2ZXJzYWxUeXBlU2VxdWVuY2UsIGNvbnRleHRTcGVjaWZpY1R5cGUsIEdlbmVyYWxOYW1lLCBleHRLZXlVc2FnZU9JRE1hcCwgZXh0T0lETWFwLCBrZXlPSURNYXAsIGV4dEFjY2Vzc01ldGhvZE9JRE1hcCwgY2VydFBvbE9JRE1hcCwgY2VydFBvbFF1YWxPSURNYXAsIGFsZ29yaXRobVdpdGhPSUQsIGludEZyb21CaXRTdHJpbmcsIHJlYWROYW1lc1NlcSwgcmVhZFNlcU9mU2V0T2ZTZXEsIGRlc2NyaXB0aW9uRm9yQWxnb3JpdGhtLCB1bml2ZXJzYWxUeXBlSUE1U3RyaW5nLCB1bml2ZXJzYWxUeXBlR2VuZXJhbGl6ZWRUaW1lLCB9IGZyb20gJy4vY2VydFV0aWxzLmpzJztcbmltcG9ydCB7IGhleEZyb21VOCwgdThGcm9tSGV4IH0gZnJvbSAnLi4vdXRpbC9oZXguanMnO1xuaW1wb3J0IHsgR3Jvd2FibGVEYXRhIH0gZnJvbSAnLi4vdXRpbC9hcnJheS5qcyc7XG5jb25zdCBhbGxLZXlVc2FnZXMgPSBbXG4gICAgLy8gaHR0cHM6Ly93d3cucmZjLWVkaXRvci5vcmcvcmZjL3JmYzMyODAjc2VjdGlvbi00LjIuMS4zXG4gICAgJ2RpZ2l0YWxTaWduYXR1cmUnLCAvLyAoMClcbiAgICAnbm9uUmVwdWRpYXRpb24nLCAvLyAoMSlcbiAgICAna2V5RW5jaXBoZXJtZW50JywgLy8gKDIpXG4gICAgJ2RhdGFFbmNpcGhlcm1lbnQnLCAvLyAoMylcbiAgICAna2V5QWdyZWVtZW50JywgLy8gKDQpXG4gICAgJ2tleUNlcnRTaWduJywgLy8gKDUpXG4gICAgJ2NSTFNpZ24nLCAvLyAoNilcbiAgICAnZW5jaXBoZXJPbmx5JywgLy8gKDcpXG4gICAgJ2RlY2lwaGVyT25seScsIC8vICg4KVxuXTtcbmV4cG9ydCBjbGFzcyBDZXJ0IHtcbiAgICBzZXJpYWxOdW1iZXI7XG4gICAgYWxnb3JpdGhtO1xuICAgIGlzc3VlcjtcbiAgICB2YWxpZGl0eVBlcmlvZDtcbiAgICBzdWJqZWN0O1xuICAgIHB1YmxpY0tleTtcbiAgICBzaWduYXR1cmU7XG4gICAga2V5VXNhZ2U7XG4gICAgc3ViamVjdEFsdE5hbWVzO1xuICAgIGV4dEtleVVzYWdlO1xuICAgIGF1dGhvcml0eUtleUlkZW50aWZpZXI7XG4gICAgc3ViamVjdEtleUlkZW50aWZpZXI7XG4gICAgYmFzaWNDb25zdHJhaW50cztcbiAgICAvLyBuYW1lQ29uc3RyYWludHM/OiB7IGNyaXRpY2FsPzogYm9vbGVhbjsgcGVybWl0dGVkPzogc3RyaW5nW107IGV4Y2x1ZGVkPzogc3RyaW5nW10gfTtcbiAgICBzaWduZWREYXRhO1xuICAgIHN0YXRpYyBkaXN0aW5ndWlzaGVkTmFtZXNBcmVFcXVhbChkbjEsIGRuMikge1xuICAgICAgICByZXR1cm4gdGhpcy5zdHJpbmdGcm9tRGlzdGluZ3Vpc2hlZE5hbWUoZG4xKSA9PT0gdGhpcy5zdHJpbmdGcm9tRGlzdGluZ3Vpc2hlZE5hbWUoZG4yKTtcbiAgICB9XG4gICAgc3RhdGljIHN0cmluZ0Zyb21EaXN0aW5ndWlzaGVkTmFtZShkbikge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmVudHJpZXMoZG4pXG4gICAgICAgICAgICAubWFwKChbaywgdnNdKSA9PiB0eXBlb2YgdnMgPT09ICdzdHJpbmcnID8gYCR7a309JHt2cy50cmltKCkucmVwbGFjZSgvW1xcXFwsXS9nLCAnXFxcXCQmJyl9YCA6XG4gICAgICAgICAgICB2cy5tYXAodiA9PiBgJHtrfT0ke3YudHJpbSgpLnJlcGxhY2UoL1tcXFxcLF0vZywgJ1xcXFwkJicpfWApLmpvaW4oJywgJykpLmpvaW4oJywgJyk7XG4gICAgfVxuICAgIGNvbnN0cnVjdG9yKGNlcnREYXRhKSB7XG4gICAgICAgIGlmIChjZXJ0RGF0YSBpbnN0YW5jZW9mIEFTTjFCeXRlcyB8fCBjZXJ0RGF0YSBpbnN0YW5jZW9mIFVpbnQ4QXJyYXkpIHtcbiAgICAgICAgICAgIGNvbnN0IGNiID0gY2VydERhdGEgaW5zdGFuY2VvZiBBU04xQnl0ZXMgPyBjZXJ0RGF0YSA6IG5ldyBBU04xQnl0ZXMoY2VydERhdGEpO1xuICAgICAgICAgICAgY2IuZXhwZWN0VWludDgoY29uc3RydWN0ZWRVbml2ZXJzYWxUeXBlU2VxdWVuY2UsIGNoYXR0eSAmJiAnc2VxdWVuY2UgKGNlcnRpZmljYXRlKScpO1xuICAgICAgICAgICAgY29uc3QgW2VuZENlcnRTZXFdID0gY2IuZXhwZWN0QVNOMUxlbmd0aChjaGF0dHkgJiYgJ2NlcnRpZmljYXRlIHNlcXVlbmNlJyk7XG4gICAgICAgICAgICBjb25zdCB0YnNDZXJ0U3RhcnRPZmZzZXQgPSBjYi5vZmZzZXQ7XG4gICAgICAgICAgICBjYi5leHBlY3RVaW50OChjb25zdHJ1Y3RlZFVuaXZlcnNhbFR5cGVTZXF1ZW5jZSwgY2hhdHR5ICYmICdzZXF1ZW5jZSAoY2VydGlmaWNhdGUgaW5mbyknKTtcbiAgICAgICAgICAgIGNvbnN0IFtlbmRDZXJ0SW5mb1NlcV0gPSBjYi5leHBlY3RBU04xTGVuZ3RoKGNoYXR0eSAmJiAnY2VydGlmaWNhdGUgaW5mbycpO1xuICAgICAgICAgICAgY2IuZXhwZWN0Qnl0ZXMoWzB4YTAsIDB4MDMsIDB4MDIsIDB4MDEsIDB4MDJdLCBjaGF0dHkgJiYgJ2NlcnRpZmljYXRlIHZlcnNpb24gMycpOyAvLyBtdXN0IGJlIHYzIHRvIGhhdmUgZXh0ZW5zaW9uc1xuICAgICAgICAgICAgLy8gc2VyaWFsIG51bWJlclxuICAgICAgICAgICAgY2IuZXhwZWN0VWludDgodW5pdmVyc2FsVHlwZUludGVnZXIsIGNoYXR0eSAmJiAnaW50ZWdlcicpO1xuICAgICAgICAgICAgY29uc3QgW2VuZFNlcmlhbE51bWJlciwgc2VyaWFsTnVtYmVyUmVtYWluaW5nXSA9IGNiLmV4cGVjdEFTTjFMZW5ndGgoY2hhdHR5ICYmICdzZXJpYWwgbnVtYmVyJyk7XG4gICAgICAgICAgICB0aGlzLnNlcmlhbE51bWJlciA9IGNiLnN1YmFycmF5KHNlcmlhbE51bWJlclJlbWFpbmluZygpKTtcbiAgICAgICAgICAgIGNoYXR0eSAmJiBjYi5jb21tZW50KCdzZXJpYWwgbnVtYmVyJyk7XG4gICAgICAgICAgICBlbmRTZXJpYWxOdW1iZXIoKTtcbiAgICAgICAgICAgIC8vIGFsZ29yaXRobVxuICAgICAgICAgICAgY2IuZXhwZWN0VWludDgoY29uc3RydWN0ZWRVbml2ZXJzYWxUeXBlU2VxdWVuY2UsIGNoYXR0eSAmJiAnc2VxdWVuY2UgKGFsZ29yaXRobSknKTtcbiAgICAgICAgICAgIGNvbnN0IFtlbmRBbGdvLCBhbGdvUmVtYWluaW5nXSA9IGNiLmV4cGVjdEFTTjFMZW5ndGgoY2hhdHR5ICYmICdhbGdvcml0aG0gc2VxdWVuY2UnKTtcbiAgICAgICAgICAgIGNiLmV4cGVjdFVpbnQ4KHVuaXZlcnNhbFR5cGVPSUQsIGNoYXR0eSAmJiAnT0lEJyk7XG4gICAgICAgICAgICB0aGlzLmFsZ29yaXRobSA9IGNiLnJlYWRBU04xT0lEKCk7XG4gICAgICAgICAgICBjaGF0dHkgJiYgY2IuY29tbWVudChgJHt0aGlzLmFsZ29yaXRobX0gPSAke2Rlc2NyaXB0aW9uRm9yQWxnb3JpdGhtKGFsZ29yaXRobVdpdGhPSUQodGhpcy5hbGdvcml0aG0pKX1gKTtcbiAgICAgICAgICAgIGlmIChhbGdvUmVtYWluaW5nKCkgPiAwKSB7IC8vIG51bGwgcGFyYW1ldGVyc1xuICAgICAgICAgICAgICAgIGNiLmV4cGVjdFVpbnQ4KHVuaXZlcnNhbFR5cGVOdWxsLCBjaGF0dHkgJiYgJ251bGwnKTtcbiAgICAgICAgICAgICAgICBjYi5leHBlY3RVaW50OCgweDAwLCBjaGF0dHkgJiYgJ251bGwgbGVuZ3RoJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbmRBbGdvKCk7XG4gICAgICAgICAgICAvLyBpc3N1ZXJcbiAgICAgICAgICAgIHRoaXMuaXNzdWVyID0gcmVhZFNlcU9mU2V0T2ZTZXEoY2IsICdpc3N1ZXInKTtcbiAgICAgICAgICAgIC8vIHZhbGlkaXR5XG4gICAgICAgICAgICBsZXQgbm90QmVmb3JlLCBub3RBZnRlcjtcbiAgICAgICAgICAgIGNiLmV4cGVjdFVpbnQ4KGNvbnN0cnVjdGVkVW5pdmVyc2FsVHlwZVNlcXVlbmNlLCBjaGF0dHkgJiYgJ3NlcXVlbmNlICh2YWxpZGl0eSknKTtcbiAgICAgICAgICAgIGNvbnN0IFtlbmRWYWxpZGl0eVNlcV0gPSBjYi5leHBlY3RBU04xTGVuZ3RoKGNoYXR0eSAmJiAndmFsaWRpdHkgc2VxdWVuY2UnKTtcbiAgICAgICAgICAgIGNvbnN0IHN0YXJ0VGltZVR5cGUgPSBjYi5yZWFkVWludDgoKTtcbiAgICAgICAgICAgIGlmIChzdGFydFRpbWVUeXBlID09PSB1bml2ZXJzYWxUeXBlVVRDVGltZSkge1xuICAgICAgICAgICAgICAgIGNoYXR0eSAmJiBjYi5jb21tZW50KCdVVEMgdGltZSAobm90IGJlZm9yZSknKTtcbiAgICAgICAgICAgICAgICBub3RCZWZvcmUgPSBjYi5yZWFkQVNOMVVUQ1RpbWUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHN0YXJ0VGltZVR5cGUgPT09IHVuaXZlcnNhbFR5cGVHZW5lcmFsaXplZFRpbWUpIHtcbiAgICAgICAgICAgICAgICBjaGF0dHkgJiYgY2IuY29tbWVudCgnZ2VuZXJhbGl6ZWQgdGltZSAobm90IGJlZm9yZSknKTtcbiAgICAgICAgICAgICAgICBub3RCZWZvcmUgPSBjYi5yZWFkQVNOMUdlbmVyYWxpemVkVGltZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbmV4cGVjdGVkIHZhbGlkaXR5IHN0YXJ0IHR5cGUgMHgke2hleEZyb21VOChbc3RhcnRUaW1lVHlwZV0pfWApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgZW5kVGltZVR5cGUgPSBjYi5yZWFkVWludDgoKTtcbiAgICAgICAgICAgIGlmIChlbmRUaW1lVHlwZSA9PT0gdW5pdmVyc2FsVHlwZVVUQ1RpbWUpIHtcbiAgICAgICAgICAgICAgICBjaGF0dHkgJiYgY2IuY29tbWVudCgnVVRDIHRpbWUgKG5vdCBhZnRlciknKTtcbiAgICAgICAgICAgICAgICBub3RBZnRlciA9IGNiLnJlYWRBU04xVVRDVGltZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoZW5kVGltZVR5cGUgPT09IHVuaXZlcnNhbFR5cGVHZW5lcmFsaXplZFRpbWUpIHtcbiAgICAgICAgICAgICAgICBjaGF0dHkgJiYgY2IuY29tbWVudCgnZ2VuZXJhbGl6ZWQgdGltZSAobm90IGFmdGVyKScpO1xuICAgICAgICAgICAgICAgIG5vdEFmdGVyID0gY2IucmVhZEFTTjFHZW5lcmFsaXplZFRpbWUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgVW5leHBlY3RlZCB2YWxpZGl0eSBlbmQgdHlwZSAweCR7aGV4RnJvbVU4KFtlbmRUaW1lVHlwZV0pfWApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy52YWxpZGl0eVBlcmlvZCA9IHsgbm90QmVmb3JlLCBub3RBZnRlciB9O1xuICAgICAgICAgICAgZW5kVmFsaWRpdHlTZXEoKTtcbiAgICAgICAgICAgIC8vIHN1YmplY3RcbiAgICAgICAgICAgIHRoaXMuc3ViamVjdCA9IHJlYWRTZXFPZlNldE9mU2VxKGNiLCAnc3ViamVjdCcpO1xuICAgICAgICAgICAgLy8gcHVibGljIGtleVxuICAgICAgICAgICAgY29uc3QgcHVibGljS2V5U3RhcnRPZmZzZXQgPSBjYi5vZmZzZXQ7XG4gICAgICAgICAgICBjYi5leHBlY3RVaW50OChjb25zdHJ1Y3RlZFVuaXZlcnNhbFR5cGVTZXF1ZW5jZSwgY2hhdHR5ICYmICdzZXF1ZW5jZSAocHVibGljIGtleSknKTtcbiAgICAgICAgICAgIGNvbnN0IFtlbmRQdWJsaWNLZXlTZXFdID0gY2IuZXhwZWN0QVNOMUxlbmd0aChjaGF0dHkgJiYgJ3B1YmxpYyBrZXkgc2VxdWVuY2UnKTtcbiAgICAgICAgICAgIGNiLmV4cGVjdFVpbnQ4KGNvbnN0cnVjdGVkVW5pdmVyc2FsVHlwZVNlcXVlbmNlLCBjaGF0dHkgJiYgJ3NlcXVlbmNlIChwdWJsaWMga2V5IHBhcmFtcyknKTtcbiAgICAgICAgICAgIGNvbnN0IFtlbmRLZXlPSUQsIGtleU9JRFJlbWFpbmluZ10gPSBjYi5leHBlY3RBU04xTGVuZ3RoKGNoYXR0eSAmJiAncHVibGljIGtleSBwYXJhbXMgc2VxdWVuY2UnKTtcbiAgICAgICAgICAgIGNvbnN0IHB1YmxpY0tleU9JRHMgPSBbXTtcbiAgICAgICAgICAgIHdoaWxlIChrZXlPSURSZW1haW5pbmcoKSA+IDApIHtcbiAgICAgICAgICAgICAgICBjb25zdCBrZXlQYXJhbVJlY29yZFR5cGUgPSBjYi5yZWFkVWludDgoKTtcbiAgICAgICAgICAgICAgICBpZiAoa2V5UGFyYW1SZWNvcmRUeXBlID09PSB1bml2ZXJzYWxUeXBlT0lEKSB7XG4gICAgICAgICAgICAgICAgICAgIGNoYXR0eSAmJiBjYi5jb21tZW50KCdPSUQnKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qga2V5T0lEID0gY2IucmVhZEFTTjFPSUQoKTtcbiAgICAgICAgICAgICAgICAgICAgY2hhdHR5ICYmIGNiLmNvbW1lbnQoYCR7a2V5T0lEfSA9ICR7a2V5T0lETWFwW2tleU9JRF19YCk7XG4gICAgICAgICAgICAgICAgICAgIHB1YmxpY0tleU9JRHMucHVzaChrZXlPSUQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChrZXlQYXJhbVJlY29yZFR5cGUgPT09IHVuaXZlcnNhbFR5cGVOdWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNoYXR0eSAmJiBjYi5jb21tZW50KCdudWxsJyk7XG4gICAgICAgICAgICAgICAgICAgIGNiLmV4cGVjdFVpbnQ4KDB4MDAsIGNoYXR0eSAmJiAnbnVsbCBsZW5ndGgnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbmRLZXlPSUQoKTtcbiAgICAgICAgICAgIGNiLmV4cGVjdFVpbnQ4KHVuaXZlcnNhbFR5cGVCaXRTdHJpbmcsIGNoYXR0eSAmJiAnYml0IHN0cmluZycpO1xuICAgICAgICAgICAgY29uc3QgcHVibGljS2V5RGF0YSA9IGNiLnJlYWRBU04xQml0U3RyaW5nKCk7XG4gICAgICAgICAgICBjaGF0dHkgJiYgY2IuY29tbWVudCgncHVibGljIGtleScpO1xuICAgICAgICAgICAgdGhpcy5wdWJsaWNLZXkgPSB7IGlkZW50aWZpZXJzOiBwdWJsaWNLZXlPSURzLCBkYXRhOiBwdWJsaWNLZXlEYXRhLCBhbGw6IGNiLmRhdGEuc3ViYXJyYXkocHVibGljS2V5U3RhcnRPZmZzZXQsIGNiLm9mZnNldCkgfTtcbiAgICAgICAgICAgIGVuZFB1YmxpY0tleVNlcSgpO1xuICAgICAgICAgICAgLy8gZXh0ZW5zaW9uc1xuICAgICAgICAgICAgY2IuZXhwZWN0VWludDgoY29uc3RydWN0ZWRDb250ZXh0U3BlY2lmaWNUeXBlLCBjaGF0dHkgJiYgJ2NvbnN0cnVjdGVkIGNvbnRleHQtc3BlY2lmaWMgdHlwZTogZXh0ZW5zaW9ucycpO1xuICAgICAgICAgICAgY29uc3QgW2VuZEV4dHNEYXRhXSA9IGNiLmV4cGVjdEFTTjFMZW5ndGgoKTtcbiAgICAgICAgICAgIGNiLmV4cGVjdFVpbnQ4KGNvbnN0cnVjdGVkVW5pdmVyc2FsVHlwZVNlcXVlbmNlLCBjaGF0dHkgJiYgJ3NlcXVlbmNlIChjZXJ0aWZpY2F0ZSBleHRlbnNpb25zKScpO1xuICAgICAgICAgICAgY29uc3QgW2VuZEV4dHMsIGV4dHNSZW1haW5pbmddID0gY2IuZXhwZWN0QVNOMUxlbmd0aChjaGF0dHkgJiYgJ3NlcXVlbmNlJyk7XG4gICAgICAgICAgICB3aGlsZSAoZXh0c1JlbWFpbmluZygpID4gMCkge1xuICAgICAgICAgICAgICAgIGNiLmV4cGVjdFVpbnQ4KGNvbnN0cnVjdGVkVW5pdmVyc2FsVHlwZVNlcXVlbmNlLCBjaGF0dHkgJiYgJ3NlcXVlbmNlIChjZXJ0aWZpY2F0ZSBleHRlbnNpb24pJyk7XG4gICAgICAgICAgICAgICAgY29uc3QgW2VuZEV4dCwgZXh0UmVtYWluaW5nXSA9IGNiLmV4cGVjdEFTTjFMZW5ndGgoKTtcbiAgICAgICAgICAgICAgICBjYi5leHBlY3RVaW50OCh1bml2ZXJzYWxUeXBlT0lELCBjaGF0dHkgJiYgJ09JRCAoZXh0ZW5zaW9uIHR5cGUpJyk7XG4gICAgICAgICAgICAgICAgY29uc3QgZXh0T0lEID0gY2IucmVhZEFTTjFPSUQoKTtcbiAgICAgICAgICAgICAgICBjaGF0dHkgJiYgY2IuY29tbWVudChgJHtleHRPSUR9ID0gJHtleHRPSURNYXBbZXh0T0lEXX1gKTtcbiAgICAgICAgICAgICAgICBpZiAoZXh0T0lEID09PSBcIjIuNS4yOS4xN1wiKSB7IC8vIHN1YmplY3RBbHROYW1lXG4gICAgICAgICAgICAgICAgICAgIGNiLmV4cGVjdFVpbnQ4KHVuaXZlcnNhbFR5cGVPY3RldFN0cmluZywgY2hhdHR5ICYmICdvY3RldCBzdHJpbmcnKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgW2VuZFNhbkRlckRvY10gPSBjYi5leHBlY3RBU04xTGVuZ3RoKGNoYXR0eSAmJiAnREVSIGRvY3VtZW50Jyk7XG4gICAgICAgICAgICAgICAgICAgIGNiLmV4cGVjdFVpbnQ4KGNvbnN0cnVjdGVkVW5pdmVyc2FsVHlwZVNlcXVlbmNlLCBjaGF0dHkgJiYgJ3NlcXVlbmNlIChuYW1lcyknKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYWxsU3ViamVjdEFsdE5hbWVzID0gcmVhZE5hbWVzU2VxKGNiLCBjb250ZXh0U3BlY2lmaWNUeXBlKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdWJqZWN0QWx0TmFtZXMgPSBhbGxTdWJqZWN0QWx0TmFtZXNcbiAgICAgICAgICAgICAgICAgICAgICAgIC5maWx0ZXIoKHNhbikgPT4gc2FuLnR5cGUgPT09IChHZW5lcmFsTmFtZS5kTlNOYW1lIHwgY29udGV4dFNwZWNpZmljVHlwZSkpXG4gICAgICAgICAgICAgICAgICAgICAgICAubWFwKChzYW4pID0+IHNhbi5uYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgZW5kU2FuRGVyRG9jKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGV4dE9JRCA9PT0gJzIuNS4yOS4xNScpIHsgLy8ga2V5VXNhZ2VcbiAgICAgICAgICAgICAgICAgICAgbGV0IGtleVVzYWdlQ3JpdGljYWw7XG4gICAgICAgICAgICAgICAgICAgIGxldCBuZXh0VHlwZSA9IGNiLnJlYWRVaW50OCgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAobmV4dFR5cGUgPT09IHVuaXZlcnNhbFR5cGVCb29sZWFuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGF0dHkgJiYgY2IuY29tbWVudCgnYm9vbGVhbicpO1xuICAgICAgICAgICAgICAgICAgICAgICAga2V5VXNhZ2VDcml0aWNhbCA9IGNiLnJlYWRBU04xQm9vbGVhbihjaGF0dHkgJiYgJ2NyaXRpY2FsOiAlJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXh0VHlwZSA9IGNiLnJlYWRVaW50OCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChuZXh0VHlwZSAhPT0gdW5pdmVyc2FsVHlwZU9jdGV0U3RyaW5nKVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBFeHBlY3RlZCAweCR7aGV4RnJvbVU4KFt1bml2ZXJzYWxUeXBlT2N0ZXRTdHJpbmddKX0sIGdvdCAweCR7aGV4RnJvbVU4KFtuZXh0VHlwZV0pfWApO1xuICAgICAgICAgICAgICAgICAgICBjaGF0dHkgJiYgY2IuY29tbWVudCgnb2N0ZXQgc3RyaW5nJyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IFtlbmRLZXlVc2FnZURlcl0gPSBjYi5leHBlY3RBU04xTGVuZ3RoKGNoYXR0eSAmJiAnREVSIGRvY3VtZW50Jyk7XG4gICAgICAgICAgICAgICAgICAgIGNiLmV4cGVjdFVpbnQ4KHVuaXZlcnNhbFR5cGVCaXRTdHJpbmcsIGNoYXR0eSAmJiAnYml0IHN0cmluZycpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBrZXlVc2FnZUJpdFN0ciA9IGNiLnJlYWRBU04xQml0U3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGtleVVzYWdlQml0bWFzayA9IGludEZyb21CaXRTdHJpbmcoa2V5VXNhZ2VCaXRTdHIpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBrZXlVc2FnZU5hbWVzID0gbmV3IFNldChhbGxLZXlVc2FnZXMuZmlsdGVyKCh1LCBpKSA9PiBrZXlVc2FnZUJpdG1hc2sgJiAoMSA8PCBpKSkpO1xuICAgICAgICAgICAgICAgICAgICBjaGF0dHkgJiYgY2IuY29tbWVudChga2V5IHVzYWdlOiAke2tleVVzYWdlQml0bWFza30gPSAke1suLi5rZXlVc2FnZU5hbWVzXX1gKTtcbiAgICAgICAgICAgICAgICAgICAgZW5kS2V5VXNhZ2VEZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5rZXlVc2FnZSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNyaXRpY2FsOiBrZXlVc2FnZUNyaXRpY2FsLFxuICAgICAgICAgICAgICAgICAgICAgICAgdXNhZ2VzOiBrZXlVc2FnZU5hbWVzLFxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChleHRPSUQgPT09ICcyLjUuMjkuMzcnKSB7IC8vIGV4dEtleVVzYWdlXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZXh0S2V5VXNhZ2UgPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgY2IuZXhwZWN0VWludDgodW5pdmVyc2FsVHlwZU9jdGV0U3RyaW5nLCBjaGF0dHkgJiYgJ29jdGV0IHN0cmluZycpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBbZW5kRXh0S2V5VXNhZ2VEZXJdID0gY2IuZXhwZWN0QVNOMUxlbmd0aChjaGF0dHkgJiYgJ0RFUiBkb2N1bWVudCcpO1xuICAgICAgICAgICAgICAgICAgICBjYi5leHBlY3RVaW50OChjb25zdHJ1Y3RlZFVuaXZlcnNhbFR5cGVTZXF1ZW5jZSwgY2hhdHR5ICYmICdzZXF1ZW5jZScpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBbZW5kRXh0S2V5VXNhZ2UsIGV4dEtleVVzYWdlUmVtYWluaW5nXSA9IGNiLmV4cGVjdEFTTjFMZW5ndGgoY2hhdHR5ICYmICdrZXkgdXNhZ2UgT0lEcycpO1xuICAgICAgICAgICAgICAgICAgICB3aGlsZSAoZXh0S2V5VXNhZ2VSZW1haW5pbmcoKSA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNiLmV4cGVjdFVpbnQ4KHVuaXZlcnNhbFR5cGVPSUQsIGNoYXR0eSAmJiAnT0lEJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBleHRLZXlVc2FnZU9JRCA9IGNiLnJlYWRBU04xT0lEKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGF0dHkgJiYgY2IuY29tbWVudChgJHtleHRLZXlVc2FnZU9JRH0gPSAke2V4dEtleVVzYWdlT0lETWFwW2V4dEtleVVzYWdlT0lEXX1gKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChleHRLZXlVc2FnZU9JRCA9PT0gJzEuMy42LjEuNS41LjcuMy4xJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmV4dEtleVVzYWdlLnNlcnZlclRscyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXh0S2V5VXNhZ2VPSUQgPT09ICcxLjMuNi4xLjUuNS43LjMuMicpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5leHRLZXlVc2FnZS5jbGllbnRUbHMgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVuZEV4dEtleVVzYWdlKCk7XG4gICAgICAgICAgICAgICAgICAgIGVuZEV4dEtleVVzYWdlRGVyKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGV4dE9JRCA9PT0gJzIuNS4yOS4zNScpIHsgLy8gYXV0aG9yaXR5S2V5SWRlbnRpZmllclxuICAgICAgICAgICAgICAgICAgICBjYi5leHBlY3RVaW50OCh1bml2ZXJzYWxUeXBlT2N0ZXRTdHJpbmcsIGNoYXR0eSAmJiAnb2N0ZXQgc3RyaW5nJyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IFtlbmRBdXRoS2V5SWREZXJdID0gY2IuZXhwZWN0QVNOMUxlbmd0aChjaGF0dHkgJiYgJ0RFUiBkb2N1bWVudCcpO1xuICAgICAgICAgICAgICAgICAgICBjYi5leHBlY3RVaW50OChjb25zdHJ1Y3RlZFVuaXZlcnNhbFR5cGVTZXF1ZW5jZSwgY2hhdHR5ICYmICdzZXF1ZW5jZScpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBbZW5kQXV0aEtleUlkU2VxLCBhdXRoS2V5SWRTZXFSZW1haW5pbmddID0gY2IuZXhwZWN0QVNOMUxlbmd0aChjaGF0dHkgJiYgJ3NlcXVlbmNlJyk7XG4gICAgICAgICAgICAgICAgICAgIHdoaWxlIChhdXRoS2V5SWRTZXFSZW1haW5pbmcoKSA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGF1dGhLZXlJZERhdHVtVHlwZSA9IGNiLnJlYWRVaW50OCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGF1dGhLZXlJZERhdHVtVHlwZSA9PT0gKGNvbnRleHRTcGVjaWZpY1R5cGUgfCAwKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYXR0eSAmJiBjYi5jb21tZW50KCdjb250ZXh0LXNwZWNpZmljIHR5cGU6IGtleSBpZGVudGlmaWVyJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgW2VuZEF1dGhLZXlJZCwgYXV0aEtleUlkUmVtYWluaW5nXSA9IGNiLmV4cGVjdEFTTjFMZW5ndGgoY2hhdHR5ICYmICdhdXRob3JpdHkga2V5IGlkZW50aWZpZXInKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmF1dGhvcml0eUtleUlkZW50aWZpZXIgPSBjYi5yZWFkQnl0ZXMoYXV0aEtleUlkUmVtYWluaW5nKCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYXR0eSAmJiBjYi5jb21tZW50KCdhdXRob3JpdHkga2V5IGlkZW50aWZpZXInKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmRBdXRoS2V5SWQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGF1dGhLZXlJZERhdHVtVHlwZSA9PT0gKGNvbnRleHRTcGVjaWZpY1R5cGUgfCAxKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYXR0eSAmJiBjYi5jb21tZW50KCdjb250ZXh0LXNwZWNpZmljIHR5cGU6IGF1dGhvcml0eSBjZXJ0IGlzc3VlcicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IFtlbmRBdXRoS2V5SWRDZXJ0SXNzdWVyLCBhdXRoS2V5SWRDZXJ0SXNzdWVyUmVtYWluaW5nXSA9IGNiLmV4cGVjdEFTTjFMZW5ndGgoY2hhdHR5ICYmICdhdXRob3JpdHkgY2VydCBpc3N1ZXInKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYi5za2lwKGF1dGhLZXlJZENlcnRJc3N1ZXJSZW1haW5pbmcoKSwgY2hhdHR5ICYmICdpZ25vcmVkJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5kQXV0aEtleUlkQ2VydElzc3VlcigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoYXV0aEtleUlkRGF0dW1UeXBlID09PSAoY29udGV4dFNwZWNpZmljVHlwZSB8IDIpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhdHR5ICYmIGNiLmNvbW1lbnQoJ2NvbnRleHQtc3BlY2lmaWMgdHlwZTogYXV0aG9yaXR5IGNlcnQgc2VyaWFsIG51bWJlcicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IFtlbmRBdXRoS2V5SWRDZXJ0U2VyaWFsTm8sIGF1dGhLZXlJZENlcnRTZXJpYWxOb1JlbWFpbmluZ10gPSBjYi5leHBlY3RBU04xTGVuZ3RoKGNoYXR0eSAmJiAnYXV0aG9yaXR5IGNlcnQgaXNzdWVyIG9yIGF1dGhvcml0eSBjZXJ0IHNlcmlhbCBudW1iZXInKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYi5za2lwKGF1dGhLZXlJZENlcnRTZXJpYWxOb1JlbWFpbmluZygpLCBjaGF0dHkgJiYgJ2lnbm9yZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmRBdXRoS2V5SWRDZXJ0U2VyaWFsTm8oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGF1dGhLZXlJZERhdHVtVHlwZSA9PT0gKGNvbnRleHRTcGVjaWZpY1R5cGUgfCAzMykpIHsgLy8gd2hlcmUgaXMgdGhpcyBkb2N1bWVudGVkPyFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGF0dHkgJiYgY2IuY29tbWVudCgnY29udGV4dC1zcGVjaWZpYyB0eXBlOiBEaXJOYW1lJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgW2VuZERpck5hbWUsIGRpck5hbWVSZW1haW5pbmddID0gY2IuZXhwZWN0QVNOMUxlbmd0aChjaGF0dHkgJiYgJ0Rpck5hbWUnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYi5za2lwKGRpck5hbWVSZW1haW5pbmcoKSwgY2hhdHR5ICYmICdpZ25vcmVkJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhdHR5ICYmIGNvbnNvbGUubG9nKGNiLmNvbW1lbnRlZFN0cmluZygpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmREaXJOYW1lKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFVuZXhwZWN0ZWQgZGF0YSB0eXBlICR7YXV0aEtleUlkRGF0dW1UeXBlfSBpbiBhdXRob3JpdHlLZXlJZGVudGlmaWVyIGNlcnRpZmljYXRlIGV4dGVuc2lvbmApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVuZEF1dGhLZXlJZFNlcSgpO1xuICAgICAgICAgICAgICAgICAgICBlbmRBdXRoS2V5SWREZXIoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoZXh0T0lEID09PSAnMi41LjI5LjE0JykgeyAvLyBzdWJqZWN0S2V5SWRlbnRpZmllclxuICAgICAgICAgICAgICAgICAgICBjYi5leHBlY3RVaW50OCh1bml2ZXJzYWxUeXBlT2N0ZXRTdHJpbmcsIGNoYXR0eSAmJiAnb2N0ZXQgc3RyaW5nJyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IFtlbmRTdWJqZWN0S2V5SWREZXJdID0gY2IuZXhwZWN0QVNOMUxlbmd0aChjaGF0dHkgJiYgJ0RFUiBkb2N1bWVudCcpO1xuICAgICAgICAgICAgICAgICAgICBjYi5leHBlY3RVaW50OCh1bml2ZXJzYWxUeXBlT2N0ZXRTdHJpbmcsIGNoYXR0eSAmJiAnb2N0ZXQgc3RyaW5nJyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IFtlbmRTdWJqZWN0S2V5SWQsIHN1YmplY3RLZXlJZFJlbWFpbmluZ10gPSBjYi5leHBlY3RBU04xTGVuZ3RoKGNoYXR0eSAmJiAnc3ViamVjdCBrZXkgaWRlbnRpZmllcicpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN1YmplY3RLZXlJZGVudGlmaWVyID0gY2IucmVhZEJ5dGVzKHN1YmplY3RLZXlJZFJlbWFpbmluZygpKTtcbiAgICAgICAgICAgICAgICAgICAgY2hhdHR5ICYmIGNiLmNvbW1lbnQoJ3N1YmplY3Qga2V5IGlkZW50aWZpZXInKTtcbiAgICAgICAgICAgICAgICAgICAgZW5kU3ViamVjdEtleUlkKCk7XG4gICAgICAgICAgICAgICAgICAgIGVuZFN1YmplY3RLZXlJZERlcigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChleHRPSUQgPT09ICcyLjUuMjkuMTknKSB7IC8vIGJhc2ljQ29uc3RyYWludHNcbiAgICAgICAgICAgICAgICAgICAgbGV0IGJhc2ljQ29uc3RyYWludHNDcml0aWNhbDtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGJjTmV4dFR5cGUgPSBjYi5yZWFkVWludDgoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGJjTmV4dFR5cGUgPT09IHVuaXZlcnNhbFR5cGVCb29sZWFuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGF0dHkgJiYgY2IuY29tbWVudCgnYm9vbGVhbicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYmFzaWNDb25zdHJhaW50c0NyaXRpY2FsID0gY2IucmVhZEFTTjFCb29sZWFuKGNoYXR0eSAmJiAnY3JpdGljYWw6ICUnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJjTmV4dFR5cGUgPSBjYi5yZWFkVWludDgoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoYmNOZXh0VHlwZSAhPT0gdW5pdmVyc2FsVHlwZU9jdGV0U3RyaW5nKVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmV4cGVjdGVkIHR5cGUgaW4gY2VydGlmaWNhdGUgYmFzaWMgY29uc3RyYWludHMnKTtcbiAgICAgICAgICAgICAgICAgICAgY2hhdHR5ICYmIGNiLmNvbW1lbnQoJ29jdGV0IHN0cmluZycpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBbZW5kQmFzaWNDb25zdHJhaW50c0Rlcl0gPSBjYi5leHBlY3RBU04xTGVuZ3RoKGNoYXR0eSAmJiAnREVSIGRvY3VtZW50Jyk7XG4gICAgICAgICAgICAgICAgICAgIGNiLmV4cGVjdFVpbnQ4KGNvbnN0cnVjdGVkVW5pdmVyc2FsVHlwZVNlcXVlbmNlLCBjaGF0dHkgJiYgJ3NlcXVlbmNlJyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IFtlbmRDb25zdHJhaW50c1NlcSwgY29uc3RyYWludHNTZXFSZW1haW5pbmddID0gY2IuZXhwZWN0QVNOMUxlbmd0aCgpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgYmFzaWNDb25zdHJhaW50c0NhID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY29uc3RyYWludHNTZXFSZW1haW5pbmcoKSA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNiLmV4cGVjdFVpbnQ4KHVuaXZlcnNhbFR5cGVCb29sZWFuLCBjaGF0dHkgJiYgJ2Jvb2xlYW4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhc2ljQ29uc3RyYWludHNDYSA9IGNiLnJlYWRBU04xQm9vbGVhbihjaGF0dHkgJiYgJ2NlcnRpZmljYXRlIGF1dGhvcml0eTogJScpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGxldCBiYXNpY0NvbnN0cmFpbnRzUGF0aExlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbnN0cmFpbnRzU2VxUmVtYWluaW5nKCkgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYi5leHBlY3RVaW50OCh1bml2ZXJzYWxUeXBlSW50ZWdlciwgY2hhdHR5ICYmICdpbnRlZ2VyJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBtYXhQYXRoTGVuZ3RoTGVuZ3RoID0gY2IucmVhZEFTTjFMZW5ndGgoY2hhdHR5ICYmICdtYXggcGF0aCBsZW5ndGgnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhc2ljQ29uc3RyYWludHNQYXRoTGVuZ3RoID1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXhQYXRoTGVuZ3RoTGVuZ3RoID09PSAxID8gY2IucmVhZFVpbnQ4KCkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXhQYXRoTGVuZ3RoTGVuZ3RoID09PSAyID8gY2IucmVhZFVpbnQxNigpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1heFBhdGhMZW5ndGhMZW5ndGggPT09IDMgPyBjYi5yZWFkVWludDI0KCkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChiYXNpY0NvbnN0cmFpbnRzUGF0aExlbmd0aCA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVG9vIG1hbnkgYnl0ZXMgaW4gbWF4IHBhdGggbGVuZ3RoIGluIGNlcnRpZmljYXRlIGJhc2ljQ29uc3RyYWludHMnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoYXR0eSAmJiBjYi5jb21tZW50KCdtYXggcGF0aCBsZW5ndGgnKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbmRDb25zdHJhaW50c1NlcSgpO1xuICAgICAgICAgICAgICAgICAgICBlbmRCYXNpY0NvbnN0cmFpbnRzRGVyKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYmFzaWNDb25zdHJhaW50cyA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNyaXRpY2FsOiBiYXNpY0NvbnN0cmFpbnRzQ3JpdGljYWwsXG4gICAgICAgICAgICAgICAgICAgICAgICBjYTogYmFzaWNDb25zdHJhaW50c0NhLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGF0aExlbmd0aDogYmFzaWNDb25zdHJhaW50c1BhdGhMZW5ndGgsXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGNoYXR0eSAmJiBleHRPSUQgPT09ICcxLjMuNi4xLjUuNS43LjEuMScpIHsgLy8gYXV0aG9yaXR5SW5mb0FjY2VzcyAtLSBvbmx5IHBhcnNlZCBmb3IgYW5ub3RhdGlvbiBwdXJwb3Nlc1xuICAgICAgICAgICAgICAgICAgICBjYi5leHBlY3RVaW50OCh1bml2ZXJzYWxUeXBlT2N0ZXRTdHJpbmcsIGNoYXR0eSAmJiAnb2N0ZXQgc3RyaW5nJyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IFtlbmRBdXRoSW5mb0FjY2Vzc0RFUl0gPSBjYi5leHBlY3RBU04xTGVuZ3RoKGNoYXR0eSAmJiAnREVSIGRvY3VtZW50Jyk7XG4gICAgICAgICAgICAgICAgICAgIGNiLmV4cGVjdFVpbnQ4KGNvbnN0cnVjdGVkVW5pdmVyc2FsVHlwZVNlcXVlbmNlLCBjaGF0dHkgJiYgJ3NlcXVlbmNlJyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IFtlbmRBdXRoSW5mb0FjY2Vzc1NlcSwgYXV0aEluZm9BY2Nlc3NTZXFSZW1haW5pbmddID0gY2IuZXhwZWN0QVNOMUxlbmd0aChjaGF0dHkgJiYgJ3NlcXVlbmNlJyk7XG4gICAgICAgICAgICAgICAgICAgIHdoaWxlIChhdXRoSW5mb0FjY2Vzc1NlcVJlbWFpbmluZygpID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2IuZXhwZWN0VWludDgoY29uc3RydWN0ZWRVbml2ZXJzYWxUeXBlU2VxdWVuY2UsIGNoYXR0eSAmJiAnc2VxdWVuY2UnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IFtlbmRBdXRoSW5mb0FjY2Vzc0lubmVyU2VxXSA9IGNiLmV4cGVjdEFTTjFMZW5ndGgoY2hhdHR5ICYmICdzZXF1ZW5jZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2IuZXhwZWN0VWludDgodW5pdmVyc2FsVHlwZU9JRCwgY2hhdHR5ICYmICdPSUQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGFjY2Vzc01ldGhvZE9JRCA9IGNiLnJlYWRBU04xT0lEKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGF0dHkgJiYgY2IuY29tbWVudChgJHthY2Nlc3NNZXRob2RPSUR9ID0gYWNjZXNzIG1ldGhvZDogJHtleHRBY2Nlc3NNZXRob2RPSURNYXBbYWNjZXNzTWV0aG9kT0lEXSA/PyAndW5rbm93biBtZXRob2QnfSBgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNiLmV4cGVjdFVpbnQ4KGNvbnRleHRTcGVjaWZpY1R5cGUgfCBHZW5lcmFsTmFtZS51bmlmb3JtUmVzb3VyY2VJZGVudGlmaWVyLCBjaGF0dHkgJiYgJ2NvbnRleHQtc3BlY2lmaWMgdHlwZTogVVJJJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBbZW5kTWV0aG9kVVJJLCBtZXRob2RVUklSZW1haW5pbmddID0gY2IuZXhwZWN0QVNOMUxlbmd0aChjaGF0dHkgJiYgJ2FjY2VzcyBsb2NhdGlvbicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2IucmVhZFVURjhTdHJpbmcobWV0aG9kVVJJUmVtYWluaW5nKCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZW5kTWV0aG9kVVJJKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbmRBdXRoSW5mb0FjY2Vzc0lubmVyU2VxKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZW5kQXV0aEluZm9BY2Nlc3NTZXEoKTtcbiAgICAgICAgICAgICAgICAgICAgZW5kQXV0aEluZm9BY2Nlc3NERVIoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoY2hhdHR5ICYmIGV4dE9JRCA9PT0gJzIuNS4yOS4zMicpIHsgLy8gY2VydGlmaWNhdGVQb2xpY2llcyAtLSBvbmx5IHBhcnNlZCBmb3IgYW5ub3RhdGlvbiBwdXJwb3Nlc1xuICAgICAgICAgICAgICAgICAgICBjYi5leHBlY3RVaW50OCh1bml2ZXJzYWxUeXBlT2N0ZXRTdHJpbmcsIGNoYXR0eSAmJiAnb2N0ZXQgc3RyaW5nJyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IFtlbmRDZXJ0UG9sREVSXSA9IGNiLmV4cGVjdEFTTjFMZW5ndGgoY2hhdHR5ICYmICdERVIgZG9jdW1lbnQnKTtcbiAgICAgICAgICAgICAgICAgICAgY2IuZXhwZWN0VWludDgoY29uc3RydWN0ZWRVbml2ZXJzYWxUeXBlU2VxdWVuY2UsIGNoYXR0eSAmJiAnc2VxdWVuY2UgKENlcnRpZmljYXRlUG9saWNpZXMpJyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IFtlbmRDZXJ0UG9sU2VxLCBjZXJ0UG9sU2VxUmVtYWluaW5nXSA9IGNiLmV4cGVjdEFTTjFMZW5ndGgoY2hhdHR5ICYmICdzZXF1ZW5jZScpO1xuICAgICAgICAgICAgICAgICAgICB3aGlsZSAoY2VydFBvbFNlcVJlbWFpbmluZygpID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2IuZXhwZWN0VWludDgoY29uc3RydWN0ZWRVbml2ZXJzYWxUeXBlU2VxdWVuY2UsIGNoYXR0eSAmJiAnc2VxdWVuY2UgKFBvbGljeUluZm9ybWF0aW9uKScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgW2VuZENlcnRQb2xJbm5lclNlcSwgY2VydFBvbElubmVyU2VxUmVtYWluaW5nXSA9IGNiLmV4cGVjdEFTTjFMZW5ndGgoY2hhdHR5ICYmICdzZXF1ZW5jZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2IuZXhwZWN0VWludDgodW5pdmVyc2FsVHlwZU9JRCwgY2hhdHR5ICYmICdPSUQgKENlcnRQb2xpY3lJRCknKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNlcnRQb2xPSUQgPSBjYi5yZWFkQVNOMU9JRCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hhdHR5ICYmIGNiLmNvbW1lbnQoYCR7Y2VydFBvbE9JRH0gPSBwb2xpY3k6ICR7Y2VydFBvbE9JRE1hcFtjZXJ0UG9sT0lEXSA/PyAndW5rbm93biBwb2xpY3knfSBgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlIChjZXJ0UG9sSW5uZXJTZXFSZW1haW5pbmcoKSA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYi5leHBlY3RVaW50OChjb25zdHJ1Y3RlZFVuaXZlcnNhbFR5cGVTZXF1ZW5jZSwgY2hhdHR5ICYmICdzZXF1ZW5jZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IFtlbmRDZXJ0UG9sSW5uZXIyU2VxLCBjZXJ0UG9sSW5uZXIyU2VxUmVtYWluaW5nXSA9IGNiLmV4cGVjdEFTTjFMZW5ndGgoY2hhdHR5ICYmICdzZXF1ZW5jZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlIChjZXJ0UG9sSW5uZXIyU2VxUmVtYWluaW5nKCkgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNiLmV4cGVjdFVpbnQ4KGNvbnN0cnVjdGVkVW5pdmVyc2FsVHlwZVNlcXVlbmNlLCBjaGF0dHkgJiYgJ3NlcXVlbmNlIChQb2xpY3lRdWFsaWZpZXJJbmZvcm1hdGlvbiknKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgW2VuZENlcnRQb2xJbm5lcjNTZXEsIGNlcnRQb2xJbm5lcjNTZXFSZW1haW5pbmddID0gY2IuZXhwZWN0QVNOMUxlbmd0aChjaGF0dHkgJiYgJ3NlcXVlbmNlJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNiLmV4cGVjdFVpbnQ4KHVuaXZlcnNhbFR5cGVPSUQsIGNoYXR0eSAmJiAnT0lEIChwb2xpY3lRdWFsaWZpZXJJZCknKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY2VydFBvbFF1YWxPSUQgPSBjYi5yZWFkQVNOMU9JRCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGF0dHkgJiYgY2IuY29tbWVudChgJHtjZXJ0UG9sUXVhbE9JRH0gPSBxdWFsaWZpZXI6ICR7Y2VydFBvbFF1YWxPSURNYXBbY2VydFBvbFF1YWxPSURdID8/ICd1bmtub3duIHF1YWxpZmllcid9IGApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBxdWFsVHlwZSA9IGNiLnJlYWRVaW50OCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2hhdHR5ICYmIHF1YWxUeXBlID09PSB1bml2ZXJzYWxUeXBlSUE1U3RyaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYi5jb21tZW50KCdJQTVTdHJpbmcnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IFtlbmRRdWFsU3RyLCBxdWFsU3RyUmVtYWluaW5nXSA9IGNiLmV4cGVjdEFTTjFMZW5ndGgoJ3N0cmluZycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2IucmVhZFVURjhTdHJpbmcocXVhbFN0clJlbWFpbmluZygpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuZFF1YWxTdHIoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjZXJ0UG9sSW5uZXIzU2VxUmVtYWluaW5nKCkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2Iuc2tpcChjZXJ0UG9sSW5uZXIzU2VxUmVtYWluaW5nKCksICdza2lwcGVkIHBvbGljeSBxdWFsaWZpZXIgZGF0YScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuZENlcnRQb2xJbm5lcjNTZXEoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5kQ2VydFBvbElubmVyMlNlcSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZW5kQ2VydFBvbElubmVyU2VxKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZW5kQ2VydFBvbFNlcSgpO1xuICAgICAgICAgICAgICAgICAgICBlbmRDZXJ0UG9sREVSKCk7XG4gICAgICAgICAgICAgICAgICAgIC8vIH0gZWxzZSBpZiAoY2hhdHR5ICYmIGV4dE9JRCA9PT0gJzIuNS4yOS4zMScpIHsgIC8vIENSTERpc3RyaWJ1dGlvblBvaW50cyAtLSBvbmx5IHBhcnNlZCBmb3IgYW5ub3RhdGlvbiBwdXJwb3Nlc1xuICAgICAgICAgICAgICAgICAgICAvLyAgIGNiLmV4cGVjdFVpbnQ4KHVuaXZlcnNhbFR5cGVPY3RldFN0cmluZywgY2hhdHR5ICYmICdvY3RldCBzdHJpbmcnKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gICBjb25zdCBbZW5kQ1JMRFBERVJdID0gY2IuZXhwZWN0QVNOMUxlbmd0aChjaGF0dHkgJiYgJ0RFUiBkb2N1bWVudCcpO1xuICAgICAgICAgICAgICAgICAgICAvLyAgIGNiLmV4cGVjdFVpbnQ4KGNvbnN0cnVjdGVkVW5pdmVyc2FsVHlwZVNlcXVlbmNlLCBjaGF0dHkgJiYgJ3NlcXVlbmNlIChEaXN0cmlidXRpb25Qb2ludHMpJyk7XG4gICAgICAgICAgICAgICAgICAgIC8vICAgY29uc3QgW2VuZENSTERQU2VxLCBDUkxEUFJlbWFpbmluZ10gPSBjYi5leHBlY3RBU04xTGVuZ3RoKGNoYXR0eSAmJiAnc2VxdWVuY2UnKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gVE9ET1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICAgICAqIGlnbm9yZWQgZXh0ZW5zaW9ucyBpbmNsdWRlOlxuICAgICAgICAgICAgICAgICAgICAgKiAtIE5hbWUgQ29uc3RyYWludHMgLS0gaW1wb3J0YW50ISBzZWUgaHR0cHM6Ly9iZXR0ZXJ0bHMuY29tL1xuICAgICAgICAgICAgICAgICAgICAgKiAtIENSTCBEaXN0cmlidXRpb24gUG9pbnRzIC0tIHN0YXJ0ZWQgaW1wbGVtZW50YXRpb24gYWJvdmVcbiAgICAgICAgICAgICAgICAgICAgICogLSBTaWduZWQgQ2VydGlmaWNhdGUgVGltZXN0YW1wIChTQ1QpIExpc3RcbiAgICAgICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IGNoZWNrIGZvciBjcml0aWNhbGl0eSwgdGhyb3cgaWYgY3JpdGljYWxcbiAgICAgICAgICAgICAgICAgICAgY2Iuc2tpcChleHRSZW1haW5pbmcoKSwgY2hhdHR5ICYmICdpZ25vcmVkIGV4dGVuc2lvbiBkYXRhJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVuZEV4dCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZW5kRXh0cygpO1xuICAgICAgICAgICAgZW5kRXh0c0RhdGEoKTtcbiAgICAgICAgICAgIGVuZENlcnRJbmZvU2VxKCk7XG4gICAgICAgICAgICAvLyB0by1iZS1zaWduZWQgY2VydCBkYXRhOiBodHRwczovL2NyeXB0by5zdGFja2V4Y2hhbmdlLmNvbS9xdWVzdGlvbnMvNDIzNDUvd2hhdC1pbmZvcm1hdGlvbi1pcy1zaWduZWQtYnktYS1jZXJ0aWZpY2F0aW9uLWF1dGhvcml0eVxuICAgICAgICAgICAgdGhpcy5zaWduZWREYXRhID0gY2IuZGF0YS5zdWJhcnJheSh0YnNDZXJ0U3RhcnRPZmZzZXQsIGNiLm9mZnNldCk7XG4gICAgICAgICAgICAvLyBzaWduYXR1cmUgYWxnb3JpdGhtXG4gICAgICAgICAgICBjYi5leHBlY3RVaW50OChjb25zdHJ1Y3RlZFVuaXZlcnNhbFR5cGVTZXF1ZW5jZSwgY2hhdHR5ICYmICdzZXF1ZW5jZSAoc2lnbmF0dXJlIGFsZ29yaXRobSknKTtcbiAgICAgICAgICAgIGNvbnN0IFtlbmRTaWdBbGdvLCBzaWdBbGdvUmVtYWluaW5nXSA9IGNiLmV4cGVjdEFTTjFMZW5ndGgoY2hhdHR5ICYmICdzaWduYXR1cmUgYWxnb3JpdGhtIHNlcXVlbmNlJyk7XG4gICAgICAgICAgICBjYi5leHBlY3RVaW50OCh1bml2ZXJzYWxUeXBlT0lELCBjaGF0dHkgJiYgJ09JRCcpO1xuICAgICAgICAgICAgY29uc3Qgc2lnQWxnb09JRCA9IGNiLnJlYWRBU04xT0lEKGNoYXR0eSAmJiAnJSAobXVzdCBiZSBzYW1lIGFzIGFib3ZlKScpO1xuICAgICAgICAgICAgaWYgKHNpZ0FsZ29SZW1haW5pbmcoKSA+IDApIHtcbiAgICAgICAgICAgICAgICBjYi5leHBlY3RVaW50OCh1bml2ZXJzYWxUeXBlTnVsbCwgY2hhdHR5ICYmICdudWxsJyk7XG4gICAgICAgICAgICAgICAgY2IuZXhwZWN0VWludDgoMHgwMCwgY2hhdHR5ICYmICdudWxsIGxlbmd0aCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZW5kU2lnQWxnbygpO1xuICAgICAgICAgICAgaWYgKHNpZ0FsZ29PSUQgIT09IHRoaXMuYWxnb3JpdGhtKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgQ2VydGlmaWNhdGUgc3BlY2lmaWVzIGRpZmZlcmVudCBzaWduYXR1cmUgYWxnb3JpdGhtcyBpbnNpZGUoJHt0aGlzLmFsZ29yaXRobX0pIGFuZCBvdXQoJHtzaWdBbGdvT0lEfSlgKTtcbiAgICAgICAgICAgIC8vIHNpZ25hdHVyZVxuICAgICAgICAgICAgY2IuZXhwZWN0VWludDgodW5pdmVyc2FsVHlwZUJpdFN0cmluZywgY2hhdHR5ICYmICdiaXRzdHJpbmcgKHNpZ25hdHVyZSknKTtcbiAgICAgICAgICAgIHRoaXMuc2lnbmF0dXJlID0gY2IucmVhZEFTTjFCaXRTdHJpbmcoKTtcbiAgICAgICAgICAgIGNoYXR0eSAmJiBjYi5jb21tZW50KCdzaWduYXR1cmUnKTtcbiAgICAgICAgICAgIGVuZENlcnRTZXEoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2VyaWFsTnVtYmVyID0gdThGcm9tSGV4KGNlcnREYXRhLnNlcmlhbE51bWJlcik7XG4gICAgICAgICAgICB0aGlzLmFsZ29yaXRobSA9IGNlcnREYXRhLmFsZ29yaXRobTtcbiAgICAgICAgICAgIHRoaXMuaXNzdWVyID0gY2VydERhdGEuaXNzdWVyO1xuICAgICAgICAgICAgdGhpcy52YWxpZGl0eVBlcmlvZCA9IHtcbiAgICAgICAgICAgICAgICBub3RCZWZvcmU6IG5ldyBEYXRlKGNlcnREYXRhLnZhbGlkaXR5UGVyaW9kLm5vdEJlZm9yZSksXG4gICAgICAgICAgICAgICAgbm90QWZ0ZXI6IG5ldyBEYXRlKGNlcnREYXRhLnZhbGlkaXR5UGVyaW9kLm5vdEFmdGVyKSxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0aGlzLnN1YmplY3QgPSBjZXJ0RGF0YS5zdWJqZWN0O1xuICAgICAgICAgICAgdGhpcy5wdWJsaWNLZXkgPSB7XG4gICAgICAgICAgICAgICAgaWRlbnRpZmllcnM6IGNlcnREYXRhLnB1YmxpY0tleS5pZGVudGlmaWVycyxcbiAgICAgICAgICAgICAgICBkYXRhOiB1OEZyb21IZXgoY2VydERhdGEucHVibGljS2V5LmRhdGEpLFxuICAgICAgICAgICAgICAgIGFsbDogdThGcm9tSGV4KGNlcnREYXRhLnB1YmxpY0tleS5hbGwpLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHRoaXMuc2lnbmF0dXJlID0gdThGcm9tSGV4KGNlcnREYXRhLnNpZ25hdHVyZSk7XG4gICAgICAgICAgICB0aGlzLmtleVVzYWdlID0ge1xuICAgICAgICAgICAgICAgIGNyaXRpY2FsOiBjZXJ0RGF0YS5rZXlVc2FnZS5jcml0aWNhbCxcbiAgICAgICAgICAgICAgICB1c2FnZXM6IG5ldyBTZXQoY2VydERhdGEua2V5VXNhZ2UudXNhZ2VzKSxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0aGlzLnN1YmplY3RBbHROYW1lcyA9IGNlcnREYXRhLnN1YmplY3RBbHROYW1lcztcbiAgICAgICAgICAgIHRoaXMuZXh0S2V5VXNhZ2UgPSBjZXJ0RGF0YS5leHRLZXlVc2FnZTtcbiAgICAgICAgICAgIGlmIChjZXJ0RGF0YS5hdXRob3JpdHlLZXlJZGVudGlmaWVyKVxuICAgICAgICAgICAgICAgIHRoaXMuYXV0aG9yaXR5S2V5SWRlbnRpZmllciA9IHU4RnJvbUhleChjZXJ0RGF0YS5hdXRob3JpdHlLZXlJZGVudGlmaWVyKTtcbiAgICAgICAgICAgIGlmIChjZXJ0RGF0YS5zdWJqZWN0S2V5SWRlbnRpZmllcilcbiAgICAgICAgICAgICAgICB0aGlzLnN1YmplY3RLZXlJZGVudGlmaWVyID0gdThGcm9tSGV4KGNlcnREYXRhLnN1YmplY3RLZXlJZGVudGlmaWVyKTtcbiAgICAgICAgICAgIHRoaXMuYmFzaWNDb25zdHJhaW50cyA9IGNlcnREYXRhLmJhc2ljQ29uc3RyYWludHM7XG4gICAgICAgICAgICB0aGlzLnNpZ25lZERhdGEgPSB1OEZyb21IZXgoY2VydERhdGEuc2lnbmVkRGF0YSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc3ViamVjdEFsdE5hbWVNYXRjaGluZ0hvc3QoaG9zdCkge1xuICAgICAgICBjb25zdCB0d29Eb3RSZWdleCA9IC9bLl1bXi5dK1suXVteLl0rJC87XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuc3ViamVjdEFsdE5hbWVzKTtcbiAgICAgICAgcmV0dXJuICh0aGlzLnN1YmplY3RBbHROYW1lcyA/PyBbXSkuZmluZChjZXJ0ID0+IHtcbiAgICAgICAgICAgIGxldCBjZXJ0TmFtZSA9IGNlcnQ7XG4gICAgICAgICAgICBsZXQgaG9zdE5hbWUgPSBob3N0O1xuICAgICAgICAgICAgLy8gd2lsZGNhcmRzOiBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9XaWxkY2FyZF9jZXJ0aWZpY2F0ZVxuICAgICAgICAgICAgaWYgKHR3b0RvdFJlZ2V4LnRlc3QoaG9zdCkgJiYgdHdvRG90UmVnZXgudGVzdChjZXJ0TmFtZSkgJiYgY2VydE5hbWUuc3RhcnRzV2l0aCgnKi4nKSkge1xuICAgICAgICAgICAgICAgIGNlcnROYW1lID0gY2VydE5hbWUuc2xpY2UoMSk7XG4gICAgICAgICAgICAgICAgaG9zdE5hbWUgPSBob3N0TmFtZS5zbGljZShob3N0TmFtZS5pbmRleE9mKCcuJykpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGNlcnROYW1lID09PSBob3N0TmFtZSlcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGlzVmFsaWRBdE1vbWVudChtb21lbnQgPSBuZXcgRGF0ZSgpKSB7XG4gICAgICAgIHJldHVybiBtb21lbnQgPj0gdGhpcy52YWxpZGl0eVBlcmlvZC5ub3RCZWZvcmUgJiYgbW9tZW50IDw9IHRoaXMudmFsaWRpdHlQZXJpb2Qubm90QWZ0ZXI7XG4gICAgfVxuICAgIGRlc2NyaXB0aW9uKCkge1xuICAgICAgICByZXR1cm4gJ3N1YmplY3Q6ICcgKyBDZXJ0LnN0cmluZ0Zyb21EaXN0aW5ndWlzaGVkTmFtZSh0aGlzLnN1YmplY3QpICtcbiAgICAgICAgICAgICh0aGlzLnN1YmplY3RBbHROYW1lcyA/ICdcXG5zdWJqZWN0IGFsdCBuYW1lczogJyArIHRoaXMuc3ViamVjdEFsdE5hbWVzLmpvaW4oJywgJykgOiAnJykgK1xuICAgICAgICAgICAgKHRoaXMuc3ViamVjdEtleUlkZW50aWZpZXIgPyBgXFxuc3ViamVjdCBrZXkgaWQ6ICR7aGV4RnJvbVU4KHRoaXMuc3ViamVjdEtleUlkZW50aWZpZXIsICcgJyl9YCA6ICcnKSArXG4gICAgICAgICAgICAnXFxuaXNzdWVyOiAnICsgQ2VydC5zdHJpbmdGcm9tRGlzdGluZ3Vpc2hlZE5hbWUodGhpcy5pc3N1ZXIpICtcbiAgICAgICAgICAgICh0aGlzLmF1dGhvcml0eUtleUlkZW50aWZpZXIgPyBgXFxuYXV0aG9yaXR5IGtleSBpZDogJHtoZXhGcm9tVTgodGhpcy5hdXRob3JpdHlLZXlJZGVudGlmaWVyLCAnICcpfWAgOiAnJykgK1xuICAgICAgICAgICAgJ1xcbnZhbGlkaXR5OiAnICsgdGhpcy52YWxpZGl0eVBlcmlvZC5ub3RCZWZvcmUudG9JU09TdHJpbmcoKSArICcg4oCTICcgKyB0aGlzLnZhbGlkaXR5UGVyaW9kLm5vdEFmdGVyLnRvSVNPU3RyaW5nKCkgKyBgICgke3RoaXMuaXNWYWxpZEF0TW9tZW50KCkgPyAnY3VycmVudGx5IHZhbGlkJyA6ICdub3QgdmFsaWQnfSlgICtcbiAgICAgICAgICAgICh0aGlzLmtleVVzYWdlID8gYFxcbmtleSB1c2FnZSAoJHt0aGlzLmtleVVzYWdlLmNyaXRpY2FsID8gJ2NyaXRpY2FsJyA6ICdub24tY3JpdGljYWwnfSk6IGAgK1xuICAgICAgICAgICAgICAgIFsuLi50aGlzLmtleVVzYWdlLnVzYWdlc10uam9pbignLCAnKSA6ICcnKSArXG4gICAgICAgICAgICAodGhpcy5leHRLZXlVc2FnZSA/IGBcXG5leHRlbmRlZCBrZXkgdXNhZ2U6IFRMUyBzZXJ2ZXIg4oCUwqAke3RoaXMuZXh0S2V5VXNhZ2Uuc2VydmVyVGxzfSwgVExTIGNsaWVudCDigJTCoCR7dGhpcy5leHRLZXlVc2FnZS5jbGllbnRUbHN9YCA6ICcnKSArXG4gICAgICAgICAgICAodGhpcy5iYXNpY0NvbnN0cmFpbnRzID8gYFxcbmJhc2ljIGNvbnN0cmFpbnRzICgke3RoaXMuYmFzaWNDb25zdHJhaW50cy5jcml0aWNhbCA/ICdjcml0aWNhbCcgOiAnbm9uLWNyaXRpY2FsJ30pOiBgICtcbiAgICAgICAgICAgICAgICBgQ0Eg4oCUwqAke3RoaXMuYmFzaWNDb25zdHJhaW50cy5jYX0sIHBhdGggbGVuZ3RoIOKAlCAke3RoaXMuYmFzaWNDb25zdHJhaW50cy5wYXRoTGVuZ3RofWAgOiAnJykgK1xuICAgICAgICAgICAgJ1xcbnNpZ25hdHVyZSBhbGdvcml0aG06ICcgKyBkZXNjcmlwdGlvbkZvckFsZ29yaXRobShhbGdvcml0aG1XaXRoT0lEKHRoaXMuYWxnb3JpdGhtKSk7XG4gICAgfVxuICAgIHRvSlNPTigpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHNlcmlhbE51bWJlcjogaGV4RnJvbVU4KHRoaXMuc2VyaWFsTnVtYmVyKSxcbiAgICAgICAgICAgIGFsZ29yaXRobTogdGhpcy5hbGdvcml0aG0sXG4gICAgICAgICAgICBpc3N1ZXI6IHRoaXMuaXNzdWVyLFxuICAgICAgICAgICAgdmFsaWRpdHlQZXJpb2Q6IHtcbiAgICAgICAgICAgICAgICBub3RCZWZvcmU6IHRoaXMudmFsaWRpdHlQZXJpb2Qubm90QmVmb3JlLnRvSVNPU3RyaW5nKCksXG4gICAgICAgICAgICAgICAgbm90QWZ0ZXI6IHRoaXMudmFsaWRpdHlQZXJpb2Qubm90QWZ0ZXIudG9JU09TdHJpbmcoKSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzdWJqZWN0OiB0aGlzLnN1YmplY3QsXG4gICAgICAgICAgICBwdWJsaWNLZXk6IHtcbiAgICAgICAgICAgICAgICBpZGVudGlmaWVyczogdGhpcy5wdWJsaWNLZXkuaWRlbnRpZmllcnMsXG4gICAgICAgICAgICAgICAgZGF0YTogaGV4RnJvbVU4KHRoaXMucHVibGljS2V5LmRhdGEpLFxuICAgICAgICAgICAgICAgIGFsbDogaGV4RnJvbVU4KHRoaXMucHVibGljS2V5LmFsbCksXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2lnbmF0dXJlOiBoZXhGcm9tVTgodGhpcy5zaWduYXR1cmUpLFxuICAgICAgICAgICAga2V5VXNhZ2U6IHtcbiAgICAgICAgICAgICAgICBjcml0aWNhbDogdGhpcy5rZXlVc2FnZT8uY3JpdGljYWwsXG4gICAgICAgICAgICAgICAgdXNhZ2VzOiBbLi4uKHRoaXMua2V5VXNhZ2U/LnVzYWdlcyA/PyBbXSldLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHN1YmplY3RBbHROYW1lczogdGhpcy5zdWJqZWN0QWx0TmFtZXMsXG4gICAgICAgICAgICBleHRLZXlVc2FnZTogdGhpcy5leHRLZXlVc2FnZSxcbiAgICAgICAgICAgIGF1dGhvcml0eUtleUlkZW50aWZpZXI6IHRoaXMuYXV0aG9yaXR5S2V5SWRlbnRpZmllciAmJiBoZXhGcm9tVTgodGhpcy5hdXRob3JpdHlLZXlJZGVudGlmaWVyKSxcbiAgICAgICAgICAgIHN1YmplY3RLZXlJZGVudGlmaWVyOiB0aGlzLnN1YmplY3RLZXlJZGVudGlmaWVyICYmIGhleEZyb21VOCh0aGlzLnN1YmplY3RLZXlJZGVudGlmaWVyKSxcbiAgICAgICAgICAgIGJhc2ljQ29uc3RyYWludHM6IHRoaXMuYmFzaWNDb25zdHJhaW50cyxcbiAgICAgICAgICAgIHNpZ25lZERhdGE6IGhleEZyb21VOCh0aGlzLnNpZ25lZERhdGEpLFxuICAgICAgICB9O1xuICAgIH1cbiAgICBzdGF0aWMgdWludDhBcnJheXNGcm9tUEVNKHBlbSkge1xuICAgICAgICBjb25zdCB0YWcgPSBcIltBLVowLTkgXStcIjtcbiAgICAgICAgY29uc3QgcGF0dGVybiA9IG5ldyBSZWdFeHAoYC0tLS0tQkVHSU4gJHt0YWd9LS0tLS0oW2EtekEtWjAtOT0rXFxcXC9cXFxcblxcXFxyXSspLS0tLS1FTkQgJHt0YWd9LS0tLS1gLCAnZycpO1xuICAgICAgICBjb25zdCByZXMgPSBbXTtcbiAgICAgICAgbGV0IG1hdGNoZXMgPSBudWxsO1xuICAgICAgICB3aGlsZSAobWF0Y2hlcyA9IHBhdHRlcm4uZXhlYyhwZW0pKSB7XG4gICAgICAgICAgICBjb25zdCBiYXNlNjQgPSBtYXRjaGVzWzFdLnJlcGxhY2UoL1tcXHJcXG5dL2csICcnKTtcbiAgICAgICAgICAgIGNvbnN0IGJpbmFyeSA9IGJhc2U2NERlY29kZShiYXNlNjQpO1xuICAgICAgICAgICAgcmVzLnB1c2goYmluYXJ5KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzO1xuICAgIH1cbiAgICBzdGF0aWMgZnJvbVBFTShwZW0pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudWludDhBcnJheXNGcm9tUEVNKHBlbSkubWFwKGFyciA9PiBuZXcgdGhpcyhhcnIpKTtcbiAgICB9XG59XG5leHBvcnQgY2xhc3MgVHJ1c3RlZENlcnQgZXh0ZW5kcyBDZXJ0IHtcbiAgICBzdGF0aWMgZGF0YWJhc2VGcm9tUEVNKHBlbSkge1xuICAgICAgICBjb25zdCBjZXJ0c0RhdGEgPSB0aGlzLnVpbnQ4QXJyYXlzRnJvbVBFTShwZW0pO1xuICAgICAgICBjb25zdCBvZmZzZXRzID0gWzBdO1xuICAgICAgICBjb25zdCBzdWJqZWN0cyA9IHt9O1xuICAgICAgICBjb25zdCBncm93YWJsZSA9IG5ldyBHcm93YWJsZURhdGEoKTtcbiAgICAgICAgZm9yIChjb25zdCBjZXJ0RGF0YSBvZiBjZXJ0c0RhdGEpIHtcbiAgICAgICAgICAgIGNvbnN0IGNlcnQgPSBuZXcgdGhpcyhjZXJ0RGF0YSk7XG4gICAgICAgICAgICBjb25zdCBvZmZzZXRJbmRleCA9IG9mZnNldHMubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgIGlmIChjZXJ0LnN1YmplY3RLZXlJZGVudGlmaWVyKVxuICAgICAgICAgICAgICAgIHN1YmplY3RzW2hleEZyb21VOChjZXJ0LnN1YmplY3RLZXlJZGVudGlmaWVyKV0gPSBvZmZzZXRJbmRleDtcbiAgICAgICAgICAgIHN1YmplY3RzW3RoaXMuc3RyaW5nRnJvbURpc3Rpbmd1aXNoZWROYW1lKGNlcnQuc3ViamVjdCldID0gb2Zmc2V0SW5kZXg7XG4gICAgICAgICAgICBncm93YWJsZS5hcHBlbmQoY2VydERhdGEpO1xuICAgICAgICAgICAgb2Zmc2V0c1tvZmZzZXRzLmxlbmd0aF0gPSBvZmZzZXRzW29mZnNldEluZGV4XSArIGNlcnREYXRhLmxlbmd0aDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBkYXRhID0gZ3Jvd2FibGUuZ2V0RGF0YSgpO1xuICAgICAgICByZXR1cm4geyBpbmRleDogeyBvZmZzZXRzLCBzdWJqZWN0cyB9LCBkYXRhIH07XG4gICAgfVxuICAgIHN0YXRpYyBmaW5kSW5EYXRhYmFzZShzdWJqZWN0T3JTdWJqZWN0S2V5SWQsIGRiKSB7XG4gICAgICAgIGNvbnN0IHsgaW5kZXg6IHsgc3ViamVjdHMsIG9mZnNldHMgfSwgZGF0YSB9ID0gZGI7XG4gICAgICAgIGNvbnN0IGtleSA9IHR5cGVvZiBzdWJqZWN0T3JTdWJqZWN0S2V5SWQgPT09ICdzdHJpbmcnID9cbiAgICAgICAgICAgIHN1YmplY3RPclN1YmplY3RLZXlJZCA6IENlcnQuc3RyaW5nRnJvbURpc3Rpbmd1aXNoZWROYW1lKHN1YmplY3RPclN1YmplY3RLZXlJZCk7XG4gICAgICAgIGNvbnN0IG9mZnNldEluZGV4ID0gc3ViamVjdHNba2V5XTtcbiAgICAgICAgaWYgKG9mZnNldEluZGV4ID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGNvbnN0IHN0YXJ0ID0gb2Zmc2V0c1tvZmZzZXRJbmRleF07XG4gICAgICAgIGNvbnN0IGVuZCA9IG9mZnNldHNbb2Zmc2V0SW5kZXggKyAxXTtcbiAgICAgICAgY29uc3QgY2VydERhdGEgPSBkYXRhLnN1YmFycmF5KHN0YXJ0LCBlbmQpO1xuICAgICAgICBjb25zdCBjZXJ0ID0gbmV3IHRoaXMoY2VydERhdGEpO1xuICAgICAgICByZXR1cm4gY2VydDtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBoZXhGcm9tVTggfSBmcm9tICcuLi91dGlsL2hleC5qcyc7XG5leHBvcnQgY29uc3QgdW5pdmVyc2FsVHlwZUJvb2xlYW4gPSAweDAxO1xuZXhwb3J0IGNvbnN0IHVuaXZlcnNhbFR5cGVJbnRlZ2VyID0gMHgwMjtcbmV4cG9ydCBjb25zdCBjb25zdHJ1Y3RlZFVuaXZlcnNhbFR5cGVTZXF1ZW5jZSA9IDB4MzA7XG5leHBvcnQgY29uc3QgY29uc3RydWN0ZWRVbml2ZXJzYWxUeXBlU2V0ID0gMHgzMTtcbmV4cG9ydCBjb25zdCB1bml2ZXJzYWxUeXBlT0lEID0gMHgwNjtcbmV4cG9ydCBjb25zdCB1bml2ZXJzYWxUeXBlUHJpbnRhYmxlU3RyaW5nID0gMHgxMztcbmV4cG9ydCBjb25zdCB1bml2ZXJzYWxUeXBlVGVsZXRleFN0cmluZyA9IDB4MTQ7XG5leHBvcnQgY29uc3QgdW5pdmVyc2FsVHlwZVVURjhTdHJpbmcgPSAweDBjO1xuZXhwb3J0IGNvbnN0IHVuaXZlcnNhbFR5cGVJQTVTdHJpbmcgPSAweDE2O1xuZXhwb3J0IGNvbnN0IHVuaXZlcnNhbFR5cGVVVENUaW1lID0gMHgxNztcbmV4cG9ydCBjb25zdCB1bml2ZXJzYWxUeXBlR2VuZXJhbGl6ZWRUaW1lID0gMHgxODtcbmV4cG9ydCBjb25zdCB1bml2ZXJzYWxUeXBlTnVsbCA9IDB4MDU7XG5leHBvcnQgY29uc3QgdW5pdmVyc2FsVHlwZU9jdGV0U3RyaW5nID0gMHgwNDtcbmV4cG9ydCBjb25zdCB1bml2ZXJzYWxUeXBlQml0U3RyaW5nID0gMHgwMztcbmV4cG9ydCBjb25zdCBjb25zdHJ1Y3RlZENvbnRleHRTcGVjaWZpY1R5cGUgPSAweGEzOyAvLyBjb250ZXh0LXNwZWNpZmljIGlzIDB4ODAgKDEgaW4gYml0IDgsIDAgaW4gYml0IDcpOyBjb25zdHJ1Y3RlZCBpcyAweDIwICgxIGluIGJpdCA2KVxuZXhwb3J0IGNvbnN0IGNvbnRleHRTcGVjaWZpY1R5cGUgPSAweDgwO1xuZXhwb3J0IHZhciBHZW5lcmFsTmFtZTtcbihmdW5jdGlvbiAoR2VuZXJhbE5hbWUpIHtcbiAgICBHZW5lcmFsTmFtZVtHZW5lcmFsTmFtZVtcIm90aGVyTmFtZVwiXSA9IDBdID0gXCJvdGhlck5hbWVcIjtcbiAgICBHZW5lcmFsTmFtZVtHZW5lcmFsTmFtZVtcInJmYzgyMk5hbWVcIl0gPSAxXSA9IFwicmZjODIyTmFtZVwiO1xuICAgIEdlbmVyYWxOYW1lW0dlbmVyYWxOYW1lW1wiZE5TTmFtZVwiXSA9IDJdID0gXCJkTlNOYW1lXCI7XG4gICAgR2VuZXJhbE5hbWVbR2VuZXJhbE5hbWVbXCJ4NDAwQWRkcmVzc1wiXSA9IDNdID0gXCJ4NDAwQWRkcmVzc1wiO1xuICAgIEdlbmVyYWxOYW1lW0dlbmVyYWxOYW1lW1wiZGlyZWN0b3J5TmFtZVwiXSA9IDRdID0gXCJkaXJlY3RvcnlOYW1lXCI7XG4gICAgR2VuZXJhbE5hbWVbR2VuZXJhbE5hbWVbXCJlZGlQYXJ0eU5hbWVcIl0gPSA1XSA9IFwiZWRpUGFydHlOYW1lXCI7XG4gICAgR2VuZXJhbE5hbWVbR2VuZXJhbE5hbWVbXCJ1bmlmb3JtUmVzb3VyY2VJZGVudGlmaWVyXCJdID0gNl0gPSBcInVuaWZvcm1SZXNvdXJjZUlkZW50aWZpZXJcIjtcbiAgICBHZW5lcmFsTmFtZVtHZW5lcmFsTmFtZVtcImlQQWRkcmVzc1wiXSA9IDddID0gXCJpUEFkZHJlc3NcIjtcbiAgICBHZW5lcmFsTmFtZVtHZW5lcmFsTmFtZVtcInJlZ2lzdGVyZWRJRFwiXSA9IDhdID0gXCJyZWdpc3RlcmVkSURcIjtcbn0pKEdlbmVyYWxOYW1lIHx8IChHZW5lcmFsTmFtZSA9IHt9KSk7XG5leHBvcnQgY29uc3QgRE5PSURNYXAgPSB7XG4gICAgXCIyLjUuNC42XCI6IFwiQ1wiLCAvLyBjb3VudHJ5XG4gICAgXCIyLjUuNC4xMFwiOiBcIk9cIiwgLy8gb3JnYW5pc2F0aW9uXG4gICAgXCIyLjUuNC4xMVwiOiBcIk9VXCIsIC8vIG9yZ2FuaXNhdGlvbmFsIHVuaXRcbiAgICBcIjIuNS40LjNcIjogXCJDTlwiLCAvLyBjb21tb24gbmFtZVxuICAgIFwiMi41LjQuN1wiOiBcIkxcIiwgLy8gbG9jYWxpdHlcbiAgICBcIjIuNS40LjhcIjogXCJTVFwiLCAvLyBzdGF0ZS9wcm92aW5jZVxuICAgIFwiMi41LjQuMTJcIjogXCJUXCIsIC8vIHRpdGxlXG4gICAgXCIyLjUuNC40MlwiOiBcIkdOXCIsIC8vIGdpdmVuIG5hbWVcbiAgICBcIjIuNS40LjQzXCI6IFwiSVwiLCAvLyBpbml0aWFsc1xuICAgIFwiMi41LjQuNFwiOiBcIlNOXCIsIC8vIHN1cm5hbWVcbiAgICBcIjEuMi44NDAuMTEzNTQ5LjEuOS4xXCI6IFwiTUFJTFwiLFxuICAgIFwiMi41LjQuNVwiOiBcIlNFUklBTE5VTUJFUlwiLFxufTtcbmV4cG9ydCBjb25zdCBrZXlPSURNYXAgPSB7XG4gICAgXCIxLjIuODQwLjEwMDQ1LjIuMVwiOiBcIkVDUHVibGljS2V5XCIsXG4gICAgXCIxLjIuODQwLjEwMDQ1LjMuMS43XCI6IFwic2VjcDI1NnIxXCIsXG4gICAgXCIxLjMuMTMyLjAuMzRcIjogXCJzZWNwMzg0cjFcIixcbiAgICBcIjEuMi44NDAuMTEzNTQ5LjEuMS4xXCI6IFwiUlNBRVMtUEtDUzEtdjFfNVwiLFxufTtcbmV4cG9ydCBjb25zdCBleHRPSURNYXAgPSB7XG4gICAgXCIyLjUuMjkuMTVcIjogXCJLZXlVc2FnZVwiLFxuICAgIFwiMi41LjI5LjM3XCI6IFwiRXh0S2V5VXNhZ2VcIixcbiAgICBcIjIuNS4yOS4xOVwiOiBcIkJhc2ljQ29uc3RyYWludHNcIixcbiAgICBcIjIuNS4yOS4zMFwiOiBcIk5hbWVDb25zdHJhaW50c1wiLFxuICAgIFwiMi41LjI5LjE0XCI6IFwiU3ViamVjdEtleUlkZW50aWZpZXJcIixcbiAgICBcIjIuNS4yOS4zNVwiOiBcIkF1dGhvcml0eUtleUlkZW50aWZpZXJcIixcbiAgICBcIjEuMy42LjEuNS41LjcuMS4xXCI6IFwiQXV0aG9yaXR5SW5mb0FjY2Vzc1wiLFxuICAgIFwiMi41LjI5LjE3XCI6IFwiU3ViamVjdEFsdE5hbWVcIixcbiAgICBcIjIuNS4yOS4zMlwiOiBcIkNlcnRpZmljYXRlUG9saWNpZXNcIixcbiAgICBcIjEuMy42LjEuNC4xLjExMTI5LjIuNC4yXCI6IFwiU2lnbmVkQ2VydGlmaWNhdGVUaW1lc3RhbXBMaXN0XCIsXG4gICAgXCIyLjUuMjkuMzFcIjogXCJDUkxEaXN0cmlidXRpb25Qb2ludHMgKENlcnRpZmljYXRlIFJldm9jYXRpb24gTGlzdClcIixcbn07XG5leHBvcnQgY29uc3QgZXh0S2V5VXNhZ2VPSURNYXAgPSB7XG4gICAgXCIxLjMuNi4xLjUuNS43LjMuMlwiOiBcIlRMU0NsaWVudEF1dGhcIixcbiAgICBcIjEuMy42LjEuNS41LjcuMy4xXCI6IFwiVExTU2VydmVyQXV0aFwiLFxufTtcbmV4cG9ydCBjb25zdCBleHRBY2Nlc3NNZXRob2RPSURNYXAgPSB7XG4gICAgJzEuMy42LjEuNS41LjcuNDguMSc6ICdPQ1NQJyxcbiAgICAnMS4zLjYuMS41LjUuNy40OC4yJzogJ2NlcnRpZmljYXRlIGF1dGhvcml0eSBpc3N1ZXJzJyxcbn07XG5leHBvcnQgY29uc3QgY2VydFBvbE9JRE1hcCA9IHtcbiAgICAnMi4yMy4xNDAuMS4yLjEnOiAnZG9tYWluIHZhbGlkYXRlZCcsXG4gICAgJzIuMjMuMTQwLjEuMi4yJzogJ3N1YmplY3QgaWRlbnRpdHkgdmFsaWRhdGVkJyxcbiAgICAnMS4zLjYuMS40LjEuNDQ5NDcuMS4xLjEnOiAnSVNSRyBkb21haW4gdmFsaWRhdGVkJyxcbn07XG5leHBvcnQgY29uc3QgY2VydFBvbFF1YWxPSURNYXAgPSB7XG4gICAgJzEuMy42LjEuNS41LjcuMi4xJzogJ0NlcnRpZmljYXRlIFByYWN0aWNlIFN0YXRlbWVudCcsXG59O1xuZXhwb3J0IGZ1bmN0aW9uIGludEZyb21CaXRTdHJpbmcoYnMpIHtcbiAgICBjb25zdCB7IGxlbmd0aCB9ID0gYnM7XG4gICAgaWYgKGxlbmd0aCA+IDQpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgQml0IHN0cmluZyBsZW5ndGggJHtsZW5ndGh9IHdvdWxkIG92ZXJmbG93IEpTIGJpdCBvcGVyYXRvcnNgKTtcbiAgICAvLyBpbXBsZW1lbnQgYmlnSW50RnJvbUJpdFN0cmluZyBpZiBsb25nZXIgaXMgbmVlZGVkXG4gICAgbGV0IHJlc3VsdCA9IDA7XG4gICAgbGV0IGxlZnRTaGlmdCA9IDA7XG4gICAgZm9yIChsZXQgaSA9IGJzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgIHJlc3VsdCB8PSBic1tpXSA8PCBsZWZ0U2hpZnQ7XG4gICAgICAgIGxlZnRTaGlmdCArPSA4O1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuZXhwb3J0IGZ1bmN0aW9uIHJlYWRTZXFPZlNldE9mU2VxKGNiLCBzZXFUeXBlKSB7XG4gICAgY29uc3QgcmVzdWx0ID0ge307XG4gICAgY2IuZXhwZWN0VWludDgoY29uc3RydWN0ZWRVbml2ZXJzYWxUeXBlU2VxdWVuY2UsIGNoYXR0eSAmJiBgc2VxdWVuY2UgKCR7c2VxVHlwZX0pYCk7XG4gICAgY29uc3QgW2VuZFNlcSwgc2VxUmVtYWluaW5nXSA9IGNiLmV4cGVjdEFTTjFMZW5ndGgoY2hhdHR5ICYmICdzZXF1ZW5jZScpO1xuICAgIHdoaWxlIChzZXFSZW1haW5pbmcoKSA+IDApIHtcbiAgICAgICAgY2IuZXhwZWN0VWludDgoY29uc3RydWN0ZWRVbml2ZXJzYWxUeXBlU2V0LCBjaGF0dHkgJiYgJ3NldCcpO1xuICAgICAgICBjb25zdCBbZW5kSXRlbVNldF0gPSBjYi5leHBlY3RBU04xTGVuZ3RoKGNoYXR0eSAmJiAnc2V0Jyk7XG4gICAgICAgIGNiLmV4cGVjdFVpbnQ4KGNvbnN0cnVjdGVkVW5pdmVyc2FsVHlwZVNlcXVlbmNlLCBjaGF0dHkgJiYgJ3NlcXVlbmNlJyk7XG4gICAgICAgIGNvbnN0IFtlbmRJdGVtU2VxXSA9IGNiLmV4cGVjdEFTTjFMZW5ndGgoY2hhdHR5ICYmICdzZXF1ZW5jZScpO1xuICAgICAgICBjYi5leHBlY3RVaW50OCh1bml2ZXJzYWxUeXBlT0lELCBjaGF0dHkgJiYgJ09JRCcpO1xuICAgICAgICBjb25zdCBpdGVtT0lEID0gY2IucmVhZEFTTjFPSUQoKTtcbiAgICAgICAgY29uc3QgaXRlbU5hbWUgPSBETk9JRE1hcFtpdGVtT0lEXSA/PyBpdGVtT0lEO1xuICAgICAgICBjaGF0dHkgJiYgY2IuY29tbWVudChgJHtpdGVtT0lEfSA9ICR7aXRlbU5hbWV9YCk7XG4gICAgICAgIGNvbnN0IHZhbHVlVHlwZSA9IGNiLnJlYWRVaW50OCgpO1xuICAgICAgICBpZiAodmFsdWVUeXBlID09PSB1bml2ZXJzYWxUeXBlUHJpbnRhYmxlU3RyaW5nKSB7XG4gICAgICAgICAgICBjaGF0dHkgJiYgY2IuY29tbWVudCgncHJpbnRhYmxlIHN0cmluZycpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHZhbHVlVHlwZSA9PT0gdW5pdmVyc2FsVHlwZVVURjhTdHJpbmcpIHtcbiAgICAgICAgICAgIGNoYXR0eSAmJiBjYi5jb21tZW50KCdVVEY4IHN0cmluZycpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHZhbHVlVHlwZSA9PT0gdW5pdmVyc2FsVHlwZUlBNVN0cmluZykge1xuICAgICAgICAgICAgY2hhdHR5ICYmIGNiLmNvbW1lbnQoJ0lBNSBzdHJpbmcnKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh2YWx1ZVR5cGUgPT09IHVuaXZlcnNhbFR5cGVUZWxldGV4U3RyaW5nKSB7XG4gICAgICAgICAgICBjaGF0dHkgJiYgY2IuY29tbWVudCgnVGVsZXRleCBzdHJpbmcnKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgVW5leHBlY3RlZCBpdGVtIHR5cGUgaW4gY2VydGlmaWNhdGUgJHtzZXFUeXBlfTogMHgke2hleEZyb21VOChbdmFsdWVUeXBlXSl9YCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgW2VuZEl0ZW1TdHJpbmcsIGl0ZW1TdHJpbmdSZW1haW5pbmddID0gY2IuZXhwZWN0QVNOMUxlbmd0aChjaGF0dHkgJiYgJ1VURjggc3RyaW5nJyk7XG4gICAgICAgIGNvbnN0IGl0ZW1WYWx1ZSA9IGNiLnJlYWRVVEY4U3RyaW5nKGl0ZW1TdHJpbmdSZW1haW5pbmcoKSk7XG4gICAgICAgIGVuZEl0ZW1TdHJpbmcoKTtcbiAgICAgICAgZW5kSXRlbVNlcSgpO1xuICAgICAgICBlbmRJdGVtU2V0KCk7XG4gICAgICAgIGNvbnN0IGV4aXN0aW5nVmFsdWUgPSByZXN1bHRbaXRlbU5hbWVdO1xuICAgICAgICBpZiAoZXhpc3RpbmdWYWx1ZSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgcmVzdWx0W2l0ZW1OYW1lXSA9IGl0ZW1WYWx1ZTtcbiAgICAgICAgZWxzZSBpZiAodHlwZW9mIGV4aXN0aW5nVmFsdWUgPT09ICdzdHJpbmcnKVxuICAgICAgICAgICAgcmVzdWx0W2l0ZW1OYW1lXSA9IFtleGlzdGluZ1ZhbHVlLCBpdGVtVmFsdWVdO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICBleGlzdGluZ1ZhbHVlLnB1c2goaXRlbVZhbHVlKTtcbiAgICB9XG4gICAgZW5kU2VxKCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbmV4cG9ydCBmdW5jdGlvbiByZWFkTmFtZXNTZXEoY2IsIHR5cGVVbmlvbkJpdHMgPSAweDAwKSB7XG4gICAgY29uc3QgbmFtZXMgPSBbXTtcbiAgICBjb25zdCBbZW5kTmFtZXNTZXEsIG5hbWVzU2VxUmVtYWluaW5nXSA9IGNiLmV4cGVjdEFTTjFMZW5ndGgoY2hhdHR5ICYmICduYW1lcyBzZXF1ZW5jZScpO1xuICAgIHdoaWxlIChuYW1lc1NlcVJlbWFpbmluZygpID4gMCkge1xuICAgICAgICBjb25zdCB0eXBlID0gY2IucmVhZFVpbnQ4KGNoYXR0eSAmJiAnR2VuZXJhbE5hbWVzIHR5cGUnKTtcbiAgICAgICAgY29uc3QgW2VuZE5hbWUsIG5hbWVSZW1haW5pbmddID0gY2IuZXhwZWN0QVNOMUxlbmd0aChjaGF0dHkgJiYgJ25hbWUnKTtcbiAgICAgICAgbGV0IG5hbWU7XG4gICAgICAgIGlmICh0eXBlID09PSAodHlwZVVuaW9uQml0cyB8IEdlbmVyYWxOYW1lLmROU05hbWUpKSB7XG4gICAgICAgICAgICBuYW1lID0gY2IucmVhZFVURjhTdHJpbmcobmFtZVJlbWFpbmluZygpKTtcbiAgICAgICAgICAgIGNoYXR0eSAmJiBjYi5jb21tZW50KCc9IEROUyBuYW1lJyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBuYW1lID0gY2IucmVhZEJ5dGVzKG5hbWVSZW1haW5pbmcoKSk7XG4gICAgICAgICAgICBjaGF0dHkgJiYgY2IuY29tbWVudChgPSBuYW1lICh0eXBlIDB4JHtoZXhGcm9tVTgoW3R5cGVdKX0pYCk7XG4gICAgICAgIH1cbiAgICAgICAgbmFtZXMucHVzaCh7IG5hbWUsIHR5cGUgfSk7XG4gICAgICAgIGVuZE5hbWUoKTtcbiAgICB9XG4gICAgZW5kTmFtZXNTZXEoKTtcbiAgICByZXR1cm4gbmFtZXM7XG59XG5leHBvcnQgZnVuY3Rpb24gYWxnb3JpdGhtV2l0aE9JRChvaWQpIHtcbiAgICBjb25zdCBhbGdvID0ge1xuICAgICAgICBcIjEuMi44NDAuMTEzNTQ5LjEuMS4xXCI6IHtcbiAgICAgICAgICAgIG5hbWU6IFwiUlNBRVMtUEtDUzEtdjFfNVwiXG4gICAgICAgIH0sXG4gICAgICAgIFwiMS4yLjg0MC4xMTM1NDkuMS4xLjVcIjoge1xuICAgICAgICAgICAgbmFtZTogXCJSU0FTU0EtUEtDUzEtdjFfNVwiLFxuICAgICAgICAgICAgaGFzaDoge1xuICAgICAgICAgICAgICAgIG5hbWU6IFwiU0hBLTFcIlxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcIjEuMi44NDAuMTEzNTQ5LjEuMS4xMVwiOiB7XG4gICAgICAgICAgICBuYW1lOiBcIlJTQVNTQS1QS0NTMS12MV81XCIsXG4gICAgICAgICAgICBoYXNoOiB7XG4gICAgICAgICAgICAgICAgbmFtZTogXCJTSEEtMjU2XCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCIxLjIuODQwLjExMzU0OS4xLjEuMTJcIjoge1xuICAgICAgICAgICAgbmFtZTogXCJSU0FTU0EtUEtDUzEtdjFfNVwiLFxuICAgICAgICAgICAgaGFzaDoge1xuICAgICAgICAgICAgICAgIG5hbWU6IFwiU0hBLTM4NFwiXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwiMS4yLjg0MC4xMTM1NDkuMS4xLjEzXCI6IHtcbiAgICAgICAgICAgIG5hbWU6IFwiUlNBU1NBLVBLQ1MxLXYxXzVcIixcbiAgICAgICAgICAgIGhhc2g6IHtcbiAgICAgICAgICAgICAgICBuYW1lOiBcIlNIQS01MTJcIlxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcIjEuMi44NDAuMTEzNTQ5LjEuMS4xMFwiOiB7XG4gICAgICAgICAgICBuYW1lOiBcIlJTQS1QU1NcIlxuICAgICAgICB9LFxuICAgICAgICBcIjEuMi44NDAuMTEzNTQ5LjEuMS43XCI6IHtcbiAgICAgICAgICAgIG5hbWU6IFwiUlNBLU9BRVBcIlxuICAgICAgICB9LFxuICAgICAgICBcIjEuMi44NDAuMTAwNDUuMi4xXCI6IHtcbiAgICAgICAgICAgIG5hbWU6IFwiRUNEU0FcIixcbiAgICAgICAgICAgIGhhc2g6IHtcbiAgICAgICAgICAgICAgICBuYW1lOiBcIlNIQS0xXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCIxLjIuODQwLjEwMDQ1LjQuMVwiOiB7XG4gICAgICAgICAgICBuYW1lOiBcIkVDRFNBXCIsXG4gICAgICAgICAgICBoYXNoOiB7XG4gICAgICAgICAgICAgICAgbmFtZTogXCJTSEEtMVwiXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwiMS4yLjg0MC4xMDA0NS40LjMuMlwiOiB7XG4gICAgICAgICAgICBuYW1lOiBcIkVDRFNBXCIsXG4gICAgICAgICAgICBoYXNoOiB7XG4gICAgICAgICAgICAgICAgbmFtZTogXCJTSEEtMjU2XCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCIxLjIuODQwLjEwMDQ1LjQuMy4zXCI6IHtcbiAgICAgICAgICAgIG5hbWU6IFwiRUNEU0FcIiwgaGFzaDoge1xuICAgICAgICAgICAgICAgIG5hbWU6IFwiU0hBLTM4NFwiXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwiMS4yLjg0MC4xMDA0NS40LjMuNFwiOiB7XG4gICAgICAgICAgICBuYW1lOiBcIkVDRFNBXCIsXG4gICAgICAgICAgICBoYXNoOiB7XG4gICAgICAgICAgICAgICAgbmFtZTogXCJTSEEtNTEyXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCIxLjMuMTMzLjE2Ljg0MC42My4wLjJcIjoge1xuICAgICAgICAgICAgbmFtZTogXCJFQ0RIXCIsXG4gICAgICAgICAgICBrZGY6IFwiU0hBLTFcIlxuICAgICAgICB9LFxuICAgICAgICBcIjEuMy4xMzIuMS4xMS4xXCI6IHtcbiAgICAgICAgICAgIG5hbWU6IFwiRUNESFwiLFxuICAgICAgICAgICAga2RmOiBcIlNIQS0yNTZcIlxuICAgICAgICB9LFxuICAgICAgICBcIjEuMy4xMzIuMS4xMS4yXCI6IHtcbiAgICAgICAgICAgIG5hbWU6IFwiRUNESFwiLFxuICAgICAgICAgICAga2RmOiBcIlNIQS0zODRcIlxuICAgICAgICB9LFxuICAgICAgICBcIjEuMy4xMzIuMS4xMS4zXCI6IHtcbiAgICAgICAgICAgIG5hbWU6IFwiRUNESFwiLFxuICAgICAgICAgICAga2RmOiBcIlNIQS01MTJcIlxuICAgICAgICB9LFxuICAgICAgICBcIjIuMTYuODQwLjEuMTAxLjMuNC4xLjJcIjoge1xuICAgICAgICAgICAgbmFtZTogXCJBRVMtQ0JDXCIsXG4gICAgICAgICAgICBsZW5ndGg6IDEyOFxuICAgICAgICB9LFxuICAgICAgICBcIjIuMTYuODQwLjEuMTAxLjMuNC4xLjIyXCI6IHtcbiAgICAgICAgICAgIG5hbWU6IFwiQUVTLUNCQ1wiLFxuICAgICAgICAgICAgbGVuZ3RoOiAxOTJcbiAgICAgICAgfSxcbiAgICAgICAgXCIyLjE2Ljg0MC4xLjEwMS4zLjQuMS40MlwiOiB7XG4gICAgICAgICAgICBuYW1lOiBcIkFFUy1DQkNcIixcbiAgICAgICAgICAgIGxlbmd0aDogMjU2XG4gICAgICAgIH0sXG4gICAgICAgIFwiMi4xNi44NDAuMS4xMDEuMy40LjEuNlwiOiB7XG4gICAgICAgICAgICBuYW1lOiBcIkFFUy1HQ01cIixcbiAgICAgICAgICAgIGxlbmd0aDogMTI4XG4gICAgICAgIH0sXG4gICAgICAgIFwiMi4xNi44NDAuMS4xMDEuMy40LjEuMjZcIjoge1xuICAgICAgICAgICAgbmFtZTogXCJBRVMtR0NNXCIsXG4gICAgICAgICAgICBsZW5ndGg6IDE5MlxuICAgICAgICB9LFxuICAgICAgICBcIjIuMTYuODQwLjEuMTAxLjMuNC4xLjQ2XCI6IHtcbiAgICAgICAgICAgIG5hbWU6IFwiQUVTLUdDTVwiLFxuICAgICAgICAgICAgbGVuZ3RoOiAyNTZcbiAgICAgICAgfSxcbiAgICAgICAgXCIyLjE2Ljg0MC4xLjEwMS4zLjQuMS40XCI6IHtcbiAgICAgICAgICAgIG5hbWU6IFwiQUVTLUNGQlwiLFxuICAgICAgICAgICAgbGVuZ3RoOiAxMjhcbiAgICAgICAgfSxcbiAgICAgICAgXCIyLjE2Ljg0MC4xLjEwMS4zLjQuMS4yNFwiOiB7XG4gICAgICAgICAgICBuYW1lOiBcIkFFUy1DRkJcIixcbiAgICAgICAgICAgIGxlbmd0aDogMTkyXG4gICAgICAgIH0sXG4gICAgICAgIFwiMi4xNi44NDAuMS4xMDEuMy40LjEuNDRcIjoge1xuICAgICAgICAgICAgbmFtZTogXCJBRVMtQ0ZCXCIsXG4gICAgICAgICAgICBsZW5ndGg6IDI1NlxuICAgICAgICB9LFxuICAgICAgICBcIjIuMTYuODQwLjEuMTAxLjMuNC4xLjVcIjoge1xuICAgICAgICAgICAgbmFtZTogXCJBRVMtS1dcIixcbiAgICAgICAgICAgIGxlbmd0aDogMTI4XG4gICAgICAgIH0sXG4gICAgICAgIFwiMi4xNi44NDAuMS4xMDEuMy40LjEuMjVcIjoge1xuICAgICAgICAgICAgbmFtZTogXCJBRVMtS1dcIixcbiAgICAgICAgICAgIGxlbmd0aDogMTkyXG4gICAgICAgIH0sXG4gICAgICAgIFwiMi4xNi44NDAuMS4xMDEuMy40LjEuNDVcIjoge1xuICAgICAgICAgICAgbmFtZTogXCJBRVMtS1dcIixcbiAgICAgICAgICAgIGxlbmd0aDogMjU2XG4gICAgICAgIH0sXG4gICAgICAgIFwiMS4yLjg0MC4xMTM1NDkuMi43XCI6IHtcbiAgICAgICAgICAgIG5hbWU6IFwiSE1BQ1wiLFxuICAgICAgICAgICAgaGFzaDoge1xuICAgICAgICAgICAgICAgIG5hbWU6IFwiU0hBLTFcIlxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcIjEuMi44NDAuMTEzNTQ5LjIuOVwiOiB7XG4gICAgICAgICAgICBuYW1lOiBcIkhNQUNcIixcbiAgICAgICAgICAgIGhhc2g6IHtcbiAgICAgICAgICAgICAgICBuYW1lOiBcIlNIQS0yNTZcIlxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcIjEuMi44NDAuMTEzNTQ5LjIuMTBcIjoge1xuICAgICAgICAgICAgbmFtZTogXCJITUFDXCIsXG4gICAgICAgICAgICBoYXNoOiB7XG4gICAgICAgICAgICAgICAgbmFtZTogXCJTSEEtMzg0XCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCIxLjIuODQwLjExMzU0OS4yLjExXCI6IHtcbiAgICAgICAgICAgIG5hbWU6IFwiSE1BQ1wiLFxuICAgICAgICAgICAgaGFzaDoge1xuICAgICAgICAgICAgICAgIG5hbWU6IFwiU0hBLTUxMlwiXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwiMS4yLjg0MC4xMTM1NDkuMS45LjE2LjMuNVwiOiB7XG4gICAgICAgICAgICBuYW1lOiBcIkRIXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCIxLjMuMTQuMy4yLjI2XCI6IHtcbiAgICAgICAgICAgIG5hbWU6IFwiU0hBLTFcIlxuICAgICAgICB9LFxuICAgICAgICBcIjIuMTYuODQwLjEuMTAxLjMuNC4yLjFcIjoge1xuICAgICAgICAgICAgbmFtZTogXCJTSEEtMjU2XCJcbiAgICAgICAgfSxcbiAgICAgICAgXCIyLjE2Ljg0MC4xLjEwMS4zLjQuMi4yXCI6IHtcbiAgICAgICAgICAgIG5hbWU6IFwiU0hBLTM4NFwiXG4gICAgICAgIH0sXG4gICAgICAgIFwiMi4xNi44NDAuMS4xMDEuMy40LjIuM1wiOiB7XG4gICAgICAgICAgICBuYW1lOiBcIlNIQS01MTJcIlxuICAgICAgICB9LFxuICAgICAgICBcIjEuMi44NDAuMTEzNTQ5LjEuNS4xMlwiOiB7XG4gICAgICAgICAgICBuYW1lOiBcIlBCS0RGMlwiXG4gICAgICAgIH0sXG4gICAgICAgIC8vIHNwZWNpYWwgY2FzZTogT0lEcyBmb3IgRUNDIGN1cnZlc1xuICAgICAgICBcIjEuMi44NDAuMTAwNDUuMy4xLjdcIjoge1xuICAgICAgICAgICAgbmFtZTogXCJQLTI1NlwiXG4gICAgICAgIH0sXG4gICAgICAgIFwiMS4zLjEzMi4wLjM0XCI6IHtcbiAgICAgICAgICAgIG5hbWU6IFwiUC0zODRcIlxuICAgICAgICB9LFxuICAgICAgICBcIjEuMy4xMzIuMC4zNVwiOiB7XG4gICAgICAgICAgICBuYW1lOiBcIlAtNTIxXCJcbiAgICAgICAgfSxcbiAgICB9W29pZF07XG4gICAgaWYgKGFsZ28gPT09IHVuZGVmaW5lZClcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbnN1cHBvcnRlZCBhbGdvcml0aG0gaWRlbnRpZmllcjogJHtvaWR9YCk7XG4gICAgcmV0dXJuIGFsZ287XG59XG5mdW5jdGlvbiBfZGVzY3JpcHRpb25Gb3JBbGdvcml0aG0oYWxnbywgZGVzYyA9IFtdKSB7XG4gICAgT2JqZWN0LnZhbHVlcyhhbGdvKS5mb3JFYWNoKHZhbHVlID0+IHtcbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpXG4gICAgICAgICAgICBkZXNjID0gWy4uLmRlc2MsIHZhbHVlXTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgZGVzYyA9IF9kZXNjcmlwdGlvbkZvckFsZ29yaXRobSh2YWx1ZSwgZGVzYyk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGRlc2M7XG59XG5leHBvcnQgZnVuY3Rpb24gZGVzY3JpcHRpb25Gb3JBbGdvcml0aG0oYWxnbykge1xuICAgIHJldHVybiBfZGVzY3JpcHRpb25Gb3JBbGdvcml0aG0oYWxnbykuam9pbignIC8gJyk7XG59XG4iLCJpbXBvcnQgeyBsb2cgfSBmcm9tICcuLi9wcmVzZW50YXRpb24vbG9nLmpzJztcbmltcG9ydCB7IGNvbmNhdCB9IGZyb20gJy4uL3V0aWwvYXJyYXkuanMnO1xuaW1wb3J0IHsgY29uc3RydWN0ZWRVbml2ZXJzYWxUeXBlU2VxdWVuY2UsIHVuaXZlcnNhbFR5cGVJbnRlZ2VyIH0gZnJvbSAnLi9jZXJ0VXRpbHMuanMnO1xuaW1wb3J0IGNzIGZyb20gJy4uL3V0aWwvY3J5cHRvUHJveHkuanMnO1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGVjZHNhVmVyaWZ5KHNiIC8qIHNpZ25hdHVyZSAqLywgcHVibGljS2V5LCBzaWduZWREYXRhLCBuYW1lZEN1cnZlLCBoYXNoKSB7XG4gICAgc2IuZXhwZWN0VWludDgoY29uc3RydWN0ZWRVbml2ZXJzYWxUeXBlU2VxdWVuY2UsIGNoYXR0eSAmJiAnc2VxdWVuY2UnKTtcbiAgICBjb25zdCBbZW5kU2lnRGVyXSA9IHNiLmV4cGVjdEFTTjFMZW5ndGgoY2hhdHR5ICYmICdzZXF1ZW5jZScpO1xuICAgIHNiLmV4cGVjdFVpbnQ4KHVuaXZlcnNhbFR5cGVJbnRlZ2VyLCBjaGF0dHkgJiYgJ2ludGVnZXInKTtcbiAgICBjb25zdCBbZW5kU2lnUkJ5dGVzLCBzaWdSQnl0ZXNSZW1haW5pbmddID0gc2IuZXhwZWN0QVNOMUxlbmd0aChjaGF0dHkgJiYgJ2ludGVnZXInKTtcbiAgICBsZXQgc2lnUiA9IHNiLnJlYWRCeXRlcyhzaWdSQnl0ZXNSZW1haW5pbmcoKSk7XG4gICAgY2hhdHR5ICYmIHNiLmNvbW1lbnQoJ3NpZ25hdHVyZTogcicpO1xuICAgIGVuZFNpZ1JCeXRlcygpO1xuICAgIHNiLmV4cGVjdFVpbnQ4KHVuaXZlcnNhbFR5cGVJbnRlZ2VyLCBjaGF0dHkgJiYgJ2ludGVnZXInKTtcbiAgICBjb25zdCBbZW5kU2lnU0J5dGVzLCBzaWdTQnl0ZXNSZW1haW5pbmddID0gc2IuZXhwZWN0QVNOMUxlbmd0aChjaGF0dHkgJiYgJ2ludGVnZXInKTtcbiAgICBsZXQgc2lnUyA9IHNiLnJlYWRCeXRlcyhzaWdTQnl0ZXNSZW1haW5pbmcoKSk7XG4gICAgY2hhdHR5ICYmIHNiLmNvbW1lbnQoJ3NpZ25hdHVyZTogcycpO1xuICAgIGVuZFNpZ1NCeXRlcygpO1xuICAgIGVuZFNpZ0RlcigpO1xuICAgIC8qXG4gICAgV2ViQ3J5cHRvIGV4cGVjdHMgYSA2NC0gb3IgOTYtYnl0ZSBQMTM2MyBzaWduYXR1cmUsIHdoaWNoIHNvbWV0aW1lcyBkaXNjYXJkcyBhIGxlYWRpbmcgemVybyBvbiByIGFuZCBzIHRoYXQncyBhZGRlZCB0byBpbmRpY2F0ZSBwb3NpdGl2ZSBzaWduXG4gICAgLSBodHRwczovL2NyeXB0by5zdGFja2V4Y2hhbmdlLmNvbS9xdWVzdGlvbnMvNTc3MzEvZWNkc2Etc2lnbmF0dXJlLXJzLXRvLWFzbjEtZGVyLWVuY29kaW5nLXF1ZXN0aW9uXG4gICAgLSBodHRwczovL2NyeXB0by5zdGFja2V4Y2hhbmdlLmNvbS9xdWVzdGlvbnMvMTc5NS9ob3ctY2FuLWktY29udmVydC1hLWRlci1lY2RzYS1zaWduYXR1cmUtdG8tYXNuLTEvMTc5NyMxNzk3XG4gICAgLSBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvNjU0MDMyMjlcbiAgICAqL1xuICAgIGNvbnN0IGNsYW1wVG9MZW5ndGggPSAoeCwgY2xhbXBMZW5ndGgpID0+IHgubGVuZ3RoID4gY2xhbXBMZW5ndGggPyB4LnN1YmFycmF5KHgubGVuZ3RoIC0gY2xhbXBMZW5ndGgpIDogLy8gdG9vIGxvbmc/IGN1dCBvZmYgbGVmdG1vc3QgYnl0ZXMgKG1zYilcbiAgICAgICAgeC5sZW5ndGggPCBjbGFtcExlbmd0aCA/IGNvbmNhdChuZXcgVWludDhBcnJheShjbGFtcExlbmd0aCAtIHgubGVuZ3RoKSwgeCkgOiAvLyB0b28gc2hvcnQ/IGxlZnQgcGFkIHdpdGggemVyb2VzXG4gICAgICAgICAgICB4OyAvLyByaWdodCBsZW5ndGg6IHBhc3MgdGhyb3VnaFxuICAgIGNvbnN0IGludExlbmd0aCA9IG5hbWVkQ3VydmUgPT09ICdQLTI1NicgPyAzMiA6IDQ4O1xuICAgIGNvbnN0IHNpZ25hdHVyZSA9IGNvbmNhdChjbGFtcFRvTGVuZ3RoKHNpZ1IsIGludExlbmd0aCksIGNsYW1wVG9MZW5ndGgoc2lnUywgaW50TGVuZ3RoKSk7XG4gICAgY29uc3Qgc2lnbmF0dXJlS2V5ID0gYXdhaXQgY3MuaW1wb3J0S2V5KCdzcGtpJywgcHVibGljS2V5LCB7IG5hbWU6ICdFQ0RTQScsIG5hbWVkQ3VydmUgfSwgZmFsc2UsIFsndmVyaWZ5J10pO1xuICAgIGNvbnN0IGNlcnRWZXJpZnlSZXN1bHQgPSBhd2FpdCBjcy52ZXJpZnkoeyBuYW1lOiAnRUNEU0EnLCBoYXNoIH0sIHNpZ25hdHVyZUtleSwgc2lnbmF0dXJlLCBzaWduZWREYXRhKTtcbiAgICBpZiAoY2VydFZlcmlmeVJlc3VsdCAhPT0gdHJ1ZSlcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdFQ0RTQS1TRUNQMjU2UjEtU0hBMjU2IGNlcnRpZmljYXRlIHZlcmlmeSBmYWlsZWQnKTtcbiAgICBjaGF0dHkgJiYgbG9nKGAlY+KckyBFQ0RTQSBzaWduYXR1cmUgdmVyaWZpZWQgKGN1cnZlICR7bmFtZWRDdXJ2ZX0sIGhhc2ggJHtoYXNofSlgLCAnY29sb3I6ICM4Yzg7Jyk7XG59XG4iLCJpbXBvcnQgeyBjb25jYXQgfSBmcm9tICcuLi91dGlsL2FycmF5LmpzJztcbmltcG9ydCBjcyBmcm9tICcuLi91dGlsL2NyeXB0b1Byb3h5LmpzJztcbmNvbnN0IHR4dEVuYyA9IG5ldyBUZXh0RW5jb2RlcigpO1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGhrZGZFeHRyYWN0KHNhbHQsIGtleU1hdGVyaWFsLCBoYXNoQml0cykge1xuICAgIC8qXG4gICAgZnJvbSBodHRwczovL3d3dy5pZXRmLm9yZy9yZmMvcmZjNTg2OS50eHQ6XG4gICBcbiAgICBIS0RGLUV4dHJhY3Qoc2FsdCwgSUtNKSAtPiBQUktcbiAgIFxuICAgIE9wdGlvbnM6XG4gICAgICBIYXNoICAgICBhIGhhc2ggZnVuY3Rpb247IEhhc2hMZW4gZGVub3RlcyB0aGUgbGVuZ3RoIG9mIHRoZVxuICAgICAgICAgICAgICAgIGhhc2ggZnVuY3Rpb24gb3V0cHV0IGluIG9jdGV0c1xuICAgXG4gICAgSW5wdXRzOlxuICAgICAgc2FsdCAgICAgb3B0aW9uYWwgc2FsdCB2YWx1ZSAoYSBub24tc2VjcmV0IHJhbmRvbSB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgaWYgbm90IHByb3ZpZGVkLCBpdCBpcyBzZXQgdG8gYSBzdHJpbmcgb2YgSGFzaExlbiB6ZXJvcy5cbiAgICAgIElLTSAgICAgIGlucHV0IGtleWluZyBtYXRlcmlhbFxuICAgXG4gICAgT3V0cHV0OlxuICAgICAgUFJLICAgICAgYSBwc2V1ZG9yYW5kb20ga2V5IChvZiBIYXNoTGVuIG9jdGV0cylcbiAgIFxuICAgIFRoZSBvdXRwdXQgUFJLIGlzIGNhbGN1bGF0ZWQgYXMgZm9sbG93czpcbiAgIFxuICAgIFBSSyA9IEhNQUMtSGFzaChzYWx0LCBJS00pXG4gICAgKi9cbiAgICBjb25zdCBobWFjS2V5ID0gYXdhaXQgY3MuaW1wb3J0S2V5KCdyYXcnLCBzYWx0LCB7IG5hbWU6ICdITUFDJywgaGFzaDogeyBuYW1lOiBgU0hBLSR7aGFzaEJpdHN9YCB9IH0sIGZhbHNlLCBbJ3NpZ24nXSk7XG4gICAgdmFyIHByayA9IG5ldyBVaW50OEFycmF5KGF3YWl0IGNzLnNpZ24oJ0hNQUMnLCBobWFjS2V5LCBrZXlNYXRlcmlhbCkpOyAvLyB5ZXMsIHRoZSBrZXkgbWF0ZXJpYWwgaXMgdXNlZCBhcyB0aGUgaW5wdXQgZGF0YSwgbm90IHRoZSBrZXlcbiAgICByZXR1cm4gcHJrO1xufVxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGhrZGZFeHBhbmQoa2V5LCBpbmZvLCBsZW5ndGgsIGhhc2hCaXRzKSB7XG4gICAgLypcbiAgICBmcm9tIGh0dHBzOi8vd3d3LmlldGYub3JnL3JmYy9yZmM1ODY5LnR4dDpcbiAgIFxuICAgIEhLREYtRXhwYW5kKFBSSywgaW5mbywgTCkgLT4gT0tNXG4gICBcbiAgICBPcHRpb25zOlxuICAgICAgSGFzaCAgICAgYSBoYXNoIGZ1bmN0aW9uOyBIYXNoTGVuIGRlbm90ZXMgdGhlIGxlbmd0aCBvZiB0aGVcbiAgICAgICAgICAgICAgICBoYXNoIGZ1bmN0aW9uIG91dHB1dCBpbiBvY3RldHNcbiAgIFxuICAgIElucHV0czpcbiAgICAgIFBSSyAgICAgIGEgcHNldWRvcmFuZG9tIGtleSBvZiBhdCBsZWFzdCBIYXNoTGVuIG9jdGV0c1xuICAgICAgICAgICAgICAgICh1c3VhbGx5LCB0aGUgb3V0cHV0IGZyb20gdGhlIGV4dHJhY3Qgc3RlcClcbiAgICAgIGluZm8gICAgIG9wdGlvbmFsIGNvbnRleHQgYW5kIGFwcGxpY2F0aW9uIHNwZWNpZmljIGluZm9ybWF0aW9uXG4gICAgICAgICAgICAgICAgKGNhbiBiZSBhIHplcm8tbGVuZ3RoIHN0cmluZylcbiAgICAgIEwgICAgICAgIGxlbmd0aCBvZiBvdXRwdXQga2V5aW5nIG1hdGVyaWFsIGluIG9jdGV0c1xuICAgICAgICAgICAgICAgICg8PSAyNTUqSGFzaExlbilcbiAgIFxuICAgIE91dHB1dDpcbiAgICAgIE9LTSAgICAgIG91dHB1dCBrZXlpbmcgbWF0ZXJpYWwgKG9mIEwgb2N0ZXRzKVxuICAgXG4gICAgVGhlIG91dHB1dCBPS00gaXMgY2FsY3VsYXRlZCBhcyBmb2xsb3dzOlxuICAgXG4gICAgTiA9IGNlaWwoTC9IYXNoTGVuKVxuICAgIFQgPSBUKDEpIHwgVCgyKSB8IFQoMykgfCAuLi4gfCBUKE4pXG4gICAgT0tNID0gZmlyc3QgTCBvY3RldHMgb2YgVFxuICAgXG4gICAgd2hlcmU6XG4gICAgVCgwKSA9IGVtcHR5IHN0cmluZyAoemVybyBsZW5ndGgpXG4gICAgVCgxKSA9IEhNQUMtSGFzaChQUkssIFQoMCkgfCBpbmZvIHwgMHgwMSlcbiAgICBUKDIpID0gSE1BQy1IYXNoKFBSSywgVCgxKSB8IGluZm8gfCAweDAyKVxuICAgIFQoMykgPSBITUFDLUhhc2goUFJLLCBUKDIpIHwgaW5mbyB8IDB4MDMpXG4gICAgLi4uXG4gICBcbiAgICAod2hlcmUgdGhlIGNvbnN0YW50IGNvbmNhdGVuYXRlZCB0byB0aGUgZW5kIG9mIGVhY2ggVChuKSBpcyBhXG4gICAgc2luZ2xlIG9jdGV0LilcbiAgICAqL1xuICAgIGNvbnN0IGhhc2hCeXRlcyA9IGhhc2hCaXRzID4+IDM7XG4gICAgY29uc3QgbiA9IE1hdGguY2VpbChsZW5ndGggLyBoYXNoQnl0ZXMpO1xuICAgIGNvbnN0IG9rbSA9IG5ldyBVaW50OEFycmF5KG4gKiBoYXNoQnl0ZXMpO1xuICAgIGNvbnN0IGhtYWNLZXkgPSBhd2FpdCBjcy5pbXBvcnRLZXkoJ3JhdycsIGtleSwgeyBuYW1lOiAnSE1BQycsIGhhc2g6IHsgbmFtZTogYFNIQS0ke2hhc2hCaXRzfWAgfSB9LCBmYWxzZSwgWydzaWduJ10pO1xuICAgIGxldCB0UHJldiA9IG5ldyBVaW50OEFycmF5KDApO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGhtYWNEYXRhID0gY29uY2F0KHRQcmV2LCBpbmZvLCBbaSArIDFdKTtcbiAgICAgICAgY29uc3QgdGlCdWZmZXIgPSBhd2FpdCBjcy5zaWduKCdITUFDJywgaG1hY0tleSwgaG1hY0RhdGEpO1xuICAgICAgICBjb25zdCB0aSA9IG5ldyBVaW50OEFycmF5KHRpQnVmZmVyKTtcbiAgICAgICAgb2ttLnNldCh0aSwgaGFzaEJ5dGVzICogaSk7XG4gICAgICAgIHRQcmV2ID0gdGk7XG4gICAgfVxuICAgIHJldHVybiBva20uc3ViYXJyYXkoMCwgbGVuZ3RoKTtcbn1cbmNvbnN0IHRsczEzX0J5dGVzID0gdHh0RW5jLmVuY29kZSgndGxzMTMgJyk7XG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gaGtkZkV4cGFuZExhYmVsKGtleSwgbGFiZWwsIGNvbnRleHQsIGxlbmd0aCwgaGFzaEJpdHMpIHtcbiAgICAvKlxuICAgIGZyb20gaHR0cHM6Ly93d3cucmZjLWVkaXRvci5vcmcvcmZjL3JmYzg0NDYjc2VjdGlvbi03LjE6XG4gICBcbiAgICBIS0RGLUV4cGFuZC1MYWJlbChTZWNyZXQsIExhYmVsLCBDb250ZXh0LCBMZW5ndGgpID1cbiAgICAgICAgICAgIEhLREYtRXhwYW5kKFNlY3JldCwgSGtkZkxhYmVsLCBMZW5ndGgpXG4gICBcbiAgICAgICAgV2hlcmUgSGtkZkxhYmVsIGlzIHNwZWNpZmllZCBhczpcbiAgIFxuICAgICAgICBzdHJ1Y3Qge1xuICAgICAgICAgICAgdWludDE2IGxlbmd0aCA9IExlbmd0aDtcbiAgICAgICAgICAgIG9wYXF1ZSBsYWJlbDw3Li4yNTU+ID0gXCJ0bHMxMyBcIiArIExhYmVsO1xuICAgICAgICAgICAgb3BhcXVlIGNvbnRleHQ8MC4uMjU1PiA9IENvbnRleHQ7XG4gICAgICAgIH0gSGtkZkxhYmVsO1xuICAgICovXG4gICAgY29uc3QgbGFiZWxEYXRhID0gdHh0RW5jLmVuY29kZShsYWJlbCk7XG4gICAgY29uc3QgaGtkZkxhYmVsID0gY29uY2F0KFsobGVuZ3RoICYgMHhmZjAwKSA+PiA4LCBsZW5ndGggJiAweGZmXSwgW3RsczEzX0J5dGVzLmxlbmd0aCArIGxhYmVsRGF0YS5sZW5ndGhdLCB0bHMxM19CeXRlcywgbGFiZWxEYXRhLCBbY29udGV4dC5sZW5ndGhdLCBjb250ZXh0KTtcbiAgICByZXR1cm4gaGtkZkV4cGFuZChrZXksIGhrZGZMYWJlbCwgbGVuZ3RoLCBoYXNoQml0cyk7XG59XG4iLCJpbXBvcnQgeyBoZXhGcm9tVTggfSBmcm9tICcuLi91dGlsL2hleC5qcyc7XG5pbXBvcnQgeyBsb2cgfSBmcm9tICcuLi9wcmVzZW50YXRpb24vbG9nLmpzJztcbmltcG9ydCB7IGhpZ2hsaWdodENvbG9uTGlzdCB9IGZyb20gJy4uL3ByZXNlbnRhdGlvbi9oaWdobGlnaHRzLmpzJztcbmltcG9ydCBjcyBmcm9tICcuLi91dGlsL2NyeXB0b1Byb3h5LmpzJztcbmltcG9ydCB7IGhrZGZFeHRyYWN0LCBoa2RmRXhwYW5kTGFiZWwgfSBmcm9tICcuL2hrZGYuanMnO1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldEhhbmRzaGFrZUtleXMoc2VydmVyUHVibGljS2V5LCBwcml2YXRlS2V5LCBoZWxsb3MsIGhhc2hCaXRzLCBrZXlMZW5ndGgpIHtcbiAgICBjb25zdCBoYXNoQnl0ZXMgPSBoYXNoQml0cyA+Pj4gMztcbiAgICBjb25zdCB6ZXJvS2V5ID0gbmV3IFVpbnQ4QXJyYXkoaGFzaEJ5dGVzKTtcbiAgICBjb25zdCBwdWJsaWNLZXkgPSBhd2FpdCBjcy5pbXBvcnRLZXkoJ3JhdycsIHNlcnZlclB1YmxpY0tleSwgeyBuYW1lOiAnRUNESCcsIG5hbWVkQ3VydmU6ICdQLTI1NicgfSwgZmFsc2UgLyogZXh0cmFjdGFibGUgKi8sIFtdKTtcbiAgICBjb25zdCBzaGFyZWRTZWNyZXRCdWZmZXIgPSBhd2FpdCBjcy5kZXJpdmVCaXRzKHsgbmFtZTogJ0VDREgnLCBwdWJsaWM6IHB1YmxpY0tleSB9LCBwcml2YXRlS2V5LCAyNTYpO1xuICAgIGNvbnN0IHNoYXJlZFNlY3JldCA9IG5ldyBVaW50OEFycmF5KHNoYXJlZFNlY3JldEJ1ZmZlcik7XG4gICAgY2hhdHR5ICYmIGxvZyguLi5oaWdobGlnaHRDb2xvbkxpc3QoJ3NoYXJlZCBzZWNyZXQgKHZpYSBFQ0RIKTogJyArIGhleEZyb21VOChzaGFyZWRTZWNyZXQpKSk7XG4gICAgY29uc3QgaGVsbG9zSGFzaEJ1ZmZlciA9IGF3YWl0IGNzLmRpZ2VzdCgnU0hBLTI1NicsIGhlbGxvcyk7XG4gICAgY29uc3QgaGVsbG9zSGFzaCA9IG5ldyBVaW50OEFycmF5KGhlbGxvc0hhc2hCdWZmZXIpO1xuICAgIGNoYXR0eSAmJiBsb2coLi4uaGlnaGxpZ2h0Q29sb25MaXN0KCdoZWxsb3MgaGFzaDogJyArIGhleEZyb21VOChoZWxsb3NIYXNoKSkpO1xuICAgIGNvbnN0IGVhcmx5U2VjcmV0ID0gYXdhaXQgaGtkZkV4dHJhY3QobmV3IFVpbnQ4QXJyYXkoMSksIHplcm9LZXksIGhhc2hCaXRzKTtcbiAgICBjaGF0dHkgJiYgbG9nKC4uLmhpZ2hsaWdodENvbG9uTGlzdCgnZWFybHkgc2VjcmV0OiAnICsgaGV4RnJvbVU4KG5ldyBVaW50OEFycmF5KGVhcmx5U2VjcmV0KSkpKTtcbiAgICBjb25zdCBlbXB0eUhhc2hCdWZmZXIgPSBhd2FpdCBjcy5kaWdlc3QoYFNIQS0ke2hhc2hCaXRzfWAsIG5ldyBVaW50OEFycmF5KDApKTtcbiAgICBjb25zdCBlbXB0eUhhc2ggPSBuZXcgVWludDhBcnJheShlbXB0eUhhc2hCdWZmZXIpO1xuICAgIGNoYXR0eSAmJiBsb2coLi4uaGlnaGxpZ2h0Q29sb25MaXN0KCdlbXB0eSBoYXNoOiAnICsgaGV4RnJvbVU4KGVtcHR5SGFzaCkpKTtcbiAgICBjb25zdCBkZXJpdmVkU2VjcmV0ID0gYXdhaXQgaGtkZkV4cGFuZExhYmVsKGVhcmx5U2VjcmV0LCAnZGVyaXZlZCcsIGVtcHR5SGFzaCwgaGFzaEJ5dGVzLCBoYXNoQml0cyk7XG4gICAgY2hhdHR5ICYmIGxvZyguLi5oaWdobGlnaHRDb2xvbkxpc3QoJ2Rlcml2ZWQgc2VjcmV0OiAnICsgaGV4RnJvbVU4KGRlcml2ZWRTZWNyZXQpKSk7XG4gICAgY29uc3QgaGFuZHNoYWtlU2VjcmV0ID0gYXdhaXQgaGtkZkV4dHJhY3QoZGVyaXZlZFNlY3JldCwgc2hhcmVkU2VjcmV0LCBoYXNoQml0cyk7XG4gICAgY2hhdHR5ICYmIGxvZyguLi5oaWdobGlnaHRDb2xvbkxpc3QoJ2hhbmRzaGFrZSBzZWNyZXQ6ICcgKyBoZXhGcm9tVTgoaGFuZHNoYWtlU2VjcmV0KSkpO1xuICAgIGNvbnN0IGNsaWVudFNlY3JldCA9IGF3YWl0IGhrZGZFeHBhbmRMYWJlbChoYW5kc2hha2VTZWNyZXQsICdjIGhzIHRyYWZmaWMnLCBoZWxsb3NIYXNoLCBoYXNoQnl0ZXMsIGhhc2hCaXRzKTtcbiAgICBjaGF0dHkgJiYgbG9nKC4uLmhpZ2hsaWdodENvbG9uTGlzdCgnY2xpZW50IHNlY3JldDogJyArIGhleEZyb21VOChjbGllbnRTZWNyZXQpKSk7XG4gICAgY29uc3Qgc2VydmVyU2VjcmV0ID0gYXdhaXQgaGtkZkV4cGFuZExhYmVsKGhhbmRzaGFrZVNlY3JldCwgJ3MgaHMgdHJhZmZpYycsIGhlbGxvc0hhc2gsIGhhc2hCeXRlcywgaGFzaEJpdHMpO1xuICAgIGNoYXR0eSAmJiBsb2coLi4uaGlnaGxpZ2h0Q29sb25MaXN0KCdzZXJ2ZXIgc2VjcmV0OiAnICsgaGV4RnJvbVU4KHNlcnZlclNlY3JldCkpKTtcbiAgICBjb25zdCBjbGllbnRIYW5kc2hha2VLZXkgPSBhd2FpdCBoa2RmRXhwYW5kTGFiZWwoY2xpZW50U2VjcmV0LCAna2V5JywgbmV3IFVpbnQ4QXJyYXkoMCksIGtleUxlbmd0aCwgaGFzaEJpdHMpO1xuICAgIGNoYXR0eSAmJiBsb2coLi4uaGlnaGxpZ2h0Q29sb25MaXN0KCdjbGllbnQgaGFuZHNoYWtlIGtleTogJyArIGhleEZyb21VOChjbGllbnRIYW5kc2hha2VLZXkpKSk7XG4gICAgY29uc3Qgc2VydmVySGFuZHNoYWtlS2V5ID0gYXdhaXQgaGtkZkV4cGFuZExhYmVsKHNlcnZlclNlY3JldCwgJ2tleScsIG5ldyBVaW50OEFycmF5KDApLCBrZXlMZW5ndGgsIGhhc2hCaXRzKTtcbiAgICBjaGF0dHkgJiYgbG9nKC4uLmhpZ2hsaWdodENvbG9uTGlzdCgnc2VydmVyIGhhbmRzaGFrZSBrZXk6ICcgKyBoZXhGcm9tVTgoc2VydmVySGFuZHNoYWtlS2V5KSkpO1xuICAgIGNvbnN0IGNsaWVudEhhbmRzaGFrZUlWID0gYXdhaXQgaGtkZkV4cGFuZExhYmVsKGNsaWVudFNlY3JldCwgJ2l2JywgbmV3IFVpbnQ4QXJyYXkoMCksIDEyLCBoYXNoQml0cyk7XG4gICAgY2hhdHR5ICYmIGxvZyguLi5oaWdobGlnaHRDb2xvbkxpc3QoJ2NsaWVudCBoYW5kc2hha2UgaXY6ICcgKyBoZXhGcm9tVTgoY2xpZW50SGFuZHNoYWtlSVYpKSk7XG4gICAgY29uc3Qgc2VydmVySGFuZHNoYWtlSVYgPSBhd2FpdCBoa2RmRXhwYW5kTGFiZWwoc2VydmVyU2VjcmV0LCAnaXYnLCBuZXcgVWludDhBcnJheSgwKSwgMTIsIGhhc2hCaXRzKTtcbiAgICBjaGF0dHkgJiYgbG9nKC4uLmhpZ2hsaWdodENvbG9uTGlzdCgnc2VydmVyIGhhbmRzaGFrZSBpdjogJyArIGhleEZyb21VOChzZXJ2ZXJIYW5kc2hha2VJVikpKTtcbiAgICByZXR1cm4geyBzZXJ2ZXJIYW5kc2hha2VLZXksIHNlcnZlckhhbmRzaGFrZUlWLCBjbGllbnRIYW5kc2hha2VLZXksIGNsaWVudEhhbmRzaGFrZUlWLCBoYW5kc2hha2VTZWNyZXQsIGNsaWVudFNlY3JldCwgc2VydmVyU2VjcmV0IH07XG59XG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0QXBwbGljYXRpb25LZXlzKGhhbmRzaGFrZVNlY3JldCwgaGFuZHNoYWtlSGFzaCwgaGFzaEJpdHMsIGtleUxlbmd0aCkge1xuICAgIGNvbnN0IGhhc2hCeXRlcyA9IGhhc2hCaXRzID4+PiAzO1xuICAgIGNvbnN0IHplcm9LZXkgPSBuZXcgVWludDhBcnJheShoYXNoQnl0ZXMpO1xuICAgIGNvbnN0IGVtcHR5SGFzaEJ1ZmZlciA9IGF3YWl0IGNzLmRpZ2VzdChgU0hBLSR7aGFzaEJpdHN9YCwgbmV3IFVpbnQ4QXJyYXkoMCkpO1xuICAgIGNvbnN0IGVtcHR5SGFzaCA9IG5ldyBVaW50OEFycmF5KGVtcHR5SGFzaEJ1ZmZlcik7XG4gICAgY2hhdHR5ICYmIGxvZyguLi5oaWdobGlnaHRDb2xvbkxpc3QoJ2VtcHR5IGhhc2g6ICcgKyBoZXhGcm9tVTgoZW1wdHlIYXNoKSkpO1xuICAgIGNvbnN0IGRlcml2ZWRTZWNyZXQgPSBhd2FpdCBoa2RmRXhwYW5kTGFiZWwoaGFuZHNoYWtlU2VjcmV0LCAnZGVyaXZlZCcsIGVtcHR5SGFzaCwgaGFzaEJ5dGVzLCBoYXNoQml0cyk7XG4gICAgY2hhdHR5ICYmIGxvZyguLi5oaWdobGlnaHRDb2xvbkxpc3QoJ2Rlcml2ZWQgc2VjcmV0OiAnICsgaGV4RnJvbVU4KGRlcml2ZWRTZWNyZXQpKSk7XG4gICAgY29uc3QgbWFzdGVyU2VjcmV0ID0gYXdhaXQgaGtkZkV4dHJhY3QoZGVyaXZlZFNlY3JldCwgemVyb0tleSwgaGFzaEJpdHMpO1xuICAgIGNoYXR0eSAmJiBsb2coLi4uaGlnaGxpZ2h0Q29sb25MaXN0KCdtYXN0ZXIgc2VjcmV0OiAnICsgaGV4RnJvbVU4KG1hc3RlclNlY3JldCkpKTtcbiAgICBjb25zdCBjbGllbnRTZWNyZXQgPSBhd2FpdCBoa2RmRXhwYW5kTGFiZWwobWFzdGVyU2VjcmV0LCAnYyBhcCB0cmFmZmljJywgaGFuZHNoYWtlSGFzaCwgaGFzaEJ5dGVzLCBoYXNoQml0cyk7XG4gICAgY2hhdHR5ICYmIGxvZyguLi5oaWdobGlnaHRDb2xvbkxpc3QoJ2NsaWVudCBzZWNyZXQ6ICcgKyBoZXhGcm9tVTgoY2xpZW50U2VjcmV0KSkpO1xuICAgIGNvbnN0IHNlcnZlclNlY3JldCA9IGF3YWl0IGhrZGZFeHBhbmRMYWJlbChtYXN0ZXJTZWNyZXQsICdzIGFwIHRyYWZmaWMnLCBoYW5kc2hha2VIYXNoLCBoYXNoQnl0ZXMsIGhhc2hCaXRzKTtcbiAgICBjaGF0dHkgJiYgbG9nKC4uLmhpZ2hsaWdodENvbG9uTGlzdCgnc2VydmVyIHNlY3JldDogJyArIGhleEZyb21VOChzZXJ2ZXJTZWNyZXQpKSk7XG4gICAgY29uc3QgY2xpZW50QXBwbGljYXRpb25LZXkgPSBhd2FpdCBoa2RmRXhwYW5kTGFiZWwoY2xpZW50U2VjcmV0LCAna2V5JywgbmV3IFVpbnQ4QXJyYXkoMCksIGtleUxlbmd0aCwgaGFzaEJpdHMpO1xuICAgIGNoYXR0eSAmJiBsb2coLi4uaGlnaGxpZ2h0Q29sb25MaXN0KCdjbGllbnQgYXBwbGljYXRpb24ga2V5OiAnICsgaGV4RnJvbVU4KGNsaWVudEFwcGxpY2F0aW9uS2V5KSkpO1xuICAgIGNvbnN0IHNlcnZlckFwcGxpY2F0aW9uS2V5ID0gYXdhaXQgaGtkZkV4cGFuZExhYmVsKHNlcnZlclNlY3JldCwgJ2tleScsIG5ldyBVaW50OEFycmF5KDApLCBrZXlMZW5ndGgsIGhhc2hCaXRzKTtcbiAgICBjaGF0dHkgJiYgbG9nKC4uLmhpZ2hsaWdodENvbG9uTGlzdCgnc2VydmVyIGFwcGxpY2F0aW9uIGtleTogJyArIGhleEZyb21VOChzZXJ2ZXJBcHBsaWNhdGlvbktleSkpKTtcbiAgICBjb25zdCBjbGllbnRBcHBsaWNhdGlvbklWID0gYXdhaXQgaGtkZkV4cGFuZExhYmVsKGNsaWVudFNlY3JldCwgJ2l2JywgbmV3IFVpbnQ4QXJyYXkoMCksIDEyLCBoYXNoQml0cyk7XG4gICAgY2hhdHR5ICYmIGxvZyguLi5oaWdobGlnaHRDb2xvbkxpc3QoJ2NsaWVudCBhcHBsaWNhdGlvbiBpdjogJyArIGhleEZyb21VOChjbGllbnRBcHBsaWNhdGlvbklWKSkpO1xuICAgIGNvbnN0IHNlcnZlckFwcGxpY2F0aW9uSVYgPSBhd2FpdCBoa2RmRXhwYW5kTGFiZWwoc2VydmVyU2VjcmV0LCAnaXYnLCBuZXcgVWludDhBcnJheSgwKSwgMTIsIGhhc2hCaXRzKTtcbiAgICBjaGF0dHkgJiYgbG9nKC4uLmhpZ2hsaWdodENvbG9uTGlzdCgnc2VydmVyIGFwcGxpY2F0aW9uIGl2OiAnICsgaGV4RnJvbVU4KHNlcnZlckFwcGxpY2F0aW9uSVYpKSk7XG4gICAgcmV0dXJuIHsgc2VydmVyQXBwbGljYXRpb25LZXksIHNlcnZlckFwcGxpY2F0aW9uSVYsIGNsaWVudEFwcGxpY2F0aW9uS2V5LCBjbGllbnRBcHBsaWNhdGlvbklWIH07XG59XG4iLCJpbXBvcnQgeyBCeXRlcyB9IGZyb20gJy4uL3V0aWwvYnl0ZXMuanMnO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbWFrZUNsaWVudEhlbGxvKGhvc3QsIHB1YmxpY0tleSwgc2Vzc2lvbklkLCB1c2VTTkkgPSB0cnVlKSB7XG4gICAgY29uc3QgaCA9IG5ldyBCeXRlcygxMDI0KTtcbiAgICBoLndyaXRlVWludDgoMHgxNiwgY2hhdHR5ICYmICdyZWNvcmQgdHlwZTogaGFuZHNoYWtlJyk7XG4gICAgaC53cml0ZVVpbnQxNigweDAzMDEsIGNoYXR0eSAmJiAnVExTIGxlZ2FjeSByZWNvcmQgdmVyc2lvbiAxLjAgKFtSRkMgODQ0NiDCpzUuMV0oaHR0cHM6Ly9kYXRhdHJhY2tlci5pZXRmLm9yZy9kb2MvaHRtbC9yZmM4NDQ2I3NlY3Rpb24tNS4xKSknKTtcbiAgICBjb25zdCBlbmRSZWNvcmRIZWFkZXIgPSBoLndyaXRlTGVuZ3RoVWludDE2KCdUTFMgcmVjb3JkJyk7XG4gICAgaC53cml0ZVVpbnQ4KDB4MDEsIGNoYXR0eSAmJiAnaGFuZHNoYWtlIHR5cGU6IGNsaWVudCBoZWxsbycpO1xuICAgIGNvbnN0IGVuZEhhbmRzaGFrZUhlYWRlciA9IGgud3JpdGVMZW5ndGhVaW50MjQoKTtcbiAgICBoLndyaXRlVWludDE2KDB4MDMwMywgY2hhdHR5ICYmICdUTFMgdmVyc2lvbiAxLjIgKG1pZGRsZWJveCBjb21wYXRpYmlsaXR5OiBzZWUgW2Jsb2cuY2xvdWRmbGFyZS5jb21dKGh0dHBzOi8vYmxvZy5jbG91ZGZsYXJlLmNvbS93aHktdGxzLTEtMy1pc250LWluLWJyb3dzZXJzLXlldCkpJyk7XG4gICAgY3J5cHRvLmdldFJhbmRvbVZhbHVlcyhoLnN1YmFycmF5KDMyKSk7XG4gICAgY2hhdHR5ICYmIGguY29tbWVudCgnY2xpZW50IHJhbmRvbScpO1xuICAgIGNvbnN0IGVuZFNlc3Npb25JZCA9IGgud3JpdGVMZW5ndGhVaW50OChjaGF0dHkgJiYgJ3Nlc3Npb24gSUQnKTtcbiAgICBoLndyaXRlQnl0ZXMoc2Vzc2lvbklkKTtcbiAgICBjaGF0dHkgJiYgaC5jb21tZW50KCdzZXNzaW9uIElEIChtaWRkbGVib3ggY29tcGF0aWJpbGl0eSBhZ2FpbjogW1JGQyA4NDQ2IGFwcGVuZGl4IEQ0XShodHRwczovL2RhdGF0cmFja2VyLmlldGYub3JnL2RvYy9odG1sL3JmYzg0NDYjYXBwZW5kaXgtRC40KSknKTtcbiAgICBlbmRTZXNzaW9uSWQoKTtcbiAgICBjb25zdCBlbmRDaXBoZXJzID0gaC53cml0ZUxlbmd0aFVpbnQxNihjaGF0dHkgJiYgJ2NpcGhlcnMgKFtSRkMgODQ0NiBhcHBlbmRpeCBCNF0oaHR0cHM6Ly9kYXRhdHJhY2tlci5pZXRmLm9yZy9kb2MvaHRtbC9yZmM4NDQ2I2FwcGVuZGl4LUIuNCkpJyk7XG4gICAgaC53cml0ZVVpbnQxNigweDEzMDEsIGNoYXR0eSAmJiAnY2lwaGVyOiBUTFNfQUVTXzEyOF9HQ01fU0hBMjU2Jyk7XG4gICAgZW5kQ2lwaGVycygpO1xuICAgIGNvbnN0IGVuZENvbXByZXNzaW9uTWV0aG9kcyA9IGgud3JpdGVMZW5ndGhVaW50OChjaGF0dHkgJiYgJ2NvbXByZXNzaW9uIG1ldGhvZHMnKTtcbiAgICBoLndyaXRlVWludDgoMHgwMCwgY2hhdHR5ICYmICdjb21wcmVzc2lvbiBtZXRob2Q6IG5vbmUnKTtcbiAgICBlbmRDb21wcmVzc2lvbk1ldGhvZHMoKTtcbiAgICBjb25zdCBlbmRFeHRlbnNpb25zID0gaC53cml0ZUxlbmd0aFVpbnQxNihjaGF0dHkgJiYgJ2V4dGVuc2lvbnMgKFtSRkMgODQ0NiDCpzQuMl0oaHR0cHM6Ly9kYXRhdHJhY2tlci5pZXRmLm9yZy9kb2MvaHRtbC9yZmM4NDQ2I3NlY3Rpb24tNC4yKSknKTtcbiAgICBpZiAodXNlU05JKSB7XG4gICAgICAgIGgud3JpdGVVaW50MTYoMHgwMDAwLCBjaGF0dHkgJiYgJ2V4dGVuc2lvbiB0eXBlOiBTZXJ2ZXIgTmFtZSBJbmRpY2F0aW9uLCBvciBTTkkgKFtSRkMgNjA2NiDCpzNdKGh0dHBzOi8vZGF0YXRyYWNrZXIuaWV0Zi5vcmcvZG9jL2h0bWwvcmZjNjA2NiNzZWN0aW9uLTMpKScpO1xuICAgICAgICBjb25zdCBlbmRTTklFeHQgPSBoLndyaXRlTGVuZ3RoVWludDE2KGNoYXR0eSAmJiAnU05JIGRhdGEnKTtcbiAgICAgICAgY29uc3QgZW5kU05JID0gaC53cml0ZUxlbmd0aFVpbnQxNihjaGF0dHkgJiYgJ1NOSSByZWNvcmRzJyk7XG4gICAgICAgIGgud3JpdGVVaW50OCgweDAwLCBjaGF0dHkgJiYgJ2xpc3QgZW50cnkgdHlwZTogRE5TIGhvc3RuYW1lJyk7XG4gICAgICAgIGNvbnN0IGVuZEhvc3RuYW1lID0gaC53cml0ZUxlbmd0aFVpbnQxNihjaGF0dHkgJiYgJ2hvc3RuYW1lJyk7XG4gICAgICAgIGgud3JpdGVVVEY4U3RyaW5nKGhvc3QpO1xuICAgICAgICBlbmRIb3N0bmFtZSgpO1xuICAgICAgICBlbmRTTkkoKTtcbiAgICAgICAgZW5kU05JRXh0KCk7XG4gICAgfVxuICAgIGgud3JpdGVVaW50MTYoMHgwMDBiLCBjaGF0dHkgJiYgJ2V4dGVuc2lvbiB0eXBlOiBzdXBwb3J0ZWQgRWxsaXB0aWMgQ3VydmUgcG9pbnQgZm9ybWF0cyAoZm9yIG1pZGRsZWJveCBjb21wYXRpYmlsaXR5LCBmcm9tIFRMUyAxLjI6IFtSRkMgODQyMiDCpzUuMS4yXShodHRwczovL2RhdGF0cmFja2VyLmlldGYub3JnL2RvYy9odG1sL3JmYzg0MjIjc2VjdGlvbi01LjEuMikpJyk7XG4gICAgY29uc3QgZW5kRm9ybWF0VHlwZXNFeHQgPSBoLndyaXRlTGVuZ3RoVWludDE2KGNoYXR0eSAmJiAncG9pbnQgZm9ybWF0cyBkYXRhJyk7XG4gICAgY29uc3QgZW5kRm9ybWF0VHlwZXMgPSBoLndyaXRlTGVuZ3RoVWludDgoY2hhdHR5ICYmICdwb2ludCBmb3JtYXRzJyk7XG4gICAgaC53cml0ZVVpbnQ4KDB4MDAsIGNoYXR0eSAmJiAncG9pbnQgZm9ybWF0OiB1bmNvbXByZXNzZWQnKTtcbiAgICBlbmRGb3JtYXRUeXBlcygpO1xuICAgIGVuZEZvcm1hdFR5cGVzRXh0KCk7XG4gICAgaC53cml0ZVVpbnQxNigweDAwMGEsIGNoYXR0eSAmJiAnZXh0ZW5zaW9uIHR5cGU6IHN1cHBvcnRlZCBncm91cHMgZm9yIGtleSBleGNoYW5nZSAoW1JGQyA4NDQ2IMKnNC4yLjddKGh0dHBzOi8vZGF0YXRyYWNrZXIuaWV0Zi5vcmcvZG9jL2h0bWwvcmZjODQ0NiNzZWN0aW9uLTQuMi43KSknKTtcbiAgICBjb25zdCBlbmRHcm91cHNFeHQgPSBoLndyaXRlTGVuZ3RoVWludDE2KGNoYXR0eSAmJiAnZ3JvdXBzIGRhdGEnKTtcbiAgICBjb25zdCBlbmRHcm91cHMgPSBoLndyaXRlTGVuZ3RoVWludDE2KGNoYXR0eSAmJiAnZ3JvdXBzJyk7XG4gICAgaC53cml0ZVVpbnQxNigweDAwMTcsIGNoYXR0eSAmJiAnZ3JvdXA6IGVsbGlwdGljIGN1cnZlIHNlY3AyNTZyMScpO1xuICAgIGVuZEdyb3VwcygpO1xuICAgIGVuZEdyb3Vwc0V4dCgpO1xuICAgIGgud3JpdGVVaW50MTYoMHgwMDBkLCBjaGF0dHkgJiYgJ2V4dGVuc2lvbiB0eXBlOiBzaWduYXR1cmUgYWxnb3JpdGhtcyAoW1JGQyA4NDQ2IMKnNC4yLjNdKGh0dHBzOi8vZGF0YXRyYWNrZXIuaWV0Zi5vcmcvZG9jL2h0bWwvcmZjODQ0NiNzZWN0aW9uLTQuMi4zKSknKTtcbiAgICBjb25zdCBlbmRTaWdzRXh0ID0gaC53cml0ZUxlbmd0aFVpbnQxNihjaGF0dHkgJiYgJ3NpZ25hdHVyZSBhbGdvcml0aG1zIGRhdGEnKTtcbiAgICBjb25zdCBlbmRTaWdzID0gaC53cml0ZUxlbmd0aFVpbnQxNihjaGF0dHkgJiYgJ3NpZ25hdHVyZSBhbGdvcml0aG1zJyk7XG4gICAgaC53cml0ZVVpbnQxNigweDA0MDMsIGNoYXR0eSAmJiAnYWxnb3JpdGhtOiBlY2RzYV9zZWNwMjU2cjFfc2hhMjU2Jyk7XG4gICAgaC53cml0ZVVpbnQxNigweDA4MDQsIGNoYXR0eSAmJiAnYWxnb3JpdGhtOiByc2FfcHNzX3JzYWVfc2hhMjU2Jyk7XG4gICAgZW5kU2lncygpO1xuICAgIGVuZFNpZ3NFeHQoKTtcbiAgICBoLndyaXRlVWludDE2KDB4MDAyYiwgY2hhdHR5ICYmICdleHRlbnNpb24gdHlwZTogc3VwcG9ydGVkIFRMUyB2ZXJzaW9ucyAoW1JGQyA4NDQ2IMKnNC4yLjFdKGh0dHBzOi8vZGF0YXRyYWNrZXIuaWV0Zi5vcmcvZG9jL2h0bWwvcmZjODQ0NiNzZWN0aW9uLTQuMi4xKSknKTtcbiAgICBjb25zdCBlbmRWZXJzaW9uc0V4dCA9IGgud3JpdGVMZW5ndGhVaW50MTYoY2hhdHR5ICYmICdUTFMgdmVyc2lvbnMgZGF0YScpO1xuICAgIGNvbnN0IGVuZFZlcnNpb25zID0gaC53cml0ZUxlbmd0aFVpbnQ4KGNoYXR0eSAmJiAnVExTIHZlcnNpb25zJyk7XG4gICAgaC53cml0ZVVpbnQxNigweDAzMDQsIGNoYXR0eSAmJiAnVExTIHZlcnNpb246IDEuMycpO1xuICAgIGVuZFZlcnNpb25zKCk7XG4gICAgZW5kVmVyc2lvbnNFeHQoKTtcbiAgICBoLndyaXRlVWludDE2KDB4MDAzMywgY2hhdHR5ICYmICdleHRlbnNpb24gdHlwZToga2V5IHNoYXJlIChbUkZDIDg0NDYgwqc0LjIuOF0oaHR0cHM6Ly9kYXRhdHJhY2tlci5pZXRmLm9yZy9kb2MvaHRtbC9yZmM4NDQ2I3NlY3Rpb24tNC4yLjgpKScpO1xuICAgIGNvbnN0IGVuZEtleVNoYXJlRXh0ID0gaC53cml0ZUxlbmd0aFVpbnQxNihjaGF0dHkgJiYgJ2tleSBzaGFyZSBkYXRhJyk7XG4gICAgY29uc3QgZW5kS2V5U2hhcmVzID0gaC53cml0ZUxlbmd0aFVpbnQxNihjaGF0dHkgJiYgJ2tleSBzaGFyZXMnKTtcbiAgICBoLndyaXRlVWludDE2KDB4MDAxNywgY2hhdHR5ICYmICdzZWNwMjU2cjEgKE5JU1QgUC0yNTYpIGtleSBzaGFyZSAoW1JGQyA4NDQ2IMKnNC4yLjddKGh0dHBzOi8vZGF0YXRyYWNrZXIuaWV0Zi5vcmcvZG9jL2h0bWwvcmZjODQ0NiNzZWN0aW9uLTQuMi43KSknKTtcbiAgICBjb25zdCBlbmRLZXlTaGFyZSA9IGgud3JpdGVMZW5ndGhVaW50MTYoY2hhdHR5ICYmICdrZXkgc2hhcmUnKTtcbiAgICBpZiAoY2hhdHR5KSB7XG4gICAgICAgIGgud3JpdGVVaW50OChwdWJsaWNLZXlbMF0sICdsZWdhY3kgcG9pbnQgZm9ybWF0OiBhbHdheXMgNCwgd2hpY2ggbWVhbnMgdW5jb21wcmVzc2VkIChbUkZDIDg0NDYgwqc0LjIuOC4yXShodHRwczovL2RhdGF0cmFja2VyLmlldGYub3JnL2RvYy9odG1sL3JmYzg0NDYjc2VjdGlvbi00LjIuOC4yKSBhbmQgW1JGQyA4NDIyIMKnNS40LjFdKGh0dHBzOi8vZGF0YXRyYWNrZXIuaWV0Zi5vcmcvZG9jL2h0bWwvcmZjODQyMiNzZWN0aW9uLTUuNC4xKSknKTtcbiAgICAgICAgaC53cml0ZUJ5dGVzKHB1YmxpY0tleS5zdWJhcnJheSgxLCAzMykpO1xuICAgICAgICBoLmNvbW1lbnQoJ3ggY29vcmRpbmF0ZScpO1xuICAgICAgICBoLndyaXRlQnl0ZXMocHVibGljS2V5LnN1YmFycmF5KDMzLCA2NSkpO1xuICAgICAgICBoLmNvbW1lbnQoJ3kgY29vcmRpbmF0ZScpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgaC53cml0ZUJ5dGVzKHB1YmxpY0tleSk7XG4gICAgfVxuICAgIGVuZEtleVNoYXJlKCk7XG4gICAgZW5kS2V5U2hhcmVzKCk7XG4gICAgZW5kS2V5U2hhcmVFeHQoKTtcbiAgICBlbmRFeHRlbnNpb25zKCk7XG4gICAgZW5kSGFuZHNoYWtlSGVhZGVyKCk7XG4gICAgZW5kUmVjb3JkSGVhZGVyKCk7XG4gICAgcmV0dXJuIGg7XG59XG4iLCJpbXBvcnQgeyBjb25jYXQsIGVxdWFsIH0gZnJvbSAnLi4vdXRpbC9hcnJheS5qcyc7XG5pbXBvcnQgeyBoZXhGcm9tVTggfSBmcm9tICcuLi91dGlsL2hleC5qcyc7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBwYXJzZVNlcnZlckhlbGxvKGgsIHNlc3Npb25JZCkge1xuICAgIGxldCBzZXJ2ZXJQdWJsaWNLZXk7XG4gICAgbGV0IHRsc1ZlcnNpb25TcGVjaWZpZWQ7XG4gICAgY29uc3QgW2VuZFNlcnZlckhlbGxvTWVzc2FnZV0gPSBoLmV4cGVjdExlbmd0aChoLnJlbWFpbmluZygpKTtcbiAgICBoLmV4cGVjdFVpbnQ4KDB4MDIsIGNoYXR0eSAmJiAnaGFuZHNoYWtlIHR5cGU6IHNlcnZlciBoZWxsbycpO1xuICAgIGNvbnN0IFtlbmRTZXJ2ZXJIZWxsb10gPSBoLmV4cGVjdExlbmd0aFVpbnQyNChjaGF0dHkgJiYgJ3NlcnZlciBoZWxsbycpO1xuICAgIGguZXhwZWN0VWludDE2KDB4MDMwMywgY2hhdHR5ICYmICdUTFMgdmVyc2lvbiAxLjIgKG1pZGRsZWJveCBjb21wYXRpYmlsaXR5KScpO1xuICAgIGNvbnN0IHNlcnZlclJhbmRvbSA9IGgucmVhZEJ5dGVzKDMyKTtcbiAgICBpZiAoZXF1YWwoc2VydmVyUmFuZG9tLCBbXG4gICAgICAgIC8vIFNIQS0yNTYgb2YgXCJIZWxsb1JldHJ5UmVxdWVzdFwiLCBodHRwczovL2RhdGF0cmFja2VyLmlldGYub3JnL2RvYy9odG1sL3JmYzg0NDYjcGFnZS0zMlxuICAgICAgICAvLyBzZWUgYWxzbzogZWNobyAtbiBcIkhlbGxvUmV0cnlSZXF1ZXN0XCIgfCBvcGVuc3NsIGRnc3QgLXNoYTI1NiAtaGV4XG4gICAgICAgIDB4Y2YsIDB4MjEsIDB4YWQsIDB4NzQsIDB4ZTUsIDB4OWEsIDB4NjEsIDB4MTEsXG4gICAgICAgIDB4YmUsIDB4MWQsIDB4OGMsIDB4MDIsIDB4MWUsIDB4NjUsIDB4YjgsIDB4OTEsXG4gICAgICAgIDB4YzIsIDB4YTIsIDB4MTEsIDB4MTYsIDB4N2EsIDB4YmIsIDB4OGMsIDB4NWUsXG4gICAgICAgIDB4MDcsIDB4OWUsIDB4MDksIDB4ZTIsIDB4YzgsIDB4YTgsIDB4MzMsIDB4OWNcbiAgICBdKSlcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmV4cGVjdGVkIEhlbGxvUmV0cnlSZXF1ZXN0Jyk7XG4gICAgY2hhdHR5ICYmIGguY29tbWVudCgnc2VydmVyIHJhbmRvbSDigJQgW25vdCBTSEEyNTYoXCJIZWxsb1JldHJ5UmVxdWVzdFwiKV0oaHR0cHM6Ly9kYXRhdHJhY2tlci5pZXRmLm9yZy9kb2MvaHRtbC9yZmM4NDQ2I3NlY3Rpb24tNC4xLjMpJyk7XG4gICAgaC5leHBlY3RVaW50OChzZXNzaW9uSWQubGVuZ3RoLCBjaGF0dHkgJiYgJ3Nlc3Npb24gSUQgbGVuZ3RoIChtYXRjaGVzIGNsaWVudCBzZXNzaW9uIElEKScpO1xuICAgIGguZXhwZWN0Qnl0ZXMoc2Vzc2lvbklkLCBjaGF0dHkgJiYgJ3Nlc3Npb24gSUQgKG1hdGNoZXMgY2xpZW50IHNlc3Npb24gSUQpJyk7XG4gICAgaC5leHBlY3RVaW50MTYoMHgxMzAxLCBjaGF0dHkgJiYgJ2NpcGhlciAobWF0Y2hlcyBjbGllbnQgaGVsbG8pJyk7XG4gICAgaC5leHBlY3RVaW50OCgweDAwLCBjaGF0dHkgJiYgJ25vIGNvbXByZXNzaW9uJyk7XG4gICAgY29uc3QgW2VuZEV4dGVuc2lvbnMsIGV4dGVuc2lvbnNSZW1haW5pbmddID0gaC5leHBlY3RMZW5ndGhVaW50MTYoY2hhdHR5ICYmICdleHRlbnNpb25zJyk7XG4gICAgd2hpbGUgKGV4dGVuc2lvbnNSZW1haW5pbmcoKSA+IDApIHtcbiAgICAgICAgY29uc3QgZXh0ZW5zaW9uVHlwZSA9IGgucmVhZFVpbnQxNihjaGF0dHkgJiYgJ2V4dGVuc2lvbiB0eXBlOicpO1xuICAgICAgICBjaGF0dHkgJiYgaC5jb21tZW50KGV4dGVuc2lvblR5cGUgPT09IDB4MDAyYiA/ICdUTFMgdmVyc2lvbicgOlxuICAgICAgICAgICAgZXh0ZW5zaW9uVHlwZSA9PT0gMHgwMDMzID8gJ2tleSBzaGFyZScgOlxuICAgICAgICAgICAgICAgICd1bmtub3duJyk7XG4gICAgICAgIGNvbnN0IFtlbmRFeHRlbnNpb25dID0gaC5leHBlY3RMZW5ndGhVaW50MTYoY2hhdHR5ICYmICdleHRlbnNpb24nKTtcbiAgICAgICAgaWYgKGV4dGVuc2lvblR5cGUgPT09IDB4MDAyYikge1xuICAgICAgICAgICAgaC5leHBlY3RVaW50MTYoMHgwMzA0LCBjaGF0dHkgJiYgJ1RMUyB2ZXJzaW9uOiAxLjMnKTtcbiAgICAgICAgICAgIHRsc1ZlcnNpb25TcGVjaWZpZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGV4dGVuc2lvblR5cGUgPT09IDB4MDAzMykge1xuICAgICAgICAgICAgaC5leHBlY3RVaW50MTYoMHgwMDE3LCBjaGF0dHkgJiYgJ2tleSBzaGFyZSB0eXBlOiBzZWNwMjU2cjEgKE5JU1QgUC0yNTYpJyk7XG4gICAgICAgICAgICBjb25zdCBbZW5kS2V5U2hhcmUsIGtleVNoYXJlUmVtYWluaW5nXSA9IGguZXhwZWN0TGVuZ3RoVWludDE2KCdrZXkgc2hhcmUnKTtcbiAgICAgICAgICAgIGNvbnN0IGtleVNoYXJlTGVuZ3RoID0ga2V5U2hhcmVSZW1haW5pbmcoKTtcbiAgICAgICAgICAgIGlmIChrZXlTaGFyZUxlbmd0aCAhPT0gNjUpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBFeHBlY3RlZCA2NSBieXRlcyBvZiBrZXkgc2hhcmUsIGJ1dCBnb3QgJHtrZXlTaGFyZUxlbmd0aH1gKTtcbiAgICAgICAgICAgIGlmIChjaGF0dHkpIHtcbiAgICAgICAgICAgICAgICBoLmV4cGVjdFVpbnQ4KDQsICdsZWdhY3kgcG9pbnQgZm9ybWF0OiBhbHdheXMgNCwgd2hpY2ggbWVhbnMgdW5jb21wcmVzc2VkIChbUkZDIDg0NDYgwqc0LjIuOC4yXShodHRwczovL2RhdGF0cmFja2VyLmlldGYub3JnL2RvYy9odG1sL3JmYzg0NDYjc2VjdGlvbi00LjIuOC4yKSBhbmQgW1JGQyA4NDIyIMKnNS40LjFdKGh0dHBzOi8vZGF0YXRyYWNrZXIuaWV0Zi5vcmcvZG9jL2h0bWwvcmZjODQyMiNzZWN0aW9uLTUuNC4xKSknKTtcbiAgICAgICAgICAgICAgICBjb25zdCB4ID0gaC5yZWFkQnl0ZXMoMzIpO1xuICAgICAgICAgICAgICAgIGguY29tbWVudCgneCBjb29yZGluYXRlJyk7XG4gICAgICAgICAgICAgICAgY29uc3QgeSA9IGgucmVhZEJ5dGVzKDMyKTtcbiAgICAgICAgICAgICAgICBoLmNvbW1lbnQoJ3kgY29vcmRpbmF0ZScpO1xuICAgICAgICAgICAgICAgIHNlcnZlclB1YmxpY0tleSA9IGNvbmNhdChbNF0sIHgsIHkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgc2VydmVyUHVibGljS2V5ID0gaC5yZWFkQnl0ZXMoa2V5U2hhcmVMZW5ndGgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gVE9ETzogd2lsbCBTdWJ0bGVDcnlwdG8gdmFsaWRhdGUgdGhpcyBmb3IgdXMgd2hlbiBkZXJpdmluZyB0aGUgc2hhcmVkIHNlY3JldCwgb3IgbXVzdCB3ZSBkbyBpdD9cbiAgICAgICAgICAgIC8vIGh0dHBzOi8vZGF0YXRyYWNrZXIuaWV0Zi5vcmcvZG9jL2h0bWwvcmZjODQ0NiNzZWN0aW9uLTQuMi44LjJcbiAgICAgICAgICAgIC8vICsgZS5nLiBodHRwczovL25laWxtYWRkZW4uYmxvZy8yMDE3LzA1LzE3L3NvLWhvdy1kby15b3UtdmFsaWRhdGUtbmlzdC1lY2RoLXB1YmxpYy1rZXlzL1xuICAgICAgICAgICAgZW5kS2V5U2hhcmUoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgVW5leHBlY3RlZCBleHRlbnNpb24gMHgke2hleEZyb21VOChbZXh0ZW5zaW9uVHlwZV0pfWApO1xuICAgICAgICB9XG4gICAgICAgIGVuZEV4dGVuc2lvbigpO1xuICAgIH1cbiAgICBlbmRFeHRlbnNpb25zKCk7XG4gICAgZW5kU2VydmVySGVsbG8oKTtcbiAgICBlbmRTZXJ2ZXJIZWxsb01lc3NhZ2UoKTtcbiAgICBpZiAodGxzVmVyc2lvblNwZWNpZmllZCAhPT0gdHJ1ZSlcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBUTFMgdmVyc2lvbiBwcm92aWRlZCcpO1xuICAgIGlmIChzZXJ2ZXJQdWJsaWNLZXkgPT09IHVuZGVmaW5lZClcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBrZXkgcHJvdmlkZWQnKTtcbiAgICByZXR1cm4gc2VydmVyUHVibGljS2V5O1xufVxuIiwiaW1wb3J0IHsgTG9nQ29sb3VycyB9IGZyb20gJy4uL3ByZXNlbnRhdGlvbi9hcHBlYXJhbmNlLmpzJztcbmltcG9ydCB7IGhrZGZFeHBhbmRMYWJlbCB9IGZyb20gXCIuL2hrZGYuanNcIjtcbmltcG9ydCB7IGNvbmNhdCwgZXF1YWwgfSBmcm9tICcuLi91dGlsL2FycmF5LmpzJztcbmltcG9ydCBjcyBmcm9tICcuLi91dGlsL2NyeXB0b1Byb3h5LmpzJztcbmltcG9ydCB7IENlcnQgfSBmcm9tICcuL2NlcnQuanMnO1xuaW1wb3J0IHsgaGlnaGxpZ2h0Qnl0ZXMgfSBmcm9tICcuLi9wcmVzZW50YXRpb24vaGlnaGxpZ2h0cy5qcyc7XG5pbXBvcnQgeyBsb2cgfSBmcm9tICcuLi9wcmVzZW50YXRpb24vbG9nLmpzJztcbmltcG9ydCB7IEFTTjFCeXRlcyB9IGZyb20gJy4uL3V0aWwvYXNuMWJ5dGVzLmpzJztcbmltcG9ydCB7IGhleEZyb21VOCB9IGZyb20gJy4uL3V0aWwvaGV4LmpzJztcbmltcG9ydCB7IGVjZHNhVmVyaWZ5IH0gZnJvbSAnLi9lY2RzYS5qcyc7XG5pbXBvcnQgeyB2ZXJpZnlDZXJ0cyB9IGZyb20gJy4vdmVyaWZ5Q2VydHMuanMnO1xuY29uc3QgdHh0RW5jID0gbmV3IFRleHRFbmNvZGVyKCk7XG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcmVhZEVuY3J5cHRlZEhhbmRzaGFrZShob3N0LCByZWFkSGFuZHNoYWtlUmVjb3JkLCBzZXJ2ZXJTZWNyZXQsIGhlbGxvcywgcm9vdENlcnRzRGF0YWJhc2UsIHJlcXVpcmVTZXJ2ZXJUbHNFeHRLZXlVc2FnZSA9IHRydWUsIHJlcXVpcmVEaWdpdGFsU2lnS2V5VXNhZ2UgPSB0cnVlKSB7XG4gICAgY29uc3QgaHMgPSBuZXcgQVNOMUJ5dGVzKGF3YWl0IHJlYWRIYW5kc2hha2VSZWNvcmQoKSk7XG4gICAgaHMuZXhwZWN0VWludDgoMHgwOCwgY2hhdHR5ICYmICdoYW5kc2hha2UgcmVjb3JkIHR5cGU6IGVuY3J5cHRlZCBleHRlbnNpb25zIChbUkZDIDg0NDYgwqc0LjMuMV0oaHR0cHM6Ly9kYXRhdHJhY2tlci5pZXRmLm9yZy9kb2MvaHRtbC9yZmM4NDQ2I3NlY3Rpb24tNC4zLjEpKScpO1xuICAgIGNvbnN0IFtlZU1lc3NhZ2VFbmRdID0gaHMuZXhwZWN0TGVuZ3RoVWludDI0KCk7XG4gICAgY29uc3QgW2V4dEVuZCwgZXh0UmVtYWluaW5nXSA9IGhzLmV4cGVjdExlbmd0aFVpbnQxNihjaGF0dHkgJiYgJ2V4dGVuc2lvbnMnKTtcbiAgICB3aGlsZSAoZXh0UmVtYWluaW5nKCkgPiAwKSB7XG4gICAgICAgIGNvbnN0IGV4dFR5cGUgPSBocy5yZWFkVWludDE2KGNoYXR0eSAmJiAnZXh0ZW5zaW9uIHR5cGU6Jyk7XG4gICAgICAgIGlmIChleHRUeXBlID09PSAweDAwMDApIHtcbiAgICAgICAgICAgIC8qXG4gICAgICAgICAgICBcIkEgc2VydmVyIHRoYXQgcmVjZWl2ZXMgYSBjbGllbnQgaGVsbG8gY29udGFpbmluZyB0aGUgXCJzZXJ2ZXJfbmFtZVwiXG4gICAgICAgICAgICBleHRlbnNpb24gTUFZIHVzZSB0aGUgaW5mb3JtYXRpb24gY29udGFpbmVkIGluIHRoZSBleHRlbnNpb24gdG8gZ3VpZGVcbiAgICAgICAgICAgIGl0cyBzZWxlY3Rpb24gb2YgYW4gYXBwcm9wcmlhdGUgY2VydGlmaWNhdGUgdG8gcmV0dXJuIHRvIHRoZSBjbGllbnQsXG4gICAgICAgICAgICBhbmQgLyBvciBvdGhlciBhc3BlY3RzIG9mIHNlY3VyaXR5IHBvbGljeS4gSW4gdGhpcyBldmVudCwgdGhlIHNlcnZlclxuICAgICAgICAgICAgU0hBTEwgaW5jbHVkZSBhbiBleHRlbnNpb24gb2YgdHlwZSBcInNlcnZlcl9uYW1lXCIgaW4gdGhlIChleHRlbmRlZClcbiAgICAgICAgICAgIHNlcnZlciBoZWxsby4gVGhlIFwiZXh0ZW5zaW9uX2RhdGFcIiBmaWVsZCBvZiB0aGlzIGV4dGVuc2lvbiBTSEFMTCBiZSBlbXB0eS5cbiAgICAgICAgICAgIC0gaHR0cHM6Ly9kYXRhdHJhY2tlci5pZXRmLm9yZy9kb2MvaHRtbC9yZmM2MDY2I3NlY3Rpb24tM1xuICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGNoYXR0eSAmJiBocy5jb21tZW50KCdTTkknKTtcbiAgICAgICAgICAgIGhzLmV4cGVjdFVpbnQxNigweDAwMDAsIGNoYXR0eSAmJiAnbm8gZXh0ZW5zaW9uIGRhdGEgKFtSRkMgNjA2NiDCpzNdKGh0dHBzOi8vZGF0YXRyYWNrZXIuaWV0Zi5vcmcvZG9jL2h0bWwvcmZjNjA2NiNzZWN0aW9uLTMpKScpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGV4dFR5cGUgPT09IDB4MDAwYSkge1xuICAgICAgICAgICAgLypcbiAgICAgICAgICAgIEFzIG9mIFRMUyAxLjMsIHNlcnZlcnMgYXJlIHBlcm1pdHRlZCB0byBzZW5kIHRoZSBcInN1cHBvcnRlZF9ncm91cHNcIlxuICAgICAgICAgICAgZXh0ZW5zaW9uIHRvIHRoZSBjbGllbnQuICBDbGllbnRzIE1VU1QgTk9UIGFjdCB1cG9uIGFueSBpbmZvcm1hdGlvblxuICAgICAgICAgICAgZm91bmQgaW4gXCJzdXBwb3J0ZWRfZ3JvdXBzXCIgcHJpb3IgdG8gc3VjY2Vzc2Z1bCBjb21wbGV0aW9uIG9mIHRoZVxuICAgICAgICAgICAgaGFuZHNoYWtlIGJ1dCBNQVkgdXNlIHRoZSBpbmZvcm1hdGlvbiBsZWFybmVkIGZyb20gYSBzdWNjZXNzZnVsbHlcbiAgICAgICAgICAgIGNvbXBsZXRlZCBoYW5kc2hha2UgdG8gY2hhbmdlIHdoYXQgZ3JvdXBzIHRoZXkgdXNlIGluIHRoZWlyXG4gICAgICAgICAgICBcImtleV9zaGFyZVwiIGV4dGVuc2lvbiBpbiBzdWJzZXF1ZW50IGNvbm5lY3Rpb25zLiAgSWYgdGhlIHNlcnZlciBoYXMgYVxuICAgICAgICAgICAgZ3JvdXAgaXQgcHJlZmVycyB0byB0aGUgb25lcyBpbiB0aGUgXCJrZXlfc2hhcmVcIiBleHRlbnNpb24gYnV0IGlzXG4gICAgICAgICAgICBzdGlsbCB3aWxsaW5nIHRvIGFjY2VwdCB0aGUgQ2xpZW50SGVsbG8sIGl0IFNIT1VMRCBzZW5kXG4gICAgICAgICAgICBcInN1cHBvcnRlZF9ncm91cHNcIiB0byB1cGRhdGUgdGhlIGNsaWVudCdzIHZpZXcgb2YgaXRzIHByZWZlcmVuY2VzO1xuICAgICAgICAgICAgdGhpcyBleHRlbnNpb24gU0hPVUxEIGNvbnRhaW4gYWxsIGdyb3VwcyB0aGUgc2VydmVyIHN1cHBvcnRzLFxuICAgICAgICAgICAgcmVnYXJkbGVzcyBvZiB3aGV0aGVyIHRoZXkgYXJlIGN1cnJlbnRseSBzdXBwb3J0ZWQgYnkgdGhlIGNsaWVudC5cbiAgICAgICAgICAgIC0gaHR0cHM6Ly93d3cucmZjLWVkaXRvci5vcmcvcmZjL3JmYzg0NDYjc2VjdGlvbi00LjJcbiAgICAgICAgICAgICovXG4gICAgICAgICAgICBjaGF0dHkgJiYgaHMuY29tbWVudCgnc3VwcG9ydGVkIGdyb3VwcyAoW1JGQyA4NDQ2IMKnNC4yXShodHRwczovL3d3dy5yZmMtZWRpdG9yLm9yZy9yZmMvcmZjODQ0NiNzZWN0aW9uLTQuMiksIFvCpzQuMi43XShodHRwczovL2RhdGF0cmFja2VyLmlldGYub3JnL2RvYy9odG1sL3JmYzg0NDYjc2VjdGlvbi00LjIuNykpJyk7XG4gICAgICAgICAgICBjb25zdCBbZW5kR3JvdXBzRGF0YV0gPSBocy5leHBlY3RMZW5ndGhVaW50MTYoY2hhdHR5ICYmICdncm91cHMgZGF0YScpO1xuICAgICAgICAgICAgY29uc3QgW2VuZEdyb3VwcywgZ3JvdXBzUmVtYWluaW5nXSA9IGhzLmV4cGVjdExlbmd0aFVpbnQxNihjaGF0dHkgJiYgJ2dyb3VwcycpO1xuICAgICAgICAgICAgY2hhdHR5ICYmIGhzLmNvbW1lbnQoJyhtb3N0IHByZWZlcnJlZCBmaXJzdCknKTtcbiAgICAgICAgICAgIHdoaWxlIChncm91cHNSZW1haW5pbmcoKSA+IDApIHtcbiAgICAgICAgICAgICAgICBjb25zdCBncm91cCA9IGhzLnJlYWRVaW50MTYoKTtcbiAgICAgICAgICAgICAgICBpZiAoY2hhdHR5KSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGdyb3VwTmFtZSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIDB4MDAxNzogJ3NlY3AyNTZyMScsXG4gICAgICAgICAgICAgICAgICAgICAgICAweDAwMTg6ICdzZWNwMzg0cjEnLFxuICAgICAgICAgICAgICAgICAgICAgICAgMHgwMDE5OiAnc2VjcDUyMXIxJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIDB4MDAxRDogJ3gyNTUxOScsXG4gICAgICAgICAgICAgICAgICAgICAgICAweDAwMUU6ICd4NDQ4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIDB4MDEwMDogJ2ZmZGhlMjA0OCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAweDAxMDE6ICdmZmRoZTMwNzInLFxuICAgICAgICAgICAgICAgICAgICAgICAgMHgwMTAyOiAnZmZkaGU0MDk2JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIDB4MDEwMzogJ2ZmZGhlNjE0NCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAweDAxMDQ6ICdmZmRoZTgxOTInLFxuICAgICAgICAgICAgICAgICAgICB9W2dyb3VwXSA/PyAndW5yZWNvZ25pc2VkIGdyb3VwJztcbiAgICAgICAgICAgICAgICAgICAgaHMuY29tbWVudChgZ3JvdXA6ICR7Z3JvdXBOYW1lfWApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVuZEdyb3VwcygpO1xuICAgICAgICAgICAgZW5kR3JvdXBzRGF0YSgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbnN1cHBvcnRlZCBzZXJ2ZXIgZW5jcnlwdGVkIGV4dGVuc2lvbiB0eXBlIDB4JHtoZXhGcm9tVTgoW2V4dFR5cGVdKS5wYWRTdGFydCg0LCAnMCcpfWApO1xuICAgICAgICB9XG4gICAgfVxuICAgIGV4dEVuZCgpO1xuICAgIGVlTWVzc2FnZUVuZCgpO1xuICAgIGlmIChocy5yZW1haW5pbmcoKSA9PT0gMClcbiAgICAgICAgaHMuZXh0ZW5kKGF3YWl0IHJlYWRIYW5kc2hha2VSZWNvcmQoKSk7IC8vIGUuZy4gVmVyY2VsIHNlbmRzIGNlcnRzIGluIGEgc2VwYXJhdGUgcmVjb3JkXG4gICAgbGV0IGNsaWVudENlcnRSZXF1ZXN0ZWQgPSBmYWxzZTtcbiAgICAvLyBjZXJ0aWZpY2F0ZSByZXF1ZXN0ICh1bnVzdWFsKVxuICAgIGxldCBjZXJ0TXNnVHlwZSA9IGhzLnJlYWRVaW50OCgpO1xuICAgIGlmIChjZXJ0TXNnVHlwZSA9PT0gMHgwZCkge1xuICAgICAgICBjaGF0dHkgJiYgaHMuY29tbWVudCgnaGFuZHNoYWtlIHJlY29yZCB0eXBlOiBjZXJ0aWZpY2F0ZSByZXF1ZXN0IChbUkZDIDg0NDYgwqc0LjMuMl0oaHR0cHM6Ly9kYXRhdHJhY2tlci5pZXRmLm9yZy9kb2MvaHRtbC9yZmM4NDQ2I3NlY3Rpb24tNC4zLjIpKScpO1xuICAgICAgICBjbGllbnRDZXJ0UmVxdWVzdGVkID0gdHJ1ZTtcbiAgICAgICAgY29uc3QgW2VuZENlcnRSZXFdID0gaHMuZXhwZWN0TGVuZ3RoVWludDI0KCdjZXJ0aWZpY2F0ZSByZXF1ZXN0IGRhdGEnKTtcbiAgICAgICAgLy8gdGhpcyBmaWVsZCBTSEFMTCBiZSB6ZXJvIGxlbmd0aCB1bmxlc3MgdXNlZCBmb3IgdGhlIHBvc3QtaGFuZHNoYWtlIGF1dGhlbnRpY2F0aW9uIGV4Y2hhbmdlcyBkZXNjcmliZWQgaW4gU2VjdGlvbiA0LjYuMlxuICAgICAgICBocy5leHBlY3RVaW50OCgweDAwLCBjaGF0dHkgJiYgJ2xlbmd0aCBvZiBjZXJ0aWZpY2F0ZSByZXF1ZXN0IGNvbnRleHQnKTtcbiAgICAgICAgY29uc3QgW2VuZENlcnRSZXFFeHRzLCBjZXJ0UmVxRXh0c1JlbWFpbmluZ10gPSBocy5leHBlY3RMZW5ndGhVaW50MTYoJ2NlcnRpZmljYXRlIHJlcXVlc3QgZXh0ZW5zaW9ucycpO1xuICAgICAgICBocy5za2lwKGNlcnRSZXFFeHRzUmVtYWluaW5nKCksIGNoYXR0eSAmJiAnY2VydGlmaWNhdGUgcmVxdWVzdCBleHRlbnNpb25zIChpZ25vcmVkKScpO1xuICAgICAgICBlbmRDZXJ0UmVxRXh0cygpO1xuICAgICAgICBlbmRDZXJ0UmVxKCk7XG4gICAgICAgIGlmIChocy5yZW1haW5pbmcoKSA9PT0gMClcbiAgICAgICAgICAgIGhzLmV4dGVuZChhd2FpdCByZWFkSGFuZHNoYWtlUmVjb3JkKCkpO1xuICAgICAgICBjZXJ0TXNnVHlwZSA9IGhzLnJlYWRVaW50OCgpO1xuICAgIH1cbiAgICAvLyBjZXJ0aWZpY2F0ZXNcbiAgICBpZiAoY2VydE1zZ1R5cGUgIT09IDB4MGIpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgVW5leHBlY3RlZCBoYW5kc2hha2UgbWVzc2FnZSB0eXBlIDB4JHtoZXhGcm9tVTgoW2NlcnRNc2dUeXBlXSl9YCk7XG4gICAgY2hhdHR5ICYmIGhzLmNvbW1lbnQoJ2hhbmRzaGFrZSByZWNvcmQgdHlwZTogY2VydGlmaWNhdGUgKFtSRkMgODQ0NiDCpzQuNC4yXShodHRwczovL2RhdGF0cmFja2VyLmlldGYub3JnL2RvYy9odG1sL3JmYzg0NDYjc2VjdGlvbi00LjQuMikpJyk7XG4gICAgY29uc3QgW2VuZENlcnRQYXlsb2FkXSA9IGhzLmV4cGVjdExlbmd0aFVpbnQyNChjaGF0dHkgJiYgJ2NlcnRpZmljYXRlIHBheWxvYWQnKTtcbiAgICBocy5leHBlY3RVaW50OCgweDAwLCBjaGF0dHkgJiYgJ25vIGJ5dGVzIG9mIHJlcXVlc3QgY29udGV4dCBmb2xsb3cnKTtcbiAgICBjb25zdCBbZW5kQ2VydHMsIGNlcnRzUmVtYWluaW5nXSA9IGhzLmV4cGVjdExlbmd0aFVpbnQyNChjaGF0dHkgJiYgJ2NlcnRpZmljYXRlcycpO1xuICAgIGNvbnN0IGNlcnRzID0gW107XG4gICAgd2hpbGUgKGNlcnRzUmVtYWluaW5nKCkgPiAwKSB7XG4gICAgICAgIGNvbnN0IFtlbmRDZXJ0XSA9IGhzLmV4cGVjdExlbmd0aFVpbnQyNChjaGF0dHkgJiYgJ2NlcnRpZmljYXRlJyk7XG4gICAgICAgIGNvbnN0IGNlcnQgPSBuZXcgQ2VydChocyk7IC8vIHRoaXMgcGFyc2VzIHRoZSBjZXJ0IGFuZCBhZHZhbmNlcyB0aGUgQnl0ZXMgb2JqZWN0IG9mZnNldFxuICAgICAgICBjZXJ0cy5wdXNoKGNlcnQpO1xuICAgICAgICBlbmRDZXJ0KCk7XG4gICAgICAgIGNvbnN0IFtlbmRDZXJ0RXh0LCBjZXJ0RXh0UmVtYWluaW5nXSA9IGhzLmV4cGVjdExlbmd0aFVpbnQxNignY2VydGlmaWNhdGUgZXh0ZW5zaW9ucycpO1xuICAgICAgICBocy5za2lwKGNlcnRFeHRSZW1haW5pbmcoKSk7XG4gICAgICAgIGVuZENlcnRFeHQoKTtcbiAgICB9XG4gICAgZW5kQ2VydHMoKTtcbiAgICBlbmRDZXJ0UGF5bG9hZCgpO1xuICAgIGlmIChjZXJ0cy5sZW5ndGggPT09IDApXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTm8gY2VydGlmaWNhdGVzIHN1cHBsaWVkJyk7XG4gICAgY29uc3QgdXNlckNlcnQgPSBjZXJ0c1swXTtcbiAgICAvLyBjZXJ0aWZpY2F0ZSB2ZXJpZnlcbiAgICBjb25zdCBjZXJ0VmVyaWZ5SGFuZHNoYWtlRGF0YSA9IGhzLmRhdGEuc3ViYXJyYXkoMCwgaHMub2Zmc2V0KTtcbiAgICBjb25zdCBjZXJ0VmVyaWZ5RGF0YSA9IGNvbmNhdChoZWxsb3MsIGNlcnRWZXJpZnlIYW5kc2hha2VEYXRhKTtcbiAgICBjb25zdCBjZXJ0VmVyaWZ5SGFzaEJ1ZmZlciA9IGF3YWl0IGNzLmRpZ2VzdCgnU0hBLTI1NicsIGNlcnRWZXJpZnlEYXRhKTtcbiAgICBjb25zdCBjZXJ0VmVyaWZ5SGFzaCA9IG5ldyBVaW50OEFycmF5KGNlcnRWZXJpZnlIYXNoQnVmZmVyKTtcbiAgICBjb25zdCBjZXJ0VmVyaWZ5U2lnbmVkRGF0YSA9IGNvbmNhdCh0eHRFbmMuZW5jb2RlKCcgJy5yZXBlYXQoNjQpICsgJ1RMUyAxLjMsIHNlcnZlciBDZXJ0aWZpY2F0ZVZlcmlmeScpLCBbMHgwMF0sIGNlcnRWZXJpZnlIYXNoKTtcbiAgICBpZiAoaHMucmVtYWluaW5nKCkgPT09IDApXG4gICAgICAgIGhzLmV4dGVuZChhd2FpdCByZWFkSGFuZHNoYWtlUmVjb3JkKCkpO1xuICAgIGhzLmV4cGVjdFVpbnQ4KDB4MGYsIGNoYXR0eSAmJiAnaGFuZHNoYWtlIG1lc3NhZ2UgdHlwZTogY2VydGlmaWNhdGUgdmVyaWZ5IChbUkZDIDg0NDYgwqc0LjQuM10oaHR0cHM6Ly9kYXRhdHJhY2tlci5pZXRmLm9yZy9kb2MvaHRtbC9yZmM4NDQ2I3NlY3Rpb24tNC40LjMpKScpO1xuICAgIGNvbnN0IFtlbmRDZXJ0VmVyaWZ5UGF5bG9hZF0gPSBocy5leHBlY3RMZW5ndGhVaW50MjQoY2hhdHR5ICYmICdoYW5kc2hha2UgbWVzc2FnZSBkYXRhJyk7XG4gICAgY29uc3Qgc2lnVHlwZSA9IGhzLnJlYWRVaW50MTYoKTtcbiAgICBjaGF0dHkgJiYgbG9nKCd2ZXJpZnlpbmcgZW5kLXVzZXIgY2VydGlmaWNhdGUgLi4uJyk7XG4gICAgaWYgKHNpZ1R5cGUgPT09IDB4MDQwMykge1xuICAgICAgICBjaGF0dHkgJiYgaHMuY29tbWVudCgnc2lnbmF0dXJlIHR5cGUgRUNEU0EtU0VDUDI1NlIxLVNIQTI1NicpOyAvLyBodHRwczovL2RhdGF0cmFja2VyLmlldGYub3JnL2RvYy9odG1sL3JmYzg0NDYjc2VjdGlvbi00LjIuM1xuICAgICAgICBjb25zdCBbZW5kU2lnbmF0dXJlXSA9IGhzLmV4cGVjdExlbmd0aFVpbnQxNigpO1xuICAgICAgICBhd2FpdCBlY2RzYVZlcmlmeShocywgdXNlckNlcnQucHVibGljS2V5LmFsbCwgY2VydFZlcmlmeVNpZ25lZERhdGEsICdQLTI1NicsICdTSEEtMjU2Jyk7XG4gICAgICAgIGVuZFNpZ25hdHVyZSgpO1xuICAgIH1cbiAgICBlbHNlIGlmIChzaWdUeXBlID09PSAweDA4MDQpIHtcbiAgICAgICAgY2hhdHR5ICYmIGhzLmNvbW1lbnQoJ3NpZ25hdHVyZSB0eXBlIFJTQS1QU1MtUlNBRS1TSEEyNTYnKTtcbiAgICAgICAgY29uc3QgW2VuZFNpZ25hdHVyZSwgc2lnbmF0dXJlUmVtYWluaW5nXSA9IGhzLmV4cGVjdExlbmd0aFVpbnQxNigpO1xuICAgICAgICBjb25zdCBzaWduYXR1cmUgPSBocy5zdWJhcnJheShzaWduYXR1cmVSZW1haW5pbmcoKSk7XG4gICAgICAgIGNoYXR0eSAmJiBocy5jb21tZW50KCdzaWduYXR1cmUnKTtcbiAgICAgICAgZW5kU2lnbmF0dXJlKCk7XG4gICAgICAgIC8qXG4gICAgICAgIFJTQVNTQS1QU1MgUlNBRSBhbGdvcml0aG1zOiAgSW5kaWNhdGVzIGEgc2lnbmF0dXJlIGFsZ29yaXRobSB1c2luZ1xuICAgICAgICBSU0FTU0EtUFNTIFtSRkM4MDE3XSB3aXRoIG1hc2sgZ2VuZXJhdGlvbiBmdW5jdGlvbiAxLiAgVGhlIGRpZ2VzdFxuICAgICAgICB1c2VkIGluIHRoZSBtYXNrIGdlbmVyYXRpb24gZnVuY3Rpb24gYW5kIHRoZSBkaWdlc3QgYmVpbmcgc2lnbmVkXG4gICAgICAgIGFyZSBib3RoIHRoZSBjb3JyZXNwb25kaW5nIGhhc2ggYWxnb3JpdGhtIGFzIGRlZmluZWQgaW4gW1NIU10uXG4gICAgICAgIFRoZSBsZW5ndGggb2YgdGhlIFNhbHQgTVVTVCBiZSBlcXVhbCB0byB0aGUgbGVuZ3RoIG9mIHRoZSBvdXRwdXRcbiAgICAgICAgb2YgdGhlIGRpZ2VzdCBhbGdvcml0aG0uICBJZiB0aGUgcHVibGljIGtleSBpcyBjYXJyaWVkIGluIGFuIFguNTA5XG4gICAgICAgIGNlcnRpZmljYXRlLCBpdCBNVVNUIHVzZSB0aGUgcnNhRW5jcnlwdGlvbiBPSUQgW1JGQzUyODBdLlxuICAgICAgICAtLSBodHRwczovL3d3dy5yZmMtZWRpdG9yLm9yZy9yZmMvcmZjODQ0NiNzZWN0aW9uLTQuMi4zXG4gICAgICAgICovXG4gICAgICAgIGNvbnN0IHNpZ25hdHVyZUtleSA9IGF3YWl0IGNzLmltcG9ydEtleSgnc3BraScsIHVzZXJDZXJ0LnB1YmxpY0tleS5hbGwsIHsgbmFtZTogJ1JTQS1QU1MnLCBoYXNoOiAnU0hBLTI1NicgfSwgZmFsc2UsIFsndmVyaWZ5J10pO1xuICAgICAgICBjb25zdCBjZXJ0VmVyaWZ5UmVzdWx0ID0gYXdhaXQgY3MudmVyaWZ5KHsgbmFtZTogJ1JTQS1QU1MnLCBzYWx0TGVuZ3RoOiAzMiAvKiBTSEEtMjU2IGxlbmd0aCBpbiBieXRlcyAqLyB9LCBzaWduYXR1cmVLZXksIHNpZ25hdHVyZSwgY2VydFZlcmlmeVNpZ25lZERhdGEpO1xuICAgICAgICBpZiAoY2VydFZlcmlmeVJlc3VsdCAhPT0gdHJ1ZSlcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignUlNBLVBTUy1SU0FFLVNIQTI1NiBjZXJ0aWZpY2F0ZSB2ZXJpZnkgZmFpbGVkJyk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFVuc3VwcG9ydGVkIGNlcnRpZmljYXRlIHZlcmlmeSBzaWduYXR1cmUgdHlwZSAweCR7aGV4RnJvbVU4KFtzaWdUeXBlXSkucGFkU3RhcnQoNCwgJzAnKX1gKTtcbiAgICB9XG4gICAgY2hhdHR5ICYmIGxvZygnJWPinJMgZW5kLXVzZXIgY2VydGlmaWNhdGUgdmVyaWZpZWQgKHNlcnZlciBoYXMgcHJpdmF0ZSBrZXkpJywgJ2NvbG9yOiAjOGM4OycpOyAvLyBpZiBub3QsIHdlJ2QgaGF2ZSB0aHJvd24gYnkgbm93XG4gICAgZW5kQ2VydFZlcmlmeVBheWxvYWQoKTtcbiAgICAvLyBoYW5kc2hha2UgdmVyaWZ5XG4gICAgY29uc3QgdmVyaWZ5SGFuZHNoYWtlRGF0YSA9IGhzLmRhdGEuc3ViYXJyYXkoMCwgaHMub2Zmc2V0KTtcbiAgICBjb25zdCB2ZXJpZnlEYXRhID0gY29uY2F0KGhlbGxvcywgdmVyaWZ5SGFuZHNoYWtlRGF0YSk7XG4gICAgY29uc3QgZmluaXNoZWRLZXkgPSBhd2FpdCBoa2RmRXhwYW5kTGFiZWwoc2VydmVyU2VjcmV0LCAnZmluaXNoZWQnLCBuZXcgVWludDhBcnJheSgwKSwgMzIsIDI1Nik7XG4gICAgY29uc3QgZmluaXNoZWRIYXNoID0gYXdhaXQgY3MuZGlnZXN0KCdTSEEtMjU2JywgdmVyaWZ5RGF0YSk7XG4gICAgY29uc3QgaG1hY0tleSA9IGF3YWl0IGNzLmltcG9ydEtleSgncmF3JywgZmluaXNoZWRLZXksIHsgbmFtZTogJ0hNQUMnLCBoYXNoOiB7IG5hbWU6IGBTSEEtMjU2YCB9IH0sIGZhbHNlLCBbJ3NpZ24nXSk7XG4gICAgY29uc3QgY29ycmVjdFZlcmlmeUhhc2hCdWZmZXIgPSBhd2FpdCBjcy5zaWduKCdITUFDJywgaG1hY0tleSwgZmluaXNoZWRIYXNoKTtcbiAgICBjb25zdCBjb3JyZWN0VmVyaWZ5SGFzaCA9IG5ldyBVaW50OEFycmF5KGNvcnJlY3RWZXJpZnlIYXNoQnVmZmVyKTtcbiAgICBpZiAoaHMucmVtYWluaW5nKCkgPT09IDApXG4gICAgICAgIGhzLmV4dGVuZChhd2FpdCByZWFkSGFuZHNoYWtlUmVjb3JkKCkpO1xuICAgIGhzLmV4cGVjdFVpbnQ4KDB4MTQsIGNoYXR0eSAmJiAnaGFuZHNoYWtlIG1lc3NhZ2UgdHlwZTogZmluaXNoZWQgKFtSRkMgODQ0NiDCpzQuNC40XShodHRwczovL2RhdGF0cmFja2VyLmlldGYub3JnL2RvYy9odG1sL3JmYzg0NDYjc2VjdGlvbi00LjQuNCkpJyk7XG4gICAgY29uc3QgW2VuZEhzRmluaXNoZWRQYXlsb2FkLCBoc0ZpbmlzaGVkUGF5bG9hZFJlbWFpbmluZ10gPSBocy5leHBlY3RMZW5ndGhVaW50MjQoY2hhdHR5ICYmICd2ZXJpZnkgaGFzaCcpO1xuICAgIGNvbnN0IHZlcmlmeUhhc2ggPSBocy5yZWFkQnl0ZXMoaHNGaW5pc2hlZFBheWxvYWRSZW1haW5pbmcoKSk7XG4gICAgY2hhdHR5ICYmIGhzLmNvbW1lbnQoJ3ZlcmlmeSBoYXNoJyk7XG4gICAgZW5kSHNGaW5pc2hlZFBheWxvYWQoKTtcbiAgICBpZiAoaHMucmVtYWluaW5nKCkgIT09IDApXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVW5leHBlY3RlZCBleHRyYSBieXRlcyBpbiBzZXJ2ZXIgaGFuZHNoYWtlJyk7XG4gICAgY29uc3QgdmVyaWZ5SGFzaFZlcmlmaWVkID0gZXF1YWwodmVyaWZ5SGFzaCwgY29ycmVjdFZlcmlmeUhhc2gpO1xuICAgIGlmICh2ZXJpZnlIYXNoVmVyaWZpZWQgIT09IHRydWUpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBzZXJ2ZXIgdmVyaWZ5IGhhc2gnKTtcbiAgICBjaGF0dHkgJiYgbG9nKCdEZWNyeXB0ZWQgdXNpbmcgdGhlIHNlcnZlciBoYW5kc2hha2Uga2V5LCB0aGUgc2VydmVy4oCZcyBoYW5kc2hha2UgbWVzc2FnZXMgYXJlIHBhcnNlZCBhcyBmb2xsb3dzIChbc291cmNlXShodHRwczovL2dpdGh1Yi5jb20vamF3ai9zdWJ0bHMvYmxvYi9tYWluL3NyYy90bHMvcmVhZEVuY3J5cHRlZEhhbmRzaGFrZS50cykpLiBUaGlzIGlzIGEgbG9uZyBzZWN0aW9uLCBzaW5jZSBYLjUwOSBjZXJ0aWZpY2F0ZXMgYXJlIHF1aXRlIGNvbXBsZXggYW5kIHRoZXJlIHdpbGwgYmUgc2V2ZXJhbCBvZiB0aGVtOicpO1xuICAgIGNoYXR0eSAmJiBsb2coLi4uaGlnaGxpZ2h0Qnl0ZXMoaHMuY29tbWVudGVkU3RyaW5nKHRydWUpLCBMb2dDb2xvdXJzLnNlcnZlcikpO1xuICAgIGNvbnN0IHZlcmlmaWVkVG9UcnVzdGVkUm9vdCA9IGF3YWl0IHZlcmlmeUNlcnRzKGhvc3QsIGNlcnRzLCByb290Q2VydHNEYXRhYmFzZSwgcmVxdWlyZVNlcnZlclRsc0V4dEtleVVzYWdlLCByZXF1aXJlRGlnaXRhbFNpZ0tleVVzYWdlKTtcbiAgICBpZiAoIXZlcmlmaWVkVG9UcnVzdGVkUm9vdClcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdWYWxpZGF0ZWQgY2VydGlmaWNhdGUgY2hhaW4gZGlkIG5vdCBlbmQgaW4gYSB0cnVzdGVkIHJvb3QnKTtcbiAgICByZXR1cm4gW2hzLmRhdGEsIGNsaWVudENlcnRSZXF1ZXN0ZWRdO1xufVxuIiwiaW1wb3J0IHsgQnl0ZXMgfSBmcm9tICcuLi91dGlsL2J5dGVzLmpzJztcbmltcG9ydCB7IGxvZyB9IGZyb20gJy4uL3ByZXNlbnRhdGlvbi9sb2cuanMnO1xuaW1wb3J0IHsgaGlnaGxpZ2h0Qnl0ZXMgfSBmcm9tICcuLi9wcmVzZW50YXRpb24vaGlnaGxpZ2h0cy5qcyc7XG5pbXBvcnQgeyBMb2dDb2xvdXJzIH0gZnJvbSAnLi4vcHJlc2VudGF0aW9uL2FwcGVhcmFuY2UuanMnO1xuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlU2Vzc2lvblRpY2tldChyZWNvcmQpIHtcbiAgICBpZiAoY2hhdHR5KSB7XG4gICAgICAgIGNvbnN0IHRpY2tldCA9IG5ldyBCeXRlcyhyZWNvcmQpO1xuICAgICAgICB0aWNrZXQuZXhwZWN0VWludDgoMHgwNCwgJ3Nlc3Npb24gdGlja2V0IG1lc3NhZ2UgKFtSRkMgODg0NiDCpzQuNi4xXShodHRwczovL2RhdGF0cmFja2VyLmlldGYub3JnL2RvYy9odG1sL3JmYzg0NDYjc2VjdGlvbi00LjYuMSkpJyk7XG4gICAgICAgIGNvbnN0IFtlbmRUaWNrZXRSZWNvcmRdID0gdGlja2V0LmV4cGVjdExlbmd0aFVpbnQyNCgnc2Vzc2lvbiB0aWNrZXQgbWVzc2FnZScpO1xuICAgICAgICBjb25zdCB0aWNrZXRTZWNvbmRzID0gdGlja2V0LnJlYWRVaW50MzIoKTtcbiAgICAgICAgdGlja2V0LmNvbW1lbnQoYHRpY2tldCBsaWZldGltZSBpbiBzZWNvbmRzOiAke3RpY2tldFNlY29uZHN9ID0gJHt0aWNrZXRTZWNvbmRzIC8gMzYwMH0gaG91cnNgKTtcbiAgICAgICAgdGlja2V0LnJlYWRVaW50MzIoJ3RpY2tldCBhZ2UgYWRkJyk7XG4gICAgICAgIGNvbnN0IFtlbmRUaWNrZXROb25jZSwgdGlja2V0Tm9uY2VSZW1haW5pbmddID0gdGlja2V0LmV4cGVjdExlbmd0aFVpbnQ4KCd0aWNrZXQgbm9uY2UnKTtcbiAgICAgICAgdGlja2V0LnJlYWRCeXRlcyh0aWNrZXROb25jZVJlbWFpbmluZygpKTtcbiAgICAgICAgdGlja2V0LmNvbW1lbnQoJ3RpY2tldCBub25jZScpO1xuICAgICAgICBlbmRUaWNrZXROb25jZSgpO1xuICAgICAgICBjb25zdCBbZW5kVGlja2V0LCB0aWNrZXRSZW1haW5pbmddID0gdGlja2V0LmV4cGVjdExlbmd0aFVpbnQxNigndGlja2V0Jyk7XG4gICAgICAgIHRpY2tldC5yZWFkQnl0ZXModGlja2V0UmVtYWluaW5nKCkpO1xuICAgICAgICB0aWNrZXQuY29tbWVudCgndGlja2V0Jyk7XG4gICAgICAgIGVuZFRpY2tldCgpO1xuICAgICAgICBjb25zdCBbZW5kVGlja2V0RXh0cywgdGlja2V0RXh0c1JlbWFpbmluZ10gPSB0aWNrZXQuZXhwZWN0TGVuZ3RoVWludDE2KCd0aWNrZXQgZXh0ZW5zaW9ucycpO1xuICAgICAgICBpZiAodGlja2V0RXh0c1JlbWFpbmluZygpID4gMCkge1xuICAgICAgICAgICAgdGlja2V0LnJlYWRCeXRlcyh0aWNrZXRFeHRzUmVtYWluaW5nKCkpO1xuICAgICAgICAgICAgdGlja2V0LmNvbW1lbnQoJ3RpY2tldCBleHRlbnNpb25zIChpZ25vcmVkKScpO1xuICAgICAgICB9XG4gICAgICAgIGVuZFRpY2tldEV4dHMoKTtcbiAgICAgICAgZW5kVGlja2V0UmVjb3JkKCk7XG4gICAgICAgIGxvZyguLi5oaWdobGlnaHRCeXRlcyh0aWNrZXQuY29tbWVudGVkU3RyaW5nKCksIExvZ0NvbG91cnMuc2VydmVyKSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IG1ha2VDbGllbnRIZWxsbyBmcm9tICcuL21ha2VDbGllbnRIZWxsby5qcyc7XG5pbXBvcnQgcGFyc2VTZXJ2ZXJIZWxsbyBmcm9tICcuL3BhcnNlU2VydmVySGVsbG8uanMnO1xuaW1wb3J0IHsgbWFrZUVuY3J5cHRlZFRsc1JlY29yZHMsIHJlYWRFbmNyeXB0ZWRUbHNSZWNvcmQsIHJlYWRUbHNSZWNvcmQsIFJlY29yZFR5cGUgfSBmcm9tICcuL3Rsc1JlY29yZC5qcyc7XG5pbXBvcnQgeyBnZXRBcHBsaWNhdGlvbktleXMsIGdldEhhbmRzaGFrZUtleXMgfSBmcm9tICcuL2tleXMuanMnO1xuaW1wb3J0IHsgaGtkZkV4cGFuZExhYmVsIH0gZnJvbSBcIi4vaGtkZi5qc1wiO1xuaW1wb3J0IHsgQ3J5cHRlciB9IGZyb20gJy4vYWVzZ2NtLmpzJztcbmltcG9ydCB7IHJlYWRFbmNyeXB0ZWRIYW5kc2hha2UgfSBmcm9tICcuL3JlYWRFbmNyeXB0ZWRIYW5kc2hha2UuanMnO1xuaW1wb3J0IHsgQnl0ZXMgfSBmcm9tICcuLi91dGlsL2J5dGVzLmpzJztcbmltcG9ydCB7IGNvbmNhdCwgZXF1YWwgfSBmcm9tICcuLi91dGlsL2FycmF5LmpzJztcbmltcG9ydCB7IGhleEZyb21VOCB9IGZyb20gJy4uL3V0aWwvaGV4LmpzJztcbmltcG9ydCB7IExvZ0NvbG91cnMgfSBmcm9tICcuLi9wcmVzZW50YXRpb24vYXBwZWFyYW5jZS5qcyc7XG5pbXBvcnQgeyBoaWdobGlnaHRCeXRlcywgaGlnaGxpZ2h0Q29sb25MaXN0IH0gZnJvbSAnLi4vcHJlc2VudGF0aW9uL2hpZ2hsaWdodHMuanMnO1xuaW1wb3J0IHsgbG9nIH0gZnJvbSAnLi4vcHJlc2VudGF0aW9uL2xvZy5qcyc7XG5pbXBvcnQgeyBUcnVzdGVkQ2VydCB9IGZyb20gJy4vY2VydC5qcyc7XG5pbXBvcnQgeyBiYXNlNjREZWNvZGUsIHVybENoYXJDb2RlcyB9IGZyb20gJy4uL3V0aWwvYmFzZTY0LmpzJztcbmltcG9ydCBjcyBmcm9tICcuLi91dGlsL2NyeXB0b1Byb3h5LmpzJztcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzdGFydFRscyhob3N0LCByb290Q2VydHNEYXRhYmFzZSwgbmV0d29ya1JlYWQsIG5ldHdvcmtXcml0ZSwgY2xvc2VkLCB7IHVzZVNOSSwgcmVxdWlyZVNlcnZlclRsc0V4dEtleVVzYWdlLCByZXF1aXJlRGlnaXRhbFNpZ0tleVVzYWdlLCB3cml0ZVByZURhdGEsIGV4cGVjdFByZURhdGEsIGNvbW1lbnRQcmVEYXRhIH0gPSB7fSkge1xuICAgIHVzZVNOSSA/Pz0gdHJ1ZTtcbiAgICByZXF1aXJlU2VydmVyVGxzRXh0S2V5VXNhZ2UgPz89IHRydWU7XG4gICAgcmVxdWlyZURpZ2l0YWxTaWdLZXlVc2FnZSA/Pz0gdHJ1ZTtcbiAgICBpZiAodHlwZW9mIHJvb3RDZXJ0c0RhdGFiYXNlID09PSAnc3RyaW5nJylcbiAgICAgICAgcm9vdENlcnRzRGF0YWJhc2UgPSBUcnVzdGVkQ2VydC5kYXRhYmFzZUZyb21QRU0ocm9vdENlcnRzRGF0YWJhc2UpO1xuICAgIGNvbnN0IGVjZGhLZXlzID0gYXdhaXQgY3MuZ2VuZXJhdGVLZXkoeyBuYW1lOiAnRUNESCcsIG5hbWVkQ3VydmU6ICdQLTI1NicgfSwgdHJ1ZSwgWydkZXJpdmVLZXknLCAnZGVyaXZlQml0cyddKTtcbiAgICBjb25zdCByYXdQdWJsaWNLZXlCdWZmZXIgPSBhd2FpdCBjcy5leHBvcnRLZXkoJ3JhdycsIGVjZGhLZXlzLnB1YmxpY0tleSk7XG4gICAgY29uc3QgcmF3UHVibGljS2V5ID0gbmV3IFVpbnQ4QXJyYXkocmF3UHVibGljS2V5QnVmZmVyKTtcbiAgICBpZiAoY2hhdHR5KSB7XG4gICAgICAgIGNvbnN0IHByaXZhdGVLZXlKV0sgPSBhd2FpdCBjcy5leHBvcnRLZXkoJ2p3aycsIGVjZGhLZXlzLnByaXZhdGVLZXkpO1xuICAgICAgICBsb2coJ1dlIGJlZ2luIHRoZSBUTFMgY29ubmVjdGlvbiBieSBnZW5lcmF0aW5nIGFuIFtFQ0RIXShodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9FbGxpcHRpYy1jdXJ2ZV9EaWZmaWUlRTIlODAlOTNIZWxsbWFuKSBrZXkgcGFpciB1c2luZyBjdXJ2ZSBbUC0yNTZdKGh0dHBzOi8vbmV1cm9tYW5jZXIuc2svc3RkL25pc3QvUC0yNTYpLiBUaGUgcHJpdmF0ZSBrZXksIGQsIGlzIHNpbXBseSBhIDI1Ni1iaXQgaW50ZWdlciBwaWNrZWQgYXQgcmFuZG9tOicpO1xuICAgICAgICBsb2coLi4uaGlnaGxpZ2h0Q29sb25MaXN0KCdkOiAnICsgaGV4RnJvbVU4KGJhc2U2NERlY29kZShwcml2YXRlS2V5SldLLmQsIHVybENoYXJDb2RlcykpKSk7XG4gICAgICAgIGxvZygnVGhlIHB1YmxpYyBrZXkgaXMgYSBwb2ludCBvbiB0aGUgY3VydmUuIFRoZSBwb2ludCBpcyBbZGVyaXZlZCBmcm9tIGQgYW5kIGEgYmFzZSBwb2ludF0oaHR0cHM6Ly9jdXJ2ZXMueGFyZ3Mub3JnKS4gSXTigJlzIGlkZW50aWZpZWQgYnkgY29vcmRpbmF0ZXMgeCBhbmQgeS4nKTtcbiAgICAgICAgbG9nKC4uLmhpZ2hsaWdodENvbG9uTGlzdCgneDogJyArIGhleEZyb21VOChiYXNlNjREZWNvZGUocHJpdmF0ZUtleUpXSy54LCB1cmxDaGFyQ29kZXMpKSkpO1xuICAgICAgICBsb2coLi4uaGlnaGxpZ2h0Q29sb25MaXN0KCd5OiAnICsgaGV4RnJvbVU4KGJhc2U2NERlY29kZShwcml2YXRlS2V5SldLLnksIHVybENoYXJDb2RlcykpKSk7XG4gICAgfVxuICAgIGNoYXR0eSAmJiBsb2coJ05vdyB3ZSBoYXZlIGEgcHVibGljL3ByaXZhdGUga2V5IHBhaXIsIHdlIGNhbiBzdGFydCB0aGUgVExTIGhhbmRzaGFrZSBieSBzZW5kaW5nIGEgY2xpZW50IGhlbGxvIG1lc3NhZ2UgKFtzb3VyY2VdKGh0dHBzOi8vZ2l0aHViLmNvbS9qYXdqL3N1YnRscy9ibG9iL21haW4vc3JjL3Rscy9tYWtlQ2xpZW50SGVsbG8udHMpKS4gVGhpcyBpbmNsdWRlcyB0aGUgcHVibGljIGtleTonKTtcbiAgICAvLyBjbGllbnQgaGVsbG9cbiAgICBjb25zdCBzZXNzaW9uSWQgPSBuZXcgVWludDhBcnJheSgzMik7XG4gICAgY3J5cHRvLmdldFJhbmRvbVZhbHVlcyhzZXNzaW9uSWQpO1xuICAgIGNvbnN0IGNsaWVudEhlbGxvID0gbWFrZUNsaWVudEhlbGxvKGhvc3QsIHJhd1B1YmxpY0tleSwgc2Vzc2lvbklkLCB1c2VTTkkpO1xuICAgIGNoYXR0eSAmJiBsb2coLi4uaGlnaGxpZ2h0Qnl0ZXMoY2xpZW50SGVsbG8uY29tbWVudGVkU3RyaW5nKCksIExvZ0NvbG91cnMuY2xpZW50KSk7XG4gICAgY29uc3QgY2xpZW50SGVsbG9EYXRhID0gY2xpZW50SGVsbG8uYXJyYXkoKTtcbiAgICBjb25zdCBpbml0aWFsRGF0YSA9IHdyaXRlUHJlRGF0YSA/IGNvbmNhdCh3cml0ZVByZURhdGEsIGNsaWVudEhlbGxvRGF0YSkgOiBjbGllbnRIZWxsb0RhdGE7XG4gICAgbmV0d29ya1dyaXRlKGluaXRpYWxEYXRhKTtcbiAgICBjaGF0dHkgJiYgbG9nKCdUaGUgc2VydmVyIHJldHVybnMgYSByZXNwb25zZSwgd2hpY2ggaW5jbHVkZXMgaXRzIG93biBwdWJsaWMga2V5LCBhbmQgd2UgcGFyc2UgaXQgKFtzb3VyY2VdKGh0dHBzOi8vZ2l0aHViLmNvbS9qYXdqL3N1YnRscy9ibG9iL21haW4vc3JjL3Rscy9wYXJzZVNlcnZlckhlbGxvLnRzKSk6Jyk7XG4gICAgaWYgKGV4cGVjdFByZURhdGEpIHtcbiAgICAgICAgY29uc3QgcmVjZWl2ZWRQcmVEYXRhID0gYXdhaXQgbmV0d29ya1JlYWQoZXhwZWN0UHJlRGF0YS5sZW5ndGgpO1xuICAgICAgICBpZiAoIXJlY2VpdmVkUHJlRGF0YSB8fCAhZXF1YWwocmVjZWl2ZWRQcmVEYXRhLCBleHBlY3RQcmVEYXRhKSlcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignUHJlIGRhdGEgZGlkIG5vdCBtYXRjaCBleHBlY3RhdGlvbicpO1xuICAgICAgICBjaGF0dHkgJiYgbG9nKC4uLmhpZ2hsaWdodEJ5dGVzKGhleEZyb21VOChyZWNlaXZlZFByZURhdGEpICsgJyAgJyArIGNvbW1lbnRQcmVEYXRhLCBMb2dDb2xvdXJzLnNlcnZlcikpO1xuICAgIH1cbiAgICAvLyBwYXJzZSBzZXJ2ZXIgaGVsbG9cbiAgICBjb25zdCBzZXJ2ZXJIZWxsb1JlY29yZCA9IGF3YWl0IHJlYWRUbHNSZWNvcmQobmV0d29ya1JlYWQsIFJlY29yZFR5cGUuSGFuZHNoYWtlKTtcbiAgICBpZiAoc2VydmVySGVsbG9SZWNvcmQgPT09IHVuZGVmaW5lZClcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDb25uZWN0aW9uIGNsb3NlZCB3aGlsZSBhd2FpdGluZyBzZXJ2ZXIgaGVsbG8nKTtcbiAgICBjb25zdCBzZXJ2ZXJIZWxsbyA9IG5ldyBCeXRlcyhzZXJ2ZXJIZWxsb1JlY29yZC5jb250ZW50KTtcbiAgICBjb25zdCBzZXJ2ZXJQdWJsaWNLZXkgPSBwYXJzZVNlcnZlckhlbGxvKHNlcnZlckhlbGxvLCBzZXNzaW9uSWQpO1xuICAgIGNoYXR0eSAmJiBsb2coLi4uaGlnaGxpZ2h0Qnl0ZXMoc2VydmVySGVsbG9SZWNvcmQuaGVhZGVyLmNvbW1lbnRlZFN0cmluZygpICsgc2VydmVySGVsbG8uY29tbWVudGVkU3RyaW5nKCksIExvZ0NvbG91cnMuc2VydmVyKSk7XG4gICAgLy8gcGFyc2UgZHVtbXkgY2lwaGVyIGNoYW5nZVxuICAgIGNvbnN0IGNoYW5nZUNpcGhlclJlY29yZCA9IGF3YWl0IHJlYWRUbHNSZWNvcmQobmV0d29ya1JlYWQsIFJlY29yZFR5cGUuQ2hhbmdlQ2lwaGVyU3BlYyk7XG4gICAgaWYgKGNoYW5nZUNpcGhlclJlY29yZCA9PT0gdW5kZWZpbmVkKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nvbm5lY3Rpb24gY2xvc2VkIGF3YWl0aW5nIHNlcnZlciBjaXBoZXIgY2hhbmdlJyk7XG4gICAgY29uc3QgY2NpcGhlciA9IG5ldyBCeXRlcyhjaGFuZ2VDaXBoZXJSZWNvcmQuY29udGVudCk7XG4gICAgY29uc3QgW2VuZENpcGhlclBheWxvYWRdID0gY2NpcGhlci5leHBlY3RMZW5ndGgoMSk7XG4gICAgY2NpcGhlci5leHBlY3RVaW50OCgweDAxLCBjaGF0dHkgJiYgJ2R1bW15IENoYW5nZUNpcGhlclNwZWMgcGF5bG9hZCAobWlkZGxlYm94IGNvbXBhdGliaWxpdHkpJyk7XG4gICAgZW5kQ2lwaGVyUGF5bG9hZCgpO1xuICAgIGNoYXR0eSAmJiBsb2coJ0ZvciB0aGUgYmVuZWZpdCBvZiBiYWRseS13cml0dGVuIG1pZGRsZWJveGVzIHRoYXQgYXJlIGZvbGxvd2luZyBhbG9uZyBleHBlY3RpbmcgVExTIDEuMiwgdGhlIHNlcnZlciBzZW5kcyB1cyBhIG1lYW5pbmdsZXNzIGNpcGhlciBjaGFuZ2UgcmVjb3JkOicpO1xuICAgIGNoYXR0eSAmJiBsb2coLi4uaGlnaGxpZ2h0Qnl0ZXMoY2hhbmdlQ2lwaGVyUmVjb3JkLmhlYWRlci5jb21tZW50ZWRTdHJpbmcoKSArIGNjaXBoZXIuY29tbWVudGVkU3RyaW5nKCksIExvZ0NvbG91cnMuc2VydmVyKSk7XG4gICAgLy8gaGFuZHNoYWtlIGtleXMsIGVuY3J5cHRpb24vZGVjcnlwdGlvbiBpbnN0YW5jZXNcbiAgICBjaGF0dHkgJiYgbG9nKCdCb3RoIHNpZGVzIG9mIHRoZSBleGNoYW5nZSBub3cgaGF2ZSBldmVyeXRoaW5nIHRoZXkgbmVlZCB0byBjYWxjdWxhdGUgdGhlIGtleXMgYW5kIElWcyB0aGF0IHdpbGwgcHJvdGVjdCB0aGUgcmVzdCBvZiB0aGUgaGFuZHNoYWtlOicpO1xuICAgIGNoYXR0eSAmJiBsb2coJyVjJXMnLCBgY29sb3I6ICR7TG9nQ29sb3Vycy5oZWFkZXJ9YCwgJ2hhbmRzaGFrZSBrZXkgY29tcHV0YXRpb25zIChbc291cmNlXShodHRwczovL2dpdGh1Yi5jb20vamF3ai9zdWJ0bHMvYmxvYi9tYWluL3NyYy90bHMva2V5cy50cykpJyk7XG4gICAgY29uc3QgY2xpZW50SGVsbG9Db250ZW50ID0gY2xpZW50SGVsbG9EYXRhLnN1YmFycmF5KDUpOyAvLyBjdXQgb2ZmIHRoZSA1LWJ5dGUgcmVjb3JkIGhlYWRlclxuICAgIGNvbnN0IHNlcnZlckhlbGxvQ29udGVudCA9IHNlcnZlckhlbGxvUmVjb3JkLmNvbnRlbnQ7IC8vIDUtYnl0ZSByZWNvcmQgaGVhZGVyIGlzIGFscmVhZHkgZXhjbHVkZWRcbiAgICBjb25zdCBoZWxsb3MgPSBjb25jYXQoY2xpZW50SGVsbG9Db250ZW50LCBzZXJ2ZXJIZWxsb0NvbnRlbnQpO1xuICAgIGNvbnN0IGhhbmRzaGFrZUtleXMgPSBhd2FpdCBnZXRIYW5kc2hha2VLZXlzKHNlcnZlclB1YmxpY0tleSwgZWNkaEtleXMucHJpdmF0ZUtleSwgaGVsbG9zLCAyNTYsIDE2KTsgLy8gd291bGQgYmUgMzg0LCAzMiBmb3IgQUVTMjU2X1NIQTM4NFxuICAgIGNvbnN0IHNlcnZlckhhbmRzaGFrZUtleSA9IGF3YWl0IGNzLmltcG9ydEtleSgncmF3JywgaGFuZHNoYWtlS2V5cy5zZXJ2ZXJIYW5kc2hha2VLZXksIHsgbmFtZTogJ0FFUy1HQ00nIH0sIGZhbHNlLCBbJ2RlY3J5cHQnXSk7XG4gICAgY29uc3QgaGFuZHNoYWtlRGVjcnlwdGVyID0gbmV3IENyeXB0ZXIoJ2RlY3J5cHQnLCBzZXJ2ZXJIYW5kc2hha2VLZXksIGhhbmRzaGFrZUtleXMuc2VydmVySGFuZHNoYWtlSVYpO1xuICAgIGNvbnN0IGNsaWVudEhhbmRzaGFrZUtleSA9IGF3YWl0IGNzLmltcG9ydEtleSgncmF3JywgaGFuZHNoYWtlS2V5cy5jbGllbnRIYW5kc2hha2VLZXksIHsgbmFtZTogJ0FFUy1HQ00nIH0sIGZhbHNlLCBbJ2VuY3J5cHQnXSk7XG4gICAgY29uc3QgaGFuZHNoYWtlRW5jcnlwdGVyID0gbmV3IENyeXB0ZXIoJ2VuY3J5cHQnLCBjbGllbnRIYW5kc2hha2VLZXksIGhhbmRzaGFrZUtleXMuY2xpZW50SGFuZHNoYWtlSVYpO1xuICAgIGNoYXR0eSAmJiBsb2coJ1RoZSBzZXJ2ZXIgY29udGludWVzIGJ5IHNlbmRpbmcgb25lIG9yIG1vcmUgZW5jcnlwdGVkIHJlY29yZHMgY29udGFpbmluZyB0aGUgcmVzdCBvZiBpdHMgaGFuZHNoYWtlIG1lc3NhZ2VzLiBUaGVzZSBpbmNsdWRlIHRoZSDigJhjZXJ0aWZpY2F0ZSB2ZXJpZnnigJkgbWVzc2FnZSwgd2hpY2ggd2UgY2hlY2sgb24gdGhlIHNwb3QsIGFuZCB0aGUgZnVsbCBjZXJ0aWZpY2F0ZSBjaGFpbiwgd2hpY2ggd2UgdmVyaWZ5IGEgYml0IGxhdGVyIG9uOicpO1xuICAgIGNvbnN0IHJlYWRIYW5kc2hha2VSZWNvcmQgPSBhc3luYyAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHRsc1JlY29yZCA9IGF3YWl0IHJlYWRFbmNyeXB0ZWRUbHNSZWNvcmQoY2xvc2VkLCBuZXR3b3JrUmVhZCwgaGFuZHNoYWtlRGVjcnlwdGVyLCBSZWNvcmRUeXBlLkhhbmRzaGFrZSk7XG4gICAgICAgIGlmICh0bHNSZWNvcmQgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignUHJlbWF0dXJlIGVuZCBvZiBlbmNyeXB0ZWQgc2VydmVyIGhhbmRzaGFrZScpO1xuICAgICAgICByZXR1cm4gdGxzUmVjb3JkO1xuICAgIH07XG4gICAgY29uc3QgW3NlcnZlckhhbmRzaGFrZSwgY2xpZW50Q2VydFJlcXVlc3RlZF0gPSBhd2FpdCByZWFkRW5jcnlwdGVkSGFuZHNoYWtlKGhvc3QsIHJlYWRIYW5kc2hha2VSZWNvcmQsIGhhbmRzaGFrZUtleXMuc2VydmVyU2VjcmV0LCBoZWxsb3MsIHJvb3RDZXJ0c0RhdGFiYXNlLCByZXF1aXJlU2VydmVyVGxzRXh0S2V5VXNhZ2UsIHJlcXVpcmVEaWdpdGFsU2lnS2V5VXNhZ2UpO1xuICAgIC8vIGR1bW15IGNpcGhlciBjaGFuZ2VcbiAgICBjaGF0dHkgJiYgbG9nKCdGb3IgdGhlIGJlbmVmaXQgb2YgYmFkbHktd3JpdHRlbiBtaWRkbGVib3hlcyB0aGF0IGFyZSBmb2xsb3dpbmcgYWxvbmcgZXhwZWN0aW5nIFRMUyAxLjIsIGl04oCZcyB0aGUgY2xpZW504oCZcyB0dXJuIHRvIHNlbmQgYSBtZWFuaW5nbGVzcyBjaXBoZXIgY2hhbmdlIHJlY29yZDonKTtcbiAgICBjb25zdCBjbGllbnRDaXBoZXJDaGFuZ2UgPSBuZXcgQnl0ZXMoNik7XG4gICAgY2xpZW50Q2lwaGVyQ2hhbmdlLndyaXRlVWludDgoMHgxNCwgY2hhdHR5ICYmICdyZWNvcmQgdHlwZTogQ2hhbmdlQ2lwaGVyU3BlYycpO1xuICAgIGNsaWVudENpcGhlckNoYW5nZS53cml0ZVVpbnQxNigweDAzMDMsIGNoYXR0eSAmJiAnVExTIHZlcnNpb24gMS4yIChtaWRkbGVib3ggY29tcGF0aWJpbGl0eSknKTtcbiAgICBjb25zdCBlbmRDbGllbnRDaXBoZXJDaGFuZ2VQYXlsb2FkID0gY2xpZW50Q2lwaGVyQ2hhbmdlLndyaXRlTGVuZ3RoVWludDE2KCk7XG4gICAgY2xpZW50Q2lwaGVyQ2hhbmdlLndyaXRlVWludDgoMHgwMSwgY2hhdHR5ICYmICdkdW1teSBDaGFuZ2VDaXBoZXJTcGVjIHBheWxvYWQgKG1pZGRsZWJveCBjb21wYXRpYmlsaXR5KScpO1xuICAgIGVuZENsaWVudENpcGhlckNoYW5nZVBheWxvYWQoKTtcbiAgICBjaGF0dHkgJiYgbG9nKC4uLmhpZ2hsaWdodEJ5dGVzKGNsaWVudENpcGhlckNoYW5nZS5jb21tZW50ZWRTdHJpbmcoKSwgTG9nQ29sb3Vycy5jbGllbnQpKTtcbiAgICBjb25zdCBjbGllbnRDaXBoZXJDaGFuZ2VEYXRhID0gY2xpZW50Q2lwaGVyQ2hhbmdlLmFycmF5KCk7IC8vIHRvIGJlIHNlbnQgYmVsb3dcbiAgICAvLyBlbXB0eSBjbGllbnQgY2VydGlmaWNhdGUsIGlmIHJlcXVlc3RlZFxuICAgIGxldCBjbGllbnRDZXJ0UmVjb3JkRGF0YSA9IG5ldyBVaW50OEFycmF5KDApO1xuICAgIGlmIChjbGllbnRDZXJ0UmVxdWVzdGVkKSB7XG4gICAgICAgIGNvbnN0IGNsaWVudENlcnRSZWNvcmQgPSBuZXcgQnl0ZXMoOCk7XG4gICAgICAgIGNsaWVudENlcnRSZWNvcmQud3JpdGVVaW50OCgweDBiLCBjaGF0dHkgJiYgJ2hhbmRzaGFrZSBtZXNzYWdlIHR5cGU6IGNsaWVudCBjZXJ0aWZpY2F0ZScpO1xuICAgICAgICBjb25zdCBlbmRDbGllbnRDZXJ0cyA9IGNsaWVudENlcnRSZWNvcmQud3JpdGVMZW5ndGhVaW50MjQoJ2NsaWVudCBjZXJ0aWZpY2F0ZSBkYXRhJyk7XG4gICAgICAgIGNsaWVudENlcnRSZWNvcmQud3JpdGVVaW50OCgweDAwLCBjaGF0dHkgJiYgJ2NlcnRpZmljYXRlIGNvbnRleHQ6IG5vbmUnKTtcbiAgICAgICAgY2xpZW50Q2VydFJlY29yZC53cml0ZVVpbnQyNCgweDAwMDAwMCwgY2hhdHR5ICYmICdjZXJ0aWZpY2F0ZSBsaXN0OiBlbXB0eScpO1xuICAgICAgICBlbmRDbGllbnRDZXJ0cygpO1xuICAgICAgICBjbGllbnRDZXJ0UmVjb3JkRGF0YSA9IGNsaWVudENlcnRSZWNvcmQuYXJyYXkoKTtcbiAgICAgICAgY2hhdHR5ICYmIGxvZygnU2luY2UgYSBjbGllbnQgY2VydCB3YXMgcmVxdWVzdGVkLCB3ZeKAmXJlIG9ibGlnZWQgdG8gc2VuZCBhIGJsYW5rIG9uZS4gSGVyZSBpdCBpcyB1bmVuY3J5cHRlZDonKTtcbiAgICAgICAgY2hhdHR5ICYmIGxvZyguLi5oaWdobGlnaHRCeXRlcyhjbGllbnRDZXJ0UmVjb3JkLmNvbW1lbnRlZFN0cmluZygpLCBMb2dDb2xvdXJzLmNsaWVudCkpO1xuICAgIH1cbiAgICBjaGF0dHkgJiYgbG9nKCdOZXh0LCB3ZSBzZW5kIGEg4oCYaGFuZHNoYWtlIGZpbmlzaGVk4oCZIG1lc3NhZ2UsIHdoaWNoIGluY2x1ZGVzIGFuIEhNQUMgb2YgdGhlIGhhbmRzaGFrZSB0byBkYXRlLiBUaGlzIGlzIGhvdyBpdCBsb29rcyBiZWZvcmUgZW5jcnlwdGlvbjonKTtcbiAgICAvLyBoYXNoIG9mIHdob2xlIGhhbmRzaGFrZSAobm90ZTogZHVtbXkgY2lwaGVyIGNoYW5nZSBpcyBleGNsdWRlZClcbiAgICBjb25zdCB3aG9sZUhhbmRzaGFrZSA9IGNvbmNhdChoZWxsb3MsIHNlcnZlckhhbmRzaGFrZSwgY2xpZW50Q2VydFJlY29yZERhdGEpO1xuICAgIGNvbnN0IHdob2xlSGFuZHNoYWtlSGFzaEJ1ZmZlciA9IGF3YWl0IGNzLmRpZ2VzdCgnU0hBLTI1NicsIHdob2xlSGFuZHNoYWtlKTtcbiAgICBjb25zdCB3aG9sZUhhbmRzaGFrZUhhc2ggPSBuZXcgVWludDhBcnJheSh3aG9sZUhhbmRzaGFrZUhhc2hCdWZmZXIpO1xuICAgIC8vIGNsaWVudCBoYW5kc2hha2UgZmluaXNoZWRcbiAgICBjb25zdCBmaW5pc2hlZEtleSA9IGF3YWl0IGhrZGZFeHBhbmRMYWJlbChoYW5kc2hha2VLZXlzLmNsaWVudFNlY3JldCwgJ2ZpbmlzaGVkJywgbmV3IFVpbnQ4QXJyYXkoMCksIDMyIC8qID0gaGFzaEJ5dGVzICovLCAyNTYpO1xuICAgIGNvbnN0IHZlcmlmeUhtYWNLZXkgPSBhd2FpdCBjcy5pbXBvcnRLZXkoJ3JhdycsIGZpbmlzaGVkS2V5LCB7IG5hbWU6ICdITUFDJywgaGFzaDogeyBuYW1lOiAnU0hBLTI1NicgfSB9LCBmYWxzZSwgWydzaWduJ10pO1xuICAgIGNvbnN0IHZlcmlmeURhdGFCdWZmZXIgPSBhd2FpdCBjcy5zaWduKCdITUFDJywgdmVyaWZ5SG1hY0tleSwgd2hvbGVIYW5kc2hha2VIYXNoKTtcbiAgICBjb25zdCB2ZXJpZnlEYXRhID0gbmV3IFVpbnQ4QXJyYXkodmVyaWZ5RGF0YUJ1ZmZlcik7XG4gICAgY29uc3QgY2xpZW50RmluaXNoZWRSZWNvcmQgPSBuZXcgQnl0ZXMoMzYpO1xuICAgIGNsaWVudEZpbmlzaGVkUmVjb3JkLndyaXRlVWludDgoMHgxNCwgY2hhdHR5ICYmICdoYW5kc2hha2UgbWVzc2FnZSB0eXBlOiBmaW5pc2hlZCcpO1xuICAgIGNvbnN0IGNsaWVudEZpbmlzaGVkUmVjb3JkRW5kID0gY2xpZW50RmluaXNoZWRSZWNvcmQud3JpdGVMZW5ndGhVaW50MjQoY2hhdHR5ICYmICdoYW5kc2hha2UgZmluaXNoZWQgZGF0YScpO1xuICAgIGNsaWVudEZpbmlzaGVkUmVjb3JkLndyaXRlQnl0ZXModmVyaWZ5RGF0YSk7XG4gICAgY2hhdHR5ICYmIGNsaWVudEZpbmlzaGVkUmVjb3JkLmNvbW1lbnQoJ3ZlcmlmeSBkYXRhJyk7XG4gICAgY2xpZW50RmluaXNoZWRSZWNvcmRFbmQoKTtcbiAgICBjb25zdCBjbGllbnRGaW5pc2hlZFJlY29yZERhdGEgPSBjbGllbnRGaW5pc2hlZFJlY29yZC5hcnJheSgpO1xuICAgIGNoYXR0eSAmJiBsb2coLi4uaGlnaGxpZ2h0Qnl0ZXMoY2xpZW50RmluaXNoZWRSZWNvcmQuY29tbWVudGVkU3RyaW5nKCksIExvZ0NvbG91cnMuY2xpZW50KSk7XG4gICAgY2hhdHR5ICYmIGxvZygnQW5kIGhlcmXigJlzIHRoZSBjbGllbnQgY2VydGlmaWNhdGUgKGlmIHJlcXVlc3RlZCkgYW5kIGhhbmRzaGFrZSBmaW5pc2hlZCBtZXNzYWdlcyBlbmNyeXB0ZWQgd2l0aCB0aGUgY2xpZW504oCZcyBoYW5kc2hha2Uga2V5IGFuZCByZWFkeSB0byBnbzonKTtcbiAgICBjb25zdCBlbmNyeXB0ZWRDbGllbnRGaW5pc2hlZCA9IGF3YWl0IG1ha2VFbmNyeXB0ZWRUbHNSZWNvcmRzKGNvbmNhdChjbGllbnRDZXJ0UmVjb3JkRGF0YSwgY2xpZW50RmluaXNoZWRSZWNvcmREYXRhKSwgaGFuZHNoYWtlRW5jcnlwdGVyLCBSZWNvcmRUeXBlLkhhbmRzaGFrZSk7IC8vIHRvIGJlIHNlbnQgYmVsb3dcbiAgICAvLyBub3RlOiBpZiBhIGNsaWVudCBjZXJ0IHdhcyByZXF1ZXN0ZWQsIHRoZSBhcHBsaWNhdGlvbiBrZXlzIGFyZSBjYWxjdWxhdGVkIHVzaW5nIGEgZGlmZmVyZW50IChzbWFsbGVyKSBzZXQgb2YgbWVzc2FnZXNcbiAgICAvLyB0aGFuIHRoZSBoYW5kc2hha2UgZmluaXNoZWQgbWVzc2FnZTsgbmFtZWx5LCB0aGUgKGVtcHR5KSBjbGllbnQgY2VydCByZWNvcmQgaXMgb21pdHRlZFxuICAgIGxldCBwYXJ0aWFsSGFuZHNoYWtlSGFzaCA9IHdob2xlSGFuZHNoYWtlSGFzaDtcbiAgICBpZiAoY2xpZW50Q2VydFJlY29yZERhdGEubGVuZ3RoID4gMCkge1xuICAgICAgICBjb25zdCBwYXJ0aWFsSGFuZHNoYWtlID0gd2hvbGVIYW5kc2hha2Uuc3ViYXJyYXkoMCwgd2hvbGVIYW5kc2hha2UubGVuZ3RoIC0gY2xpZW50Q2VydFJlY29yZERhdGEubGVuZ3RoKTtcbiAgICAgICAgY29uc3QgcGFydGlhbEhhbmRzaGFrZUhhc2hCdWZmZXIgPSBhd2FpdCBjcy5kaWdlc3QoJ1NIQS0yNTYnLCBwYXJ0aWFsSGFuZHNoYWtlKTtcbiAgICAgICAgcGFydGlhbEhhbmRzaGFrZUhhc2ggPSBuZXcgVWludDhBcnJheShwYXJ0aWFsSGFuZHNoYWtlSGFzaEJ1ZmZlcik7XG4gICAgfVxuICAgIC8vIGFwcGxpY2F0aW9uIGtleXMsIGVuY3J5cHRpb24vZGVjcnlwdGlvbiBpbnN0YW5jZXNcbiAgICBjaGF0dHkgJiYgbG9nKCdCb3RoIHBhcnRpZXMgbm93IGhhdmUgd2hhdCB0aGV5IG5lZWQgdG8gY2FsY3VsYXRlIHRoZSBrZXlzIGFuZCBJVnMgdGhhdCB3aWxsIHByb3RlY3QgdGhlIGFwcGxpY2F0aW9uIGRhdGE6Jyk7XG4gICAgY2hhdHR5ICYmIGxvZygnJWMlcycsIGBjb2xvcjogJHtMb2dDb2xvdXJzLmhlYWRlcn1gLCAnYXBwbGljYXRpb24ga2V5IGNvbXB1dGF0aW9ucyAoW3NvdXJjZV0oaHR0cHM6Ly9naXRodWIuY29tL2phd2ovc3VidGxzL2Jsb2IvbWFpbi9zcmMvdGxzL2tleXMudHMpKScpO1xuICAgIGNvbnN0IGFwcGxpY2F0aW9uS2V5cyA9IGF3YWl0IGdldEFwcGxpY2F0aW9uS2V5cyhoYW5kc2hha2VLZXlzLmhhbmRzaGFrZVNlY3JldCwgcGFydGlhbEhhbmRzaGFrZUhhc2gsIDI1NiwgMTYpO1xuICAgIGNvbnN0IGNsaWVudEFwcGxpY2F0aW9uS2V5ID0gYXdhaXQgY3MuaW1wb3J0S2V5KCdyYXcnLCBhcHBsaWNhdGlvbktleXMuY2xpZW50QXBwbGljYXRpb25LZXksIHsgbmFtZTogJ0FFUy1HQ00nIH0sIHRydWUgLyogVE9ETyBtYWtlIGZhbHNlICovLCBbJ2VuY3J5cHQnXSk7XG4gICAgY29uc3QgYXBwbGljYXRpb25FbmNyeXB0ZXIgPSBuZXcgQ3J5cHRlcignZW5jcnlwdCcsIGNsaWVudEFwcGxpY2F0aW9uS2V5LCBhcHBsaWNhdGlvbktleXMuY2xpZW50QXBwbGljYXRpb25JVik7XG4gICAgY29uc3Qgc2VydmVyQXBwbGljYXRpb25LZXkgPSBhd2FpdCBjcy5pbXBvcnRLZXkoJ3JhdycsIGFwcGxpY2F0aW9uS2V5cy5zZXJ2ZXJBcHBsaWNhdGlvbktleSwgeyBuYW1lOiAnQUVTLUdDTScgfSwgdHJ1ZSAvKiBUT0RPIG1ha2UgZmFsc2UgKi8sIFsnZGVjcnlwdCddKTtcbiAgICBjb25zdCBhcHBsaWNhdGlvbkRlY3J5cHRlciA9IG5ldyBDcnlwdGVyKCdkZWNyeXB0Jywgc2VydmVyQXBwbGljYXRpb25LZXksIGFwcGxpY2F0aW9uS2V5cy5zZXJ2ZXJBcHBsaWNhdGlvbklWKTtcbiAgICBsZXQgd3JvdGVGaW5pc2hlZFJlY29yZHMgPSBmYWxzZTtcbiAgICBjaGF0dHkgJiYgbG9nKCdUaGUgVExTIGNvbm5lY3Rpb24gaXMgZXN0YWJsaXNoZWQsIGFuZCBzZXJ2ZXIgYW5kIGNsaWVudCBjYW4gc3RhcnQgZXhjaGFuZ2luZyBlbmNyeXB0ZWQgYXBwbGljYXRpb24gZGF0YS4nKTtcbiAgICBjb25zdCByZWFkID0gKCkgPT4ge1xuICAgICAgICBpZiAoIXdyb3RlRmluaXNoZWRSZWNvcmRzKSB7XG4gICAgICAgICAgICBjb25zdCBmaW5pc2hlZFJlY29yZHMgPSBjb25jYXQoY2xpZW50Q2lwaGVyQ2hhbmdlRGF0YSwgLi4uZW5jcnlwdGVkQ2xpZW50RmluaXNoZWQpO1xuICAgICAgICAgICAgbmV0d29ya1dyaXRlKGZpbmlzaGVkUmVjb3Jkcyk7XG4gICAgICAgICAgICB3cm90ZUZpbmlzaGVkUmVjb3JkcyA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlYWRFbmNyeXB0ZWRUbHNSZWNvcmQoY2xvc2VkLCBuZXR3b3JrUmVhZCwgYXBwbGljYXRpb25EZWNyeXB0ZXIpO1xuICAgIH07XG4gICAgY29uc3Qgd3JpdGUgPSBhc3luYyAoZGF0YSkgPT4ge1xuICAgICAgICBjb25zdCBsb2NhbFdyb3RlRmluaXNoZWRSZWNvcmRzID0gd3JvdGVGaW5pc2hlZFJlY29yZHM7XG4gICAgICAgIHdyb3RlRmluaXNoZWRSZWNvcmRzID0gdHJ1ZTtcbiAgICAgICAgY29uc3QgZW5jcnlwdGVkUmVjb3JkcyA9IGF3YWl0IG1ha2VFbmNyeXB0ZWRUbHNSZWNvcmRzKGRhdGEsIGFwcGxpY2F0aW9uRW5jcnlwdGVyLCBSZWNvcmRUeXBlLkFwcGxpY2F0aW9uKTtcbiAgICAgICAgY29uc3QgYWxsUmVjb3JkcyA9IGxvY2FsV3JvdGVGaW5pc2hlZFJlY29yZHMgP1xuICAgICAgICAgICAgY29uY2F0KC4uLmVuY3J5cHRlZFJlY29yZHMpIDpcbiAgICAgICAgICAgIGNvbmNhdChjbGllbnRDaXBoZXJDaGFuZ2VEYXRhLCAuLi5lbmNyeXB0ZWRDbGllbnRGaW5pc2hlZCwgLi4uZW5jcnlwdGVkUmVjb3Jkcyk7XG4gICAgICAgIG5ldHdvcmtXcml0ZShhbGxSZWNvcmRzKTtcbiAgICB9O1xuICAgIHJldHVybiBbcmVhZCwgd3JpdGVdO1xufVxuIiwiaW1wb3J0IHsgQnl0ZXMgfSBmcm9tICcuLi91dGlsL2J5dGVzLmpzJztcbmltcG9ydCB7IGNvbmNhdCB9IGZyb20gJy4uL3V0aWwvYXJyYXkuanMnO1xuaW1wb3J0IHsgcGFyc2VTZXNzaW9uVGlja2V0IH0gZnJvbSAnLi9zZXNzaW9uVGlja2V0LmpzJztcbmltcG9ydCB7IExvZ0NvbG91cnMgfSBmcm9tICcuLi9wcmVzZW50YXRpb24vYXBwZWFyYW5jZS5qcyc7XG5pbXBvcnQgeyBoaWdobGlnaHRCeXRlcyB9IGZyb20gJy4uL3ByZXNlbnRhdGlvbi9oaWdobGlnaHRzLmpzJztcbmltcG9ydCB7IGxvZyB9IGZyb20gJy4uL3ByZXNlbnRhdGlvbi9sb2cuanMnO1xuaW1wb3J0IHsgaGV4RnJvbVU4IH0gZnJvbSAnLi4vdXRpbC9oZXguanMnO1xuZXhwb3J0IHZhciBSZWNvcmRUeXBlO1xuKGZ1bmN0aW9uIChSZWNvcmRUeXBlKSB7XG4gICAgUmVjb3JkVHlwZVtSZWNvcmRUeXBlW1wiQ2hhbmdlQ2lwaGVyU3BlY1wiXSA9IDIwXSA9IFwiQ2hhbmdlQ2lwaGVyU3BlY1wiO1xuICAgIFJlY29yZFR5cGVbUmVjb3JkVHlwZVtcIkFsZXJ0XCJdID0gMjFdID0gXCJBbGVydFwiO1xuICAgIFJlY29yZFR5cGVbUmVjb3JkVHlwZVtcIkhhbmRzaGFrZVwiXSA9IDIyXSA9IFwiSGFuZHNoYWtlXCI7XG4gICAgUmVjb3JkVHlwZVtSZWNvcmRUeXBlW1wiQXBwbGljYXRpb25cIl0gPSAyM10gPSBcIkFwcGxpY2F0aW9uXCI7XG4gICAgUmVjb3JkVHlwZVtSZWNvcmRUeXBlW1wiSGVhcnRiZWF0XCJdID0gMjRdID0gXCJIZWFydGJlYXRcIjtcbn0pKFJlY29yZFR5cGUgfHwgKFJlY29yZFR5cGUgPSB7fSkpO1xuZXhwb3J0IGNvbnN0IFJlY29yZFR5cGVOYW1lID0ge1xuICAgIFtSZWNvcmRUeXBlLkNoYW5nZUNpcGhlclNwZWNdOiAnQ2hhbmdlQ2lwaGVyU3BlYycsXG4gICAgW1JlY29yZFR5cGUuQWxlcnRdOiAnQWxlcnQnLFxuICAgIFtSZWNvcmRUeXBlLkhhbmRzaGFrZV06ICdIYW5kc2hha2UnLFxuICAgIFtSZWNvcmRUeXBlLkFwcGxpY2F0aW9uXTogJ0FwcGxpY2F0aW9uJyxcbiAgICBbUmVjb3JkVHlwZS5IZWFydGJlYXRdOiAnSGVhcnRiZWF0Jyxcbn07XG5jb25zdCBtYXhQbGFpbnRleHRSZWNvcmRMZW5ndGggPSAxIDw8IDE0O1xuY29uc3QgbWF4Q2lwaGVydGV4dFJlY29yZExlbmd0aCA9IG1heFBsYWludGV4dFJlY29yZExlbmd0aCArIDEgLyogcmVjb3JkIHR5cGUgKi8gKyAyNTUgLyogbWF4IGFlYWQgKi87XG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcmVhZFRsc1JlY29yZChyZWFkLCBleHBlY3RlZFR5cGUsIG1heExlbmd0aCA9IG1heFBsYWludGV4dFJlY29yZExlbmd0aCkge1xuICAgIGNvbnN0IGhlYWRlckxlbmd0aCA9IDU7XG4gICAgY29uc3QgaGVhZGVyRGF0YSA9IGF3YWl0IHJlYWQoaGVhZGVyTGVuZ3RoKTtcbiAgICBpZiAoaGVhZGVyRGF0YSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICByZXR1cm47XG4gICAgaWYgKGhlYWRlckRhdGEubGVuZ3RoIDwgaGVhZGVyTGVuZ3RoKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RMUyByZWNvcmQgaGVhZGVyIHRydW5jYXRlZCcpO1xuICAgIGNvbnN0IGhlYWRlciA9IG5ldyBCeXRlcyhoZWFkZXJEYXRhKTtcbiAgICBjb25zdCB0eXBlID0gaGVhZGVyLnJlYWRVaW50OCgpO1xuICAgIGlmICh0eXBlIDwgMHgxNCB8fCB0eXBlID4gMHgxOClcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbGxlZ2FsIFRMUyByZWNvcmQgdHlwZSAweCR7dHlwZS50b1N0cmluZygxNil9YCk7XG4gICAgaWYgKGV4cGVjdGVkVHlwZSAhPT0gdW5kZWZpbmVkICYmIHR5cGUgIT09IGV4cGVjdGVkVHlwZSlcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbmV4cGVjdGVkIFRMUyByZWNvcmQgdHlwZSAweCR7dHlwZS50b1N0cmluZygxNikucGFkU3RhcnQoMiwgJzAnKX0gKGV4cGVjdGVkIDB4JHtleHBlY3RlZFR5cGUudG9TdHJpbmcoMTYpLnBhZFN0YXJ0KDIsICcwJyl9KWApO1xuICAgIGNoYXR0eSAmJiBoZWFkZXIuY29tbWVudChgcmVjb3JkIHR5cGU6ICR7UmVjb3JkVHlwZU5hbWVbdHlwZV19YCk7XG4gICAgaGVhZGVyLmV4cGVjdFVpbnQxNigweDAzMDMsICdUTFMgcmVjb3JkIHZlcnNpb24gMS4yIChtaWRkbGVib3ggY29tcGF0aWJpbGl0eSknKTtcbiAgICBjb25zdCBsZW5ndGggPSBoZWFkZXIucmVhZFVpbnQxNigpO1xuICAgIGNoYXR0eSAmJiBoZWFkZXIuY29tbWVudChgJHtsZW5ndGggPT09IDAgPyAnbm8nIDogbGVuZ3RofSBieXRlJHtsZW5ndGggPT09IDEgPyAnJyA6ICdzJ30gb2YgVExTIHJlY29yZCBmb2xsb3cke2xlbmd0aCA9PT0gMSA/ICdzJyA6ICcnfWApO1xuICAgIGlmIChsZW5ndGggPiBtYXhMZW5ndGgpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgUmVjb3JkIHRvbyBsb25nOiAke2xlbmd0aH0gYnl0ZXNgKTtcbiAgICBjb25zdCBjb250ZW50ID0gYXdhaXQgcmVhZChsZW5ndGgpO1xuICAgIGlmIChjb250ZW50ID09PSB1bmRlZmluZWQgfHwgY29udGVudC5sZW5ndGggPCBsZW5ndGgpIHtcbiAgICAgICAgLy8gdGhyb3cgbmV3IEVycm9yKCdUTFMgcmVjb3JkIGNvbnRlbnQgdHJ1bmNhdGVkJyk7XG4gICAgICAgIGNvbnNvbGUubG9nKEVycm9yKCdUTFMgcmVjb3JkIGNvbnRlbnQgdHJ1bmNhdGVkJykpO1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgICByZXR1cm4geyBoZWFkZXJEYXRhLCBoZWFkZXIsIHR5cGUsIGxlbmd0aCwgY29udGVudCB9O1xufVxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJlYWRFbmNyeXB0ZWRUbHNSZWNvcmQoY2xvc2VkLCByZWFkLCBkZWNyeXB0ZXIsIGV4cGVjdGVkVHlwZSkge1xuICAgIGNvbnN0IGVuY3J5cHRlZFJlY29yZCA9IGF3YWl0IHJlYWRUbHNSZWNvcmQocmVhZCwgUmVjb3JkVHlwZS5BcHBsaWNhdGlvbiwgbWF4Q2lwaGVydGV4dFJlY29yZExlbmd0aCk7XG4gICAgaWYgKGVuY3J5cHRlZFJlY29yZCA9PT0gdW5kZWZpbmVkKVxuICAgICAgICByZXR1cm47XG4gICAgY29uc3QgZW5jcnlwdGVkQnl0ZXMgPSBuZXcgQnl0ZXMoZW5jcnlwdGVkUmVjb3JkLmNvbnRlbnQpO1xuICAgIGNvbnN0IFtlbmRFbmNyeXB0ZWRdID0gZW5jcnlwdGVkQnl0ZXMuZXhwZWN0TGVuZ3RoKGVuY3J5cHRlZEJ5dGVzLnJlbWFpbmluZygpKTtcbiAgICBlbmNyeXB0ZWRCeXRlcy5za2lwKGVuY3J5cHRlZFJlY29yZC5sZW5ndGggLSAxNiwgY2hhdHR5ICYmICdlbmNyeXB0ZWQgcGF5bG9hZCcpO1xuICAgIGVuY3J5cHRlZEJ5dGVzLnNraXAoMTYsIGNoYXR0eSAmJiAnYXV0aCB0YWcnKTtcbiAgICBlbmRFbmNyeXB0ZWQoKTtcbiAgICBjaGF0dHkgJiYgbG9nKC4uLmhpZ2hsaWdodEJ5dGVzKGVuY3J5cHRlZFJlY29yZC5oZWFkZXIuY29tbWVudGVkU3RyaW5nKCkgKyBlbmNyeXB0ZWRCeXRlcy5jb21tZW50ZWRTdHJpbmcoKSwgTG9nQ29sb3Vycy5zZXJ2ZXIpKTtcbiAgICBjb25zdCBkZWNyeXB0ZWRSZWNvcmQgPSBhd2FpdCBkZWNyeXB0ZXIucHJvY2VzcyhlbmNyeXB0ZWRSZWNvcmQuY29udGVudCwgMTYsIGVuY3J5cHRlZFJlY29yZC5oZWFkZXJEYXRhKTtcbiAgICAvLyBzdHJpcCB6ZXJvLXBhZGRpbmcgYXQgZW5kXG4gICAgbGV0IHJlY29yZFR5cGVJbmRleCA9IGRlY3J5cHRlZFJlY29yZC5sZW5ndGggLSAxO1xuICAgIHdoaWxlIChkZWNyeXB0ZWRSZWNvcmRbcmVjb3JkVHlwZUluZGV4XSA9PT0gMClcbiAgICAgICAgcmVjb3JkVHlwZUluZGV4IC09IDE7XG4gICAgaWYgKHJlY29yZFR5cGVJbmRleCA8IDApXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignRGVjcnlwdGVkIG1lc3NhZ2UgaGFzIG5vIHJlY29yZCB0eXBlIGluZGljYXRvciAoYWxsIHplcm9lcyknKTtcbiAgICBjb25zdCB0eXBlID0gZGVjcnlwdGVkUmVjb3JkW3JlY29yZFR5cGVJbmRleF07XG4gICAgY29uc3QgcmVjb3JkID0gZGVjcnlwdGVkUmVjb3JkLnN1YmFycmF5KDAsIHJlY29yZFR5cGVJbmRleCAvKiBleGNsdXNpdmUgKi8pO1xuICAgIGlmICh0eXBlID09PSBSZWNvcmRUeXBlLkFsZXJ0KSB7XG4gICAgICAgIGNvbnN0IGNsb3NlTm90aWZ5ID0gcmVjb3JkLmxlbmd0aCA9PT0gMiAmJiByZWNvcmRbMF0gPT09IDB4MDEgJiYgcmVjb3JkWzFdID09PSAweDAwO1xuICAgICAgICBjaGF0dHkgJiYgbG9nKGAlY1RMUyAweDE1IGFsZXJ0IHJlY29yZDogJHtoZXhGcm9tVTgocmVjb3JkLCAnICcpfWAgKyAoY2xvc2VOb3RpZnkgPyAnIChjbG9zZSBub3RpZnkpJyA6ICcnKSwgYGNvbG9yOiAke0xvZ0NvbG91cnMuaGVhZGVyfWApO1xuICAgICAgICBpZiAoY2xvc2VOb3RpZnkpIHtcbiAgICAgICAgICAgIGNsb3NlZC5jID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY2xvc2VOb3RpZnkpXG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkOyAvLyAweDAwIGlzIGNsb3NlX25vdGlmeVxuICAgIH1cbiAgICBjaGF0dHkgJiYgbG9nKGAuLi4gZGVjcnlwdGVkIHBheWxvYWQgKHNlZSBiZWxvdykgLi4uICVzJWMgICVzYCwgdHlwZS50b1N0cmluZygxNikucGFkU3RhcnQoMiwgJzAnKSwgYGNvbG9yOiAke0xvZ0NvbG91cnMuc2VydmVyfWAsIGBhY3R1YWwgZGVjcnlwdGVkIHJlY29yZCB0eXBlOiAke1JlY29yZFR5cGVOYW1lW3R5cGVdfWApO1xuICAgIGlmICh0eXBlID09PSBSZWNvcmRUeXBlLkhhbmRzaGFrZSAmJiByZWNvcmRbMF0gPT09IDB4MDQpIHsgLy8gbmV3IHNlc3Npb24gdGlja2V0IG1lc3NhZ2U6IGFsd2F5cyBpZ25vcmUgdGhlc2VcbiAgICAgICAgcGFyc2VTZXNzaW9uVGlja2V0KHJlY29yZCk7XG4gICAgICAgIHJldHVybiByZWFkRW5jcnlwdGVkVGxzUmVjb3JkKGNsb3NlZCwgcmVhZCwgZGVjcnlwdGVyLCBleHBlY3RlZFR5cGUpO1xuICAgIH1cbiAgICBpZiAoZXhwZWN0ZWRUeXBlICE9PSB1bmRlZmluZWQgJiYgdHlwZSAhPT0gZXhwZWN0ZWRUeXBlKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFVuZXhwZWN0ZWQgVExTIHJlY29yZCB0eXBlIDB4JHt0eXBlLnRvU3RyaW5nKDE2KS5wYWRTdGFydCgyLCAnMCcpfSAoZXhwZWN0ZWQgMHgke2V4cGVjdGVkVHlwZS50b1N0cmluZygxNikucGFkU3RhcnQoMiwgJzAnKX0pYCk7XG4gICAgcmV0dXJuIHJlY29yZDtcbn1cbmFzeW5jIGZ1bmN0aW9uIG1ha2VFbmNyeXB0ZWRUbHNSZWNvcmQocGxhaW50ZXh0LCBlbmNyeXB0ZXIsIHR5cGUpIHtcbiAgICBjb25zdCBkYXRhID0gY29uY2F0KHBsYWludGV4dCwgW3R5cGVdKTtcbiAgICBjb25zdCBoZWFkZXJMZW5ndGggPSA1O1xuICAgIGNvbnN0IGRhdGFMZW5ndGggPSBkYXRhLmxlbmd0aDtcbiAgICBjb25zdCBhdXRoVGFnTGVuZ3RoID0gMTY7XG4gICAgY29uc3QgcGF5bG9hZExlbmd0aCA9IGRhdGFMZW5ndGggKyBhdXRoVGFnTGVuZ3RoO1xuICAgIGNvbnN0IGVuY3J5cHRlZFJlY29yZCA9IG5ldyBCeXRlcyhoZWFkZXJMZW5ndGggKyBwYXlsb2FkTGVuZ3RoKTtcbiAgICBlbmNyeXB0ZWRSZWNvcmQud3JpdGVVaW50OCgweDE3LCBjaGF0dHkgJiYgJ3JlY29yZCB0eXBlOiBBcHBsaWNhdGlvbiAobWlkZGxlYm94IGNvbXBhdGliaWxpdHkpJyk7XG4gICAgZW5jcnlwdGVkUmVjb3JkLndyaXRlVWludDE2KDB4MDMwMywgY2hhdHR5ICYmICdUTFMgdmVyc2lvbiAxLjIgKG1pZGRsZWJveCBjb21wYXRpYmlsaXR5KScpO1xuICAgIGVuY3J5cHRlZFJlY29yZC53cml0ZVVpbnQxNihwYXlsb2FkTGVuZ3RoLCBgJHtwYXlsb2FkTGVuZ3RofSBieXRlcyBmb2xsb3dgKTtcbiAgICBjb25zdCBbZW5kRW5jcnlwdGVkUmVjb3JkXSA9IGVuY3J5cHRlZFJlY29yZC5leHBlY3RMZW5ndGgocGF5bG9hZExlbmd0aCk7IC8vIHVudXN1YWwgKGJ1dCBzdGlsbCB1c2VmdWwpIHdoZW4gd3JpdGluZ1xuICAgIGNvbnN0IGhlYWRlciA9IGVuY3J5cHRlZFJlY29yZC5hcnJheSgpO1xuICAgIGNvbnN0IGVuY3J5cHRlZERhdGEgPSBhd2FpdCBlbmNyeXB0ZXIucHJvY2VzcyhkYXRhLCAxNiwgaGVhZGVyKTtcbiAgICBlbmNyeXB0ZWRSZWNvcmQud3JpdGVCeXRlcyhlbmNyeXB0ZWREYXRhLnN1YmFycmF5KDAsIGVuY3J5cHRlZERhdGEubGVuZ3RoIC0gMTYpKTtcbiAgICBjaGF0dHkgJiYgZW5jcnlwdGVkUmVjb3JkLmNvbW1lbnQoJ2VuY3J5cHRlZCBkYXRhJyk7XG4gICAgZW5jcnlwdGVkUmVjb3JkLndyaXRlQnl0ZXMoZW5jcnlwdGVkRGF0YS5zdWJhcnJheShlbmNyeXB0ZWREYXRhLmxlbmd0aCAtIDE2KSk7XG4gICAgY2hhdHR5ICYmIGVuY3J5cHRlZFJlY29yZC5jb21tZW50KCdhdXRoIHRhZycpO1xuICAgIGVuZEVuY3J5cHRlZFJlY29yZCgpO1xuICAgIGNoYXR0eSAmJiBsb2coLi4uaGlnaGxpZ2h0Qnl0ZXMoZW5jcnlwdGVkUmVjb3JkLmNvbW1lbnRlZFN0cmluZygpLCBMb2dDb2xvdXJzLmNsaWVudCkpO1xuICAgIHJldHVybiBlbmNyeXB0ZWRSZWNvcmQuYXJyYXkoKTtcbn1cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBtYWtlRW5jcnlwdGVkVGxzUmVjb3JkcyhwbGFpbnRleHQsIGVuY3J5cHRlciwgdHlwZSkge1xuICAgIGNvbnN0IHJlY29yZENvdW50ID0gTWF0aC5jZWlsKHBsYWludGV4dC5sZW5ndGggLyBtYXhQbGFpbnRleHRSZWNvcmRMZW5ndGgpO1xuICAgIGNvbnN0IGVuY3J5cHRlZFJlY29yZHMgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJlY29yZENvdW50OyBpKyspIHtcbiAgICAgICAgY29uc3QgZGF0YSA9IHBsYWludGV4dC5zdWJhcnJheShpICogbWF4UGxhaW50ZXh0UmVjb3JkTGVuZ3RoLCAoaSArIDEpICogbWF4UGxhaW50ZXh0UmVjb3JkTGVuZ3RoKTtcbiAgICAgICAgY29uc3QgZW5jcnlwdGVkUmVjb3JkID0gYXdhaXQgbWFrZUVuY3J5cHRlZFRsc1JlY29yZChkYXRhLCBlbmNyeXB0ZXIsIHR5cGUpO1xuICAgICAgICBlbmNyeXB0ZWRSZWNvcmRzLnB1c2goZW5jcnlwdGVkUmVjb3JkKTtcbiAgICB9XG4gICAgcmV0dXJuIGVuY3J5cHRlZFJlY29yZHM7XG59XG4iLCJpbXBvcnQgeyBDZXJ0LCBUcnVzdGVkQ2VydCB9IGZyb20gJy4vY2VydC5qcyc7XG5pbXBvcnQgeyBoZXhGcm9tVTggfSBmcm9tICcuLi91dGlsL2hleC5qcyc7XG5pbXBvcnQgeyBMb2dDb2xvdXJzIH0gZnJvbSAnLi4vcHJlc2VudGF0aW9uL2FwcGVhcmFuY2UuanMnO1xuaW1wb3J0IHsgaGlnaGxpZ2h0Q29sb25MaXN0IH0gZnJvbSAnLi4vcHJlc2VudGF0aW9uL2hpZ2hsaWdodHMuanMnO1xuaW1wb3J0IHsgbG9nIH0gZnJvbSAnLi4vcHJlc2VudGF0aW9uL2xvZy5qcyc7XG5pbXBvcnQgeyBBU04xQnl0ZXMgfSBmcm9tICcuLi91dGlsL2FzbjFieXRlcy5qcyc7XG5pbXBvcnQgeyBlY2RzYVZlcmlmeSB9IGZyb20gJy4vZWNkc2EuanMnO1xuaW1wb3J0IGNzIGZyb20gJy4uL3V0aWwvY3J5cHRvUHJveHkuanMnO1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHZlcmlmeUNlcnRzKGhvc3QsIGNlcnRzLCByb290Q2VydHNEYXRhYmFzZSwgcmVxdWlyZVNlcnZlclRsc0V4dEtleVVzYWdlID0gdHJ1ZSwgcmVxdWlyZURpZ2l0YWxTaWdLZXlVc2FnZSA9IHRydWUpIHtcbiAgICAvLyBlbmQtdXNlciBjZXJ0aWZpY2F0ZSBjaGVja3NcbiAgICBjaGF0dHkgJiYgbG9nKCclYyVzJywgYGNvbG9yOiAke0xvZ0NvbG91cnMuaGVhZGVyfWAsICdjZXJ0aWZpY2F0ZXMgcmVjZWl2ZWQgZnJvbSBob3N0Jyk7XG4gICAgZm9yIChjb25zdCBjZXJ0IG9mIGNlcnRzKVxuICAgICAgICBjaGF0dHkgJiYgbG9nKC4uLmhpZ2hsaWdodENvbG9uTGlzdChjZXJ0LmRlc2NyaXB0aW9uKCkpKTtcbiAgICBjaGF0dHkgJiYgbG9nKCdOb3cgd2UgaGF2ZSBhbGwgdGhlIGNlcnRpZmljYXRlcywgd2hpY2ggYXJlIHN1bW1hcmlzZWQgYWJvdmUuIEZpcnN0LCB3ZSBkbyBzb21lIGJhc2ljIGNoZWNrcyBvbiB0aGUgZW5kLXVzZXIgY2VydGlmaWNhdGUg4oCUwqBpLmUuIHRoZSBvbmUgdGhpcyBzZXJ2ZXIgaXMgcHJlc2VudGluZyBhcyBpdHMgb3duIChbc291cmNlXShodHRwczovL2dpdGh1Yi5jb20vamF3ai9zdWJ0bHMvYmxvYi9tYWluL3NyYy90bHMvdmVyaWZ5Q2VydHMudHMpKTonKTtcbiAgICBjb25zdCB1c2VyQ2VydCA9IGNlcnRzWzBdO1xuICAgIGNvbnN0IG1hdGNoaW5nU3ViamVjdEFsdE5hbWUgPSB1c2VyQ2VydC5zdWJqZWN0QWx0TmFtZU1hdGNoaW5nSG9zdChob3N0KTtcbiAgICBpZiAobWF0Y2hpbmdTdWJqZWN0QWx0TmFtZSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE5vIG1hdGNoaW5nIHN1YmplY3RBbHROYW1lIGZvciAke2hvc3R9YCk7XG4gICAgY2hhdHR5ICYmIGxvZyhgJWPinJMgbWF0Y2hlZCBob3N0IHRvIHN1YmplY3RBbHROYW1lIFwiJHttYXRjaGluZ1N1YmplY3RBbHROYW1lfVwiYCwgJ2NvbG9yOiAjOGM4OycpO1xuICAgIGNvbnN0IHZhbGlkTm93ID0gdXNlckNlcnQuaXNWYWxpZEF0TW9tZW50KCk7XG4gICAgaWYgKCF2YWxpZE5vdylcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdFbmQtdXNlciBjZXJ0aWZpY2F0ZSBpcyBub3QgdmFsaWQgbm93Jyk7XG4gICAgY2hhdHR5ICYmIGxvZyhgJWPinJMgZW5kLXVzZXIgY2VydGlmaWNhdGUgaXMgdmFsaWQgbm93YCwgJ2NvbG9yOiAjOGM4OycpO1xuICAgIGlmIChyZXF1aXJlU2VydmVyVGxzRXh0S2V5VXNhZ2UpIHtcbiAgICAgICAgaWYgKCF1c2VyQ2VydC5leHRLZXlVc2FnZT8uc2VydmVyVGxzKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdFbmQtdXNlciBjZXJ0aWZpY2F0ZSBoYXMgbm8gVExTIHNlcnZlciBleHRLZXlVc2FnZScpO1xuICAgICAgICBjaGF0dHkgJiYgbG9nKGAlY+KckyBlbmQtdXNlciBjZXJ0aWZpY2F0ZSBoYXMgVExTIHNlcnZlciBleHRLZXlVc2FnZWAsICdjb2xvcjogIzhjODsnKTtcbiAgICB9XG4gICAgLy8gY2VydGlmaWNhdGUgY2hhaW4gY2hlY2tzXG4gICAgY2hhdHR5ICYmIGxvZygnTmV4dCwgd2UgdmVyaWZ5IHRoZSBzaWduYXR1cmUgb2YgZWFjaCBjZXJ0aWZpY2F0ZSB1c2luZyB0aGUgcHVibGljIGtleSBvZiB0aGUgbmV4dCBjZXJ0aWZpY2F0ZSBpbiB0aGUgY2hhaW4uIFRoaXMgY2FycmllcyBvbiB1bnRpbCB3ZSBmaW5kIGEgY2VydGlmaWNhdGUgd2UgY2FuIHZlcmlmeSB1c2luZyBvbmUgb2Ygb3VyIG93biB0cnVzdGVkIHJvb3QgY2VydGlmaWNhdGVzIChvciB1bnRpbCB3ZSByZWFjaCB0aGUgZW5kIG9mIHRoZSBjaGFpbiBhbmQgdGhlcmVmb3JlIGZhaWwpOicpO1xuICAgIGxldCB2ZXJpZmllZFRvVHJ1c3RlZFJvb3QgPSBmYWxzZTtcbiAgICBjaGF0dHkgJiYgbG9nKCclYyVzJywgYGNvbG9yOiAke0xvZ0NvbG91cnMuaGVhZGVyfWAsIGB0cnVzdGVkIHJvb3QgY2VydGlmaWNhdGVzIGluIHN0b3JlOiAke3Jvb3RDZXJ0c0RhdGFiYXNlLmluZGV4Lm9mZnNldHMubGVuZ3RoIC0gMX1gKTtcbiAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gY2VydHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgY29uc3Qgc3ViamVjdENlcnQgPSBjZXJ0c1tpXTtcbiAgICAgICAgY29uc3Qgc3ViamVjdEF1dGhLZXlJZCA9IHN1YmplY3RDZXJ0LmF1dGhvcml0eUtleUlkZW50aWZpZXI7XG4gICAgICAgIC8vIGlmIChzdWJqZWN0QXV0aEtleUlkID09PSB1bmRlZmluZWQpIHRocm93IG5ldyBFcnJvcignQ2VydGlmaWNhdGVzIHdpdGhvdXQgYW4gYXV0aG9yaXR5S2V5SWRlbnRpZmllciBhcmUgbm90IHN1cHBvcnRlZCcpO1xuICAgICAgICBsZXQgc2lnbmluZ0NlcnQ7XG4gICAgICAgIC8vIGZpcnN0LCBzZWUgaWYgYW55IHRydXN0ZWQgcm9vdCBjZXJ0IGhhcyBhIHN1YmpLZXlJZCBtYXRjaGluZyB0aGUgYXV0aEtleUlkLCBvciBpZiB0aGVyZSdzIG5vIHN1YmpLZXlJZCwgYW4gaXNzdWVyIG1hdGNoaW5nIHRoZSBzdWJqZWN0XG4gICAgICAgIGlmIChzdWJqZWN0QXV0aEtleUlkID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHNpZ25pbmdDZXJ0ID0gVHJ1c3RlZENlcnQuZmluZEluRGF0YWJhc2Uoc3ViamVjdENlcnQuaXNzdWVyLCByb290Q2VydHNEYXRhYmFzZSk7XG4gICAgICAgICAgICBjaGF0dHkgJiYgc2lnbmluZ0NlcnQgJiYgbG9nKCdtYXRjaGVkIGEgdHJ1c3RlZCByb290IGNlcnQgb24gc3ViamVjdC9pc3N1ZXIgZGlzdGluZ3Vpc2hlZCBuYW1lOiAlcycsIENlcnQuc3RyaW5nRnJvbURpc3Rpbmd1aXNoZWROYW1lKHNpZ25pbmdDZXJ0LnN1YmplY3QpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHNpZ25pbmdDZXJ0ID0gVHJ1c3RlZENlcnQuZmluZEluRGF0YWJhc2UoaGV4RnJvbVU4KHN1YmplY3RBdXRoS2V5SWQpLCByb290Q2VydHNEYXRhYmFzZSk7XG4gICAgICAgICAgICBjaGF0dHkgJiYgc2lnbmluZ0NlcnQgJiYgbG9nKCdtYXRjaGVkIGEgdHJ1c3RlZCByb290IGNlcnQgb24ga2V5IGlkOiAlcycsIGhleEZyb21VOChzdWJqZWN0QXV0aEtleUlkLCAnICcpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2lnbmluZ0NlcnQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgY2hhdHR5ICYmIGxvZygnJWMlcycsIGBjb2xvcjogJHtMb2dDb2xvdXJzLmhlYWRlcn1gLCBgdHJ1c3RlZCByb290IGNlcnRpZmljYXRlYCk7XG4gICAgICAgICAgICBjaGF0dHkgJiYgc2lnbmluZ0NlcnQgJiYgbG9nKC4uLmhpZ2hsaWdodENvbG9uTGlzdChzaWduaW5nQ2VydC5kZXNjcmlwdGlvbigpKSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gaWYgbm90LCB0cnkgdGhlIG5leHQgc3VwcGxpZWQgY2VydGlmaWNhdGVcbiAgICAgICAgaWYgKHNpZ25pbmdDZXJ0ID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICBzaWduaW5nQ2VydCA9IGNlcnRzW2kgKyAxXTtcbiAgICAgICAgLy8gaWYgd2Ugc3RpbGwgZGlkbid0IGZpbmQgYSBzaWduaW5nIGNlcnRpZmljYXRlLCBnaXZlIHVwXG4gICAgICAgIGlmIChzaWduaW5nQ2VydCA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdSYW4gb3V0IG9mIGNlcnRpZmljYXRlcyBiZWZvcmUgcmVhY2hpbmcgdHJ1c3RlZCByb290Jyk7XG4gICAgICAgIGNvbnN0IHNpZ25pbmdDZXJ0SXNUcnVzdGVkUm9vdCA9IHNpZ25pbmdDZXJ0IGluc3RhbmNlb2YgVHJ1c3RlZENlcnQ7XG4gICAgICAgIGNoYXR0eSAmJiBsb2coYGNoZWNraW5nICR7c2lnbmluZ0NlcnRJc1RydXN0ZWRSb290ID8gJ3RydXN0ZWQgcm9vdCcgOiAnaW50ZXJtZWRpYXRlJ30gc2lnbmluZyBjZXJ0aWZpY2F0ZSBDTiBcIiR7c2lnbmluZ0NlcnQuc3ViamVjdC5DTn1cIiAuLi5gKTtcbiAgICAgICAgaWYgKHNpZ25pbmdDZXJ0LmlzVmFsaWRBdE1vbWVudCgpICE9PSB0cnVlKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdTaWduaW5nIGNlcnRpZmljYXRlIGlzIG5vdCB2YWxpZCBub3cnKTtcbiAgICAgICAgY2hhdHR5ICYmIGxvZyhgJWPinJMgY2VydGlmaWNhdGUgaXMgdmFsaWQgbm93YCwgJ2NvbG9yOiAjOGM4OycpO1xuICAgICAgICBpZiAocmVxdWlyZURpZ2l0YWxTaWdLZXlVc2FnZSkge1xuICAgICAgICAgICAgaWYgKHNpZ25pbmdDZXJ0LmtleVVzYWdlPy51c2FnZXMuaGFzKCdkaWdpdGFsU2lnbmF0dXJlJykgIT09IHRydWUpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdTaWduaW5nIGNlcnRpZmljYXRlIGtleVVzYWdlIGRvZXMgbm90IGluY2x1ZGUgZGlnaXRhbCBzaWduYXR1cmVzJyk7XG4gICAgICAgICAgICBjaGF0dHkgJiYgbG9nKGAlY+KckyBjZXJ0aWZpY2F0ZSBrZXlVc2FnZSBpbmNsdWRlcyBkaWdpdGFsIHNpZ25hdHVyZXNgLCAnY29sb3I6ICM4Yzg7Jyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNpZ25pbmdDZXJ0LmJhc2ljQ29uc3RyYWludHM/LmNhICE9PSB0cnVlKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdTaWduaW5nIGNlcnRpZmljYXRlIGJhc2ljQ29uc3RyYWludHMgZG8gbm90IGluZGljYXRlIGEgQ0EgY2VydGlmaWNhdGUnKTtcbiAgICAgICAgY2hhdHR5ICYmIGxvZyhgJWPinJMgY2VydGlmaWNhdGUgYmFzaWNDb25zdHJhaW50cyBpbmRpY2F0ZSBhIENBIGNlcnRpZmljYXRlYCwgJ2NvbG9yOiAjOGM4OycpO1xuICAgICAgICBjb25zdCB7IHBhdGhMZW5ndGggfSA9IHNpZ25pbmdDZXJ0LmJhc2ljQ29uc3RyYWludHM7XG4gICAgICAgIGlmIChwYXRoTGVuZ3RoID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGNoYXR0eSAmJiBsb2coYCVj4pyTIGNlcnRpZmljYXRlIHBhdGhMZW5ndGggaXMgbm90IGNvbnN0cmFpbmVkYCwgJ2NvbG9yOiAjOGM4OycpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKHBhdGhMZW5ndGggPCBpKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRXhjZWVkZWQgY2VydGlmaWNhdGUgcGF0aExlbmd0aCcpO1xuICAgICAgICAgICAgY2hhdHR5ICYmIGxvZyhgJWPinJMgY2VydGlmaWNhdGUgcGF0aExlbmd0aCBpcyBub3QgZXhjZWVkZWRgLCAnY29sb3I6ICM4Yzg7Jyk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gdmVyaWZ5IGNlcnQgY2hhaW4gc2lnbmF0dXJlXG4gICAgICAgIGNoYXR0eSAmJiBsb2coYHZlcmlmeWluZyBjZXJ0aWZpY2F0ZSBDTiBcIiR7c3ViamVjdENlcnQuc3ViamVjdC5DTn1cIiBpcyBzaWduZWQgYnkgJWMke3NpZ25pbmdDZXJ0SXNUcnVzdGVkUm9vdCA/ICd0cnVzdGVkIHJvb3QnIDogJ2ludGVybWVkaWF0ZSd9JWMgY2VydGlmaWNhdGUgQ04gXCIke3NpZ25pbmdDZXJ0LnN1YmplY3QuQ059XCIgLi4uYCwgYGJhY2tncm91bmQ6ICR7c2lnbmluZ0NlcnRJc1RydXN0ZWRSb290ID8gJyNmZmMnIDogJyNlZWUnfWAsICdiYWNrZ3JvdW5kOiBpbmhlcml0Jyk7XG4gICAgICAgIGlmIChzdWJqZWN0Q2VydC5hbGdvcml0aG0gPT09ICcxLjIuODQwLjEwMDQ1LjQuMy4yJyB8fCBzdWJqZWN0Q2VydC5hbGdvcml0aG0gPT09ICcxLjIuODQwLjEwMDQ1LjQuMy4zJykgeyAvLyBFQ0RTQSArIFNIQTI1Ni8zODRcbiAgICAgICAgICAgIGNvbnN0IGhhc2ggPSBzdWJqZWN0Q2VydC5hbGdvcml0aG0gPT09ICcxLjIuODQwLjEwMDQ1LjQuMy4yJyA/ICdTSEEtMjU2JyA6ICdTSEEtMzg0JztcbiAgICAgICAgICAgIGNvbnN0IHNpZ25pbmdLZXlPSURzID0gc2lnbmluZ0NlcnQucHVibGljS2V5LmlkZW50aWZpZXJzO1xuICAgICAgICAgICAgY29uc3QgbmFtZWRDdXJ2ZSA9IHNpZ25pbmdLZXlPSURzLmluY2x1ZGVzKCcxLjIuODQwLjEwMDQ1LjMuMS43JykgPyAnUC0yNTYnIDogc2lnbmluZ0tleU9JRHMuaW5jbHVkZXMoJzEuMy4xMzIuMC4zNCcpID8gJ1AtMzg0JyA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGlmIChuYW1lZEN1cnZlID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbnN1cHBvcnRlZCBzaWduaW5nIGtleSBjdXJ2ZScpO1xuICAgICAgICAgICAgY29uc3Qgc2IgPSBuZXcgQVNOMUJ5dGVzKHN1YmplY3RDZXJ0LnNpZ25hdHVyZSk7XG4gICAgICAgICAgICBhd2FpdCBlY2RzYVZlcmlmeShzYiwgc2lnbmluZ0NlcnQucHVibGljS2V5LmFsbCwgc3ViamVjdENlcnQuc2lnbmVkRGF0YSwgbmFtZWRDdXJ2ZSwgaGFzaCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoc3ViamVjdENlcnQuYWxnb3JpdGhtID09PSAnMS4yLjg0MC4xMTM1NDkuMS4xLjExJyB8fCBzdWJqZWN0Q2VydC5hbGdvcml0aG0gPT09ICcxLjIuODQwLjExMzU0OS4xLjEuMTInKSB7IC8vIFJTQVNTQV9QS0NTMS12MV81ICsgU0hBLTI1Ni8zODRcbiAgICAgICAgICAgIGNvbnN0IGhhc2ggPSBzdWJqZWN0Q2VydC5hbGdvcml0aG0gPT09ICcxLjIuODQwLjExMzU0OS4xLjEuMTEnID8gJ1NIQS0yNTYnIDogJ1NIQS0zODQnO1xuICAgICAgICAgICAgY29uc3Qgc2lnbmF0dXJlS2V5ID0gYXdhaXQgY3MuaW1wb3J0S2V5KCdzcGtpJywgc2lnbmluZ0NlcnQucHVibGljS2V5LmFsbCwgeyBuYW1lOiAnUlNBU1NBLVBLQ1MxLXYxXzUnLCBoYXNoIH0sIGZhbHNlLCBbJ3ZlcmlmeSddKTtcbiAgICAgICAgICAgIGNvbnN0IGNlcnRWZXJpZnlSZXN1bHQgPSBhd2FpdCBjcy52ZXJpZnkoeyBuYW1lOiAnUlNBU1NBLVBLQ1MxLXYxXzUnIH0sIHNpZ25hdHVyZUtleSwgc3ViamVjdENlcnQuc2lnbmF0dXJlLCBzdWJqZWN0Q2VydC5zaWduZWREYXRhKTtcbiAgICAgICAgICAgIGlmIChjZXJ0VmVyaWZ5UmVzdWx0ICE9PSB0cnVlKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignUlNBU1NBX1BLQ1MxLXYxXzUtU0hBMjU2IGNlcnRpZmljYXRlIHZlcmlmeSBmYWlsZWQnKTtcbiAgICAgICAgICAgIGNoYXR0eSAmJiBsb2coYCVj4pyTIFJTQVNBQS1QS0NTMS12MV81IHNpZ25hdHVyZSB2ZXJpZmllZGAsICdjb2xvcjogIzhjODsnKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVW5zdXBwb3J0ZWQgc2lnbmluZyBhbGdvcml0aG0nKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2lnbmluZ0NlcnRJc1RydXN0ZWRSb290KSB7XG4gICAgICAgICAgICBjaGF0dHkgJiYgbG9nKGAlY+KckyBjaGFpbiBvZiB0cnVzdCB2YWxpZGF0ZWQgYmFjayB0byBhIHRydXN0ZWQgcm9vdGAsICdjb2xvcjogIzhjODsnKTtcbiAgICAgICAgICAgIHZlcmlmaWVkVG9UcnVzdGVkUm9vdCA9IHRydWU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdmVyaWZpZWRUb1RydXN0ZWRSb290O1xufVxuIiwiZXhwb3J0IGZ1bmN0aW9uIGNvbmNhdCguLi5hcnJzKSB7XG4gICAgaWYgKGFycnMubGVuZ3RoID09PSAxICYmIGFycnNbMF0gaW5zdGFuY2VvZiBVaW50OEFycmF5KVxuICAgICAgICByZXR1cm4gYXJyc1swXTtcbiAgICBjb25zdCBsZW5ndGggPSBhcnJzLnJlZHVjZSgobWVtbywgYXJyKSA9PiBtZW1vICsgYXJyLmxlbmd0aCwgMCk7XG4gICAgY29uc3QgcmVzdWx0ID0gbmV3IFVpbnQ4QXJyYXkobGVuZ3RoKTtcbiAgICBsZXQgb2Zmc2V0ID0gMDtcbiAgICBmb3IgKGNvbnN0IGFyciBvZiBhcnJzKSB7XG4gICAgICAgIHJlc3VsdC5zZXQoYXJyLCBvZmZzZXQpO1xuICAgICAgICBvZmZzZXQgKz0gYXJyLmxlbmd0aDtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbmV4cG9ydCBmdW5jdGlvbiBlcXVhbChhLCBiKSB7XG4gICAgY29uc3QgYUxlbmd0aCA9IGEubGVuZ3RoO1xuICAgIGlmIChhTGVuZ3RoICE9PSBiLmxlbmd0aClcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYUxlbmd0aDsgaSsrKVxuICAgICAgICBpZiAoYVtpXSAhPT0gYltpXSlcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICByZXR1cm4gdHJ1ZTtcbn1cbmV4cG9ydCBmdW5jdGlvbiByYW5nZShzdGFydCwgc3RvcCwgc3RlcCkge1xuICAgIGlmIChzdG9wID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgc3RvcCA9IHN0YXJ0O1xuICAgICAgICBzdGFydCA9IDA7XG4gICAgfVxuICAgIGlmIChzdGVwID09PSB1bmRlZmluZWQpXG4gICAgICAgIHN0ZXAgPSAxO1xuICAgIGNvbnN0IHJlc3VsdCA9IFtdO1xuICAgIGZvciAobGV0IGkgPSBzdGFydDsgaSA8IHN0b3A7IGkgKz0gc3RlcClcbiAgICAgICAgcmVzdWx0LnB1c2goaSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbmV4cG9ydCBjbGFzcyBHcm93YWJsZURhdGEge1xuICAgIGxlbmd0aDtcbiAgICBkYXRhO1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmxlbmd0aCA9IDA7XG4gICAgICAgIHRoaXMuZGF0YSA9IG5ldyBVaW50OEFycmF5KCk7XG4gICAgfVxuICAgIGFwcGVuZChuZXdEYXRhKSB7XG4gICAgICAgIGNvbnN0IG5ld0RhdGFMZW5ndGggPSBuZXdEYXRhLmxlbmd0aDtcbiAgICAgICAgaWYgKHRoaXMubGVuZ3RoICsgbmV3RGF0YUxlbmd0aCA+IHRoaXMuZGF0YS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNvbnN0IHByZXZEYXRhID0gdGhpcy5kYXRhO1xuICAgICAgICAgICAgdGhpcy5kYXRhID0gbmV3IFVpbnQ4QXJyYXkodGhpcy5sZW5ndGggKiAyICsgbmV3RGF0YUxlbmd0aCk7XG4gICAgICAgICAgICB0aGlzLmRhdGEuc2V0KHByZXZEYXRhKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRhdGEuc2V0KG5ld0RhdGEsIHRoaXMubGVuZ3RoKTtcbiAgICAgICAgdGhpcy5sZW5ndGggKz0gbmV3RGF0YS5sZW5ndGg7XG4gICAgfVxuICAgIGdldERhdGEoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuc3ViYXJyYXkoMCwgdGhpcy5sZW5ndGgpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IEJ5dGVzIH0gZnJvbSAnLi9ieXRlcy5qcyc7XG5pbXBvcnQgeyBoZXhGcm9tVTggfSBmcm9tICcuL2hleC5qcyc7XG5leHBvcnQgY2xhc3MgQVNOMUJ5dGVzIGV4dGVuZHMgQnl0ZXMge1xuICAgIHJlYWRBU04xTGVuZ3RoKGNvbW1lbnQpIHtcbiAgICAgICAgY29uc3QgYnl0ZTEgPSB0aGlzLnJlYWRVaW50OCgpO1xuICAgICAgICBpZiAoYnl0ZTEgPCAweDgwKSB7XG4gICAgICAgICAgICBjaGF0dHkgJiYgdGhpcy5jb21tZW50KGAke2J5dGUxfSBieXRlcyR7Y29tbWVudCA/IGAgb2YgJHtjb21tZW50fWAgOiAnJ30gZm9sbG93IChBU04uMSlgKTtcbiAgICAgICAgICAgIHJldHVybiBieXRlMTsgLy8gaGlnaGVzdCBiaXQgdW5zZXQ6IHNpbXBsZSBvbmUtYnl0ZSB2YWx1ZVxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGxlbmd0aEJ5dGVzID0gYnl0ZTEgJiAweDdmO1xuICAgICAgICBjb25zdCBmdWxsQ29tbWVudCA9IGNoYXR0eSAmJiBgJSBieXRlcyR7Y29tbWVudCA/IGAgb2YgJHtjb21tZW50fWAgOiAnJ30gZm9sbG93IChBU04uMSlgO1xuICAgICAgICBpZiAobGVuZ3RoQnl0ZXMgPT09IDEpXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZWFkVWludDgoZnVsbENvbW1lbnQpO1xuICAgICAgICBpZiAobGVuZ3RoQnl0ZXMgPT09IDIpXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZWFkVWludDE2KGZ1bGxDb21tZW50KTtcbiAgICAgICAgaWYgKGxlbmd0aEJ5dGVzID09PSAzKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVhZFVpbnQyNChmdWxsQ29tbWVudCk7XG4gICAgICAgIGlmIChsZW5ndGhCeXRlcyA9PT0gNClcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlYWRVaW50MzIoZnVsbENvbW1lbnQpO1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEFTTi4xIGxlbmd0aCBmaWVsZHMgYXJlIG9ubHkgc3VwcG9ydGVkIHVwIHRvIDQgYnl0ZXMgKHRoaXMgb25lIGlzICR7bGVuZ3RoQnl0ZXN9IGJ5dGVzKWApO1xuICAgIH1cbiAgICBleHBlY3RBU04xTGVuZ3RoKGNvbW1lbnQpIHtcbiAgICAgICAgY29uc3QgbGVuZ3RoID0gdGhpcy5yZWFkQVNOMUxlbmd0aChjb21tZW50KTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZXhwZWN0TGVuZ3RoKGxlbmd0aCk7XG4gICAgfVxuICAgIHJlYWRBU04xT0lEKGNvbW1lbnQpIHtcbiAgICAgICAgY29uc3QgW2VuZE9JRCwgT0lEUmVtYWluaW5nXSA9IHRoaXMuZXhwZWN0QVNOMUxlbmd0aChjaGF0dHkgJiYgJ09JRCcpO1xuICAgICAgICBjb25zdCBieXRlMSA9IHRoaXMucmVhZFVpbnQ4KCk7XG4gICAgICAgIGxldCBvaWQgPSBgJHtNYXRoLmZsb29yKGJ5dGUxIC8gNDApfS4ke2J5dGUxICUgNDB9YDtcbiAgICAgICAgd2hpbGUgKE9JRFJlbWFpbmluZygpID4gMCkgeyAvLyBsb29wIG92ZXIgbnVtYmVycyBpbiBPSURcbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IDA7XG4gICAgICAgICAgICB3aGlsZSAodHJ1ZSkgeyAvLyBsb29wIG92ZXIgYnl0ZXMgaW4gbnVtYmVyXG4gICAgICAgICAgICAgICAgY29uc3QgbmV4dEJ5dGUgPSB0aGlzLnJlYWRVaW50OCgpO1xuICAgICAgICAgICAgICAgIHZhbHVlIDw8PSA3O1xuICAgICAgICAgICAgICAgIHZhbHVlICs9IG5leHRCeXRlICYgMHg3ZjtcbiAgICAgICAgICAgICAgICBpZiAobmV4dEJ5dGUgPCAweDgwKVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9pZCArPSBgLiR7dmFsdWV9YDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY2hhdHR5ICYmIGNvbW1lbnQpXG4gICAgICAgICAgICB0aGlzLmNvbW1lbnQoY29tbWVudC5yZXBsYWNlKC8lL2csIG9pZCkpO1xuICAgICAgICBlbmRPSUQoKTtcbiAgICAgICAgcmV0dXJuIG9pZDtcbiAgICB9XG4gICAgcmVhZEFTTjFCb29sZWFuKGNvbW1lbnQpIHtcbiAgICAgICAgY29uc3QgW2VuZEJvb2xlYW4sIGJvb2xlYW5SZW1haW5pbmddID0gdGhpcy5leHBlY3RBU04xTGVuZ3RoKGNoYXR0eSAmJiAnYm9vbGVhbicpO1xuICAgICAgICBjb25zdCBsZW5ndGggPSBib29sZWFuUmVtYWluaW5nKCk7XG4gICAgICAgIGlmIChsZW5ndGggIT09IDEpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEJvb2xlYW4gaGFzIHdlaXJkIGxlbmd0aDogJHtsZW5ndGh9YCk7XG4gICAgICAgIGNvbnN0IGJ5dGUgPSB0aGlzLnJlYWRVaW50OCgpO1xuICAgICAgICBsZXQgcmVzdWx0O1xuICAgICAgICBpZiAoYnl0ZSA9PT0gMHhmZilcbiAgICAgICAgICAgIHJlc3VsdCA9IHRydWU7XG4gICAgICAgIGVsc2UgaWYgKGJ5dGUgPT09IDB4MDApXG4gICAgICAgICAgICByZXN1bHQgPSBmYWxzZTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBCb29sZWFuIGhhcyB3ZWlyZCB2YWx1ZTogMHgke2hleEZyb21VOChbYnl0ZV0pfWApO1xuICAgICAgICBpZiAoY2hhdHR5ICYmIGNvbW1lbnQpXG4gICAgICAgICAgICB0aGlzLmNvbW1lbnQoY29tbWVudC5yZXBsYWNlKC8lL2csIFN0cmluZyhyZXN1bHQpKSk7XG4gICAgICAgIGVuZEJvb2xlYW4oKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgcmVhZEFTTjFVVENUaW1lKCkge1xuICAgICAgICBjb25zdCBbZW5kVGltZSwgdGltZVJlbWFpbmluZ10gPSB0aGlzLmV4cGVjdEFTTjFMZW5ndGgoY2hhdHR5ICYmICdVVEMgdGltZScpO1xuICAgICAgICBjb25zdCB0aW1lU3RyID0gdGhpcy5yZWFkVVRGOFN0cmluZyh0aW1lUmVtYWluaW5nKCkpO1xuICAgICAgICBjb25zdCBwYXJ0cyA9IHRpbWVTdHIubWF0Y2goL14oXFxkXFxkKShcXGRcXGQpKFxcZFxcZCkoXFxkXFxkKShcXGRcXGQpKFxcZFxcZClaJC8pO1xuICAgICAgICBpZiAoIXBhcnRzKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbnJlY29nbmlzZWQgQVNOLjEgVVRDIHRpbWUgZm9ybWF0Jyk7XG4gICAgICAgIGNvbnN0IFssIHlyMmRzdHIsIG10aCwgZHksIGhyLCBtaW4sIHNlY10gPSBwYXJ0cztcbiAgICAgICAgY29uc3QgeXIyZCA9IHBhcnNlSW50KHlyMmRzdHIsIDEwKTtcbiAgICAgICAgY29uc3QgeXIgPSB5cjJkICsgKHlyMmQgPj0gNTAgPyAxOTAwIDogMjAwMCk7IC8vIHJhbmdlIGlzIDE5NTAg4oCTwqAyMDQ5XG4gICAgICAgIGNvbnN0IHRpbWUgPSBuZXcgRGF0ZShgJHt5cn0tJHttdGh9LSR7ZHl9VCR7aHJ9OiR7bWlufToke3NlY31aYCk7IC8vIElTTzg2MDEgc2hvdWxkIGJlIHNhZmUgdG8gcGFyc2VcbiAgICAgICAgY2hhdHR5ICYmIHRoaXMuY29tbWVudCgnPSAnICsgdGltZS50b0lTT1N0cmluZygpKTtcbiAgICAgICAgZW5kVGltZSgpO1xuICAgICAgICByZXR1cm4gdGltZTtcbiAgICB9XG4gICAgcmVhZEFTTjFHZW5lcmFsaXplZFRpbWUoKSB7XG4gICAgICAgIGNvbnN0IFtlbmRUaW1lLCB0aW1lUmVtYWluaW5nXSA9IHRoaXMuZXhwZWN0QVNOMUxlbmd0aChjaGF0dHkgJiYgJ2dlbmVyYWxpemVkIHRpbWUnKTtcbiAgICAgICAgY29uc3QgdGltZVN0ciA9IHRoaXMucmVhZFVURjhTdHJpbmcodGltZVJlbWFpbmluZygpKTtcbiAgICAgICAgY29uc3QgcGFydHMgPSB0aW1lU3RyLm1hdGNoKC9eKFswLTldezR9KShbMC05XXsyfSkoWzAtOV17Mn0pKFswLTldezJ9KShbMC05XXsyfSk/KFswLTldezJ9KT8oWy5dWzAtOV0rKT8oWik/KFstK11bMC05XSspPyQvKTtcbiAgICAgICAgaWYgKCFwYXJ0cylcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVW5yZWNvZ25pc2VkIEFTTi4xIGdlbmVyYWxpemVkIHRpbWUgZm9ybWF0Jyk7XG4gICAgICAgIGNvbnN0IFssIHlyLCBtdGgsIGR5LCBociwgbWluLCBzZWMsIGZyYWNzZWMsIHosIHR6XSA9IHBhcnRzO1xuICAgICAgICBpZiAoc2VjID09PSB1bmRlZmluZWQgJiYgZnJhY3NlYyAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIEFTTi4xIGdlbmVyYWxpemVkIHRpbWUgZm9ybWF0IChmcmFjdGlvbiB3aXRob3V0IHNlY29uZHMpJyk7XG4gICAgICAgIGlmICh6ICE9PSB1bmRlZmluZWQgJiYgdHogIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBBU04uMSBnZW5lcmFsaXplZCB0aW1lIGZvcm1hdCAoWiBhbmQgdGltZXpvbmUpJyk7XG4gICAgICAgIGNvbnN0IHRpbWUgPSBuZXcgRGF0ZShgJHt5cn0tJHttdGh9LSR7ZHl9VCR7aHJ9OiR7bWluID8/ICcwMCd9OiR7c2VjID8/ICcwMCd9JHtmcmFjc2VjID8/ICcnfSR7dHogPz8gJ1onfWApOyAvLyBJU084NjAxIHNob3VsZCBiZSBzYWZlIHRvIHBhcnNlXG4gICAgICAgIGNoYXR0eSAmJiB0aGlzLmNvbW1lbnQoJz0gJyArIHRpbWUudG9JU09TdHJpbmcoKSk7XG4gICAgICAgIGVuZFRpbWUoKTtcbiAgICAgICAgcmV0dXJuIHRpbWU7XG4gICAgfVxuICAgIHJlYWRBU04xQml0U3RyaW5nKCkge1xuICAgICAgICBjb25zdCBbZW5kQml0U3RyaW5nLCBiaXRTdHJpbmdSZW1haW5pbmddID0gdGhpcy5leHBlY3RBU04xTGVuZ3RoKGNoYXR0eSAmJiAnYml0IHN0cmluZycpO1xuICAgICAgICBjb25zdCByaWdodFBhZEJpdHMgPSB0aGlzLnJlYWRVaW50OChjaGF0dHkgJiYgJ3JpZ2h0LXBhZGRpbmcgYml0cycpO1xuICAgICAgICBjb25zdCBieXRlc0xlbmd0aCA9IGJpdFN0cmluZ1JlbWFpbmluZygpO1xuICAgICAgICBjb25zdCBiaXRTdHJpbmcgPSB0aGlzLnJlYWRCeXRlcyhieXRlc0xlbmd0aCk7XG4gICAgICAgIGlmIChyaWdodFBhZEJpdHMgPiA3KVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIHJpZ2h0IHBhZCB2YWx1ZTogJHtyaWdodFBhZEJpdHN9YCk7XG4gICAgICAgIGlmIChyaWdodFBhZEJpdHMgPiAwKSB7IC8vICh0aGlzIHdhcyBzdXJwcmlzaW5nbHkgaGFyZCB0byBnZXQgcmlnaHQpXG4gICAgICAgICAgICBjb25zdCBsZWZ0UGFkTmV4dCA9IDggLSByaWdodFBhZEJpdHM7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gYnl0ZXNMZW5ndGggLSAxOyBpID4gMDsgaS0tKSB7XG4gICAgICAgICAgICAgICAgYml0U3RyaW5nW2ldID0gKDB4ZmYgJiAoYml0U3RyaW5nW2kgLSAxXSA8PCBsZWZ0UGFkTmV4dCkpIHwgKGJpdFN0cmluZ1tpXSA+Pj4gcmlnaHRQYWRCaXRzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJpdFN0cmluZ1swXSA9IGJpdFN0cmluZ1swXSA+Pj4gcmlnaHRQYWRCaXRzO1xuICAgICAgICB9XG4gICAgICAgIGVuZEJpdFN0cmluZygpO1xuICAgICAgICByZXR1cm4gYml0U3RyaW5nO1xuICAgIH1cbn1cbiIsImZ1bmN0aW9uIGJhc2U2NEVycm9yKGNoYXJDb2RlKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIGJhc2UgNjQgY2hhcmFjdGVyOiAke1N0cmluZy5mcm9tQ2hhckNvZGUoY2hhckNvZGUpfWApO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHN0ZENoYXJDb2RlcyhjaGFyQ29kZSkge1xuICAgIC8qXG4gICAgQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVogYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXogMDEyMzQ1Njc4OSAgKyAgLyAgPSc7XG4gICAgNjUgICAgICAgICAgICAgICAgICAgICAgOTAgOTcgICAgICAgICAgICAgICAgICAgICAxMjIgNDggICAgICA1NyA0MyA0NyA2MVxuICAgICAwICAgICAgICAgICAgICAgICAgICAgIDI1IDI2ICAgICAgICAgICAgICAgICAgICAgIDUxIDUyICAgICAgNjEgNjIgNjMgNjRcbiAgICAqL1xuICAgIHJldHVybiBjaGFyQ29kZSA+IDY0ICYmIGNoYXJDb2RlIDwgOTEgPyBjaGFyQ29kZSAtIDY1IDpcbiAgICAgICAgY2hhckNvZGUgPiA5NiAmJiBjaGFyQ29kZSA8IDEyMyA/IGNoYXJDb2RlIC0gNzEgOlxuICAgICAgICAgICAgY2hhckNvZGUgPiA0NyAmJiBjaGFyQ29kZSA8IDU4ID8gY2hhckNvZGUgKyA0IDpcbiAgICAgICAgICAgICAgICBjaGFyQ29kZSA9PT0gNDMgPyA2MiA6XG4gICAgICAgICAgICAgICAgICAgIGNoYXJDb2RlID09PSA0NyA/IDYzIDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoYXJDb2RlID09PSA2MSA/IDY0IDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYXNlNjRFcnJvcihjaGFyQ29kZSk7XG59XG5leHBvcnQgZnVuY3Rpb24gdXJsQ2hhckNvZGVzKGNoYXJDb2RlKSB7XG4gICAgLypcbiAgICBBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWiBhYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5eiAwMTIzNDU2Nzg5ICAtICBfICA9IC4nO1xuICAgIDY1ICAgICAgICAgICAgICAgICAgICAgIDkwIDk3ICAgICAgICAgICAgICAgICAgICAgMTIyIDQ4ICAgICAgNTcgNDUgOTUgNjEgNDZcbiAgICAgMCAgICAgICAgICAgICAgICAgICAgICAyNSAyNiAgICAgICAgICAgICAgICAgICAgICA1MSA1MiAgICAgIDYxIDYyIDYzIDY0IDY0XG4gICAgKi9cbiAgICByZXR1cm4gY2hhckNvZGUgPiA2NCAmJiBjaGFyQ29kZSA8IDkxID8gY2hhckNvZGUgLSA2NSA6XG4gICAgICAgIGNoYXJDb2RlID4gOTYgJiYgY2hhckNvZGUgPCAxMjMgPyBjaGFyQ29kZSAtIDcxIDpcbiAgICAgICAgICAgIGNoYXJDb2RlID4gNDcgJiYgY2hhckNvZGUgPCA1OCA/IGNoYXJDb2RlICsgNCA6XG4gICAgICAgICAgICAgICAgY2hhckNvZGUgPT09IDQ1ID8gNjIgOlxuICAgICAgICAgICAgICAgICAgICBjaGFyQ29kZSA9PT0gOTUgPyA2MyA6XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGFyQ29kZSA9PT0gNjEgfHwgY2hhckNvZGUgPT09IDQ2ID8gNjQgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhc2U2NEVycm9yKGNoYXJDb2RlKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBiYXNlNjREZWNvZGUoaW5wdXQsIGNoYXJDb2RlcyA9IHN0ZENoYXJDb2RlcywgYXV0b1BhZCA9IHRydWUpIHtcbiAgICBjb25zdCBsZW4gPSBpbnB1dC5sZW5ndGg7XG4gICAgaWYgKGF1dG9QYWQpXG4gICAgICAgIGlucHV0ICs9ICc9Jy5yZXBlYXQobGVuICUgNCk7XG4gICAgbGV0IGlucHV0SWR4ID0gMCwgb3V0cHV0SWR4ID0gMDtcbiAgICBsZXQgZW5jMSA9IDY0LCBlbmMyID0gNjQsIGVuYzMgPSA2NCwgZW5jNCA9IDY0O1xuICAgIGNvbnN0IG91dHB1dCA9IG5ldyBVaW50OEFycmF5KGxlbiAqIC43NSk7XG4gICAgd2hpbGUgKGlucHV0SWR4IDwgbGVuKSB7XG4gICAgICAgIGVuYzEgPSBjaGFyQ29kZXMoaW5wdXQuY2hhckNvZGVBdChpbnB1dElkeCsrKSk7XG4gICAgICAgIGVuYzIgPSBjaGFyQ29kZXMoaW5wdXQuY2hhckNvZGVBdChpbnB1dElkeCsrKSk7XG4gICAgICAgIGVuYzMgPSBjaGFyQ29kZXMoaW5wdXQuY2hhckNvZGVBdChpbnB1dElkeCsrKSk7XG4gICAgICAgIGVuYzQgPSBjaGFyQ29kZXMoaW5wdXQuY2hhckNvZGVBdChpbnB1dElkeCsrKSk7XG4gICAgICAgIG91dHB1dFtvdXRwdXRJZHgrK10gPSAoZW5jMSA8PCAyKSB8IChlbmMyID4+IDQpO1xuICAgICAgICBvdXRwdXRbb3V0cHV0SWR4KytdID0gKChlbmMyICYgMTUpIDw8IDQpIHwgKGVuYzMgPj4gMik7XG4gICAgICAgIG91dHB1dFtvdXRwdXRJZHgrK10gPSAoKGVuYzMgJiAzKSA8PCA2KSB8IGVuYzQ7XG4gICAgfVxuICAgIGNvbnN0IGV4Y2Vzc0xlbmd0aCA9IGVuYzIgPT09IDY0ID8gMCA6IC8vIGltcGxpZXMgemVyby1sZW5ndGggaW5wdXRcbiAgICAgICAgZW5jMyA9PT0gNjQgPyAyIDpcbiAgICAgICAgICAgIGVuYzQgPT09IDY0ID8gMSA6XG4gICAgICAgICAgICAgICAgMDtcbiAgICByZXR1cm4gb3V0cHV0LnN1YmFycmF5KDAsIG91dHB1dElkeCAtIGV4Y2Vzc0xlbmd0aCk7XG59XG4iLCJpbXBvcnQgeyBjb25jYXQsIGVxdWFsIH0gZnJvbSAnLi9hcnJheS5qcyc7XG5pbXBvcnQgeyBpbmRlbnRDaGFycyB9IGZyb20gJy4uL3ByZXNlbnRhdGlvbi9hcHBlYXJhbmNlLmpzJztcbmNvbnN0IHR4dEVuYyA9IG5ldyBUZXh0RW5jb2RlcigpO1xuY29uc3QgdHh0RGVjID0gbmV3IFRleHREZWNvZGVyKCk7XG5leHBvcnQgY2xhc3MgQnl0ZXMge1xuICAgIG9mZnNldDtcbiAgICBkYXRhVmlldztcbiAgICBkYXRhO1xuICAgIGNvbW1lbnRzO1xuICAgIGluZGVudHM7XG4gICAgaW5kZW50O1xuICAgIGNvbnN0cnVjdG9yKGFycmF5T3JNYXhCeXRlcykge1xuICAgICAgICB0aGlzLm9mZnNldCA9IDA7XG4gICAgICAgIHRoaXMuZGF0YSA9IHR5cGVvZiBhcnJheU9yTWF4Qnl0ZXMgPT09ICdudW1iZXInID8gbmV3IFVpbnQ4QXJyYXkoYXJyYXlPck1heEJ5dGVzKSA6IGFycmF5T3JNYXhCeXRlcztcbiAgICAgICAgdGhpcy5kYXRhVmlldyA9IG5ldyBEYXRhVmlldyh0aGlzLmRhdGEuYnVmZmVyLCB0aGlzLmRhdGEuYnl0ZU9mZnNldCwgdGhpcy5kYXRhLmJ5dGVMZW5ndGgpO1xuICAgICAgICB0aGlzLmNvbW1lbnRzID0ge307XG4gICAgICAgIHRoaXMuaW5kZW50cyA9IHt9O1xuICAgICAgICB0aGlzLmluZGVudCA9IDA7XG4gICAgfVxuICAgIGV4dGVuZChhcnJheU9yTWF4Qnl0ZXMpIHtcbiAgICAgICAgY29uc3QgbmV3RGF0YSA9IHR5cGVvZiBhcnJheU9yTWF4Qnl0ZXMgPT09ICdudW1iZXInID8gbmV3IFVpbnQ4QXJyYXkoYXJyYXlPck1heEJ5dGVzKSA6IGFycmF5T3JNYXhCeXRlcztcbiAgICAgICAgdGhpcy5kYXRhID0gY29uY2F0KHRoaXMuZGF0YSwgbmV3RGF0YSk7XG4gICAgICAgIHRoaXMuZGF0YVZpZXcgPSBuZXcgRGF0YVZpZXcodGhpcy5kYXRhLmJ1ZmZlciwgdGhpcy5kYXRhLmJ5dGVPZmZzZXQsIHRoaXMuZGF0YS5ieXRlTGVuZ3RoKTtcbiAgICB9XG4gICAgcmVtYWluaW5nKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmxlbmd0aCAtIHRoaXMub2Zmc2V0O1xuICAgIH1cbiAgICBzdWJhcnJheShsZW5ndGgpIHtcbiAgICAgICAgLy8gdGhpcyBhZHZhbmNlcyB0aGUgb2Zmc2V0IGFuZCByZXR1cm5zIGEgc3ViYXJyYXkgZm9yIGV4dGVybmFsIHdyaXRpbmcgKGUuZy4gd2l0aCBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKCkpIG9yIHJlYWRpbmdcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5zdWJhcnJheSh0aGlzLm9mZnNldCwgdGhpcy5vZmZzZXQgKz0gbGVuZ3RoKTtcbiAgICB9XG4gICAgc2tpcChsZW5ndGgsIGNvbW1lbnQpIHtcbiAgICAgICAgdGhpcy5vZmZzZXQgKz0gbGVuZ3RoO1xuICAgICAgICBpZiAoY29tbWVudClcbiAgICAgICAgICAgIHRoaXMuY29tbWVudChjb21tZW50KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGNvbW1lbnQocywgb2Zmc2V0ID0gdGhpcy5vZmZzZXQpIHtcbiAgICAgICAgaWYgKCFjaGF0dHkpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIGNvbW1lbnRzIHNob3VsZCBiZSBlbWl0dGVkIG91dHNpZGUgb2YgY2hhdHR5IG1vZGUnKTtcbiAgICAgICAgY29uc3QgZXhpc3RpbmcgPSB0aGlzLmNvbW1lbnRzW29mZnNldF07XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IChleGlzdGluZyA9PT0gdW5kZWZpbmVkID8gJycgOiBleGlzdGluZyArICcgJykgKyBzO1xuICAgICAgICB0aGlzLmNvbW1lbnRzW29mZnNldF0gPSByZXN1bHQ7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBsZW5ndGhDb21tZW50KGxlbmd0aCwgY29tbWVudCwgaW5jbHVzaXZlID0gZmFsc2UpIHtcbiAgICAgICAgcmV0dXJuIGxlbmd0aCA9PT0gMSA/XG4gICAgICAgICAgICBgJHtsZW5ndGh9IGJ5dGUke2NvbW1lbnQgPyBgIG9mICR7Y29tbWVudH1gIDogJyd9ICR7aW5jbHVzaXZlID8gJ3N0YXJ0cyBoZXJlJyA6ICdmb2xsb3dzJ31gIDpcbiAgICAgICAgICAgIGAke2xlbmd0aCA9PT0gMCA/ICdubycgOiBsZW5ndGh9IGJ5dGVzJHtjb21tZW50ID8gYCBvZiAke2NvbW1lbnR9YCA6ICcnfSAke2luY2x1c2l2ZSA/ICdzdGFydCBoZXJlJyA6ICdmb2xsb3cnfWA7XG4gICAgfVxuICAgIC8vIHJlYWRpbmdcbiAgICByZWFkQnl0ZXMobGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuc2xpY2UodGhpcy5vZmZzZXQsIHRoaXMub2Zmc2V0ICs9IGxlbmd0aCk7XG4gICAgfVxuICAgIHJlYWRVVEY4U3RyaW5nKGxlbmd0aCkge1xuICAgICAgICBjb25zdCBieXRlcyA9IHRoaXMuc3ViYXJyYXkobGVuZ3RoKTtcbiAgICAgICAgY29uc3QgcyA9IHR4dERlYy5kZWNvZGUoYnl0ZXMpO1xuICAgICAgICBjaGF0dHkgJiYgdGhpcy5jb21tZW50KCdcIicgKyBzLnJlcGxhY2UoL1xcci9nLCAnXFxcXHInKS5yZXBsYWNlKC9cXG4vZywgJ1xcXFxuJykgKyAnXCInKTtcbiAgICAgICAgcmV0dXJuIHM7XG4gICAgfVxuICAgIHJlYWRVVEY4U3RyaW5nTnVsbFRlcm1pbmF0ZWQoKSB7XG4gICAgICAgIGxldCBlbmRPZmZzZXQgPSB0aGlzLm9mZnNldDtcbiAgICAgICAgd2hpbGUgKHRoaXMuZGF0YVtlbmRPZmZzZXRdICE9PSAwKVxuICAgICAgICAgICAgZW5kT2Zmc2V0Kys7XG4gICAgICAgIGNvbnN0IHN0ciA9IHRoaXMucmVhZFVURjhTdHJpbmcoZW5kT2Zmc2V0IC0gdGhpcy5vZmZzZXQpO1xuICAgICAgICB0aGlzLmV4cGVjdFVpbnQ4KDB4MDAsICdlbmQgb2Ygc3RyaW5nJyk7XG4gICAgICAgIHJldHVybiBzdHI7XG4gICAgfVxuICAgIHJlYWRVaW50OChjb21tZW50KSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMuZGF0YVZpZXcuZ2V0VWludDgodGhpcy5vZmZzZXQpO1xuICAgICAgICB0aGlzLm9mZnNldCArPSAxO1xuICAgICAgICBpZiAoY2hhdHR5ICYmIGNvbW1lbnQpXG4gICAgICAgICAgICB0aGlzLmNvbW1lbnQoY29tbWVudC5yZXBsYWNlKC8lL2csIFN0cmluZyhyZXN1bHQpKSk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIHJlYWRVaW50MTYoY29tbWVudCkge1xuICAgICAgICBjb25zdCByZXN1bHQgPSB0aGlzLmRhdGFWaWV3LmdldFVpbnQxNih0aGlzLm9mZnNldCk7XG4gICAgICAgIHRoaXMub2Zmc2V0ICs9IDI7XG4gICAgICAgIGlmIChjaGF0dHkgJiYgY29tbWVudClcbiAgICAgICAgICAgIHRoaXMuY29tbWVudChjb21tZW50LnJlcGxhY2UoLyUvZywgU3RyaW5nKHJlc3VsdCkpKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgcmVhZFVpbnQyNChjb21tZW50KSB7XG4gICAgICAgIGNvbnN0IG1zYiA9IHRoaXMucmVhZFVpbnQ4KCk7XG4gICAgICAgIGNvbnN0IGxzYnMgPSB0aGlzLnJlYWRVaW50MTYoKTtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gKG1zYiA8PCAxNikgKyBsc2JzO1xuICAgICAgICBpZiAoY2hhdHR5ICYmIGNvbW1lbnQpXG4gICAgICAgICAgICB0aGlzLmNvbW1lbnQoY29tbWVudC5yZXBsYWNlKC8lL2csIFN0cmluZyhyZXN1bHQpKSk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIHJlYWRVaW50MzIoY29tbWVudCkge1xuICAgICAgICBjb25zdCByZXN1bHQgPSB0aGlzLmRhdGFWaWV3LmdldFVpbnQzMih0aGlzLm9mZnNldCk7XG4gICAgICAgIHRoaXMub2Zmc2V0ICs9IDQ7XG4gICAgICAgIGlmIChjaGF0dHkgJiYgY29tbWVudClcbiAgICAgICAgICAgIHRoaXMuY29tbWVudChjb21tZW50LnJlcGxhY2UoLyUvZywgU3RyaW5nKHJlc3VsdCkpKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgZXhwZWN0Qnl0ZXMoZXhwZWN0ZWQsIGNvbW1lbnQpIHtcbiAgICAgICAgY29uc3QgYWN0dWFsID0gdGhpcy5yZWFkQnl0ZXMoZXhwZWN0ZWQubGVuZ3RoKTtcbiAgICAgICAgaWYgKGNoYXR0eSAmJiBjb21tZW50KVxuICAgICAgICAgICAgdGhpcy5jb21tZW50KGNvbW1lbnQpO1xuICAgICAgICBpZiAoIWVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQpKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbmV4cGVjdGVkIGJ5dGVzYCk7XG4gICAgfVxuICAgIGV4cGVjdFVpbnQ4KGV4cGVjdGVkVmFsdWUsIGNvbW1lbnQpIHtcbiAgICAgICAgY29uc3QgYWN0dWFsVmFsdWUgPSB0aGlzLnJlYWRVaW50OCgpO1xuICAgICAgICBpZiAoY2hhdHR5ICYmIGNvbW1lbnQpXG4gICAgICAgICAgICB0aGlzLmNvbW1lbnQoY29tbWVudCk7XG4gICAgICAgIGlmIChhY3R1YWxWYWx1ZSAhPT0gZXhwZWN0ZWRWYWx1ZSlcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgRXhwZWN0ZWQgJHtleHBlY3RlZFZhbHVlfSwgZ290ICR7YWN0dWFsVmFsdWV9YCk7XG4gICAgfVxuICAgIGV4cGVjdFVpbnQxNihleHBlY3RlZFZhbHVlLCBjb21tZW50KSB7XG4gICAgICAgIGNvbnN0IGFjdHVhbFZhbHVlID0gdGhpcy5yZWFkVWludDE2KCk7XG4gICAgICAgIGlmIChjaGF0dHkgJiYgY29tbWVudClcbiAgICAgICAgICAgIHRoaXMuY29tbWVudChjb21tZW50KTtcbiAgICAgICAgaWYgKGFjdHVhbFZhbHVlICE9PSBleHBlY3RlZFZhbHVlKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBFeHBlY3RlZCAke2V4cGVjdGVkVmFsdWV9LCBnb3QgJHthY3R1YWxWYWx1ZX1gKTtcbiAgICB9XG4gICAgZXhwZWN0VWludDI0KGV4cGVjdGVkVmFsdWUsIGNvbW1lbnQpIHtcbiAgICAgICAgY29uc3QgYWN0dWFsVmFsdWUgPSB0aGlzLnJlYWRVaW50MjQoKTtcbiAgICAgICAgaWYgKGNoYXR0eSAmJiBjb21tZW50KVxuICAgICAgICAgICAgdGhpcy5jb21tZW50KGNvbW1lbnQpO1xuICAgICAgICBpZiAoYWN0dWFsVmFsdWUgIT09IGV4cGVjdGVkVmFsdWUpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEV4cGVjdGVkICR7ZXhwZWN0ZWRWYWx1ZX0sIGdvdCAke2FjdHVhbFZhbHVlfWApO1xuICAgIH1cbiAgICBleHBlY3RVaW50MzIoZXhwZWN0ZWRWYWx1ZSwgY29tbWVudCkge1xuICAgICAgICBjb25zdCBhY3R1YWxWYWx1ZSA9IHRoaXMucmVhZFVpbnQzMigpO1xuICAgICAgICBpZiAoY2hhdHR5ICYmIGNvbW1lbnQpXG4gICAgICAgICAgICB0aGlzLmNvbW1lbnQoY29tbWVudCk7XG4gICAgICAgIGlmIChhY3R1YWxWYWx1ZSAhPT0gZXhwZWN0ZWRWYWx1ZSlcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgRXhwZWN0ZWQgJHtleHBlY3RlZFZhbHVlfSwgZ290ICR7YWN0dWFsVmFsdWV9YCk7XG4gICAgfVxuICAgIGV4cGVjdExlbmd0aChsZW5ndGgsIGluZGVudERlbHRhID0gMSkge1xuICAgICAgICBjb25zdCBzdGFydE9mZnNldCA9IHRoaXMub2Zmc2V0O1xuICAgICAgICBjb25zdCBlbmRPZmZzZXQgPSBzdGFydE9mZnNldCArIGxlbmd0aDtcbiAgICAgICAgaWYgKGVuZE9mZnNldCA+IHRoaXMuZGF0YS5sZW5ndGgpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0V4cGVjdGVkIGxlbmd0aCBleGNlZWRzIHJlbWFpbmluZyBkYXRhIGxlbmd0aCcpO1xuICAgICAgICB0aGlzLmluZGVudCArPSBpbmRlbnREZWx0YTtcbiAgICAgICAgdGhpcy5pbmRlbnRzW3N0YXJ0T2Zmc2V0XSA9IHRoaXMuaW5kZW50O1xuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuaW5kZW50IC09IGluZGVudERlbHRhO1xuICAgICAgICAgICAgICAgIHRoaXMuaW5kZW50c1t0aGlzLm9mZnNldF0gPSB0aGlzLmluZGVudDtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5vZmZzZXQgIT09IGVuZE9mZnNldClcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAke2xlbmd0aH0gYnl0ZXMgZXhwZWN0ZWQgYnV0ICR7dGhpcy5vZmZzZXQgLSBzdGFydE9mZnNldH0gcmVhZGApO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICgpID0+IGVuZE9mZnNldCAtIHRoaXMub2Zmc2V0LFxuICAgICAgICBdO1xuICAgIH1cbiAgICBleHBlY3RMZW5ndGhVaW50OChjb21tZW50KSB7XG4gICAgICAgIGNvbnN0IGxlbmd0aCA9IHRoaXMucmVhZFVpbnQ4KCk7XG4gICAgICAgIGNoYXR0eSAmJiB0aGlzLmNvbW1lbnQodGhpcy5sZW5ndGhDb21tZW50KGxlbmd0aCwgY29tbWVudCkpO1xuICAgICAgICByZXR1cm4gdGhpcy5leHBlY3RMZW5ndGgobGVuZ3RoKTtcbiAgICB9XG4gICAgZXhwZWN0TGVuZ3RoVWludDE2KGNvbW1lbnQpIHtcbiAgICAgICAgY29uc3QgbGVuZ3RoID0gdGhpcy5yZWFkVWludDE2KCk7XG4gICAgICAgIGNoYXR0eSAmJiB0aGlzLmNvbW1lbnQodGhpcy5sZW5ndGhDb21tZW50KGxlbmd0aCwgY29tbWVudCkpO1xuICAgICAgICByZXR1cm4gdGhpcy5leHBlY3RMZW5ndGgobGVuZ3RoKTtcbiAgICB9XG4gICAgZXhwZWN0TGVuZ3RoVWludDI0KGNvbW1lbnQpIHtcbiAgICAgICAgY29uc3QgbGVuZ3RoID0gdGhpcy5yZWFkVWludDI0KCk7XG4gICAgICAgIGNoYXR0eSAmJiB0aGlzLmNvbW1lbnQodGhpcy5sZW5ndGhDb21tZW50KGxlbmd0aCwgY29tbWVudCkpO1xuICAgICAgICByZXR1cm4gdGhpcy5leHBlY3RMZW5ndGgobGVuZ3RoKTtcbiAgICB9XG4gICAgZXhwZWN0TGVuZ3RoVWludDMyKGNvbW1lbnQpIHtcbiAgICAgICAgY29uc3QgbGVuZ3RoID0gdGhpcy5yZWFkVWludDMyKCk7XG4gICAgICAgIGNoYXR0eSAmJiB0aGlzLmNvbW1lbnQodGhpcy5sZW5ndGhDb21tZW50KGxlbmd0aCwgY29tbWVudCkpO1xuICAgICAgICByZXR1cm4gdGhpcy5leHBlY3RMZW5ndGgobGVuZ3RoKTtcbiAgICB9XG4gICAgZXhwZWN0TGVuZ3RoVWludDhJbmNsKGNvbW1lbnQpIHtcbiAgICAgICAgY29uc3QgbGVuZ3RoID0gdGhpcy5yZWFkVWludDgoKTtcbiAgICAgICAgY2hhdHR5ICYmIHRoaXMuY29tbWVudCh0aGlzLmxlbmd0aENvbW1lbnQobGVuZ3RoLCBjb21tZW50LCB0cnVlKSk7XG4gICAgICAgIHJldHVybiB0aGlzLmV4cGVjdExlbmd0aChsZW5ndGggLSAxKTtcbiAgICB9XG4gICAgZXhwZWN0TGVuZ3RoVWludDE2SW5jbChjb21tZW50KSB7XG4gICAgICAgIGNvbnN0IGxlbmd0aCA9IHRoaXMucmVhZFVpbnQxNigpO1xuICAgICAgICBjaGF0dHkgJiYgdGhpcy5jb21tZW50KHRoaXMubGVuZ3RoQ29tbWVudChsZW5ndGgsIGNvbW1lbnQsIHRydWUpKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZXhwZWN0TGVuZ3RoKGxlbmd0aCAtIDIpO1xuICAgIH1cbiAgICBleHBlY3RMZW5ndGhVaW50MjRJbmNsKGNvbW1lbnQpIHtcbiAgICAgICAgY29uc3QgbGVuZ3RoID0gdGhpcy5yZWFkVWludDI0KCk7XG4gICAgICAgIGNoYXR0eSAmJiB0aGlzLmNvbW1lbnQodGhpcy5sZW5ndGhDb21tZW50KGxlbmd0aCwgY29tbWVudCwgdHJ1ZSkpO1xuICAgICAgICByZXR1cm4gdGhpcy5leHBlY3RMZW5ndGgobGVuZ3RoIC0gMyk7XG4gICAgfVxuICAgIGV4cGVjdExlbmd0aFVpbnQzMkluY2woY29tbWVudCkge1xuICAgICAgICBjb25zdCBsZW5ndGggPSB0aGlzLnJlYWRVaW50MzIoKTtcbiAgICAgICAgY2hhdHR5ICYmIHRoaXMuY29tbWVudCh0aGlzLmxlbmd0aENvbW1lbnQobGVuZ3RoLCBjb21tZW50LCB0cnVlKSk7XG4gICAgICAgIHJldHVybiB0aGlzLmV4cGVjdExlbmd0aChsZW5ndGggLSA0KTtcbiAgICB9XG4gICAgLy8gd3JpdGluZ1xuICAgIHdyaXRlQnl0ZXMoYnl0ZXMpIHtcbiAgICAgICAgdGhpcy5kYXRhLnNldChieXRlcywgdGhpcy5vZmZzZXQpO1xuICAgICAgICB0aGlzLm9mZnNldCArPSBieXRlcy5sZW5ndGg7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICB3cml0ZVVURjhTdHJpbmcocykge1xuICAgICAgICBjb25zdCBieXRlcyA9IHR4dEVuYy5lbmNvZGUocyk7XG4gICAgICAgIHRoaXMud3JpdGVCeXRlcyhieXRlcyk7XG4gICAgICAgIGNoYXR0eSAmJiB0aGlzLmNvbW1lbnQoJ1wiJyArIHMucmVwbGFjZSgvXFxyL2csICdcXFxccicpLnJlcGxhY2UoL1xcbi9nLCAnXFxcXG4nKSArICdcIicpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgd3JpdGVVVEY4U3RyaW5nTnVsbFRlcm1pbmF0ZWQocykge1xuICAgICAgICBjb25zdCBieXRlcyA9IHR4dEVuYy5lbmNvZGUocyk7XG4gICAgICAgIHRoaXMud3JpdGVCeXRlcyhieXRlcyk7XG4gICAgICAgIGNoYXR0eSAmJiB0aGlzLmNvbW1lbnQoJ1wiJyArIHMucmVwbGFjZSgvXFxyL2csICdcXFxccicpLnJlcGxhY2UoL1xcbi9nLCAnXFxcXG4nKSArICdcIicpO1xuICAgICAgICB0aGlzLndyaXRlVWludDgoMHgwMCk7XG4gICAgICAgIGNoYXR0eSAmJiB0aGlzLmNvbW1lbnQoJ2VuZCBvZiBzdHJpbmcnKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHdyaXRlVWludDgodmFsdWUsIGNvbW1lbnQpIHtcbiAgICAgICAgdGhpcy5kYXRhVmlldy5zZXRVaW50OCh0aGlzLm9mZnNldCwgdmFsdWUpO1xuICAgICAgICB0aGlzLm9mZnNldCArPSAxO1xuICAgICAgICBpZiAoY2hhdHR5ICYmIGNvbW1lbnQpXG4gICAgICAgICAgICB0aGlzLmNvbW1lbnQoY29tbWVudCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICB3cml0ZVVpbnQxNih2YWx1ZSwgY29tbWVudCkge1xuICAgICAgICB0aGlzLmRhdGFWaWV3LnNldFVpbnQxNih0aGlzLm9mZnNldCwgdmFsdWUpO1xuICAgICAgICB0aGlzLm9mZnNldCArPSAyO1xuICAgICAgICBpZiAoY2hhdHR5ICYmIGNvbW1lbnQpXG4gICAgICAgICAgICB0aGlzLmNvbW1lbnQoY29tbWVudCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICB3cml0ZVVpbnQyNCh2YWx1ZSwgY29tbWVudCkge1xuICAgICAgICB0aGlzLndyaXRlVWludDgoKHZhbHVlICYgMHhmZjAwMDApID4+IDE2KTtcbiAgICAgICAgdGhpcy53cml0ZVVpbnQxNih2YWx1ZSAmIDB4MDBmZmZmLCBjb21tZW50KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHdyaXRlVWludDMyKHZhbHVlLCBjb21tZW50KSB7XG4gICAgICAgIHRoaXMuZGF0YVZpZXcuc2V0VWludDMyKHRoaXMub2Zmc2V0LCB2YWx1ZSk7XG4gICAgICAgIHRoaXMub2Zmc2V0ICs9IDQ7XG4gICAgICAgIGlmIChjaGF0dHkgJiYgY29tbWVudClcbiAgICAgICAgICAgIHRoaXMuY29tbWVudChjb21tZW50KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8vIGZvcndhcmQtbG9va2luZyBsZW5ndGhzXG4gICAgX3dyaXRlTGVuZ3RoR2VuZXJpYyhsZW5ndGhCeXRlcywgaW5jbHVzaXZlLCBjb21tZW50KSB7XG4gICAgICAgIGNvbnN0IHN0YXJ0T2Zmc2V0ID0gdGhpcy5vZmZzZXQ7XG4gICAgICAgIHRoaXMub2Zmc2V0ICs9IGxlbmd0aEJ5dGVzO1xuICAgICAgICBjb25zdCBlbmRPZmZzZXQgPSB0aGlzLm9mZnNldDtcbiAgICAgICAgdGhpcy5pbmRlbnQgKz0gMTtcbiAgICAgICAgdGhpcy5pbmRlbnRzW2VuZE9mZnNldF0gPSB0aGlzLmluZGVudDtcbiAgICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGxlbmd0aCA9IHRoaXMub2Zmc2V0IC0gKGluY2x1c2l2ZSA/IHN0YXJ0T2Zmc2V0IDogZW5kT2Zmc2V0KTtcbiAgICAgICAgICAgIGlmIChsZW5ndGhCeXRlcyA9PT0gMSlcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGFWaWV3LnNldFVpbnQ4KHN0YXJ0T2Zmc2V0LCBsZW5ndGgpO1xuICAgICAgICAgICAgZWxzZSBpZiAobGVuZ3RoQnl0ZXMgPT09IDIpXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhVmlldy5zZXRVaW50MTYoc3RhcnRPZmZzZXQsIGxlbmd0aCk7XG4gICAgICAgICAgICBlbHNlIGlmIChsZW5ndGhCeXRlcyA9PT0gMykge1xuICAgICAgICAgICAgICAgIHRoaXMuZGF0YVZpZXcuc2V0VWludDgoc3RhcnRPZmZzZXQsIChsZW5ndGggJiAweGZmMDAwMCkgPj4gMTYpO1xuICAgICAgICAgICAgICAgIHRoaXMuZGF0YVZpZXcuc2V0VWludDE2KHN0YXJ0T2Zmc2V0ICsgMSwgbGVuZ3RoICYgMHhmZmZmKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGxlbmd0aEJ5dGVzID09PSA0KVxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YVZpZXcuc2V0VWludDMyKHN0YXJ0T2Zmc2V0LCBsZW5ndGgpO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBsZW5ndGggZm9yIGxlbmd0aCBmaWVsZDogJHtsZW5ndGhCeXRlc31gKTtcbiAgICAgICAgICAgIGNoYXR0eSAmJiB0aGlzLmNvbW1lbnQodGhpcy5sZW5ndGhDb21tZW50KGxlbmd0aCwgY29tbWVudCwgaW5jbHVzaXZlKSwgZW5kT2Zmc2V0KTtcbiAgICAgICAgICAgIHRoaXMuaW5kZW50IC09IDE7XG4gICAgICAgICAgICB0aGlzLmluZGVudHNbdGhpcy5vZmZzZXRdID0gdGhpcy5pbmRlbnQ7XG4gICAgICAgIH07XG4gICAgfVxuICAgIHdyaXRlTGVuZ3RoVWludDgoY29tbWVudCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fd3JpdGVMZW5ndGhHZW5lcmljKDEsIGZhbHNlLCBjb21tZW50KTtcbiAgICB9XG4gICAgd3JpdGVMZW5ndGhVaW50MTYoY29tbWVudCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fd3JpdGVMZW5ndGhHZW5lcmljKDIsIGZhbHNlLCBjb21tZW50KTtcbiAgICB9XG4gICAgd3JpdGVMZW5ndGhVaW50MjQoY29tbWVudCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fd3JpdGVMZW5ndGhHZW5lcmljKDMsIGZhbHNlLCBjb21tZW50KTtcbiAgICB9XG4gICAgd3JpdGVMZW5ndGhVaW50MzIoY29tbWVudCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fd3JpdGVMZW5ndGhHZW5lcmljKDQsIGZhbHNlLCBjb21tZW50KTtcbiAgICB9XG4gICAgd3JpdGVMZW5ndGhVaW50OEluY2woY29tbWVudCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fd3JpdGVMZW5ndGhHZW5lcmljKDEsIHRydWUsIGNvbW1lbnQpO1xuICAgIH1cbiAgICB3cml0ZUxlbmd0aFVpbnQxNkluY2woY29tbWVudCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fd3JpdGVMZW5ndGhHZW5lcmljKDIsIHRydWUsIGNvbW1lbnQpO1xuICAgIH1cbiAgICB3cml0ZUxlbmd0aFVpbnQyNEluY2woY29tbWVudCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fd3JpdGVMZW5ndGhHZW5lcmljKDMsIHRydWUsIGNvbW1lbnQpO1xuICAgIH1cbiAgICB3cml0ZUxlbmd0aFVpbnQzMkluY2woY29tbWVudCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fd3JpdGVMZW5ndGhHZW5lcmljKDQsIHRydWUsIGNvbW1lbnQpO1xuICAgIH1cbiAgICAvLyBvdXRwdXRcbiAgICBhcnJheSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5zdWJhcnJheSgwLCB0aGlzLm9mZnNldCk7XG4gICAgfVxuICAgIGNvbW1lbnRlZFN0cmluZyhhbGwgPSBmYWxzZSkge1xuICAgICAgICBsZXQgcyA9IHRoaXMuaW5kZW50c1swXSAhPT0gdW5kZWZpbmVkID8gaW5kZW50Q2hhcnMucmVwZWF0KHRoaXMuaW5kZW50c1swXSkgOiAnJztcbiAgICAgICAgbGV0IGluZGVudCA9IHRoaXMuaW5kZW50c1swXSA/PyAwO1xuICAgICAgICBjb25zdCBsZW4gPSBhbGwgPyB0aGlzLmRhdGEubGVuZ3RoIDogdGhpcy5vZmZzZXQ7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIHMgKz0gdGhpcy5kYXRhW2ldLnRvU3RyaW5nKDE2KS5wYWRTdGFydCgyLCAnMCcpICsgJyAnO1xuICAgICAgICAgICAgY29uc3QgY29tbWVudCA9IHRoaXMuY29tbWVudHNbaSArIDFdO1xuICAgICAgICAgICAgaWYgKHRoaXMuaW5kZW50c1tpICsgMV0gIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgICAgICBpbmRlbnQgPSB0aGlzLmluZGVudHNbaSArIDFdO1xuICAgICAgICAgICAgaWYgKGNvbW1lbnQpXG4gICAgICAgICAgICAgICAgcyArPSBgICR7Y29tbWVudH1cXG4ke2luZGVudENoYXJzLnJlcGVhdChpbmRlbnQpfWA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHM7XG4gICAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY3J5cHRvLnN1YnRsZTtcbi8qXG4vLyB0aGlzIHNldHVwIGFsbG93cyBtb25pdG9yaW5nL3Byb3h5aW5nXG5cbmZ1bmN0aW9uIGNyeXB0b01ldGhvZChtZXRob2Q6IHN0cmluZywgYXJnczogYW55W10pIHtcbiAgcmV0dXJuIChjcnlwdG8uc3VidGxlIGFzIGFueSlbbWV0aG9kXSguLi5hcmdzKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgbmV3IFByb3h5KHt9LCB7XG4gIGdldCh0YXJnZXQsIHByb3BlcnR5OiBzdHJpbmcsIHJlY2VpdmVyKSB7XG4gICAgcmV0dXJuICguLi5hcmdzOiBhbnlbXSkgPT4gY3J5cHRvTWV0aG9kKHByb3BlcnR5LCBhcmdzKTtcbiAgfVxufSkgYXMgU3VidGxlQ3J5cHRvO1xuKi9cbiIsImV4cG9ydCBmdW5jdGlvbiB1OEZyb21IZXgoaGV4KSB7XG4gICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KEFycmF5LmZyb20oaGV4Lm1hdGNoQWxsKC9bMC05YS1mXS9nKSkubWFwKGhleCA9PiBwYXJzZUludChoZXhbMF0sIDE2KSkpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGhleEZyb21VOCh1OCwgc3BhY2VyID0gJycpIHtcbiAgICByZXR1cm4gWy4uLnU4XS5tYXAobiA9PiBuLnRvU3RyaW5nKDE2KS5wYWRTdGFydCgyLCAnMCcpKS5qb2luKHNwYWNlcik7XG59XG4iLCJ2YXIgV2ViU29ja2V0UmVhZHlTdGF0ZTtcbihmdW5jdGlvbiAoV2ViU29ja2V0UmVhZHlTdGF0ZSkge1xuICAgIFdlYlNvY2tldFJlYWR5U3RhdGVbV2ViU29ja2V0UmVhZHlTdGF0ZVtcIkNPTk5FQ1RJTkdcIl0gPSAwXSA9IFwiQ09OTkVDVElOR1wiO1xuICAgIFdlYlNvY2tldFJlYWR5U3RhdGVbV2ViU29ja2V0UmVhZHlTdGF0ZVtcIk9QRU5cIl0gPSAxXSA9IFwiT1BFTlwiO1xuICAgIFdlYlNvY2tldFJlYWR5U3RhdGVbV2ViU29ja2V0UmVhZHlTdGF0ZVtcIkNMT1NJTkdcIl0gPSAyXSA9IFwiQ0xPU0lOR1wiO1xuICAgIFdlYlNvY2tldFJlYWR5U3RhdGVbV2ViU29ja2V0UmVhZHlTdGF0ZVtcIkNMT1NFRFwiXSA9IDNdID0gXCJDTE9TRURcIjtcbn0pKFdlYlNvY2tldFJlYWR5U3RhdGUgfHwgKFdlYlNvY2tldFJlYWR5U3RhdGUgPSB7fSkpO1xuY2xhc3MgUmVhZFF1ZXVlIHtcbiAgICBxdWV1ZTtcbiAgICBvdXRzdGFuZGluZ1JlcXVlc3Q7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMucXVldWUgPSBbXTtcbiAgICB9XG4gICAgZW5xdWV1ZShkYXRhKSB7XG4gICAgICAgIHRoaXMucXVldWUucHVzaChkYXRhKTtcbiAgICAgICAgdGhpcy5kZXF1ZXVlKCk7XG4gICAgfVxuICAgIGRlcXVldWUoKSB7XG4gICAgICAgIGlmICh0aGlzLm91dHN0YW5kaW5nUmVxdWVzdCA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBsZXQgeyByZXNvbHZlLCBieXRlcyB9ID0gdGhpcy5vdXRzdGFuZGluZ1JlcXVlc3Q7XG4gICAgICAgIGNvbnN0IGJ5dGVzSW5RdWV1ZSA9IHRoaXMuYnl0ZXNJblF1ZXVlKCk7XG4gICAgICAgIGlmIChieXRlc0luUXVldWUgPCBieXRlcyAmJiB0aGlzLnNvY2tldElzTm90Q2xvc2VkKCkpXG4gICAgICAgICAgICByZXR1cm47IC8vIGlmIHNvY2tldCByZW1haW5zIG9wZW4sIHdhaXQgdW50aWwgcmVxdWVzdGVkIGRhdGEgc2l6ZSBpcyBhdmFpbGFibGVcbiAgICAgICAgYnl0ZXMgPSBNYXRoLm1pbihieXRlcywgYnl0ZXNJblF1ZXVlKTtcbiAgICAgICAgaWYgKGJ5dGVzID09PSAwKVxuICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUodW5kZWZpbmVkKTtcbiAgICAgICAgdGhpcy5vdXRzdGFuZGluZ1JlcXVlc3QgPSB1bmRlZmluZWQ7XG4gICAgICAgIGNvbnN0IGZpcnN0SXRlbSA9IHRoaXMucXVldWVbMF07XG4gICAgICAgIGNvbnN0IGZpcnN0SXRlbUxlbmd0aCA9IGZpcnN0SXRlbS5sZW5ndGg7XG4gICAgICAgIGlmIChmaXJzdEl0ZW1MZW5ndGggPT09IGJ5dGVzKSB7XG4gICAgICAgICAgICB0aGlzLnF1ZXVlLnNoaWZ0KCk7XG4gICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShmaXJzdEl0ZW0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGZpcnN0SXRlbUxlbmd0aCA+IGJ5dGVzKSB7XG4gICAgICAgICAgICB0aGlzLnF1ZXVlWzBdID0gZmlyc3RJdGVtLnN1YmFycmF5KGJ5dGVzKTtcbiAgICAgICAgICAgIHJldHVybiByZXNvbHZlKGZpcnN0SXRlbS5zdWJhcnJheSgwLCBieXRlcykpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgeyAvLyBpLmUuIGZpcnN0SXRlbS5sZW5ndGggPCBieXRlc1xuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gbmV3IFVpbnQ4QXJyYXkoYnl0ZXMpO1xuICAgICAgICAgICAgbGV0IG91dHN0YW5kaW5nQnl0ZXMgPSBieXRlcztcbiAgICAgICAgICAgIGxldCBvZmZzZXQgPSAwO1xuICAgICAgICAgICAgd2hpbGUgKG91dHN0YW5kaW5nQnl0ZXMgPiAwKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbmV4dEl0ZW0gPSB0aGlzLnF1ZXVlWzBdO1xuICAgICAgICAgICAgICAgIGNvbnN0IG5leHRJdGVtTGVuZ3RoID0gbmV4dEl0ZW0ubGVuZ3RoO1xuICAgICAgICAgICAgICAgIGlmIChuZXh0SXRlbUxlbmd0aCA8PSBvdXRzdGFuZGluZ0J5dGVzKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucXVldWUuc2hpZnQoKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnNldChuZXh0SXRlbSwgb2Zmc2V0KTtcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0ICs9IG5leHRJdGVtTGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICBvdXRzdGFuZGluZ0J5dGVzIC09IG5leHRJdGVtTGVuZ3RoO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHsgLy8gbmV4dEl0ZW1MZW5ndGggPiBvdXRzdGFuZGluZ0J5dGVzXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucXVldWVbMF0gPSBuZXh0SXRlbS5zdWJhcnJheShvdXRzdGFuZGluZ0J5dGVzKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnNldChuZXh0SXRlbS5zdWJhcnJheSgwLCBvdXRzdGFuZGluZ0J5dGVzKSwgb2Zmc2V0KTtcbiAgICAgICAgICAgICAgICAgICAgb3V0c3RhbmRpbmdCeXRlcyAtPSBvdXRzdGFuZGluZ0J5dGVzOyAvLyBpLmUuIHplcm9cbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0ICs9IG91dHN0YW5kaW5nQnl0ZXM7IC8vIG5vdCB0ZWNobmljYWxseSBuZWNlc3NhcnlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGJ5dGVzSW5RdWV1ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucXVldWUucmVkdWNlKChtZW1vLCBhcnIpID0+IG1lbW8gKyBhcnIubGVuZ3RoLCAwKTtcbiAgICB9XG4gICAgYXN5bmMgcmVhZChieXRlcykge1xuICAgICAgICBpZiAodGhpcy5vdXRzdGFuZGluZ1JlcXVlc3QgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQ2Fu4oCZdCByZWFkIHdoaWxlIGFscmVhZHkgYXdhaXRpbmcgcmVhZCcpO1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgICAgICAgIHRoaXMub3V0c3RhbmRpbmdSZXF1ZXN0ID0geyByZXNvbHZlLCBieXRlcyB9O1xuICAgICAgICAgICAgdGhpcy5kZXF1ZXVlKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbmV4cG9ydCBjbGFzcyBXZWJTb2NrZXRSZWFkUXVldWUgZXh0ZW5kcyBSZWFkUXVldWUge1xuICAgIHNvY2tldDtcbiAgICBjb25zdHJ1Y3Rvcihzb2NrZXQpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5zb2NrZXQgPSBzb2NrZXQ7XG4gICAgICAgIHNvY2tldC5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgKG1zZykgPT4gdGhpcy5lbnF1ZXVlKG5ldyBVaW50OEFycmF5KG1zZy5kYXRhKSkpO1xuICAgICAgICBzb2NrZXQuYWRkRXZlbnRMaXN0ZW5lcignY2xvc2UnLCAoKSA9PiB0aGlzLmRlcXVldWUoKSk7XG4gICAgfVxuICAgIHNvY2tldElzTm90Q2xvc2VkKCkge1xuICAgICAgICBjb25zdCB7IHNvY2tldCB9ID0gdGhpcztcbiAgICAgICAgY29uc3QgeyByZWFkeVN0YXRlIH0gPSBzb2NrZXQ7XG4gICAgICAgIHJldHVybiByZWFkeVN0YXRlIDw9IFdlYlNvY2tldFJlYWR5U3RhdGUuT1BFTjtcbiAgICB9XG59XG5leHBvcnQgY2xhc3MgU29ja2V0UmVhZFF1ZXVlIGV4dGVuZHMgUmVhZFF1ZXVlIHtcbiAgICBzb2NrZXQ7XG4gICAgY29uc3RydWN0b3Ioc29ja2V0KSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuc29ja2V0ID0gc29ja2V0O1xuICAgICAgICBzb2NrZXQub24oJ2RhdGEnLCAoZGF0YSkgPT4gdGhpcy5lbnF1ZXVlKG5ldyBVaW50OEFycmF5KGRhdGEpKSk7XG4gICAgICAgIHNvY2tldC5vbignY2xvc2UnLCAoKSA9PiB0aGlzLmRlcXVldWUoKSk7XG4gICAgfVxuICAgIHNvY2tldElzTm90Q2xvc2VkKCkge1xuICAgICAgICBjb25zdCB7IHNvY2tldCB9ID0gdGhpcztcbiAgICAgICAgY29uc3QgeyByZWFkeVN0YXRlIH0gPSBzb2NrZXQ7XG4gICAgICAgIHJldHVybiByZWFkeVN0YXRlID09PSAnb3BlbmluZycgfHwgcmVhZHlTdGF0ZSA9PT0gJ29wZW4nO1xuICAgIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHN0YWJsZVN0cmluZ2lmeSh4LCByZXBsYWNlciA9IChfLCB2KSA9PiB2LCBpbmRlbnQpIHtcbiAgICBjb25zdCBkZXRlcm1pbmlzdGljUmVwbGFjZXIgPSAoaywgdikgPT4gcmVwbGFjZXIoaywgdHlwZW9mIHYgIT09ICdvYmplY3QnIHx8IHYgPT09IG51bGwgfHwgQXJyYXkuaXNBcnJheSh2KSA/IHYgOlxuICAgICAgICBPYmplY3QuZnJvbUVudHJpZXMoT2JqZWN0LmVudHJpZXModikuc29ydCgoW2thXSwgW2tiXSkgPT4ga2EgPCBrYiA/IC0xIDoga2EgPiBrYiA/IDEgOiAwKSkpO1xuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh4LCBkZXRlcm1pbmlzdGljUmVwbGFjZXIsIGluZGVudCk7XG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=