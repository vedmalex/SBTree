"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_clonedeep_1 = __importDefault(require("lodash.clonedeep"));
async function getAllInLeaf(leafId) {
    const { keys } = await this.openLeafData(leafId);
    if (!keys) {
        console.error(`leafId ${leafId} was not present, had to recreate`);
        await this.createLeaf(leafId);
        return this.getAllInLeaf(leafId);
    }
    return lodash_clonedeep_1.default({ identifiers: this.leafs[leafId].meta.identifiers, keys });
}
exports.default = getAllInLeaf;
;
//# sourceMappingURL=getAllInLeaf.js.map