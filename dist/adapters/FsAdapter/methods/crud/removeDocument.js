"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function removeDocument(identifier) {
    if (!identifier) {
        console.error(identifier);
        throw new Error('Cannot remove document, expected id');
    }
    await this.queue
        .add('File.remove', `${this.path}/d/${identifier}.json`)
        .execution();
}
exports.default = removeDocument;
//# sourceMappingURL=removeDocument.js.map