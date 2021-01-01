"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultFsProps = void 0;
const fslockjs_1 = require("fslockjs");
const events_1 = require("events");
const lodash_clonedeep_1 = __importDefault(require("lodash.clonedeep"));
const lodash_foreach_1 = __importDefault(require("lodash.foreach"));
const LeafMeta_1 = __importDefault(require("./LeafMeta"));
const LeafData_1 = __importDefault(require("./LeafData"));
const array_1 = require("../utils/array");
async function autosave(self) {
    const next = async (self) => {
        if ((self.lastChange !== null && self.lastSave === null) || (self.lastChange > self.lastSave)) {
            await self.saveDatabase();
        }
        setTimeout(async () => {
            if (self.autoSave) {
                await next(self);
            }
        }, self.autoSaveInterval);
    };
    await next(self);
}
;
function getStrictMatchingKeys(arr, val) {
    const indexes = [];
    let i = -1;
    while ((i = arr.indexOf(val, i + 1)) !== -1) {
        indexes.push(i);
    }
    return indexes;
}
function lowerThanKeys(arr, val) {
    return arr.filter((el) => el < val);
}
function greaterThanKeys(arr, val) {
    return arr.filter((el) => el > val);
}
exports.defaultFsProps = {
    path: '.db',
    autoSave: true,
    autoSaveInterval: 5000,
    autoLoad: true,
    autoLoadCallback: null,
};
class FsAdapter {
    constructor(props) {
        this.emitter = new events_1.EventEmitter();
        if (props?.parent) {
            this.setParent(props.parent);
        }
        this.leafs = (props.leafs) ? props.leafs : {};
        this.path = (props.path) ? (props.path) : exports.defaultFsProps.path;
        this.autoSave = (props.autoSave !== undefined) ? (props.autoSave) : exports.defaultFsProps.autoSave;
        this.autoSaveInterval = (props.autoSaveInterval !== undefined) ? (props.autoSaveInterval) : exports.defaultFsProps.autoSaveInterval;
        this.autoLoad = (props.autoLoad !== undefined) ? (props.autoLoad) : exports.defaultFsProps.autoLoad;
        this.autoLoadCallback = (props.autoLoadCallback !== undefined) ? (props.autoLoadCallback) : exports.defaultFsProps.autoLoadCallback;
        if (!this.autoLoad && this.autoLoadForceOverwrite === undefined) {
            throw new Error('Not implemented : Overwrite graceful handle. Pass autoLoadForceOverwrite to force.');
        }
        this.lastChange = null;
        this.lastSave = null;
        this.queue = new fslockjs_1.FSLock();
        this.isReady = true;
        if (props.leafs) {
            this.isReady = false;
        }
    }
    get name() { return 'FsAdapter'; }
    ;
    setParent(parent) {
        this.parent = parent;
    }
    getParent() {
        return this.parent;
    }
    on(event, listener) {
        this.emitter.on(event, listener);
    }
    once(event, listener) {
        this.emitter.once(event, listener);
    }
    emit(event, ...args) {
        return this.emitter.emit(event, ...args);
    }
    async addInLeaf(leafName, identifier, value) {
        if (!this.leafs[leafName]) {
            await this.createLeaf(leafName);
        }
        if (this.leafs[leafName].meta.identifiers.includes(identifier)) {
            throw new Error(`Identifier ${identifier} already exist`);
        }
        const index = await this.insertSortedInLeaf(leafName, value);
        this.leafs[leafName].meta.size += 1;
        this.leafs[leafName].meta.identifiers.splice(index, 0, identifier);
    }
    async attachParent(parent) {
        this.setParent(parent);
        if (this.autoLoad) {
            try {
                await this.loadDatabase();
                if (this.autoLoadCallback && typeof this.autoLoadCallback === 'function') {
                    await this.autoLoadCallback();
                }
            }
            catch (e) {
                console.error(e);
                process.exit(1);
            }
        }
        if (this.autoSave === true) {
            autosave(this);
        }
        this.emit('ready');
    }
    async createLeaf(leafId) {
        this.leafs[leafId] = {
            id: leafId,
            meta: new LeafMeta_1.default(),
        };
        const data = new LeafData_1.default();
        await this.saveLeafData(leafId, data);
    }
    async findInLeaf(leafId, value, op = '$eq') {
        const result = {
            identifiers: [],
            keys: [],
        };
        const { keys } = await this.openLeafData(leafId);
        if (!keys) {
            console.error(`leafId ${leafId} was not present, had to recreate`);
            await this.createLeaf(leafId);
            return this.findInLeaf(leafId, value, op);
        }
        const strictMatchingKeys = getStrictMatchingKeys(keys, value);
        switch (op) {
            case '$eq':
                if (!strictMatchingKeys.length) {
                    return [];
                }
                const start = strictMatchingKeys[0];
                const end = strictMatchingKeys[0] + strictMatchingKeys.length;
                result.identifiers.push(...this.leafs[leafId].meta.identifiers.slice(start, end));
                result.keys.push(...keys.slice(start, end));
                return result;
            case '$lte':
                let resLte = [];
                resLte = resLte.concat(await this.findInLeaf(leafId, value, '$lt'));
                resLte = resLte.concat(await this.findInLeaf(leafId, value, '$eq'));
                throw new Error('Modification to new format');
                return resLte;
            case '$gte':
                let resGte = [];
                resGte = resGte.concat(await this.findInLeaf(leafId, value, '$eq'));
                resGte = resGte.concat(await this.findInLeaf(leafId, value, '$gt'));
                throw new Error('Modification to new format');
                return resGte;
            case '$lt':
                if (strictMatchingKeys.length) {
                    const localIndex = keys.indexOf(value);
                    if (localIndex !== 0) {
                        result.identifiers.push(...this.leafs[leafId].meta.identifiers.slice(0, localIndex));
                        result.keys.push(...keys.slice(0, localIndex));
                    }
                }
                else {
                    const ltKeys = lowerThanKeys(keys, value);
                    result.identifiers.push(...this.leafs[leafId].meta.identifiers.slice(0, ltKeys.length));
                    result.keys.push(...keys.slice(0, ltKeys.length));
                }
                return result;
            case '$gt':
                if (strictMatchingKeys.length) {
                    const localIndex = keys.indexOf(value);
                    if (localIndex !== -1) {
                        result.identifiers.push(...this.leafs[leafId].meta.identifiers.slice(localIndex + strictMatchingKeys.length));
                        result.keys.push(...keys.slice(localIndex + strictMatchingKeys.length));
                    }
                }
                else {
                    const _keys = greaterThanKeys(keys, value);
                    const len = (_keys.length <= 0) ? 0 : _keys.length;
                    if (leafId !== 0) {
                        result.identifiers.push(...this.leafs[leafId].meta.identifiers.slice(-len));
                        result.keys.push(...keys.slice(-len));
                    }
                }
                return result;
            default:
                throw new Error(`Unsupported operator ${op}`);
        }
    }
    async getAllInLeaf(leafId) {
        const { keys } = await this.openLeafData(leafId);
        if (!keys) {
            console.error(`leafId ${leafId} was not present, had to recreate`);
            await this.createLeaf(leafId);
            return this.getAllInLeaf(leafId);
        }
        return lodash_clonedeep_1.default({ identifiers: this.leafs[leafId].meta.identifiers, keys });
    }
    async getLeftInLeaf(leafId) {
        const { keys } = await this.openLeafData(leafId);
        if (!keys) {
            console.error(`leafId ${leafId} was not present, had to recreate`);
            await this.createLeaf(leafId);
            return this.getLeftInLeaf(leafId);
        }
        const leaf = this.leafs[leafId];
        const identifier = leaf.meta.identifiers[0];
        const key = leaf.data.keys[0];
        return lodash_clonedeep_1.default({ identifier, key });
    }
    async getRightInLeaf(leafId) {
        const { keys } = await this.openLeafData(leafId);
        if (!keys) {
            console.error(`leafId ${leafId} was not present, had to recreate`);
            await this.createLeaf(leafId);
            return this.getLeftInLeaf(leafId);
        }
        const leaf = this.leafs[leafId];
        const len = leaf.meta.identifiers.length;
        const identifier = leaf.meta.identifiers[len - 1];
        const key = leaf.data.keys[len - 1];
        return lodash_clonedeep_1.default({ identifier, key });
    }
    async getDocument(identifier) {
        return lodash_clonedeep_1.default(await this.openDocument(identifier));
    }
    async insertSortedInLeaf(leafId, value) {
        const data = await this.openLeafData(leafId);
        if (!data || !data.keys) {
            console.error(`leafId ${leafId} was not present, had to recreate`);
            await this.createLeaf(leafId);
            return this.insertSortedInLeaf(leafId, value);
        }
        const index = array_1.insertSorted(data.keys, value);
        await this.saveLeafData(leafId, data);
        return index;
    }
    async loadDatabase() {
        const job = await this.queue.add('File.read', `${this.path}/sbtree.meta`);
        await job.execution();
        const db = job.result;
        if (db) {
            const { leafs, tree, } = db;
            if (tree) {
                lodash_foreach_1.default(leafs, (leaf, leafName) => {
                    this.leafs[leafName] = { name: leafName, meta: new LeafMeta_1.default(leaf.meta) };
                });
                await this.getParent().loadState(tree);
            }
        }
        this.isReady = true;
    }
    async openDocument(identifer) {
        const job = await this.queue.add('File.read', `${this.path}/d/${identifer}.dat`).execution();
        let data = {};
        if (job.result instanceof Error) {
            data = job.result;
        }
        return data;
    }
    async openLeaf(leafName) {
        if (!this.leafs[leafName]) {
            throw new Error('Leaf do not exist');
        }
        return this.leafs[leafName];
    }
    async removeDocument(identifier) {
        if (!identifier) {
            console.error(identifier);
            throw new Error('Cannot remove document, expected id');
        }
        const job = await this.queue.add('File.remove', `${this.path}/d/${identifier}.dat`);
        await job.execution();
    }
    async openLeafData(leafName) {
        const job = await this.queue.add('File.read', `${this.path}/l/${leafName}.dat`).execution();
        let data;
        if (job.result instanceof Error) {
            data = job.result;
        }
        this.lastChange = Date.now();
        return data;
    }
    async replaceDocument(doc) {
        if (!doc || !doc._id) {
            console.error(doc);
            throw new Error('Cannot replace document, expected id');
        }
        const job = await this.queue.add('File.create', `${this.path}/d/${doc._id}.dat`, doc);
        await job.execution();
    }
    async replaceInLeaf(leafId, identifier, value) {
        if (!this.leafs[leafId].meta.identifiers.includes(identifier)) {
            throw new Error(`Identifier ${identifier} do not exist`);
        }
        const index = this.leafs[leafId].meta.identifiers.indexOf(identifier);
        const data = await this.openLeafData(leafId);
        data.keys[index] = value;
        await this.saveLeafData(leafId, data);
        return index;
    }
    async saveDatabase() {
        const leafs = lodash_clonedeep_1.default(this.leafs);
        const tree = this.getParent().toJSON();
        const db = {
            leafs,
            tree,
        };
        const job = await this.queue.add('File.create', `${this.path}/sbtree.meta`, db);
        await job.execution();
        this.lastSave = Date.now();
    }
    async saveDocument(doc) {
        if (!doc || !doc._id) {
            console.error(doc);
            throw new Error('Cannot save document, expected id');
        }
        const job = await this.queue.add('File.create', `${this.path}/d/${doc._id}.dat`, doc);
        await job.execution();
    }
    async saveLeafData(leafName, data) {
        const job = await this.queue.add('File.create', `${this.path}/l/${leafName}.dat`, data).execution();
        let res = {};
        if (!job.result) {
        }
        if (job.result instanceof Error) {
            res = job.result;
        }
        this.lastChange = Date.now();
        return res;
    }
    async splitLeaf(sourceLeaf, siblingLeaf) {
        if (!this.leafs[sourceLeaf.id]) {
            throw new Error('Source leaf do not exist');
        }
        const source = this.leafs[sourceLeaf.id];
        const leaf = this.leafs[siblingLeaf.id];
        if (!this.leafs[siblingLeaf.id]) {
            throw new Error('Sibbling leaf do not exist');
        }
        const sibling = await this.openLeafData(siblingLeaf.id);
        const leafData = await this.openLeafData(sourceLeaf.id);
        const midIndex = ~~(leafData.keys.length / 2);
        const rightKeys = leafData.keys.splice(midIndex);
        const rightIdentifiers = source.meta.identifiers.splice(midIndex);
        const midKey = rightKeys.slice(0, 1)[0];
        sibling.keys = rightKeys;
        leaf.meta.size = rightIdentifiers.length;
        leaf.meta.identifiers = rightIdentifiers;
        source.meta.size = source.meta.identifiers.length;
        await this.saveLeafData(sourceLeaf.id, leafData);
        await this.saveLeafData(siblingLeaf.id, sibling);
        return midKey;
    }
    async updateDocument(_doc) {
        const job = await this.queue.add('File.appendJSON', `${this.path}/d/${_doc._id}.dat`, _doc).execution();
        let data = {};
        if (job.result instanceof Error) {
            data = job.result;
        }
        this.lastChange = Date.now();
        return data;
    }
}
exports.default = FsAdapter;
//# sourceMappingURL=FsAdapter.js.map