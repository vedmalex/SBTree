"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_clonedeep_1 = __importDefault(require("lodash.clonedeep"));
async function getDocument(identifier) {
    return lodash_clonedeep_1.default(await this.openDocument(identifier));
}
exports.default = getDocument;
//# sourceMappingURL=getDocument.js.map