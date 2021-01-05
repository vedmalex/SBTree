"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemoryAdapter = void 0;
const parseLeafs_1 = require("./methods/parseLeafs");
const Emittable_1 = require("../common/Emittable");
const addInLeaf_1 = require("./methods/addInLeaf");
const createLeaf_1 = require("./methods/createLeaf");
const getAllInLeaf_1 = require("./methods/getAllInLeaf");
const getLeftInLeaf_1 = require("./methods/getLeftInLeaf");
const getRightInLeaf_1 = require("./methods/getRightInLeaf");
const findInLeaf_1 = require("./methods/findInLeaf");
const getDocument_1 = require("./methods/getDocument");
const openLeaf_1 = require("./methods/openLeaf");
const removeDocument_1 = require("./methods/removeDocument");
const replaceInLeaf_1 = require("./methods/replaceInLeaf");
const replaceDocument_1 = require("./methods/replaceDocument");
const saveDocument_1 = require("./methods/saveDocument");
const splitLeaf_1 = require("./methods/splitLeaf");
const removeInLeaf_1 = require("./methods/removeInLeaf");
class MemoryAdapter extends Emittable_1.Emittable {
    constructor(props) {
        super();
        this.isReady = false;
        this.leafs = (props?.leafs) ? parseLeafs_1.parseLeafs(props.leafs) : {};
        this.documents = (props?.documents) ? props?.documents : {};
    }
    async initWith(tree) {
        if (!this.isReady) {
            this.tree = tree;
            this.isReady = true;
            return true;
        }
        else {
            return true;
        }
        ;
    }
    async addInLeaf(leafName, identifier, value) {
        return addInLeaf_1.addInLeaf.call(this, leafName, identifier, value);
    }
    async createLeaf(leafName) {
        return createLeaf_1.createLeaf.call(this, leafName);
    }
    async getAllInLeaf(leafId) {
        return getAllInLeaf_1.getAllInLeaf.call(this, leafId);
    }
    async getLeftInLeaf(leafId) {
        return getLeftInLeaf_1.getLeftInLeaf.call(this, leafId);
    }
    ;
    async getRightInLeaf(leafId) {
        return getRightInLeaf_1.getRightInLeaf.call(this, leafId);
    }
    ;
    async findInLeaf(leafId, value, op = '$eq') {
        return findInLeaf_1.findInLeaf.call(this, leafId, value, op);
    }
    async getDocument(identifier) {
        return getDocument_1.getDocument.call(this, identifier);
    }
    async openLeaf(leafName) {
        return openLeaf_1.openLeaf.call(this, leafName);
    }
    async removeDocument(identifier) {
        return await removeDocument_1.removeDocument.call(this, identifier);
    }
    async removeInLeaf(leafId, identifier) {
        return removeInLeaf_1.removeInLeaf.call(this, leafId, identifier);
    }
    async replaceDocument(doc) {
        return await replaceDocument_1.replaceDocument.call(this, doc);
    }
    replaceInLeaf(leafId, identifier, value) {
        return replaceInLeaf_1.replaceInLeaf.call(this, leafId, identifier, value);
    }
    async saveDocument(doc) {
        return await saveDocument_1.saveDocument.call(this, doc);
    }
    async splitLeaf(sourceLeaf, siblingLeaf) {
        return splitLeaf_1.splitLeaf.call(this, sourceLeaf, siblingLeaf);
    }
    ;
}
exports.MemoryAdapter = MemoryAdapter;
//# sourceMappingURL=MemoryAdapter.js.map