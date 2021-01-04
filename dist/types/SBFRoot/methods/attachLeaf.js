"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.attachLeaf = void 0;
async function attachLeaf(index, leaf) {
    this.children.splice(index, 0, leaf);
    leaf.setParent(this);
}
exports.attachLeaf = attachLeaf;
//# sourceMappingURL=attachLeaf.js.map