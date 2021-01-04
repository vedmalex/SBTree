"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replace = void 0;
async function replace(identifier, value) {
    let { root } = this;
    if (!root) {
        this.createRoot();
        root = this.root;
    }
    if (this.isUnique) {
        const get = await this.find(value, '$eq');
        if (get.identifiers.length > 0) {
            return false;
        }
    }
    await root.replace(identifier, value);
}
exports.replace = replace;
//# sourceMappingURL=replace.js.map