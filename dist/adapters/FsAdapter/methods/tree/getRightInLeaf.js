"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_clonedeep_1 = __importDefault(require("lodash.clonedeep"));
async function getRightInLeaf(leafId) {
    const { keys } = await this.openLeafData(leafId);
    if (!keys) {
        console.error(`leafId ${leafId} was not present, had to recreate`);
        await this.createLeaf(leafId);
        return this.getLeftInLeaf(leafId);
    }
    const leaf = this.leafs[leafId];
    const len = leaf.meta.identifiers.length;
    const identifier = leaf.meta.identifiers[len - 1];
    const key = keys[len - 1];
    return lodash_clonedeep_1.default({ identifier, key });
}
exports.default = getRightInLeaf;
//# sourceMappingURL=getRightInLeaf.js.map