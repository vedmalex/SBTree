"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function replaceDocument(doc) {
    if (!doc || !doc._id) {
        console.error(doc);
        throw new Error('Cannot replace document, expected id');
    }
    await this.queue.add('File.create', `${this.path}/d/${doc._id}.json`, doc).execution();
}
exports.default = replaceDocument;
;
//# sourceMappingURL=replaceDocument.js.map