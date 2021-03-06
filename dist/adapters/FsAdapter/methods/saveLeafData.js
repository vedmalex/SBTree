"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function saveLeafData(leafName, data) {
    const job = await this.queue
        .add('File.create', `${this.path}/l/${leafName}.json`, data)
        .execution();
    let res = {};
    if (!(job.result instanceof Error)) {
        res = job.result;
    }
    this.lastChange = Date.now();
    return res;
}
exports.default = saveLeafData;
//# sourceMappingURL=saveLeafData.js.map