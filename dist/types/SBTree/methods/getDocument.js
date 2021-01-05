"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDocument = void 0;
const get_1 = require("../../ops/get");
async function getDocument(identifier) {
    if (!this.isReady) {
        await this.onReady();
    }
    return await (get_1.get.call(this, identifier));
}
exports.getDocument = getDocument;
//# sourceMappingURL=getDocument.js.map