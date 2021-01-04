"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeUp = void 0;
async function mergeUp() {
    const parent = this.getParent();
    const { children, id } = this;
    const selfPos = parent.children.findIndex((el) => el.id === id);
    if (children.length !== 1) {
        throw new Error('We did not tought about resolving this case. ');
    }
    if (parent.children.length === 2 && !(await parent.getFillStatus()).fillFactorFilled) {
        const siblingPos = (selfPos === 1) ? 0 : 1;
        const sibling = parent.children[siblingPos];
        parent.keys.splice(siblingPos, 0, ...sibling.keys);
        parent.children = [...sibling.children, ...children];
    }
    else {
        throw new Error('Not implemented : MergingUp');
    }
}
exports.mergeUp = mergeUp;
//# sourceMappingURL=mergeUp.js.map