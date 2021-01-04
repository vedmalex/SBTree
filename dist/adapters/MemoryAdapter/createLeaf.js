"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLeaf = void 0;
const LeafData_1 = __importDefault(require("../LeafData"));
const LeafMeta_1 = __importDefault(require("../LeafMeta"));
async function createLeaf(leafName) {
    if (this.leafs[leafName]) {
        throw new Error(`Leaf ${leafName} already exist.`);
    }
    this.leafs[leafName] = {
        meta: new LeafMeta_1.default(),
        data: new LeafData_1.default(),
    };
}
exports.createLeaf = createLeaf;
//# sourceMappingURL=createLeaf.js.map