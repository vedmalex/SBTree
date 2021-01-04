"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function openDocument(identifer) {
    const job = await this.queue.add('File.read', `${this.path}/d/${identifer}.json`).execution();
    let data = {};
    if (!(job.result instanceof Error)) {
        data = job.result;
    }
    return data;
}
exports.default = openDocument;
;
//# sourceMappingURL=openDocument.js.map