"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toJSON = void 0;
function toJSON() {
    const { type, id, fieldName, identifiers, keys, children } = this;
    return {
        type,
        id,
        fieldName,
        identifiers: [...identifiers],
        keys: [...keys],
        children: children.map((c) => c.toJSON()),
    };
}
exports.toJSON = toJSON;
//# sourceMappingURL=toJSON.js.map