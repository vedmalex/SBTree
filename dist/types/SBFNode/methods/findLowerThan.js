"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findLowerThan = void 0;
async function findLowerThan(value, includeKey = false) {
    const result = { identifiers: [], keys: [] };
    const { children, keys } = this;
    let leafIndex = 0;
    const p = [];
    if (keys.length === 0 && children.length === 1) {
        p.push(children[0].findLowerThan(value, includeKey));
    }
    else {
        keys.forEach((_key) => {
            if (value <= _key)
                return;
            leafIndex++;
        });
        children.slice(0, leafIndex).forEach((child) => {
            p.push(child.getAll());
        });
        p.push(children[leafIndex].findLowerThan(value, includeKey));
        if (children[leafIndex + 1]) {
            p.push(children[leafIndex + 1].findLowerThan(value, includeKey));
        }
    }
    await Promise.all(p).then((res) => {
        res.forEach((p) => {
            result.identifiers.push(...p.identifiers);
            result.keys.push(...p.keys);
        });
    });
    return result;
}
exports.findLowerThan = findLowerThan;
//# sourceMappingURL=findLowerThan.js.map