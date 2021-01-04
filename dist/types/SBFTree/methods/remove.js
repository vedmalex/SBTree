"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = void 0;
async function remove(remCmd) {
    let { root } = this;
    if (!root) {
        this.createRoot();
        root = this.root;
    }
    await root.remove(remCmd);
}
exports.remove = remove;
//# sourceMappingURL=remove.js.map