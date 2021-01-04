"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.split = void 0;
const SBFLeaf_1 = require("../SBFLeaf");
async function split() {
    const parent = this.getParent();
    const adapter = parent.getAdapter();
    const newLeaf = new SBFLeaf_1.SBFLeaf({ parent });
    await adapter.createLeaf(newLeaf.id);
    const midKey = await adapter.splitLeaf(this, newLeaf);
    const index = await parent.insertReferenceKey(midKey);
    await parent.attachLeaf(index + 1, newLeaf);
}
exports.split = split;
//# sourceMappingURL=split.js.map