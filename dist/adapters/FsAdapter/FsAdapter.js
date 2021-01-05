"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultFsProps = void 0;
const fslockjs_1 = require("fslockjs");
const attachParent_1 = __importDefault(require("./methods/attachParent"));
const addInLeaf_1 = __importDefault(require("./methods/addInLeaf"));
const createLeaf_1 = __importDefault(require("./methods/createLeaf"));
const findInLeaf_1 = __importDefault(require("./methods/findInLeaf"));
const getAllInLeaf_1 = __importDefault(require("./methods/getAllInLeaf"));
const getLeftInLeaf_1 = __importDefault(require("./methods/getLeftInLeaf"));
const getRightInLeaf_1 = __importDefault(require("./methods/getRightInLeaf"));
const getDocument_1 = __importDefault(require("./methods/getDocument"));
const insertSortedInLeaf_1 = __importDefault(require("./methods/insertSortedInLeaf"));
const loadDatabase_1 = __importDefault(require("./methods/loadDatabase"));
const openDocument_1 = __importDefault(require("./methods/openDocument"));
const openLeaf_1 = __importDefault(require("./methods/openLeaf"));
const removeDocument_1 = __importDefault(require("./methods/removeDocument"));
const openLeafData_1 = __importDefault(require("./methods/openLeafData"));
const replaceDocument_1 = __importDefault(require("./methods/replaceDocument"));
const replaceInLeaf_1 = __importDefault(require("./methods/replaceInLeaf"));
const saveDatabase_1 = __importDefault(require("./methods/saveDatabase"));
const saveDocument_1 = __importDefault(require("./methods/saveDocument"));
const saveLeafData_1 = __importDefault(require("./methods/saveLeafData"));
const splitLeaf_1 = __importDefault(require("./methods/splitLeaf"));
const updateDocument_1 = __importDefault(require("./methods/updateDocument"));
const Emittable_1 = require("../common/Emittable");
const removeInLeaf_1 = require("./methods/removeInLeaf");
exports.defaultFsProps = {
    path: '.db',
    autoSave: true,
    autoSaveInterval: 5000,
    autoLoad: true,
    autoLoadCallback: null,
};
class FsAdapter extends Emittable_1.Emittable {
    constructor(props) {
        super();
        if (props?.parent) {
            this.setParent(props.parent);
        }
        this.leafs = (props?.leafs) ? props.leafs : {};
        this.path = (props.path) ? (props.path) : exports.defaultFsProps.path;
        this.autoSave = (props.autoSave !== undefined) ? (props.autoSave) : exports.defaultFsProps.autoSave;
        this.autoSaveInterval = (props.autoSaveInterval !== undefined) ? (props.autoSaveInterval) : exports.defaultFsProps.autoSaveInterval;
        this.autoLoad = (props.autoLoad !== undefined) ? (props.autoLoad) : exports.defaultFsProps.autoLoad;
        this.autoLoadCallback = (props.autoLoadCallback !== undefined) ? (props.autoLoadCallback) : exports.defaultFsProps.autoLoadCallback;
        if (!this.autoLoad && this.autoLoadForceOverwrite === undefined) {
            throw new Error('Not implemented : Overwrite graceful handle. Pass autoLoadForceOverwrite to force.');
        }
        this.lastChange = null;
        this.lastSave = null;
        this.queue = new fslockjs_1.FSLock();
        this.isReady = true;
        if (props.leafs) {
            this.isReady = false;
        }
    }
    get name() { return 'FsAdapter'; }
    ;
    setParent(parent) {
        this.parent = parent;
    }
    getParent() {
        return this.parent;
    }
    async attachParent(parent) {
        return attachParent_1.default.call(this, parent);
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
    async openDocument(identifer) {
        return openDocument_1.default.call(this, identifer);
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
    async updateDocument(_doc) {
        return updateDocument_1.default.call(this, _doc);
    }
    async removeInLeaf(leafId, identifier) {
        return removeInLeaf_1.removeInLeaf.call(this, leafId, identifier);
    }
}
exports.default = FsAdapter;
//# sourceMappingURL=FsAdapter.js.map