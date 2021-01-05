"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeDocument = void 0;
function removeDocument(identifier) {
    if (this.documents[identifier]) {
        delete this.documents[identifier];
    }
}
exports.removeDocument = removeDocument;
//# sourceMappingURL=removeDocument.js.map