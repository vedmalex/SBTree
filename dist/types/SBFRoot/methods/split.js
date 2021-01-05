"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.split = void 0;
const array_1 = require("../../../utils/array");
const SBFLeaf_1 = require("../../SBFLeaf/SBFLeaf");
const SBFNode_1 = require("../../SBFNode/SBFNode");
async function split() {
    const { children, identifiers, keys, fieldName } = this;
    const midIndex = ~~(keys.length / 2);
    const rightKeys = keys.splice(midIndex);
    const leftKeys = keys.splice(0);
    if (children.length > 0) {
        const midKey = rightKeys.splice(0, 1)[0];
        const rightChildren = children.splice(midIndex + 1);
        const leftChildren = children.splice(0);
        const right = new SBFNode_1.SBFNode({ fieldName, parent: this });
        right.keys = rightKeys;
        right.children = rightChildren;
        rightChildren.forEach((child) => {
            child.setParent(right);
        });
        const left = new SBFNode_1.SBFNode({ fieldName, parent: this });
        left.keys = leftKeys;
        left.children = leftChildren;
        leftChildren.forEach((child) => {
            child.setParent(left);
        });
        keys.push(midKey);
        this.children = [left, right];
    }
    else {
        const midKey = rightKeys.slice(0)[0];
        const rightIdentifiers = identifiers.splice(midIndex);
        const leftIdentifiers = identifiers.splice(0);
        const right = new SBFLeaf_1.SBFLeaf({ parent: this });
        await this.getAdapter().createLeaf(right.id);
        await array_1.forEach(rightKeys, async (key, i) => {
            await right.insert(rightIdentifiers[i], key);
        });
        const left = new SBFLeaf_1.SBFLeaf({ parent: this });
        await this.getAdapter().createLeaf(left.id);
        await array_1.forEach(leftKeys, async (key, i) => {
            await left.insert(leftIdentifiers[i], key);
        });
        keys.push(midKey);
        this.children = [left, right];
    }
}
exports.split = split;
//# sourceMappingURL=split.js.map