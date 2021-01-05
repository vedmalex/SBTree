"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDocuments = void 0;
const remove_1 = require("../../ops/remove");
async function deleteDocuments(query) {
    if (!query || query === {}) {
        throw new Error('Invalid query');
    }
    if (!this.isReady) {
        await this.onReady();
    }
    return (await remove_1.remove.call(this, query));
}
exports.deleteDocuments = deleteDocuments;
//# sourceMappingURL=deleteDocuments.js.map