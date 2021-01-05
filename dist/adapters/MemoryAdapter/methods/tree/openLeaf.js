"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.openLeaf = void 0;
async function openLeaf(leafName) {
    if (!this.leafs[leafName]) {
        throw new Error('Leaf do not exist');
    }
    return this.leafs[leafName];
}
exports.openLeaf = openLeaf;
//# sourceMappingURL=openLeaf.js.map