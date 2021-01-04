"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insert = void 0;
const SBFLeaf_1 = require("../../SBFLeaf/SBFLeaf");
async function insert(identifier, value) {
    const { children, keys } = this;
    if (!children.length) {
        const leaf = new SBFLeaf_1.SBFLeaf({ parent: this });
        await leaf.insert(identifier, value);
        children.push(leaf);
    }
    let leafIndex = 0;
    keys.forEach((_key) => {
        if (value <= _key)
            return;
        leafIndex++;
    });
    const leaf = children[leafIndex];
    await leaf.insert(identifier, value);
    if (this.isFull()) {
        await this.split();
    }
}
exports.insert = insert;
//# sourceMappingURL=insert.js.map