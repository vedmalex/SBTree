"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function addInLeaf(leafName, identifier, value) {
    if (!this.leafs[leafName]) {
        await this.createLeaf(leafName);
    }
    if (this.leafs[leafName].meta.identifiers.includes(identifier)) {
        throw new Error(`Identifier ${identifier} already exist`);
    }
    const index = await this.insertSortedInLeaf(leafName, value);
    this.leafs[leafName].meta.size += 1;
    this.leafs[leafName].meta.identifiers.splice(index, 0, identifier);
}
exports.default = addInLeaf;
//# sourceMappingURL=addInLeaf.js.map