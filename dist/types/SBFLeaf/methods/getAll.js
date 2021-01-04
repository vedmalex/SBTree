"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAll = void 0;
async function getAll() {
    const adapter = this.getParent().getAdapter();
    const res = await adapter.getAllInLeaf(this.id);
    return res;
}
exports.getAll = getAll;
//# sourceMappingURL=getAll.js.map