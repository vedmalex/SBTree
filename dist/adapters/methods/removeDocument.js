"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function removeDocument(identifier) {
    if (!identifier) {
        console.error(identifier);
        throw new Error('Cannot remove document, expected id');
    }
    const job = await this.queue.add('File.remove', `${this.path}/d/${identifier}.dat`);
    await job.execution();
}
exports.default = removeDocument;
//# sourceMappingURL=removeDocument.js.map