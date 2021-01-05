"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findDocuments = void 0;
const query_1 = require("../../ops/query");
async function findDocuments(params) {
    if (!this.isReady) {
        await this.onReady();
    }
    return (await query_1.query.call(this, params));
}
exports.findDocuments = findDocuments;
//# sourceMappingURL=findDocuments.js.map