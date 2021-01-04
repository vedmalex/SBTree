"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.splitLeaf = void 0;
async function splitLeaf(sourceLeaf, siblingLeaf) {
    if (!this.leafs[sourceLeaf.id]) {
        throw new Error('Source leaf do not exist');
    }
    const source = this.leafs[sourceLeaf.id];
    const { keys } = source.data;
    const { identifiers } = source.meta;
    const sibling = this.leafs[siblingLeaf.id];
    if (!sibling) {
        throw new Error('Sibbling leaf do not exist');
    }
    const midIndex = ~~(keys.length / 2);
    const rightKeys = keys.splice(midIndex);
    const rightIdentifiers = identifiers.splice(midIndex);
    const midKey = rightKeys.slice(0, 1)[0];
    sibling.data.keys = rightKeys;
    sibling.meta.size = rightIdentifiers.length;
    sibling.meta.identifiers = rightIdentifiers;
    source.meta.size = identifiers.length;
    return midKey;
}
exports.splitLeaf = splitLeaf;
//# sourceMappingURL=splitLeaf.js.map