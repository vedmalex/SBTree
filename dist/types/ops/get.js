"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.get = void 0;
const lodash_clonedeep_1 = __importDefault(require("lodash.clonedeep"));
async function get(identifier) {
    if (!identifier)
        throw new Error('Expected an objectid');
    const res = await this.adapter.getDocument(identifier);
    return lodash_clonedeep_1.default(res) || null;
}
exports.get = get;
//# sourceMappingURL=get.js.map