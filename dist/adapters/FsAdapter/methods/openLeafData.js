"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function openLeafData(leafName) {
    const job = await this.queue
        .add('File.read', `${this.path}/l/${leafName}.json`, {})
        .execution();
    let data = { keys: [] };
    if (!(job.result instanceof Error)) {
        data = job.result;
    }
    this.lastChange = Date.now();
    return data;
}
exports.default = openLeafData;
//# sourceMappingURL=openLeafData.js.map