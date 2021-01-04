"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = void 0;
async function remove(remCmd) {
    const value = remCmd.query[this.fieldName];
    const { identifiers, keys, children } = this;
    let leafIndex = 0;
    keys.forEach((_key) => {
        if (value < _key)
            return;
        leafIndex++;
    });
    if (!children.length) {
        const item = this.keys[leafIndex - 1];
        if (item !== undefined) {
            keys.splice(leafIndex - 1, 1);
            identifiers.splice(leafIndex - 1, 1);
        }
    }
    const leaf = children[leafIndex];
    if (leaf) {
        await leaf.remove(remCmd);
        if (children[leafIndex - 1]) {
            await children[leafIndex - 1].remove(remCmd);
        }
    }
}
exports.remove = remove;
//# sourceMappingURL=remove.js.map