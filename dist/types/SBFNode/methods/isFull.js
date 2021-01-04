"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isFull = void 0;
function isFull() {
    const tree = this.getTree();
    const { order } = tree;
    return this.keys.length >= order;
}
exports.isFull = isFull;
//# sourceMappingURL=isFull.js.map