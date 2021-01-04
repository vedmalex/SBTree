"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFieldTree = void 0;
function getFieldTree(fieldName) {
    let isExcluded = this.exclude.includes(fieldName);
    const splittedByDot = fieldName.split('.');
    if (splittedByDot.length > 1 && !isExcluded) {
        isExcluded = this.exclude.includes(splittedByDot[0]);
    }
    if (isExcluded)
        return;
    return this.fieldTrees[fieldName];
}
exports.getFieldTree = getFieldTree;
//# sourceMappingURL=getFieldTree.js.map