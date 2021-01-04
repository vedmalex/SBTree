"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLeftInLeaf = void 0;
const lodash_clonedeep_1 = __importDefault(require("lodash.clonedeep"));
async function getLeftInLeaf(leafId) {
    const leaf = this.leafs[leafId];
    const { meta, data } = leaf;
    const { identifiers } = meta;
    const identifier = identifiers[0];
    const key = data.keys[0];
    return lodash_clonedeep_1.default({ identifier, key });
}
exports.getLeftInLeaf = getLeftInLeaf;
//# sourceMappingURL=getLeftInLeaf.js.map