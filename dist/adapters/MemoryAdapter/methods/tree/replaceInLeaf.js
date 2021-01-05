"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceInLeaf = void 0;
function replaceInLeaf(leafId, identifier, value) {
    if (!this.leafs[leafId]) {
        throw new Error(`Unexistant leaf id ${leafId}`);
    }
    const { meta, data } = this.leafs[leafId];
    if (!meta.identifiers.includes(identifier)) {
        throw new Error(`Identifier ${identifier} do not exist`);
    }
    const index = meta.identifiers.indexOf(identifier);
    data.keys[index] = value;
    return Promise.resolve(index);
}
exports.replaceInLeaf = replaceInLeaf;
//# sourceMappingURL=replaceInLeaf.js.map