"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDocument = void 0;
const lodash_clonedeep_1 = __importDefault(require("lodash.clonedeep"));
async function getDocument(identifier) {
    const doc = this.documents[identifier];
    if (!doc) {
        return null;
    }
    else {
        return lodash_clonedeep_1.default(doc);
    }
}
exports.getDocument = getDocument;
//# sourceMappingURL=getDocument.js.map