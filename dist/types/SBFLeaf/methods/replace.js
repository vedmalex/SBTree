"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replace = void 0;
async function replace(identifier, value) {
    const parent = this.getParent();
    const adapter = parent.getAdapter();
    await adapter.replaceInLeaf(this.id, identifier, value);
    const isFull = await this.isFull();
    if (isFull) {
        await this.split();
    }
}
exports.replace = replace;
//# sourceMappingURL=replace.js.map