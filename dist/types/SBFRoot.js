"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SBFRoot = void 0;
const array_1 = require("../utils/array");
const crypto_1 = require("../utils/crypto");
const lodash_foreach_1 = __importDefault(require("lodash.foreach"));
const SBFLeaf_1 = require("./SBFLeaf");
const SBFNode_1 = require("./SBFNode");
async function findEquals(value) {
    const result = { identifiers: [], keys: [] };
    const { children, identifiers, keys } = this;
    let leafIndex = 0;
    keys.forEach((_key) => {
        if (value <= _key)
            return;
        leafIndex += 1;
    });
    const p = [];
    if (children.length === 0) {
        if (identifiers[leafIndex]) {
            keys.slice(leafIndex).forEach((_key, i) => {
                if (_key === value) {
                    result.identifiers.push(identifiers[leafIndex + i]);
                    result.keys.push(_key);
                }
            });
        }
    }
    else {
        const left = children[leafIndex];
        if (left) {
            p.push(left.find(value));
        }
        if (children.length > leafIndex + 1) {
            const right = children[leafIndex + 1];
            p.push(right.find(value));
        }
        await Promise.all(p).then((res) => {
            if (res.length > 0) {
                res.forEach((_pRes) => {
                    if (_pRes.identifiers) {
                        result.identifiers.push(..._pRes.identifiers);
                        result.keys.push(..._pRes.keys);
                    }
                });
            }
        });
    }
    return result;
}
;
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
const parseChildren = (_children, _parent) => {
    const children = [];
    lodash_foreach_1.default(_children, (_children) => {
        const fieldName = _children.fieldName;
        if (_children.type === 'leaf') {
            children.push(new SBFLeaf_1.SBFLeaf({ fieldName, parent: _parent, ..._children }));
        }
        else if (_children.type === 'node') {
            children.push(new SBFNode_1.SBFNode({ fieldName, parent: _parent, ..._children }));
        }
    });
    return children;
};
class SBFRoot {
    constructor(props) {
        if (!props.tree) {
            throw new Error(`SBFRoot is initialized without any tree referenced`);
        }
        this.tree = props.tree;
        this.id = (props.id) ? props.id : crypto_1.generateRootId();
        this.fieldName = (props.tree.fieldName) ? props.tree.fieldName : null;
        this.keys = (props.keys) ? props.keys : [];
        this.identifiers = (props.identifiers) ? props.identifiers : [];
        this.children = (props.children) ? parseChildren(props.children, this) : [];
    }
    get type() { return 'root'; }
    getTree() {
        return (this.tree);
    }
    async attachLeaf(index, leaf) {
        this.children.splice(index, 0, leaf);
    }
    async find(value, operator = '$eq') {
        const self = this;
        const p = [];
        const results = { identifiers: [], keys: [] };
        const valueKeys = Object.keys(value);
        if (valueKeys.includes('$in')) {
            return this.find.call(this, value.$in, '$in');
        }
        switch (operator) {
            case '$eq':
                return findEquals.call(this, value);
            case '$ne':
                const getAllIdentifier = await this.getAll();
                const excludedIdentifiers = await findEquals.call(this, value);
                excludedIdentifiers.identifiers.forEach((id) => {
                    const idOf = getAllIdentifier.identifiers.indexOf(id);
                    if (idOf > -1) {
                        getAllIdentifier.identifiers.splice(idOf, 1);
                        getAllIdentifier.keys.splice(idOf, 1);
                    }
                });
                return getAllIdentifier;
            case '$lte':
                return findLowerThan.call(this, value, true);
            case '$lt':
                return findLowerThan.call(this, value, false);
            case '$gt':
                return findGreaterThan.call(this, value, false);
            case '$gte':
                return findGreaterThan.call(this, value, true);
            case '$in':
                if (!Array.isArray(value))
                    throw new Error('$in operator expect key to be an array');
                for (const el of value) {
                    p.push(self.find(el));
                }
                await Promise
                    .all(p)
                    .then((resolvedP) => {
                    resolvedP.forEach((p) => {
                        results.identifiers.push(...p.identifiers);
                        results.keys.push(...p.keys);
                    });
                }).catch((err) => {
                    console.error('err', err);
                });
                return results;
            case '$nin':
                if (!Array.isArray(value))
                    throw new Error('$nin operator expect key to be an array');
                const getAllIdentifiers = await this.getAll();
                const includingIdentifiers = await this.find(value, '$in');
                includingIdentifiers.identifiers.forEach((id) => {
                    const idOf = getAllIdentifiers.identifiers.indexOf(id);
                    if (idOf > -1) {
                        getAllIdentifiers.identifiers.splice(idOf, 1);
                        getAllIdentifiers.keys.splice(idOf, 1);
                    }
                });
                return getAllIdentifiers;
            default:
                throw new Error(`Not handled operator ${operator}`);
        }
    }
    async getAll() {
        const result = { identifiers: [], keys: [] };
        const p = [];
        this.children.forEach((child) => {
            p.push(child.getAll());
        });
        return new Promise((resolve) => {
            Promise
                .all(p)
                .then((res) => {
                res.forEach((resolvedP) => {
                    if (resolvedP.identifiers) {
                        result.identifiers.push(...resolvedP.identifiers);
                        result.keys.push(...resolvedP.keys);
                    }
                    else if (Array.isArray(resolvedP)) {
                        resolvedP.forEach((item) => {
                            result.identifiers.push(...item.identifiers);
                            result.keys.push(...item.keys);
                        });
                    }
                    else {
                        throw new Error(`Unexpected type of resolvedP - type : ${typeof resolvedP}`);
                    }
                });
                resolve(result);
            });
        });
    }
    async get(identifier) {
        const adapter = this.getAdapter();
        return await adapter.getDocument(identifier);
    }
    getAdapter() {
        return this.getTree().getAdapter();
    }
    ;
    async getFillStatus() {
        const { fillFactor, order } = this.getTreeOptions();
        if (fillFactor < 0.5) {
            throw new Error(`FillFactor cannot be less than 0.5. Received ${fillFactor}`);
        }
        const maxKeys = order - 1;
        const minKeys = Math.floor(maxKeys * fillFactor);
        const size = this.keys.length;
        return {
            fillFactor, order, leafSize: size, fillFactorFilled: size >= minKeys,
        };
    }
    ;
    getTreeOptions() {
        return this.getTree().getOptions();
    }
    ;
    async remove(remCmd) {
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
    async replace(identifier, value) {
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
    async insert(identifier, value = null) {
        const { children } = this;
        if (['string', 'number', 'boolean', 'object'].includes(typeof value)) {
            if (children.length === 0) {
                const idx = await this.insertReferenceKey(value);
                this.identifiers.splice(idx, 0, identifier);
            }
            else {
                let leafIndex = 0;
                this.keys.forEach((_key) => {
                    if (value <= _key)
                        return;
                    leafIndex++;
                });
                const leaf = children[leafIndex];
                await leaf.insert(identifier, value);
            }
        }
        else {
            throw new Error(`Unexpected insertion of type ${typeof value}`);
        }
        if (this.isFull()) {
            await this.split();
        }
    }
    async insertReferenceKey(value) {
        if (this.isFull()) {
            await this.split();
        }
        const index = array_1.insertSorted(this.keys, value);
        return index;
    }
    isFull() {
        const tree = this.getTree();
        const { order } = tree;
        return this.keys.length >= order;
    }
    async split() {
        const { children, identifiers, keys, fieldName, } = this;
        const midIndex = ~~(keys.length / 2);
        const rightKeys = keys.splice(midIndex);
        const leftKeys = keys.splice(0);
        if (children.length > 0) {
            const midKey = rightKeys.splice(0, 1)[0];
            const rightChildren = children.splice(midIndex + 1);
            const leftChildren = children.splice(0);
            const right = new SBFNode_1.SBFNode({ fieldName, parent: this });
            right.keys = rightKeys;
            right.children = rightChildren;
            rightChildren.forEach((child) => {
                child.setParent(right);
            });
            const left = new SBFNode_1.SBFNode({ fieldName, parent: this });
            left.keys = leftKeys;
            left.children = leftChildren;
            leftChildren.forEach((child) => {
                child.setParent(left);
            });
            keys.push(midKey);
            this.children = [left, right];
        }
        else {
            const midKey = rightKeys.slice(0)[0];
            const rightIdentifiers = identifiers.splice(midIndex);
            const leftIdentifiers = identifiers.splice(0);
            const right = new SBFLeaf_1.SBFLeaf({ parent: this });
            await this.getAdapter().createLeaf(right.id);
            await array_1.forEach(rightKeys, async (key, i) => {
                await right.insert(rightIdentifiers[i], key);
            });
            const left = new SBFLeaf_1.SBFLeaf({ parent: this });
            await this.getAdapter().createLeaf(left.id);
            await array_1.forEach(leftKeys, async (key, i) => {
                await left.insert(leftIdentifiers[i], key);
            });
            keys.push(midKey);
            this.children = [left, right];
        }
    }
    toJSON() {
        const { type, id, fieldName, identifiers, keys, children, } = this;
        return {
            type,
            id,
            fieldName,
            identifiers: [...identifiers],
            keys: [...keys],
            children: children.map(c => c.toJSON())
        };
    }
}
exports.SBFRoot = SBFRoot;
;
//# sourceMappingURL=SBFRoot.js.map