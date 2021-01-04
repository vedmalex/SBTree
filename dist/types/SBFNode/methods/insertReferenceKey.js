"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertReferenceKey = void 0;
const array_1 = require("../../../utils/array");
async function insertReferenceKey(value) {
    if (this.isFull()) {
        await this.split();
    }
    const index = array_1.insertSorted(this.keys, value);
    return index;
}
exports.insertReferenceKey = insertReferenceKey;
//# sourceMappingURL=insertReferenceKey.js.map