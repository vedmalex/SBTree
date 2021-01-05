"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SBFLeaf = void 0;
const crypto_1 = require("../../utils/crypto");
const insert_1 = require("./methods/insert");
const find_1 = require("./methods/find");
const getAll_1 = require("./methods/getAll");
const getFillStatus_1 = require("./methods/getFillStatus");
const getLeft_1 = require("./methods/getLeft");
const getRight_1 = require("./methods/getRight");
const findLowerThan_1 = require("./methods/findLowerThan");
const findGreaterThan_1 = require("./methods/findGreaterThan");
const isFillFactorFilled_1 = require("./methods/isFillFactorFilled");
const isFull_1 = require("./methods/isFull");
const mergeWithSiblings_1 = require("./methods/mergeWithSiblings");
const redistribute_1 = require("./methods/redistribute");
const remove_1 = require("./methods/remove");
const replace_1 = require("./methods/replace");
const split_1 = require("./methods/split");
const toJSON_1 = require("./methods/toJSON");
class SBFLeaf {
    constructor(props) {
        if (!props.parent) {
            throw new Error(`SFBLeaf initialized without parent reference`);
        }
        this.parent = props.parent;
        this.id = props.id ? props.id : crypto_1.generateLeafId();
        this.fieldName = props.parent.fieldName ? props.parent.fieldName : null;
    }
    get type() {
        return 'leaf';
    }
    getParent() {
        return this.parent;
    }
    setParent(parent) {
        this.parent = parent;
    }
    async insert(identifier, value) {
        return insert_1.insert.call(this, identifier, value);
    }
    async find(value) {
        return find_1.find.call(this, value);
    }
    async getAll() {
        return getAll_1.getAll.call(this);
    }
    async getFillStatus() {
        return getFillStatus_1.getFillStatus.call(this);
    }
    async getLeft() {
        return getLeft_1.getLeft.call(this);
    }
    async getRight() {
        return getRight_1.getRight.call(this);
    }
    async findLowerThan(value, includeKey = false) {
        return findLowerThan_1.findLowerThan.call(this, value, includeKey);
    }
    async findGreaterThan(value, includeKey = false) {
        return findGreaterThan_1.findGreaterThan.call(this, value, includeKey);
    }
    async isFillFactorFilled() {
        return isFillFactorFilled_1.isFillFactorFilled.call(this);
    }
    async isFull() {
        return isFull_1.isFull.call(this);
    }
    async mergeWithSiblings() {
        return mergeWithSiblings_1.mergeWithSiblings.call(this);
    }
    async redistribute() {
        return redistribute_1.redistribute.call(this);
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
exports.SBFLeaf = SBFLeaf;
//# sourceMappingURL=SBFLeaf.js.map