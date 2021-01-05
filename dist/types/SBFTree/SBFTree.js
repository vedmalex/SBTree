"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SBFTree = void 0;
const crypto_1 = require("../../utils/crypto");
const createRoot_1 = require("./methods/createRoot");
const find_1 = require("./methods/find");
const get_1 = require("./methods/get");
const insert_1 = require("./methods/insert");
const remove_1 = require("./methods/remove");
const replace_1 = require("./methods/replace");
const toJSON_1 = require("./methods/toJSON");
const defaultOpts = {
    order: 511,
    fillFactor: 0.5,
    verbose: false,
    isUnique: false
};
class SBFTree {
    constructor(props) {
        this._adapter = props.adapter;
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
    }
    get adapter() {
        return this._adapter;
    }
    getOptions() {
        const { order, fillFactor, verbose } = this;
        return {
            order, fillFactor, verbose
        };
    }
    createRoot(root = null) {
        return createRoot_1.createRoot.call(this, root);
    }
    async find(value, operator) {
        return find_1.find.call(this, value, operator);
    }
    async get(identifier) {
        return get_1.get.call(this, identifier);
    }
    async insert(identifier, value) {
        return insert_1.insert.call(this, identifier, value);
    }
    async remove(remCmd) {
        return remove_1.remove.call(this, remCmd);
    }
    async replace(identifier, value) {
        return replace_1.replace.call(this, identifier, value);
    }
    toJSON() {
        return toJSON_1.toJSON.call(this);
    }
}
exports.SBFTree = SBFTree;
;
//# sourceMappingURL=SBFTree.js.map