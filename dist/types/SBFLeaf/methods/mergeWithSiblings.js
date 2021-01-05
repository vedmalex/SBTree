"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeWithSiblings = void 0;
async function mergeWithSiblings() {
    const parent = this.getParent();
    const selfId = this.id;
    const selfPos = parent.children.findIndex((el) => el.id === selfId);
    let hasMerged = false;
    const siblings = {};
    if (selfPos >= 0)
        siblings.left = parent.children[selfPos - 1];
    if (parent.children.length > selfPos + 1)
        siblings.right = parent.children[selfPos + 1];
    if (siblings.left)
        siblings.leftStatus = await siblings.left.getFillStatus();
    if (siblings.right)
        siblings.rightStatus = await siblings.right.getFillStatus();
    if (siblings.right && (selfPos === 0 || !siblings.left)) {
        const rightSib = siblings.right;
        const rightSibPos = selfPos + 1;
        const { identifiers, keys } = await rightSib.getAll();
        const p = [];
        identifiers.forEach((identifier, i) => {
            const key = keys[i];
            p.push(this.insert(identifier, key));
        });
        await Promise.all(p);
        delete parent.children[rightSibPos];
        parent.children.splice(rightSibPos, 1);
        parent.keys.splice(Math.trunc(selfPos / 2), 1);
        if (parent.keys.length === 0) {
            await parent.mergeUp();
        }
        hasMerged = true;
    }
    else if (siblings.left) {
        const leftSib = siblings.left;
        const leftSibPos = selfPos - 1;
        const { identifiers, keys } = await leftSib.getAll();
        const p = [];
        identifiers.forEach((identifier, i) => {
            const key = keys[i];
            p.push(this.insert(identifier, key));
        });
        await Promise.all(p);
        delete parent.children[leftSibPos];
        parent.children.splice(leftSibPos, 1);
        parent.keys.splice(Math.trunc(selfPos / 2), 1);
        if (parent.keys.length === 0) {
            await parent.mergeUp();
        }
        hasMerged = true;
    }
    if (!hasMerged) {
        throw new Error('Failed to merge with siblings');
    }
    return hasMerged;
}
exports.mergeWithSiblings = mergeWithSiblings;
//# sourceMappingURL=mergeWithSiblings.js.map