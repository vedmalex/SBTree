"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const LeafData_1 = __importDefault(require("../../common/LeafData"));
const LeafMeta_1 = __importDefault(require("../../common/LeafMeta"));
async function createLeaf(leafId) {
    this.leafs[leafId] = {
        id: leafId,
        meta: new LeafMeta_1.default(),
    };
    const data = new LeafData_1.default();
    await this.saveLeafData(leafId, data);
}
exports.default = createLeaf;
//# sourceMappingURL=createLeaf.js.map