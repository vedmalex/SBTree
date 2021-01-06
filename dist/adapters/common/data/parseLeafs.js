"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseDataStore = exports.initWith = exports.defaultFsProps = exports.parseDocments = exports.parseLeafs = void 0;
const lodash_foreach_1 = __importDefault(require("lodash.foreach"));
const LeafData_1 = __importDefault(require("../LeafData"));
const LeafMeta_1 = __importDefault(require("../LeafMeta"));
const attachDataSource_1 = __importDefault(require("./attachDataSource"));
const fslockjs_1 = require("fslockjs");
function parseLeafs(props) {
    const leafs = {};
    if (props?.leafs)
        if (props?.leafs) {
            lodash_foreach_1.default(props.leafs, (_leaf, _leafId) => {
                leafs[_leafId] = {
                    meta: new LeafMeta_1.default(_leaf.meta),
                    data: _leaf.data ? new LeafData_1.default(_leaf.data) : undefined,
                    id: _leaf.id ? _leaf.id : undefined,
                };
            });
        }
    this.leafs = leafs;
}
exports.parseLeafs = parseLeafs;
function parseDocments(props) {
    this.documents = props?.documents ?? {};
}
exports.parseDocments = parseDocments;
exports.defaultFsProps = {
    path: '.db',
    autoSave: true,
    autoSaveInterval: 5000,
    autoLoad: true,
    autoLoadCallback: null,
};
async function initWith(tree) {
    await attachDataSource_1.default.call(this, tree);
    return true;
}
exports.initWith = initWith;
function parseDataStore(props) {
    this.path = props.path ? props.path : exports.defaultFsProps.path;
    this.autoSave =
        props.autoSave !== undefined ? props.autoSave : exports.defaultFsProps.autoSave;
    this.autoSaveInterval =
        props.autoSaveInterval !== undefined
            ? props.autoSaveInterval
            : exports.defaultFsProps.autoSaveInterval;
    this.autoLoad =
        props.autoLoad !== undefined ? props.autoLoad : exports.defaultFsProps.autoLoad;
    this.autoLoadCallback =
        props.autoLoadCallback !== undefined
            ? props.autoLoadCallback
            : exports.defaultFsProps.autoLoadCallback;
    if (!this.autoLoad && this.autoLoadForceOverwrite === undefined) {
        throw new Error('Not implemented : Overwrite graceful handle. Pass autoLoadForceOverwrite to force.');
    }
    this.lastChange = null;
    this.lastSave = null;
    this.queue = new fslockjs_1.FSLock();
    if (props?.parent) {
        attachDataSource_1.default.call(this, props.parent);
    }
}
exports.parseDataStore = parseDataStore;
//# sourceMappingURL=parseLeafs.js.map