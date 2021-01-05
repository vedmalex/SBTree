"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_foreach_1 = __importDefault(require("lodash.foreach"));
const LeafMeta_1 = __importDefault(require("../../../common/LeafMeta"));
async function loadDatabase() {
    const job = await this.queue.add('File.read', `${this.path}/sbtree.meta.json`).execution();
    if (!job.error) {
        const db = job.result;
        if (db) {
            const { leafs, tree, } = db;
            if (tree) {
                lodash_foreach_1.default(leafs, (leaf, leafName) => {
                    this.leafs[leafName] = { id: leafName, meta: new LeafMeta_1.default(leaf.meta) };
                });
                await this.datasource.loadState(tree);
            }
        }
    }
}
exports.default = loadDatabase;
;
//# sourceMappingURL=loadDatabase.js.map