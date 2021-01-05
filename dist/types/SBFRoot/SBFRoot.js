"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SBFRoot = void 0;
const crypto_1 = require("../../utils/crypto");
const parseChildren_1 = require("./ops/parseChildren");
const attachLeaf_1 = require("./methods/attachLeaf");
const find_1 = require("./methods/find");
const getAll_1 = require("./methods/getAll");
const get_1 = require("./methods/get");
const getFillStatus_1 = require("./methods/getFillStatus");
const remove_1 = require("./methods/remove");
const replace_1 = require("./methods/replace");
const insert_1 = require("./methods/insert");
const insertReferenceKey_1 = require("./methods/insertReferenceKey");
const isFull_1 = require("./methods/isFull");
const split_1 = require("./methods/split");
const toJSON_1 = require("./methods/toJSON");
class SBFRoot {
    constructor(props) {
        if (!props.tree) {
            throw new Error(`SBFRoot is initialized without any tree referenced`);
        }
        this.tree = props.tree;
        this.id = (props.id) ? props.id : crypto_1.generateRootId();
        this.fieldName = (props.tree.fieldName) ? props.tree.fieldName : null;
        this.keys = (props.keys) ? props.keys : [];
        this.identifiers = (props.identifiers) ? props.identifiers : [];
        this.children = (props.children) ? parseChildren_1.parseChildren(props.children, this) : [];
    }
    get type() { return 'root'; }
    getTree() {
        return (this.tree);
    }
    getAdapter() {
        return this.getTree().getAdapter();
    }
    ;
    getTreeOptions() {
        return this.getTree().getOptions();
    }
    ;
    async attachLeaf(index, leaf) {
        return attachLeaf_1.attachLeaf.call(this, index, leaf);
    }
    async find(value, operator = '$eq') {
        return find_1.find.call(this, value, operator = '$eq');
    }
    async getAll() {
        return getAll_1.getAll.call(this);
    }
    async get(identifier) {
        return get_1.get.call(this, identifier);
    }
    async getFillStatus() {
        return getFillStatus_1.getFillStatus.call(this);
    }
    async remove(remCmd) {
        return remove_1.remove.call(this, remCmd);
    }
    async replace(identifier, value) {
        return replace_1.replace.call(this, identifier, value);
    }
    async insert(identifier, value) {
        return insert_1.insert.call(this, identifier, value);
    }
    async insertReferenceKey(value) {
        return insertReferenceKey_1.insertReferenceKey.call(this, value);
    }
    isFull() {
        return isFull_1.isFull.call(this);
    }
    async split() {
        return split_1.split.call(this);
    }
    toJSON() {
        return toJSON_1.toJSON.call(this);
    }
}
exports.SBFRoot = SBFRoot;
;
//# sourceMappingURL=SBFRoot.js.map