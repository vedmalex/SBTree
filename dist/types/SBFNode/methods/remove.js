"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = void 0;
async function remove(remCmd) {
    const value = remCmd.query[this.fieldName];
    let leafIndex = 0;
    this.keys.forEach((_key) => {
        if (value < _key)
            return;
        leafIndex++;
    });
    const leaf = this.children[leafIndex];
    if (leaf) {
        await leaf.remove(remCmd);
    }
}
exports.remove = remove;
//# sourceMappingURL=remove.js.map