"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemoryAdapterWithStore = void 0;
const MemoryAdapter_1 = require("./MemoryAdapter");
const lodash_clonedeep_1 = __importDefault(require("lodash.clonedeep"));
const parseLeafs_1 = require("../common/data/parseLeafs");
class MemoryAdapterWithStore extends MemoryAdapter_1.MemoryAdapter {
    constructor(props) {
        super(props);
        parseLeafs_1.parseDataStore.call(this, props);
    }
    async saveDatabase() {
        const leafs = lodash_clonedeep_1.default(this.leafs);
        const documents = lodash_clonedeep_1.default(this.documents);
        const tree = this.datasource.toJSON();
        const db = {
            leafs,
            tree,
            documents,
        };
        await this.queue
            .add('File.create', `${this.path}/sbtree.meta.json`, db)
            .execution();
        this.lastSave = Date.now();
    }
    async loadDatabase() {
        const job = await this.queue
            .add('File.read', `${this.path}/sbtree.meta.json`)
            .execution();
        if (!job.error) {
            const db = job.result;
            if (db) {
                if (db.tree) {
                    parseLeafs_1.parseLeafs.call(this, db);
                    parseLeafs_1.parseDocments.call(this, db);
                    await this.datasource.loadState(db.tree);
                }
            }
        }
    }
    async addInLeaf(leafName, identifier, value) {
        const res = await super.addInLeaf(leafName, identifier, value);
        this.lastChange = Date.now();
        return res;
    }
    async removeInLeaf(leafId, identifier) {
        const res = super.removeInLeaf(leafId, identifier);
        this.lastChange = Date.now();
        return res;
    }
    async replaceInLeaf(leafId, identifier, value) {
        const res = await super.replaceInLeaf(leafId, identifier, value);
        this.lastChange = Date.now();
        return res;
    }
    async replaceDocument(doc) {
        const res = await super.replaceDocument.call(this, doc);
        this.lastChange = Date.now();
        return res;
    }
    async removeDocument(identifier) {
        const res = await super.removeDocument(identifier);
        this.lastChange = Date.now();
        return res;
    }
    async saveDocument(identifier) {
        const res = await super.saveDocument(identifier);
        this.lastChange = Date.now();
        return res;
    }
}
exports.MemoryAdapterWithStore = MemoryAdapterWithStore;
//# sourceMappingURL=MemoryAdapterWithStore.js.map