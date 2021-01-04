"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.find = void 0;
async function find(value, operator) {
    let { root } = this;
    if (!root) {
        this.createRoot();
        root = this.root;
    }
    return await root.find(value, operator);
}
exports.find = find;
//# sourceMappingURL=find.js.map