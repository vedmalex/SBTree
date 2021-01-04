"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadState = void 0;
const lodash_foreach_1 = __importDefault(require("lodash.foreach"));
function loadState(state) {
    this.order = state.order;
    this.fillFactor = state.fillFactor;
    this.verbose = state.verbose;
    this.id = state.id;
    this.size = state.size;
    this.uniques = state.uniques;
    this.exclude = state.exclude;
    lodash_foreach_1.default(state.fieldTrees, (fieldRoot, _fieldName) => {
        this.setFieldTree({ fieldName: _fieldName, root: fieldRoot });
    });
    return true;
}
exports.loadState = loadState;
//# sourceMappingURL=loadState.js.map