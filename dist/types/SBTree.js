"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SBTree = void 0;
const events_1 = require("events");
const adapters_1 = __importStar(require("../adapters"));
const crypto_1 = require("../utils/crypto");
const lodash_foreach_1 = __importDefault(require("lodash.foreach"));
const SBFTree_1 = require("./SBFTree");
const lodash_clonedeep_1 = __importDefault(require("lodash.clonedeep"));
const mongo_objectid_1 = __importDefault(require("mongo-objectid"));
const insert_1 = require("./ops/insert");
const remove_1 = require("./ops/remove");
const query_1 = require("./ops/query");
const get_1 = require("./ops/get");
const replace_1 = require("./ops/replace");
const parseAdapter = (_adapterOpts) => {
    if (!adapters_1.default[_adapterOpts.name]) {
        throw new Error(`Unknown adapter ${_adapterOpts.name}`);
    }
    return new adapters_1.default[_adapterOpts.name](_adapterOpts);
};
const defaultProps = {
    order: 511,
    fillFactor: 0.5,
    verbose: false,
    fieldTrees: {},
    size: 0,
    exclude: [],
    uniques: [],
};
class SBTree {
    constructor(props) {
        this.emitter = new events_1.EventEmitter();
        const self = this;
        this.state = {
            isReady: true
        };
        this.adapter = (props?.adapter) ? parseAdapter(props?.adapter) : new adapters_1.MemoryAdapter();
        if (this.adapter.name !== 'MemoryAdapter') {
            this.state.isReady = false;
            self.adapter.on('ready', () => self.state.isReady = true);
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
    on(event, listener) {
        this.emitter.on(event, listener);
    }
    once(event, listener) {
        this.emitter.once(event, listener);
    }
    emit(event, ...args) {
        return this.emitter.emit(event, ...args);
    }
    getOptions() {
        const { order, fillFactor, verbose } = this;
        return {
            order, fillFactor, verbose
        };
    }
    async isReady() {
        return new Promise((resolve) => {
            if (this.state.isReady)
                return resolve(true);
            this.once('ready', () => resolve(true));
        });
    }
    setFieldTree(_fieldTreeOpts) {
        const { fieldName } = _fieldTreeOpts;
        if (!fieldName) {
            throw new Error('Expected a fieldName to set a fieldTree');
        }
        if (this.fieldTrees[fieldName]) {
            throw new Error(`Setting on already existing field node ${fieldName}`);
        }
        const { adapter } = this;
        const isUnique = this.uniques.includes(fieldName);
        let isExcluded = this.exclude.includes(fieldName);
        const splittedByDot = fieldName.split('.');
        if (splittedByDot.length > 1 && !isExcluded) {
            isExcluded = this.exclude.includes(splittedByDot[0]);
        }
        if (isExcluded)
            return;
        const fieldTreeOpts = {
            adapter,
            fieldName,
            ...this.getOptions(),
            isUnique,
            id: _fieldTreeOpts.id,
            root: _fieldTreeOpts.root
        };
        const fieldTree = new SBFTree_1.SBFTree(fieldTreeOpts);
        this.fieldTrees[fieldName] = fieldTree;
    }
    async deleteDocuments(query) {
        if (!query || query === {}) {
            throw new Error('Invalid query');
        }
        if (!this.state.isReady) {
            await this.isReady();
        }
        return (await remove_1.remove.call(this, query));
    }
    async findDocuments(params) {
        if (!this.state.isReady) {
            await this.isReady();
        }
        return (await query_1.query.call(this, params));
    }
    getAdapter() {
        return this.adapter;
    }
    ;
    async getDocument(identifier) {
        if (!this.state.isReady) {
            await this.isReady();
        }
        return (await get_1.get.call(this, identifier));
    }
    getFieldTree(fieldName) {
        let isExcluded = this.exclude.includes(fieldName);
        const splittedByDot = fieldName.split('.');
        if (splittedByDot.length > 1 && !isExcluded) {
            isExcluded = this.exclude.includes(splittedByDot[0]);
        }
        if (isExcluded)
            return;
        return this.fieldTrees[fieldName];
    }
    async insertDocuments(documents) {
        if (!this.state.isReady) {
            await this.isReady();
        }
        if (Array.isArray(documents)) {
            let insertedDocumentsResultats = [];
            for (const document of documents) {
                insertedDocumentsResultats.push(...await this.insertDocuments(document));
            }
            return insertedDocumentsResultats;
        }
        const document = lodash_clonedeep_1.default(documents);
        if (!document._id) {
            document._id = new mongo_objectid_1.default().toString();
        }
        await insert_1.insert.call(this, document);
        this.size += 1;
        return [document];
    }
    async replaceDocuments(documents) {
        if (!this.state.isReady) {
            await this.isReady();
        }
        if (Array.isArray(documents)) {
            for (const document of documents) {
                await this.replaceDocuments(document);
            }
            return documents;
        }
        const currentDocument = await this.getDocument(documents._id);
        return ([await replace_1.replace.call(this, currentDocument, documents)]);
    }
    loadState(state) {
        this.order = state.order;
        this.fillFactor = state.fillFactor;
        this.verbose = state.verbose;
        this.id = state.id;
        this.size = state.size;
        this.uniques = state.uniques;
        this.exclude = state.exclude;
        lodash_foreach_1.default(state.fieldTrees, (fieldRoot, _fieldName) => {
            this.setFieldTree({ fieldName: _fieldName, root: fieldRoot });
        });
        return true;
    }
    toJSON() {
        const { order, fillFactor, verbose, id, fieldTrees, uniques, exclude, size, adapter, } = this;
        return JSON.parse(JSON.stringify({
            order,
            fillFactor,
            verbose,
            id,
            fieldTrees,
            uniques,
            exclude,
            size,
            adapter,
        }));
    }
}
exports.SBTree = SBTree;
//# sourceMappingURL=SBTree.js.map