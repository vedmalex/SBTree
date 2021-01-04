"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replace = void 0;
async function replace(identifier, value) {
    const { children, keys } = this;
    if (!children.length) {
        throw new Error('SBFNode cannot replace with no children');
    }
    let leafIndex = 0;
    keys.forEach((_key) => {
        if (value <= _key)
            return;
        leafIndex++;
    });
    const leaf = children[leafIndex];
    await leaf.replace(identifier, value);
    if (this.isFull()) {
        await this.split();
    }
}
exports.replace = replace;
//# sourceMappingURL=replace.js.map