"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveDocument = void 0;
function saveDocument(doc) {
    if (!this.documents[doc._id]) {
        this.documents[doc._id] = doc;
    }
}
exports.saveDocument = saveDocument;
//# sourceMappingURL=saveDocument.js.map