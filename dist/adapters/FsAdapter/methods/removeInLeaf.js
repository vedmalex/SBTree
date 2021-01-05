"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeInLeaf = void 0;
async function removeInLeaf(leafId, identifier) {
    const identifiers = [];
    if (!this.leafs[leafId]) {
        throw new Error('Trying to remove in unknown leaf id');
    }
    const { meta } = this.leafs[leafId];
    const data = await this.openLeafData(leafId);
    const index = this.leafs[leafId].meta.identifiers.indexOf(identifier);
    if (index >= 0) {
        meta.size -= 1;
        meta.identifiers.splice(index, 1);
        data.keys.splice(index, 1);
        await this.saveLeafData(leafId, data);
        identifiers.push({ identifier, index });
    }
    return identifiers;
}
exports.removeInLeaf = removeInLeaf;
//# sourceMappingURL=removeInLeaf.js.map