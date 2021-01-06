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
}
exports.MemoryAdapterWithStore = MemoryAdapterWithStore;
//# sourceMappingURL=MemoryAdapterWithStore.js.map