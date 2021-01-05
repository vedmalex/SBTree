"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function getDocument(identifier) {
    const job = await this.queue
        .add('File.read', `${this.path}/d/${identifier}.json`)
        .execution();
    let data = null;
    if (!(job.result instanceof Error)) {
        data = job.result;
    }
    return data;
}
exports.default = getDocument;
//# sourceMappingURL=getDocument.js.map