"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findLowerThan = void 0;
async function findLowerThan(key, includeKey = false) {
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
        if (!identifiers[leafIndex]) {
            leafIndex--;
        }
        if (identifiers[leafIndex]) {
            const last = keys.lastIndexOf(key);
            keys.slice(0, last + 1 || leafIndex + 1).forEach((_key, i) => {
                if (_key <= key) {
                    if (_key === key && !includeKey) {
                        return;
                    }
                    result.identifiers.push(identifiers[i]);
                    result.keys.push(keys[i]);
                }
            });
        }
    }
    else {
        if (leafIndex >= 1) {
            children.slice(0, leafIndex).forEach((child) => {
                p.push(child.getAll());
            });
        }
        p.push(children[leafIndex].findLowerThan(key, includeKey));
        if (keys.includes(key)) {
            p.push(await children[leafIndex + 1].findLowerThan(key, includeKey));
        }
        await Promise.all(p).then((res) => {
            res.forEach((p) => {
                result.identifiers.push(...p.identifiers);
                result.keys.push(...p.keys);
            });
        }).catch((err) => {
            console.error('err', err);
        });
    }
    return result;
}
exports.findLowerThan = findLowerThan;
//# sourceMappingURL=findLowerThan.js.map