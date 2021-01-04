"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseLeafs = void 0;
const lodash_foreach_1 = __importDefault(require("lodash.foreach"));
const LeafData_1 = __importDefault(require("../../common/LeafData"));
const LeafMeta_1 = __importDefault(require("../../common/LeafMeta"));
function parseLeafs(_leafs) {
    const leafs = {};
    lodash_foreach_1.default(_leafs, (_leaf, _leafId) => {
        leafs[_leafId] = {
            meta: new LeafMeta_1.default(_leaf.meta),
            data: new LeafData_1.default(_leaf.data),
        };
    });
    return leafs;
}
exports.parseLeafs = parseLeafs;
//# sourceMappingURL=parseLeafs.js.map