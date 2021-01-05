"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function addInLeaf(leafName, identifier, value) {
    if (!this.leafs[leafName]) {
        await this.createLeaf(leafName);
    }
    const { meta } = this.leafs[leafName];
    if (meta.identifiers.includes(identifier)) {
        throw new Error(`Identifier ${identifier} already exist`);
    }
    const index = await this.insertSortedInLeaf(leafName, value);
    meta.size += 1;
    meta.identifiers.splice(index, 0, identifier);
    return index;
}
exports.default = addInLeaf;
//# sourceMappingURL=addInLeaf.js.map