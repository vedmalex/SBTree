"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.find = void 0;
async function find(value) {
    const adapter = this.getParent().getAdapter();
    const res = await adapter.findInLeaf(this.id, value);
    return res;
}
exports.find = find;
//# sourceMappingURL=find.js.map