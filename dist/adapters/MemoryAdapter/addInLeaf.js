"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addInLeaf = void 0;
const array_1 = require("../../utils/array");
async function addInLeaf(leafName, identifier, value) {
    if (!this.leafs[leafName]) {
        await this.createLeaf(leafName);
    }
    const { meta, data } = this.leafs[leafName];
    if (meta.identifiers.includes(identifier)) {
        throw new Error(`Identifier ${identifier} already exist`);
    }
    const index = array_1.insertSorted(data.keys, value);
    meta.size += 1;
    meta.identifiers.splice(index, 0, identifier);
}
exports.addInLeaf = addInLeaf;
//# sourceMappingURL=addInLeaf.js.map