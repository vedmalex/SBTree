"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toJSON = void 0;
function toJSON() {
    const { fieldName, id, type } = this;
    return {
        fieldName,
        id,
        type,
    };
}
exports.toJSON = toJSON;
//# sourceMappingURL=toJSON.js.map