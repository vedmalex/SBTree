"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function openDocument(identifer) {
    const job = await this.queue.add('File.read', `${this.path}/d/${identifer}.dat`).execution();
    let data = {};
    if (job.result.constructor.name !== Error.name) {
        data = job.result;
    }
    return data;
}
exports.default = openDocument;
;
//# sourceMappingURL=openDocument.js.map