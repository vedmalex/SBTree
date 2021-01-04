"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insert = void 0;
async function insert(identifier, value) {
    let { root } = this;
    if (!root) {
        this.createRoot();
        root = this.root;
    }
    if (this.isUnique) {
        const get = await this.find(value, '$eq');
        if (get.identifiers.length > 0) {
            throw new Error(`field ${this.fieldName} value ${value} identifier ${identifier} already exist`);
        }
    }
    await root.insert(identifier, value);
}
exports.insert = insert;
//# sourceMappingURL=insert.js.map