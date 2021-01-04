"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.split = void 0;
const SBFNode_1 = require("../SBFNode");
async function split() {
    const midIndex = ~~(this.keys.length / 2);
    const rightKeys = this.keys.splice(midIndex);
    const leftKeys = this.keys.splice(0);
    const midKey = rightKeys.splice(0, 1)[0];
    const rightChildren = this.children.splice(midIndex + 1);
    const leftChildren = this.children.splice(0);
    const parent = this.getParent();
    const right = new SBFNode_1.SBFNode({ parent });
    right.keys = rightKeys;
    right.children = rightChildren;
    rightChildren.forEach((child) => {
        child.setParent(right);
    });
    const left = new SBFNode_1.SBFNode({ parent });
    left.keys = leftKeys;
    left.children = leftChildren;
    leftChildren.forEach((child) => {
        child.setParent(left);
    });
    const currentChildIndex = parent.children.indexOf(this);
    parent.children.splice(currentChildIndex, 1);
    await parent.attachLeaf(currentChildIndex, left);
    await parent.attachLeaf(currentChildIndex + 1, right);
    await parent.insertReferenceKey(midKey);
}
exports.split = split;
//# sourceMappingURL=split.js.map