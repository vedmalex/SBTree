"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findLowerThan = void 0;
async function findLowerThan(value, includeKey = false) {
    const op = includeKey ? '$lte' : '$lt';
    const adapter = this.getParent().getAdapter();
    const res = await adapter.findInLeaf(this.id, value, op);
    return res;
}
exports.findLowerThan = findLowerThan;
//# sourceMappingURL=findLowerThan.js.map