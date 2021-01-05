"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRightInLeaf = void 0;
const lodash_clonedeep_1 = __importDefault(require("lodash.clonedeep"));
async function getRightInLeaf(leafId) {
    const leaf = this.leafs[leafId];
    const { meta, data } = leaf;
    const { identifiers } = meta;
    const len = identifiers.length;
    const identifier = identifiers[len - 1];
    const key = data.keys[len - 1];
    return lodash_clonedeep_1.default({ identifier, key });
}
exports.getRightInLeaf = getRightInLeaf;
//# sourceMappingURL=getRightInLeaf.js.map