"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceDocument = void 0;
function replaceDocument(doc) {
    if (!this.documents[doc._id]) {
        this.saveDocument(doc);
    }
    this.documents[doc._id] = doc;
}
exports.replaceDocument = replaceDocument;
//# sourceMappingURL=replaceDocument.js.map