"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllInLeaf = void 0;
const lodash_clonedeep_1 = __importDefault(require("lodash.clonedeep"));
async function getAllInLeaf(leafId) {
    const leaf = this.leafs[leafId];
    return lodash_clonedeep_1.default({ identifiers: leaf.meta.identifiers, keys: leaf.data.keys });
}
exports.getAllInLeaf = getAllInLeaf;
//# sourceMappingURL=getAllInLeaf.js.map