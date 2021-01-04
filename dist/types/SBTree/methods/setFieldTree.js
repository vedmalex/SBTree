"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setFieldTree = void 0;
const SBFTree_1 = require("../../SBFTree/SBFTree");
function setFieldTree(_fieldTreeOpts) {
    const { fieldName } = _fieldTreeOpts;
    if (!fieldName) {
        throw new Error('Expected a fieldName to set a fieldTree');
    }
    if (this.fieldTrees[fieldName]) {
        throw new Error(`Setting on already existing field node ${fieldName}`);
    }
    const { adapter } = this;
    const isUnique = this.uniques.includes(fieldName);
    let isExcluded = this.exclude.includes(fieldName);
    const splittedByDot = fieldName.split('.');
    if (splittedByDot.length > 1 && !isExcluded) {
        isExcluded = this.exclude.includes(splittedByDot[0]);
    }
    if (isExcluded)
        return;
    const fieldTreeOpts = {
        adapter,
        fieldName,
        ...this.getOptions(),
        isUnique,
        id: _fieldTreeOpts.id,
        root: _fieldTreeOpts.root
    };
    const fieldTree = new SBFTree_1.SBFTree(fieldTreeOpts);
    this.fieldTrees[fieldName] = fieldTree;
}
exports.setFieldTree = setFieldTree;
//# sourceMappingURL=setFieldTree.js.map