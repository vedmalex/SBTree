"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replace = void 0;
async function replace(identifier, value) {
    const { children } = this;
    if (children.length === 0) {
        const currIndex = this.identifiers.indexOf(identifier);
        this.keys[currIndex] = value;
    }
    else {
        let leafIndex = 0;
        this.keys.forEach((_key) => {
            if (value <= _key)
                return;
            leafIndex++;
        });
        const leaf = children[leafIndex];
        await leaf.replace(identifier, value);
    }
    if (this.isFull()) {
        await this.split();
    }
}
exports.replace = replace;
//# sourceMappingURL=replace.js.map