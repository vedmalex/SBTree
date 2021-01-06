"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemoryAdapter = void 0;
const getDocument_1 = require("./methods/crud/getDocument");
const removeDocument_1 = require("./methods/crud/removeDocument");
const replaceDocument_1 = require("./methods/crud/replaceDocument");
const saveDocument_1 = require("./methods/crud/saveDocument");
const openLeaf_1 = require("./methods/tree/openLeaf");
const addInLeaf_1 = require("./methods/tree/addInLeaf");
const replaceInLeaf_1 = require("./methods/tree/replaceInLeaf");
const createLeaf_1 = require("./methods/tree/createLeaf");
const splitLeaf_1 = require("./methods/tree/splitLeaf");
const getRightInLeaf_1 = require("./methods/tree/getRightInLeaf");
const getLeftInLeaf_1 = require("./methods/tree/getLeftInLeaf");
const findInLeaf_1 = require("./methods/tree/findInLeaf");
const getAllInLeaf_1 = require("./methods/tree/getAllInLeaf");
const removeInLeaf_1 = require("./methods/tree/removeInLeaf");
const parseLeafs_1 = require("../common/data/parseLeafs");
class MemoryAdapter {
    constructor(props) {
        this.isReady = false;
        parseLeafs_1.parseLeafs.call(this, props);
        parseLeafs_1.parseDocments.call(this, props);
    }
    async initWith(tree) {
        return parseLeafs_1.initWith.call(this, tree);
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
    async getRightInLeaf(leafId) {
        return getRightInLeaf_1.getRightInLeaf.call(this, leafId);
    }
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
        return (await replaceDocument_1.replaceDocument.call(this, doc));
    }
    replaceInLeaf(leafId, identifier, value) {
        return replaceInLeaf_1.replaceInLeaf.call(this, leafId, identifier, value);
    }
    async saveDocument(doc) {
        return (await saveDocument_1.saveDocument.call(this, doc));
    }
    async splitLeaf(sourceLeaf, siblingLeaf) {
        return splitLeaf_1.splitLeaf.call(this, sourceLeaf, siblingLeaf);
    }
}
exports.MemoryAdapter = MemoryAdapter;
//# sourceMappingURL=MemoryAdapter.js.map