"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRight = void 0;
async function getRight() {
    const adapter = this.getParent().getAdapter();
    const res = await adapter.getRightInLeaf(this.id);
    return res;
}
exports.getRight = getRight;
//# sourceMappingURL=getRight.js.map