"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLeft = void 0;
async function getLeft() {
    const adapter = this.getParent().getAdapter();
    const res = await adapter.getLeftInLeaf(this.id);
    return res;
}
exports.getLeft = getLeft;
//# sourceMappingURL=getLeft.js.map