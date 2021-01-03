"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function saveDocument(doc) {
    if (!doc || !doc._id) {
        console.error(doc);
        throw new Error('Cannot save document, expected id');
    }
    await this.queue.add('File.create', `${this.path}/d/${doc._id}.json`, doc).execution();
}
exports.default = saveDocument;
;
//# sourceMappingURL=saveDocument.js.map