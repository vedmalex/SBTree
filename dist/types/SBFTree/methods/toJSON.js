"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toJSON = void 0;
function toJSON() {
    const { fieldName, id, fillFactor, isUnique, verbose, order, root, } = this;
    return {
        fieldName,
        id,
        fillFactor,
        isUnique,
        verbose,
        order,
        root: root.toJSON()
    };
}
exports.toJSON = toJSON;
//# sourceMappingURL=toJSON.js.map