import  { FSLock } from 'fslockjs';
import {EventEmitter} from 'events';
import cloneDeep from 'lodash.clonedeep';
import each from 'lodash.foreach';

import LeafMeta from './LeafMeta';
import LeafData from './LeafData';
import { insertSorted } from '../utils/array';
import { SBTree } from '../types/SBTree';

async function autosave(self:FsAdapter) {
  const next = async (self:FsAdapter) => {
    if ((self.lastChange !== null && self.lastSave === null) || (self.lastChange > self.lastSave)) {
      await self.saveDatabase();
    }
    setTimeout(async () => {
      if (self.autoSave) {
        await next(self);
      }
    }, self.autoSaveInterval);
  };
  await next(self);
};

function getStrictMatchingKeys(arr, val) {
  const indexes = []; let
    i = -1;
  while ((i = arr.indexOf(val, i + 1)) !== -1) {
    indexes.push(i);
  }
  return indexes;
}

function lowerThanKeys(arr, val) {
  return arr.filter((el) => el < val);
}

function greaterThanKeys(arr, val) {
  return arr.filter((el) => el > val);
}

export type FsAdapterOptionAutoLoadCallback = ()=> void;
export type FsAdaptepOptions = {
    path: string,
    //TODO : Ideally, when false, we keep a set of deferred job that we execute once saveDatabase is called.
    autoSave: boolean,
    autoSaveInterval: number,
    autoLoad: boolean,
    autoLoadCallback?: FsAdapterOptionAutoLoadCallback,
    parent?: unknown;
    leafs?: AdapterLeafs;
}

export const defaultFsProps: FsAdaptepOptions = {
    path: '.db',
    //TODO : Ideally, when false, we keep a set of deferred job that we execute once saveDatabase is called.
    autoSave: true,
    autoSaveInterval: 5000,
    autoLoad: true,
    autoLoadCallback: null,
}

export type LeafId = string

// TODO: посмотреть что за структура тут хранится
export type AdapterLeafs = {[leafId: string]: {
    id?: LeafId;
    name?: string;
    meta: LeafMeta;
    data?: LeafData;
}}

export type FsAdapterLastChange = number;
export type FsAdapterLastSave= number;



export default class FsAdapter{
  private emitter: EventEmitter = new EventEmitter()
  private parent: SBTree;
  public queue: FSLock;
  public leafs:AdapterLeafs;
  public path: string;
  public autoSave: boolean;
  public autoSaveInterval: number;
  public autoLoad: boolean;
  public autoLoadCallback: FsAdapterOptionAutoLoadCallback
  public autoLoadForceOverwrite: boolean;
  public isReady: boolean;
  public lastChange:FsAdapterLastChange;
  public lastSave:FsAdapterLastSave;
  public get name() { return 'FsAdapter';};


  constructor(props?:FsAdaptepOptions) {
    if(props?.parent){
      this.setParent(props.parent)
    }
    this.leafs = (props.leafs) ? props.leafs : {};
    this.path= (props.path) ? (props.path) : defaultFsProps.path;
    this.autoSave= (props.autoSave !== undefined) ? (props.autoSave) : defaultFsProps.autoSave;
    this.autoSaveInterval= (props.autoSaveInterval !== undefined) ? (props.autoSaveInterval) : defaultFsProps.autoSaveInterval;
    this.autoLoad= (props.autoLoad !== undefined) ? (props.autoLoad) : defaultFsProps.autoLoad;
    this.autoLoadCallback= (props.autoLoadCallback !== undefined) ? (props.autoLoadCallback) : defaultFsProps.autoLoadCallback;

    if (!this.autoLoad && this.autoLoadForceOverwrite === undefined) {
      throw new Error('Not implemented : Overwrite graceful handle. Pass autoLoadForceOverwrite to force.');
    }
    this.lastChange = null;
    this.lastSave = null;
    this.queue = new FSLock();
    this.isReady = true;
    if(props.leafs){
      this.isReady = false;
    }
  }
  setParent(parent){
    this.parent = parent;
  }
  getParent(){
    return this.parent;
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

  async addInLeaf(leafName, identifier, value) {
  if (!this.leafs[leafName]) {
    await this.createLeaf(leafName);
  }
  if (this.leafs[leafName].meta.identifiers.includes(identifier)) {
    // TODO : except unique:false?
    throw new Error(`Identifier ${identifier} already exist`);
  }
  const index = await this.insertSortedInLeaf(leafName, value);
  this.leafs[leafName].meta.size += 1;
  this.leafs[leafName].meta.identifiers.splice(index, 0, identifier);

  // const doc = {
  //   _id: identifier,
  // };
  // doc[field] = key;
  // await this.updateDocument(doc)
}
async attachParent(parent: SBTree) {
  this.setParent(parent);

  if (this.autoLoad) {
    try {
      await this.loadDatabase();
      if (this.autoLoadCallback && typeof this.autoLoadCallback === 'function') {
        await this.autoLoadCallback();
      }
    } catch (e) {
      console.error(e);
      process.exit(1);
    }
  }
  if (this.autoSave === true) {
    autosave(this);
  }
  this.emit('ready');
}

async createLeaf(leafId) {
  this.leafs[leafId] = {
    id: leafId,
    meta: new LeafMeta(),
  };

  const data = new LeafData();
  await this.saveLeafData(leafId, data);
}

async findInLeaf(leafId, value, op = '$eq') {
  const result = {
    identifiers: [],
    keys: [],
  };
  const { keys } = await this.openLeafData(leafId);
  if (!keys) {
    console.error(`leafId ${leafId} was not present, had to recreate`);
    await this.createLeaf(leafId);
    return this.findInLeaf(leafId, value, op);
  }
  const strictMatchingKeys = getStrictMatchingKeys(keys, value);

  switch (op) {
    case '$eq':
      if (!strictMatchingKeys.length) {
        return [];
      }
      const start = strictMatchingKeys[0];
      const end = strictMatchingKeys[0] + strictMatchingKeys.length;

      result.identifiers.push(...this.leafs[leafId].meta.identifiers.slice(start, end));
      result.keys.push(...keys.slice(start, end));

      return result;
      // return this.leafs[leafName].meta.identifiers.slice(start, end);
    case '$lte':
      let resLte = [];
      resLte = resLte.concat(await this.findInLeaf(leafId, value, '$lt'));
      resLte = resLte.concat(await this.findInLeaf(leafId, value, '$eq'));
      throw new Error('Modification to new format');
      return resLte;
    case '$gte':
      let resGte = [];
      resGte = resGte.concat(await this.findInLeaf(leafId, value, '$eq'));
      resGte = resGte.concat(await this.findInLeaf(leafId, value, '$gt'));
      throw new Error('Modification to new format');
      return resGte;
    case '$lt':
      if (strictMatchingKeys.length) {
        const localIndex = keys.indexOf(value);
        if (localIndex !== 0) {
          result.identifiers.push(...this.leafs[leafId].meta.identifiers.slice(0, localIndex));
          result.keys.push(...keys.slice(0, localIndex));
        }
        // return (localIndex===0) ? [] : this.leafs[leafId].meta.identifiers.slice(0, localIndex);
      } else {
        const ltKeys = lowerThanKeys(keys, value);

        result.identifiers.push(...this.leafs[leafId].meta.identifiers.slice(0, ltKeys.length));
        result.keys.push(...keys.slice(0, ltKeys.length));

        // return this.leafs[leafId].meta.identifiers.slice(0, ltKeys.length);
      }
      return result;
    case '$gt':
      if (strictMatchingKeys.length) {
        const localIndex = keys.indexOf(value);
        if (localIndex !== -1) {
          result.identifiers.push(...this.leafs[leafId].meta.identifiers.slice(localIndex + strictMatchingKeys.length));
          result.keys.push(...keys.slice(localIndex + strictMatchingKeys.length));
        }
      } else {
        const _keys = greaterThanKeys(keys, value);
        const len = (_keys.length <= 0) ? 0 : _keys.length;
        if (leafId !== 0) {
          result.identifiers.push(...this.leafs[leafId].meta.identifiers.slice(-len));
          result.keys.push(...keys.slice(-len));
        }
      }
      return result;
    default:
      throw new Error(`Unsupported operator ${op}`);
  }
}

async  getAllInLeaf(leafId) {
  const { keys } = await this.openLeafData(leafId);
  if (!keys) {
    console.error(`leafId ${leafId} was not present, had to recreate`);
    await this.createLeaf(leafId);
    return this.getAllInLeaf(leafId);
  }
  return cloneDeep({ identifiers: this.leafs[leafId].meta.identifiers, keys });
}

async  getLeftInLeaf(leafId) {
  const { keys } = await this.openLeafData(leafId);
  if (!keys) {
    console.error(`leafId ${leafId} was not present, had to recreate`);
    await this.createLeaf(leafId);
    return this.getLeftInLeaf(leafId);
  }

  const leaf = this.leafs[leafId];
  const identifier = leaf.meta.identifiers[0];
  const key = leaf.data.keys[0];

  return cloneDeep({ identifier, key });
}

async getRightInLeaf(leafId) {
  const { keys } = await this.openLeafData(leafId);
  if (!keys) {
    console.error(`leafId ${leafId} was not present, had to recreate`);
    await this.createLeaf(leafId);
    return this.getLeftInLeaf(leafId);
  }

  const leaf = this.leafs[leafId];
  const len = leaf.meta.identifiers.length;
  const identifier = leaf.meta.identifiers[len - 1];
  const key = leaf.data.keys[len - 1];

  return cloneDeep({ identifier, key });
}

async  getDocument(identifier) {
  return cloneDeep(await this.openDocument(identifier));
}

async  insertSortedInLeaf(leafId, value) {
  const data = await this.openLeafData(leafId);
  if (!data || !data.keys) {
    console.error(`leafId ${leafId} was not present, had to recreate`);
    await this.createLeaf(leafId);
    return this.insertSortedInLeaf(leafId, value);
  }
  const index = insertSorted(data.keys, value);
  await this.saveLeafData(leafId, data);
  return index;
}

async  loadDatabase() {
  const job = await this.queue.add('File.read', `${this.path}/sbtree.meta`);
  await job.execution();
  const db = job.result;
  if (db) {
    const {
      leafs,
      tree,
    } = db;

    if (tree) {
      each(leafs, (leaf, leafName) => {
        this.leafs[leafName] = { name: leafName, meta: new LeafMeta(leaf.meta) };
      });

      await this.getParent().loadState(tree);
    }
  }

  this.isReady = true;
}

async openDocument(identifer) {
  const job = await this.queue.add('File.read', `${this.path}/d/${identifer}.dat`).execution();
  let data = {};
  if (job.result instanceof Error) {
    data = job.result;
  }
  return data;
}

async  openLeaf(leafName) {
  if (!this.leafs[leafName]) {
    throw new Error('Leaf do not exist');
  }
  return this.leafs[leafName];
}

async  removeDocument(identifier) {
  if (!identifier) {
    console.error(identifier);
    throw new Error('Cannot remove document, expected id');
  }
  const job = await this.queue.add('File.remove', `${this.path}/d/${identifier}.dat`);
  await job.execution();
}

async  openLeafData(leafName) {
  const job = await this.queue.add('File.read', `${this.path}/l/${leafName}.dat`).execution();
  let data:LeafData;
  if (job.result instanceof Error) {
    data = job.result;
  }
  this.lastChange = Date.now();

  return data;
}

async  replaceDocument(doc) {
  if (!doc || !doc._id) {
    console.error(doc);
    throw new Error('Cannot replace document, expected id');
  }
  const job = await this.queue.add('File.create', `${this.path}/d/${doc._id}.dat`, doc);
  await job.execution();
}

async  replaceInLeaf(leafId, identifier, value) {
  if (!this.leafs[leafId].meta.identifiers.includes(identifier)) {
    // TODO : except unique:false?
    throw new Error(`Identifier ${identifier} do not exist`);
  }

  const index = this.leafs[leafId].meta.identifiers.indexOf(identifier);
  const data = await this.openLeafData(leafId);
  data.keys[index] = value;
  await this.saveLeafData(leafId, data);
  return index;
}

async saveDatabase() {
  const leafs = cloneDeep(this.leafs);
  const tree = this.getParent().toJSON();
  const db = {
    leafs,
    tree,
  };
  const job = await this.queue.add('File.create', `${this.path}/sbtree.meta`, db);
  await job.execution();
  this.lastSave = Date.now();
}

async  saveDocument(doc) {
  if (!doc || !doc._id) {
    console.error(doc);
    throw new Error('Cannot save document, expected id');
  }
  const job = await this.queue.add('File.create', `${this.path}/d/${doc._id}.dat`, doc);
  await job.execution();
}

async saveLeafData(leafName, data:LeafData) {
  const job = await this.queue.add('File.create', `${this.path}/l/${leafName}.dat`, data).execution();
  let res = {};
  if (!job.result) {
  }
  if (job.result instanceof Error) {
    res = job.result;
  }
  this.lastChange = Date.now();

  return res;
}

async  splitLeaf(sourceLeaf, siblingLeaf) {
  if (!this.leafs[sourceLeaf.id]) {
    throw new Error('Source leaf do not exist');
  }
  const source = this.leafs[sourceLeaf.id];
  const leaf = this.leafs[siblingLeaf.id];
  if (!this.leafs[siblingLeaf.id]) {
    throw new Error('Sibbling leaf do not exist');
  }

  const sibling = await this.openLeafData(siblingLeaf.id);
  const leafData = await this.openLeafData(sourceLeaf.id);

  const midIndex = ~~(leafData.keys.length / 2);
  const rightKeys = leafData.keys.splice(midIndex);
  const rightIdentifiers = source.meta.identifiers.splice(midIndex);
  const midKey = rightKeys.slice(0, 1)[0];

  sibling.keys = rightKeys;

  leaf.meta.size = rightIdentifiers.length;
  leaf.meta.identifiers = rightIdentifiers;
  source.meta.size = source.meta.identifiers.length;

  await this.saveLeafData(sourceLeaf.id, leafData);
  await this.saveLeafData(siblingLeaf.id, sibling);
  return midKey;
}

async  updateDocument(_doc) {
  const job = await this.queue.add('File.appendJSON', `${this.path}/d/${_doc._id}.dat`, _doc).execution();
  let data = {};
  if (job.result instanceof Error) {
    data = job.result;
  }
  this.lastChange = Date.now();

  return data;
}

}
//TODO : Optimization possible by just removing the LeafMeta from memory for disk instead, but existance search will be slower.
//TODO : LRU Cache
