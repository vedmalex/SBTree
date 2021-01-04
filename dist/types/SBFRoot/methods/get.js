"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get = void 0;
async function get(identifier) {
    const adapter = this.getAdapter();
    return await adapter.getDocument(identifier);
}
exports.get = get;
//# sourceMappingURL=get.js.map