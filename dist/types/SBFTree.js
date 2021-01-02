"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SBFTree = void 0;
const crypto_1 = require("../utils/crypto");
const SBFRoot_1 = require("./SBFRoot");
const defaultOpts = {
    order: 511,
    fillFactor: 0.5,
    verbose: false,
    isUnique: false
};
class SBFTree {
    constructor(props) {
        this.id = (props?.id) ? props?.id : crypto_1.generateFieldTreeId();
        this.order = (props.order) ? props.order : defaultOpts.order;
        this.verbose = (props.verbose) ? props.verbose : defaultOpts.verbose;
        this.fillFactor = (props.fillFactor) ? props.fillFactor : defaultOpts.fillFactor;
        if (!props.fieldName) {
            throw new Error(`SBFTree expect a fieldName to be initialized`);
        }
        this.fieldName = (props.fieldName) ? props.fieldName : null;
        this.isUnique = (props.isUnique !== undefined) ? props.isUnique : defaultOpts.isUnique;
        if (props.root) {
            this.createRoot(props.root);
        }
        else {
            this.root = null;
        }
        if (!props.adapter) {
            throw new Error(`SBFTree expect an adapter to be initialized`);
        }
        this.adapter = props.adapter;
    }
    getAdapter() {
        return this.adapter;
    }
    getOptions() {
        const { order, fillFactor, verbose } = this;
        return {
            order, fillFactor, verbose
        };
    }
    createRoot(root = null) {
        if (this.root) {
            throw new Error('Already existing root.');
        }
        if (root) {
            const _root = (root.root) ? root.root : root;
            _root.tree = this;
            this.root = new SBFRoot_1.SBFRoot(_root);
        }
        else {
            const { fieldName } = this;
            const keys = (root && root.keys) ? root.keys : null;
            this.root = new SBFRoot_1.SBFRoot({ tree: this, keys, fieldName });
        }
    }
    ;
    async find(value, operator) {
        let { root } = this;
        if (!root) {
            this.createRoot();
            root = this.root;
        }
        return await root.find(value, operator);
    }
    ;
    async get(identifier) {
        return await this.root.get(identifier);
    }
    ;
    async insert(identifier, value) {
        let { root } = this;
        if (!root) {
            this.createRoot();
            root = this.root;
        }
        if (this.isUnique) {
            const get = await this.find(value, '$eq');
            if (get.identifiers.length > 0) {
                return false;
            }
        }
        await root.insert(identifier, value);
    }
    ;
    async remove(remCmd) {
        let { root } = this;
        if (!root) {
            this.createRoot();
            root = this.root;
        }
        await root.remove(remCmd);
    }
    ;
    async replace(identifier, value) {
        let { root } = this;
        if (!root) {
            this.createRoot();
            root = this.root;
        }
        if (this.isUnique) {
            const get = await this.find(value, '$eq');
            if (get.identifiers.length > 0) {
                return false;
            }
        }
        await root.replace(identifier, value);
    }
    ;
    toJSON() {
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
}
exports.SBFTree = SBFTree;
;
//# sourceMappingURL=SBFTree.js.map