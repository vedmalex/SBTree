"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SBTree = void 0;
const adapters_1 = require("../../adapters");
const crypto_1 = require("../../utils/crypto");
const lodash_foreach_1 = __importDefault(require("lodash.foreach"));
const Emittable_1 = require("../../adapters/common/Emittable");
const parseAdapter_1 = require("./methods/parseAdapter");
const setFieldTree_1 = require("./methods/setFieldTree");
const deleteDocuments_1 = require("./methods/deleteDocuments");
const findDocuments_1 = require("./methods/findDocuments");
const getDocument_1 = require("./methods/getDocument");
const getFieldTree_1 = require("./methods/getFieldTree");
const insertDocuments_1 = require("./methods/insertDocuments");
const replaceDocuments_1 = require("./methods/replaceDocuments");
const loadState_1 = require("./methods/loadState");
const toJSON_1 = require("./methods/toJSON");
const defaultProps = {
    order: 511,
    fillFactor: 0.5,
    verbose: false,
    fieldTrees: {},
    size: 0,
    exclude: [],
    uniques: [],
};
class SBTree extends Emittable_1.Emittable {
    constructor(props) {
        super();
        const self = this;
        this.state = {
            isReady: true
        };
        this.adapter = (props?.adapter) ? parseAdapter_1.parseAdapter(props?.adapter) : new adapters_1.MemoryAdapter();
        if (this.adapter.name !== 'MemoryAdapter') {
            this.state.isReady = false;
            self.adapter.once('ready', () => self.state.isReady = true);
        }
        this.order = (props.order) ? props.order : defaultProps.order;
        this.fillFactor = (props.fillFactor) ? props.fillFactor : defaultProps.fillFactor;
        this.verbose = (props.verbose) ? props.verbose : defaultProps.verbose;
        this.id = (props.id) ? props.id : crypto_1.generateTreeId();
        this.uniques = (props.uniques) ? props.uniques : defaultProps.uniques;
        this.exclude = (props.exclude) ? props.exclude : defaultProps.exclude;
        this.size = (props.size !== undefined) ? props.size : defaultProps.size;
        this.fieldTrees = (props.fieldTrees !== undefined) ? {} : defaultProps.fieldTrees;
        if (props.fieldTrees) {
            lodash_foreach_1.default(props.fieldTrees, (_fieldTree, _fieldTreeName) => {
                this.setFieldTree(_fieldTree);
            });
        }
        if (this.adapter.attachParent) {
            this.adapter.attachParent(this).then(() => {
                this.emit('ready');
            });
        }
        else {
            setTimeout(() => {
                this.emit('ready');
            }, 10);
        }
    }
    getOptions() {
        const { order, fillFactor, verbose } = this;
        return {
            order, fillFactor, verbose
        };
    }
    getAdapter() {
        return this.adapter;
    }
    async isReady() {
        return new Promise((resolve) => {
            if (this.state.isReady)
                return resolve(true);
            this.once('ready', () => resolve(true));
        });
    }
    setFieldTree(_fieldTreeOpts) {
        return setFieldTree_1.setFieldTree.call(this, _fieldTreeOpts);
    }
    async deleteDocuments(query) {
        return deleteDocuments_1.deleteDocuments.call(this, query);
    }
    async findDocuments(params) {
        return findDocuments_1.findDocuments.call(this, params);
    }
    async getDocument(identifier) {
        return getDocument_1.getDocument.call(this, identifier);
    }
    getFieldTree(fieldName) {
        return getFieldTree_1.getFieldTree.call(this, fieldName);
    }
    async insertDocuments(documents) {
        return insertDocuments_1.insertDocuments.call(this, documents);
    }
    async replaceDocuments(documents) {
        return replaceDocuments_1.replaceDocuments.call(this, documents);
    }
    loadState(state) {
        return loadState_1.loadState.call(this, state);
    }
    toJSON() {
        return toJSON_1.toJSON.call(this);
    }
}
exports.SBTree = SBTree;
//# sourceMappingURL=SBTree.js.map