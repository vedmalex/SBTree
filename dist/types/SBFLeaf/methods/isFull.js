"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isFull = void 0;
async function isFull() {
    const parent = this.getParent();
    const adapter = parent.getAdapter();
    const { order } = parent.getTreeOptions();
    try {
        const leaf = await adapter.openLeaf(this.id);
        return leaf.meta.size >= order;
    }
    catch (e) {
        if (e.message === 'Leaf do not exist') {
            await adapter.createLeaf(this.id);
            return this.isFull();
        }
        throw e;
    }
}
exports.isFull = isFull;
//# sourceMappingURL=isFull.js.map