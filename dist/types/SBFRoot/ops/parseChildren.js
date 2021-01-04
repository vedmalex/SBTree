"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseChildren = void 0;
const lodash_foreach_1 = __importDefault(require("lodash.foreach"));
const SBFLeaf_1 = require("../../SBFLeaf/SBFLeaf");
const SBFNode_1 = require("../../SBFNode/SBFNode");
function parseChildren(_children, _parent) {
    const children = [];
    lodash_foreach_1.default(_children, (_children) => {
        const fieldName = _children.fieldName;
        if (_children.type === 'leaf') {
            children.push(new SBFLeaf_1.SBFLeaf({ fieldName, parent: _parent, ..._children }));
        }
        else if (_children.type === 'node') {
            children.push(new SBFNode_1.SBFNode({ fieldName, parent: _parent, ..._children }));
        }
    });
    return children;
}
exports.parseChildren = parseChildren;
//# sourceMappingURL=parseChildren.js.map