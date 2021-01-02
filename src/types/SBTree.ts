import {EventEmitter} from 'events';
import Adapters, { MemoryAdapter } from '../adapters';
import {generateTreeId} from '../utils/crypto';
import each from 'lodash.foreach';
import { SBFTree, SBFTreeOptions } from './SBFTree';
import cloneDeep from 'lodash.clonedeep';

import ObjectId from 'mongo-objectid';

import {insert}  from './ops/insert';
import {remove}  from './ops/remove';
import {query}  from './ops/query';
import {get}  from './ops/get';
import {replace}  from './ops/replace';
import FsAdapter from '../adapters/FsAdapter';
import { rootCertificates } from 'tls';

export type Document = {
  _id: string;
  [key:string]: any
}

const parseAdapter = (_adapterOpts) =>{
  if(!Adapters[_adapterOpts.name]){
    throw new Error(`Unknown adapter ${_adapterOpts.name}`);
  }
  return new Adapters[_adapterOpts.name](_adapterOpts)
}

const defaultProps = {
  order: 511,
  // FillFactor should not be less than half.
  fillFactor: 0.5,
  verbose:false,
  fieldTrees:{},
  size:0,
  exclude:[],
  uniques:[],
};

export type SBTreeState = {
  isReady: boolean;
}

export type SBTreeOptions = {
  id:string;
  adapter:  MemoryAdapter | FsAdapter;
  order: number;
  fillFactor: number;
  verbose: boolean;
  fieldTrees: {[key:string]:SBFTree};
  size: number;
  exclude: Array<string>;
  uniques: Array<string>;
}

/**
 * SBTree
 *
 */
export class SBTree {
  private emitter = new EventEmitter();

  public state: SBTreeState;
  public adapter: MemoryAdapter | FsAdapter;
  public order: number;
  public fillFactor: number;
  public size: number;
  public exclude: Array<string>;
  public uniques: Array<string>;
  public verbose: boolean;
  public id: string;
  public fieldTrees: {[key:string]:SBFTree}

  constructor(props: Partial<SBTreeOptions>) {
    const self = this;
    this.state = {
      isReady: true
    }
    this.adapter = (props?.adapter) ? parseAdapter(props?.adapter) : new MemoryAdapter();

    if(this.adapter.name !== 'MemoryAdapter'){
      // We will need to sync up first
      this.state.isReady = false;
      self.adapter.on('ready', ()=> self.state.isReady = true);
    }

    this.order= (props.order) ? props.order : defaultProps.order;
    this.fillFactor= (props.fillFactor) ? props.fillFactor : defaultProps.fillFactor;
    this.verbose= (props.verbose) ? props.verbose : defaultProps.verbose;

    this.id = (props.id) ? props.id : generateTreeId();

    this.uniques = (props.uniques) ? props.uniques : defaultProps.uniques;
    this.exclude = (props.exclude) ? props.exclude : defaultProps.exclude;
    this.size = (props.size!==undefined) ? props.size : defaultProps.size;

    this.fieldTrees = (props.fieldTrees!==undefined) ? {} : defaultProps.fieldTrees;
    if(props.fieldTrees){
      each(props.fieldTrees, (_fieldTree, _fieldTreeName)=>{
        this.setFieldTree(_fieldTree);
      })
    }
    if(this.adapter.attachParent){
      this.adapter.attachParent(this).then(()=>{
        this.emit('ready');
      })
    }else{
      setTimeout(()=>{
        this.emit('ready');
      },10)
    }

  }
  on(event: string | symbol, listener: (...args: any[]) => void){
    this.emitter.on(event, listener)
  }
  once(event: string | symbol, listener: (...args: any[]) => void){
    this.emitter.once(event, listener)
  }
  emit(event: string | symbol, ...args: any[]){
    return this.emitter.emit(event, ...args)
  }
  getOptions(){
    const {order, fillFactor, verbose} = this;
    return {
      order, fillFactor, verbose
    }
  }

  async isReady() {
    return new Promise((resolve) => {
      if (this.state.isReady) return resolve(true);
      this.once('ready', () => resolve(true));
    });
  }



/**
 *
 * @param fieldTreeOpts
 * @param fieldTreeOpts.fieldName - mendatory
 * @param fieldTreeOpts.root -
 * @param fieldTreeOpts.* -
 */
setFieldTree(_fieldTreeOpts:{fieldName, id?, root?}) {
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
  if (isExcluded) return;

  const fieldTreeOpts: SBFTreeOptions = {
    adapter,
    fieldName,
    ...this.getOptions(),
    isUnique,
    id: _fieldTreeOpts.id,
    root: _fieldTreeOpts.root
  };

  const fieldTree = new SBFTree(fieldTreeOpts);
  this.fieldTrees[fieldName] = fieldTree;
}

async  deleteDocuments(query) {
  if (!query || query === {}) {
    // this would cause to delete all as we would query all.
    throw new Error('Invalid query');
  }
  if (!this.state.isReady) {
    await this.isReady();
  }

  return (await remove.call(this, query));
}

async findDocuments(params) {
  if (!this.state.isReady) {
    await this.isReady();
  }

  return (await query.call(this, params));
}

 getAdapter() {
  return this.adapter;
};

async getDocument(identifier) {
  if (!this.state.isReady) {
    await this.isReady();
  }

  return (await get.call(this, identifier));
}

 getFieldTree(fieldName) {
  let isExcluded = this.exclude.includes(fieldName);

  const splittedByDot = fieldName.split('.');
  if (splittedByDot.length > 1 && !isExcluded) {
    isExcluded = this.exclude.includes(splittedByDot[0]);
  }
  if (isExcluded) return;

  return this.fieldTrees[fieldName];
}

/**
 * Allow to insert of or multiple documents
 *
 * @param documents
 * @returns {Promise<[{documents}]>} - copy of the inserted (mutated with _id) document.
 */
async insertDocuments(documents: Partial<Document> | Partial<Document>[]): Promise<Document[]>{
  // This will wait for SBTree to have isReady = true.
  // When so, it will then perform the insertion.
  if (!this.state.isReady) {
    await this.isReady();
  }

  if (Array.isArray(documents)) {
    let insertedDocumentsResultats = [];
    for (const document of documents) {
      insertedDocumentsResultats.push(...await this.insertDocuments(document));
    }
    return insertedDocumentsResultats;
  } else {
    const document = cloneDeep(documents);

    if (!document._id) {
      document._id = new ObjectId().toString();
    }
    await insert.call(this, document);

    this.size += 1;

    return [document];
  }
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
  return ([await replace.call(this, currentDocument, documents)]);
}

loadState(state) {
  this.order = state.order;
  this.fillFactor = state.fillFactor;
  this.verbose = state.verbose;

  this.id = state.id;

  this.size = state.size;

  this.uniques = state.uniques;
  this.exclude = state.exclude;

  each(state.fieldTrees, (fieldRoot, _fieldName) => {
    this.setFieldTree({ fieldName: _fieldName, root: fieldRoot });
  });
  return true;
}

toJSON() {
  const {
    order,
    fillFactor,
    verbose,
    id,
    size,
    uniques,
    exclude,
    fieldTrees,
  } = this;

  const f = Object.keys(fieldTrees).reduce((res,cur)=>{
    res[cur] = fieldTrees[cur].toJSON()
    return res;
  },{})

  return JSON.parse(JSON.stringify({
    order,
    fillFactor,
    verbose,
    id,
    size,
    uniques,
    exclude,
    fieldTrees:f,
  }));
}

}

