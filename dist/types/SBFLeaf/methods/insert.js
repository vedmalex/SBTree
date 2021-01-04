"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insert = void 0;
async function insert(identifier, value) {
    const parent = this.getParent();
    const adapter = parent.getAdapter();
    await adapter.addInLeaf(this.id, identifier, value);
    const isFull = await this.isFull();
    if (isFull) {
        await this.split();
    }
}
exports.insert = insert;
//# sourceMappingURL=insert.js.map