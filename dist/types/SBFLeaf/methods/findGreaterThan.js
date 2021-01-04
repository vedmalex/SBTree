"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findGreaterThan = void 0;
async function findGreaterThan(value, includeKey = false) {
    const op = includeKey ? '$gte' : '$gt';
    const adapter = this.getParent().getAdapter();
    const res = await adapter.findInLeaf(this.id, value, op);
    return res;
}
exports.findGreaterThan = findGreaterThan;
//# sourceMappingURL=findGreaterThan.js.map