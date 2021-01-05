"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SBFNode = void 0;
const SBFLeaf_1 = require("../SBFLeaf/SBFLeaf");
const crypto_1 = require("../../utils/crypto");
const attachLeaf_1 = require("./methods/attachLeaf");
const find_1 = require("./methods/find");
const findLowerThan_1 = require("./methods/findLowerThan");
const findGreaterThan_1 = require("./methods/findGreaterThan");
const getAll_1 = require("./methods/getAll");
const getFillStatus_1 = require("./methods/getFillStatus");
const getTreeOptions_1 = require("./methods/getTreeOptions");
const insert_1 = require("./methods/insert");
const insertReferenceKey_1 = require("./methods/insertReferenceKey");
const isFull_1 = require("./methods/isFull");
const mergeUp_1 = require("./methods/mergeUp");
const remove_1 = require("./methods/remove");
const replace_1 = require("./methods/replace");
const split_1 = require("./methods/split");
const toJSON_1 = require("./methods/toJSON");
class SBFNode {
    constructor(props) {
        if (!props.parent) {
            throw new Error(`SBFNode initialized without parent reference`);
        }
        this.parent = props.parent;
        this.id = props.id ? props.id : crypto_1.generateNodeId();
        this.fieldName = props.parent.fieldName ? props.parent.fieldName : null;
        this.keys = props.keys ? props.keys : [];
        this.children = [];
        if (props.children) {
            props.children.forEach((child) => {
                if (child.type === 'leaf') {
                    this.children.push(new SBFLeaf_1.SBFLeaf({ parent: this, ...child }));
                }
                if (child.type === 'node') {
                    this.children.push(new SBFNode({ parent: this, ...child }));
                }
            });
        }
    }
    get type() {
        return 'node';
    }
    getParent() {
        return this.parent;
    }
    setParent(parent) {
        this.parent = parent;
    }
    getTree() {
        return (this.parent.getTree() ||
            this.parent.getParent().getTree());
    }
    getAdapter() {
        return this.getTree().root.getAdapter();
    }
    async attachLeaf(index, leaf) {
        return attachLeaf_1.attachLeaf.call(this, index, leaf);
    }
    async find(value) {
        return find_1.find.call(this, value);
    }
    async findLowerThan(value, includeKey = false) {
        return findLowerThan_1.findLowerThan.call(this, value, includeKey);
    }
    async findGreaterThan(value, includeKey = false) {
        return findGreaterThan_1.findGreaterThan.call(this, value, includeKey);
    }
    async getAll() {
        return getAll_1.getAll.call(this);
    }
    async getFillStatus() {
        return getFillStatus_1.getFillStatus.call(this);
    }
    getTreeOptions() {
        return getTreeOptions_1.getTreeOptions.call(this);
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
    async mergeUp() {
        return mergeUp_1.mergeUp.call(this);
    }
    async remove(remCmd) {
        return remove_1.remove.call(this, remCmd);
    }
    async replace(identifier, value) {
        return replace_1.replace.call(this, identifier, value);
    }
    async split() {
        return split_1.split.call(this);
    }
    toJSON() {
        return toJSON_1.toJSON.call(this);
    }
}
exports.SBFNode = SBFNode;
//# sourceMappingURL=SBFNode.js.map