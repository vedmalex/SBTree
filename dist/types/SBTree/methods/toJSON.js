"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toJSON = void 0;
function toJSON() {
    const { order, fillFactor, verbose, id, size, uniques, exclude, fieldTrees, } = this;
    const f = Object.keys(fieldTrees).reduce((res, cur) => {
        res[cur] = fieldTrees[cur].toJSON();
        return res;
    }, {});
    return JSON.parse(JSON.stringify({
        order,
        fillFactor,
        verbose,
        id,
        size,
        uniques,
        exclude,
        fieldTrees: f,
    }));
}
exports.toJSON = toJSON;
//# sourceMappingURL=toJSON.js.map