"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemoryAdapter = void 0;
const lodash_foreach_1 = __importDefault(require("lodash.foreach"));
const lodash_clonedeep_1 = __importDefault(require("lodash.clonedeep"));
const LeafData_1 = __importDefault(require("./LeafData"));
const LeafMeta_1 = __importDefault(require("./LeafMeta"));
const array_1 = require("../utils/array");
const events_1 = require("events");
function greaterThanKeys(arr, val) {
    return arr.filter((el) => el > val);
}
function lowerThanKeys(arr, val) {
    return arr.filter((el) => el < val);
}
const parseLeafs = (_leafs) => {
    const leafs = {};
    lodash_foreach_1.default(_leafs, (_leaf, _leafId) => {
        leafs[_leafId] = {
            meta: new LeafMeta_1.default(_leaf.meta),
            data: new LeafData_1.default(_leaf.data),
        };
    });
    return leafs;
};
class MemoryAdapter {
    constructor(props) {
        this.emitter = new events_1.EventEmitter();
        this.listeners = [];
        this.isReady = true;
        this.leafs = (props?.leafs) ? parseLeafs(props.leafs) : {};
        this.documents = (props?.documents) ? props?.documents : {};
    }
    get name() { return 'MemoryAdapter'; }
    ;
    on(event, listener) {
        this.emitter.on(event, listener);
        this.listeners.push({
            event,
            listener,
            type: 'on'
        });
    }
    once(event, listener) {
        this.emitter.once(event, listener);
        this.listeners.push({
            event,
            listener,
            type: 'once'
        });
    }
    close() {
        this.emit('close');
        setTimeout(() => {
            this.emitter.removeAllListeners();
        }, 10);
    }
    emit(event, ...args) {
        return this.emitter.emit(event, ...args);
    }
    async addInLeaf(leafName, identifier, value) {
        if (!this.leafs[leafName]) {
            await this.createLeaf(leafName);
        }
        const { meta, data } = this.leafs[leafName];
        if (meta.identifiers.includes(identifier)) {
            throw new Error(`Identifier ${identifier} already exist`);
        }
        const index = array_1.insertSorted(data.keys, value);
        meta.size += 1;
        meta.identifiers.splice(index, 0, identifier);
    }
    async createLeaf(leafName) {
        if (this.leafs[leafName]) {
            throw new Error(`Leaf ${leafName} already exist.`);
        }
        this.leafs[leafName] = {
            meta: new LeafMeta_1.default(),
            data: new LeafData_1.default(),
        };
    }
    async getAllInLeaf(leafId) {
        const leaf = this.leafs[leafId];
        return lodash_clonedeep_1.default({ identifiers: leaf.meta.identifiers, keys: leaf.data.keys });
    }
    async getLeftInLeaf(leafId) {
        const leaf = this.leafs[leafId];
        const { meta, data } = leaf;
        const { identifiers } = meta;
        const identifier = identifiers[0];
        const key = data.keys[0];
        return lodash_clonedeep_1.default({ identifier, key });
    }
    ;
    async getRightInLeaf(leafId) {
        const leaf = this.leafs[leafId];
        const { meta, data } = leaf;
        const { identifiers } = meta;
        const len = identifiers.length;
        const identifier = identifiers[len - 1];
        const key = data.keys[len - 1];
        return lodash_clonedeep_1.default({ identifier, key });
    }
    ;
    async findInLeaf(leafId, value, op = '$eq') {
        const leaf = this.leafs[leafId];
        if (!leaf) {
            throw new Error(`Trying to search in non-existing leafId ${leafId}`);
        }
        const result = {
            identifiers: [],
            keys: [],
        };
        const { keys } = leaf.data;
        const { identifiers } = leaf.meta;
        const firstIdx = keys.indexOf(value);
        const lastIdx = keys.lastIndexOf(value);
        const strictMatchingKeysLen = (firstIdx > -1) ? 1 + (lastIdx - firstIdx) : 0;
        switch (op) {
            case '$eq':
                if (!strictMatchingKeysLen) {
                    return result;
                }
                result.identifiers.push(...identifiers.slice(firstIdx, lastIdx + 1));
                result.keys.push(...keys.slice(firstIdx, lastIdx + 1));
                return result;
            case '$lte': {
                const lt = await this.findInLeaf(leafId, value, '$lt');
                const eq = await this.findInLeaf(leafId, value, '$eq');
                return {
                    identifiers: lt.identifiers.concat(eq.identifiers),
                    keys: lt.keys.concat(eq.keys)
                };
            }
            case '$gte': {
                const gt = await this.findInLeaf(leafId, value, '$gt');
                const eq = await this.findInLeaf(leafId, value, '$eq');
                return {
                    identifiers: gt.identifiers.concat(eq.identifiers),
                    keys: gt.keys.concat(eq.keys)
                };
            }
            case '$lt':
                if (firstIdx > -1) {
                    const localIndex = keys.indexOf(value);
                    if (localIndex !== 0) {
                        result.identifiers.push(...identifiers.slice(0, localIndex));
                        result.keys.push(...keys.slice(0, localIndex));
                    }
                }
                else {
                    const ltKeys = lowerThanKeys(keys, value);
                    result.identifiers.push(...identifiers.slice(0, ltKeys.length));
                    result.keys.push(...keys.slice(0, ltKeys.length));
                }
                return result;
            case '$gt':
                if (firstIdx > -1) {
                    const localIndex = keys.indexOf(value);
                    if (localIndex !== -1) {
                        result.identifiers.push(...identifiers.slice(localIndex + strictMatchingKeysLen));
                        result.keys.push(...keys.slice(localIndex + strictMatchingKeysLen));
                    }
                }
                else {
                    const gtKeys = greaterThanKeys(keys, value);
                    const len = gtKeys.length;
                    if (leafId !== 0 && len > 0) {
                        result.identifiers.push(...identifiers.slice(-len));
                        result.keys.push(...keys.slice(-len));
                    }
                }
                return result;
            default:
                throw new Error(`Not supported op ${op}`);
        }
    }
    async getDocument(identifier) {
        const doc = this.documents[identifier];
        if (!doc) {
            return null;
        }
        return lodash_clonedeep_1.default(doc);
    }
    async openLeaf(leafName) {
        if (!this.leafs[leafName]) {
            throw new Error('Leaf do not exist');
        }
        return this.leafs[leafName];
    }
    ;
    removeDocument(identifier) {
        if (this.documents[identifier]) {
            delete this.documents[identifier];
        }
    }
    removeInLeaf(leafId, identifier) {
        const identifiers = [];
        if (!this.leafs[leafId]) {
            throw new Error('Trying to remove in unknown leaf id');
        }
        const { meta, data } = this.leafs[leafId];
        const index = this.leafs[leafId].meta.identifiers.indexOf(identifier);
        if (index >= 0) {
            meta.size -= 1;
            meta.identifiers.splice(index, 1);
            data.keys.splice(index, 1);
            identifiers.push({ identifier, index });
        }
        return identifiers;
    }
    replaceDocument(doc) {
        if (!this.documents[doc._id]) {
            this.saveDocument(doc);
        }
        this.documents[doc._id] = doc;
    }
    replaceInLeaf(leafId, identifier, value) {
        if (!this.leafs[leafId]) {
            throw new Error(`Unexistant leaf id ${leafId}`);
        }
        const { meta, data } = this.leafs[leafId];
        if (!meta.identifiers.includes(identifier)) {
            throw new Error(`Identifier ${identifier} do not exist`);
        }
        const index = meta.identifiers.indexOf(identifier);
        data.keys[index] = value;
    }
    saveDocument(doc) {
        if (!this.documents[doc._id]) {
            this.documents[doc._id] = doc;
        }
    }
    async splitLeaf(sourceLeaf, siblingLeaf) {
        if (!this.leafs[sourceLeaf.id]) {
            throw new Error('Source leaf do not exist');
        }
        const source = this.leafs[sourceLeaf.id];
        const { keys } = source.data;
        const { identifiers } = source.meta;
        const sibling = this.leafs[siblingLeaf.id];
        if (!sibling) {
            throw new Error('Sibbling leaf do not exist');
        }
        const midIndex = ~~(keys.length / 2);
        const rightKeys = keys.splice(midIndex);
        const rightIdentifiers = identifiers.splice(midIndex);
        const midKey = rightKeys.slice(0, 1)[0];
        sibling.data.keys = rightKeys;
        sibling.meta.size = rightIdentifiers.length;
        sibling.meta.identifiers = rightIdentifiers;
        source.meta.size = identifiers.length;
        return midKey;
    }
    ;
}
exports.MemoryAdapter = MemoryAdapter;
//# sourceMappingURL=MemoryAdapter.js.map