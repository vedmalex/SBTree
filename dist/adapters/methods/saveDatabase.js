"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_clonedeep_1 = __importDefault(require("lodash.clonedeep"));
async function saveDatabase() {
    const leafs = lodash_clonedeep_1.default(this.leafs);
    const tree = this.getParent().toJSON();
    const db = {
        leafs,
        tree,
    };
    await this.queue.add('File.create', `${this.path}/sbtree.meta.json`, db).execution();
    this.lastSave = Date.now();
}
exports.default = saveDatabase;
;
//# sourceMappingURL=saveDatabase.js.map