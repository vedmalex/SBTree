"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRoot = void 0;
const SBFRoot_1 = require("../../SBFRoot/SBFRoot");
function createRoot(root = null) {
    if (this.root) {
        throw new Error('Already existing root.');
    }
    if (root) {
        const _root = root.root ? root.root : root;
        _root.tree = this;
        this.root = new SBFRoot_1.SBFRoot(_root);
    }
    else {
        const { fieldName } = this;
        const keys = root && root.keys ? root.keys : null;
        this.root = new SBFRoot_1.SBFRoot({ tree: this, keys, fieldName });
    }
}
exports.createRoot = createRoot;
//# sourceMappingURL=createRoot.js.map