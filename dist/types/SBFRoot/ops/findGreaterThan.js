"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findGreaterThan = void 0;
async function findGreaterThan(key, includeKey = false) {
    const result = { identifiers: [], keys: [] };
    const { children, identifiers, keys } = this;
    let leafIndex = 0;
    keys.forEach((_key) => {
        if (key <= _key)
            return;
        leafIndex++;
    });
    const p = [];
    if (children.length === 0) {
        if (identifiers[leafIndex]) {
            keys.slice(leafIndex).forEach((_key, i) => {
                if (_key >= key) {
                    if (_key === key && !includeKey) {
                        return;
                    }
                    result.identifiers.push(identifiers[leafIndex + i]);
                    result.keys.push(_key);
                }
            });
        }
    }
    else {
        p.push(children[leafIndex].findGreaterThan(key, includeKey));
        let start = leafIndex + 1;
        if (keys.includes(key)) {
            p.push(children[start].findGreaterThan(key, includeKey));
            start += 1;
        }
        if (leafIndex < children.length - 1) {
            children.slice(start).forEach((child, i) => {
                p.push(child.getAll());
            });
        }
        await Promise.all(p).then((res) => {
            res.forEach((p) => {
                result.identifiers.push(...p.identifiers);
                result.keys.push(...p.keys);
            });
        });
    }
    return result;
}
exports.findGreaterThan = findGreaterThan;
//# sourceMappingURL=findGreaterThan.js.map