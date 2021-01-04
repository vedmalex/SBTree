"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toJSON = void 0;
function toJSON() {
    const { fieldName, children, type, id, keys, } = this;
    return {
        id,
        type,
        fieldName,
        keys: [...keys],
        children: children.map(c => c.toJSON())
    };
}
exports.toJSON = toJSON;
//# sourceMappingURL=toJSON.js.map