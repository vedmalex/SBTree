"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function openLeaf(leafName) {
    if (!this.leafs[leafName]) {
        throw new Error('Leaf do not exist');
    }
    return this.leafs[leafName];
}
exports.default = openLeaf;
//# sourceMappingURL=openLeaf.js.map