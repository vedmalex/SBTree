"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function replaceInLeaf(leafId, identifier, value) {
    if (!this.leafs[leafId].meta.identifiers.includes(identifier)) {
        throw new Error(`Identifier ${identifier} do not exist`);
    }
    const index = this.leafs[leafId].meta.identifiers.indexOf(identifier);
    const data = await this.openLeafData(leafId);
    data.keys[index] = value;
    await this.saveLeafData(leafId, data);
    return index;
}
exports.default = replaceInLeaf;
module.exports = replaceInLeaf;
//# sourceMappingURL=replaceInLeaf.js.map