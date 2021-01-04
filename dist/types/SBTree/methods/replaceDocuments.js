"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceDocuments = void 0;
const replace_1 = require("../../ops/replace");
async function replaceDocuments(documents) {
    if (!this.state.isReady) {
        await this.isReady();
    }
    if (Array.isArray(documents)) {
        for (const document of documents) {
            await this.replaceDocuments(document);
        }
        return documents;
    }
    const currentDocument = await this.getDocument(documents._id);
    return ([await replace_1.replace.call(this, currentDocument, documents)]);
}
exports.replaceDocuments = replaceDocuments;
//# sourceMappingURL=replaceDocuments.js.map