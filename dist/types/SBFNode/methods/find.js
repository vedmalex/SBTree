"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.find = void 0;
async function find(value) {
    const results = { identifiers: [], keys: [] };
    const { children } = this;
    let leafIndex = 0;
    this.keys.forEach((_key) => {
        if (value <= _key)
            return;
        leafIndex++;
    });
    const leaf = children[leafIndex];
    const leftRes = await leaf.find(value);
    results.identifiers.push(...leftRes.identifiers);
    results.keys.push(...leftRes.keys);
    if (children.length > leafIndex + 1) {
        const right = children[leafIndex + 1];
        const rightRes = await right.find(value);
        results.identifiers.push(...rightRes.identifiers);
        results.keys.push(...rightRes.keys);
    }
    return results;
}
exports.find = find;
//# sourceMappingURL=find.js.map