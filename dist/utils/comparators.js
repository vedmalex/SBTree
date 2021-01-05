"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparatorNum = exports.comparatorString = void 0;
const comparatorString = function (a, b) {
    if (typeof a !== 'string')
        a = String(a);
    if (typeof b !== 'string')
        b = String(b);
    return a > b ? 1 : a < b ? -1 : 0;
};
exports.comparatorString = comparatorString;
const comparatorNum = function (a, b) {
    return a > b ? 1 : a < b ? -1 : 0;
};
exports.comparatorNum = comparatorNum;
//# sourceMappingURL=comparators.js.map