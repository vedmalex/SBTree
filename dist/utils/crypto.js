"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRootId = exports.generateNodeId = exports.generateTreeId = exports.generateFieldTreeId = exports.generateLeafId = exports.generateRandId = exports.insecureRandomBytes = void 0;
function insecureRandomBytes(size) {
    const result = new Uint8Array(size);
    for (let i = 0; i < size; ++i)
        result[i] = Math.floor(Math.random() * 256);
    return result;
}
exports.insecureRandomBytes = insecureRandomBytes;
function getRandomBytes() {
    let randomBytes = null;
    try {
        randomBytes = require('crypto').randomBytes;
    }
    catch (e) {
    }
    if (randomBytes == null) {
        randomBytes = insecureRandomBytes;
    }
    return randomBytes;
}
function browserRandomBytes() {
    const randomBytes = (size) => window.crypto.getRandomValues(new Uint8Array(size));
    return randomBytes;
}
const isWindowContext = globalThis.window?.crypto?.getRandomValues;
const randomBytes = (isWindowContext) ? browserRandomBytes : getRandomBytes();
const generateRandId = (prefix = '') => prefix + (Date.now().toString(16) + randomBytes(4).toString('hex'));
exports.generateRandId = generateRandId;
const generateLeafId = () => exports.generateRandId('l');
exports.generateLeafId = generateLeafId;
const generateFieldTreeId = () => exports.generateRandId('f');
exports.generateFieldTreeId = generateFieldTreeId;
const generateTreeId = () => exports.generateRandId('t');
exports.generateTreeId = generateTreeId;
const generateNodeId = () => exports.generateRandId('n');
exports.generateNodeId = generateNodeId;
const generateRootId = () => exports.generateRandId('r');
exports.generateRootId = generateRootId;
//# sourceMappingURL=crypto.js.map