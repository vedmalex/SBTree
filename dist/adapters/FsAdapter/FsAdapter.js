"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getDocument_1 = __importDefault(require("./methods/crud/getDocument"));
const removeDocument_1 = __importDefault(require("./methods/crud/removeDocument"));
const replaceDocument_1 = __importDefault(require("./methods/crud/replaceDocument"));
const saveDocument_1 = __importDefault(require("./methods/crud/saveDocument"));
const openLeaf_1 = __importDefault(require("./methods/tree/openLeaf"));
const addInLeaf_1 = __importDefault(require("./methods/tree/addInLeaf"));
const replaceInLeaf_1 = __importDefault(require("./methods/tree/replaceInLeaf"));
const createLeaf_1 = __importDefault(require("./methods/tree/createLeaf"));
const splitLeaf_1 = __importDefault(require("./methods/tree/splitLeaf"));
const getRightInLeaf_1 = __importDefault(require("./methods/tree/getRightInLeaf"));
const getLeftInLeaf_1 = __importDefault(require("./methods/tree/getLeftInLeaf"));
const findInLeaf_1 = __importDefault(require("./methods/tree/findInLeaf"));
const getAllInLeaf_1 = __importDefault(require("./methods/tree/getAllInLeaf"));
const removeInLeaf_1 = require("./methods/tree/removeInLeaf");
const saveDatabase_1 = __importDefault(require("../common/data/saveDatabase"));
const loadDatabase_1 = __importDefault(require("../common/data/loadDatabase"));
const insertSortedInLeaf_1 = __importDefault(require("./methods/insertSortedInLeaf"));
const openLeafData_1 = __importDefault(require("./methods/openLeafData"));
const saveLeafData_1 = __importDefault(require("./methods/saveLeafData"));
const parseLeafs_1 = require("../common/data/parseLeafs");
class FsAdapter {
    constructor(props) {
        this.isReady = false;
        parseLeafs_1.parseLeafs.call(this, props);
        parseLeafs_1.parseDataStore.call(this, props);
    }
    async initWith(tree) {
        return parseLeafs_1.initWith.call(this, tree);
    }
    async addInLeaf(leafName, identifier, value) {
        return addInLeaf_1.default.call(this, leafName, identifier, value);
    }
    async createLeaf(leafId) {
        return createLeaf_1.default.call(this, leafId);
    }
    async findInLeaf(leafId, value, op = '$eq') {
        return findInLeaf_1.default.call(this, leafId, value, op);
    }
    async getAllInLeaf(leafId) {
        return getAllInLeaf_1.default.call(this, leafId);
    }
    async getLeftInLeaf(leafId) {
        return getLeftInLeaf_1.default.call(this, leafId);
    }
    async getRightInLeaf(leadId) {
        return getRightInLeaf_1.default.call(this, leadId);
    }
    async getDocument(identifier) {
        return getDocument_1.default.call(this, identifier);
    }
    async insertSortedInLeaf(leafId, value) {
        return insertSortedInLeaf_1.default.call(this, leafId, value);
    }
    async loadDatabase() {
        return loadDatabase_1.default.call(this);
    }
    async openLeaf(leafName) {
        return openLeaf_1.default.call(this, leafName);
    }
    async removeDocument(identifier) {
        return removeDocument_1.default.call(this, identifier);
    }
    async openLeafData(leafName) {
        return openLeafData_1.default.call(this, leafName);
    }
    async replaceDocument(doc) {
        return replaceDocument_1.default.call(this, doc);
    }
    async replaceInLeaf(leafId, identifier, value) {
        return replaceInLeaf_1.default.call(this, leafId, identifier, value);
    }
    async saveDatabase() {
        return saveDatabase_1.default.call(this);
    }
    async saveDocument(doc) {
        return saveDocument_1.default.call(this, doc);
    }
    async saveLeafData(leafName, data) {
        return saveLeafData_1.default.call(this, leafName, data);
    }
    async splitLeaf(sourceLeaf, siblingLeaf) {
        return splitLeaf_1.default.call(this, sourceLeaf, siblingLeaf);
    }
    async removeInLeaf(leafId, identifier) {
        return removeInLeaf_1.removeInLeaf.call(this, leafId, identifier);
    }
}
exports.default = FsAdapter;
//# sourceMappingURL=FsAdapter.js.map