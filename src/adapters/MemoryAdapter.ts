import each from 'lodash.foreach';
import cloneDeep from 'lodash.clonedeep';

import LeafData from './LeafData';
import LeafMeta from './LeafMeta';
import { insertSorted } from '../utils/array';
import {EventEmitter} from 'events';
import { EventListeners, LeafId } from './FsAdapter';

export type MemoryAdapterLeafs = {[leafId: string]: {
    meta: LeafMeta;
    data: LeafData;
}}

function greaterThanKeys(arr, val) {
  return arr.filter((el) => el > val);
}

function lowerThanKeys(arr, val) {
  return arr.filter((el) => el < val);
}

const parseLeafs = (_leafs) => {
  const leafs = {};
  each(_leafs, (_leaf, _leafId) => {
    leafs[_leafId] = {
      meta: new LeafMeta(_leaf.meta),
      data: new LeafData(_leaf.data),
    };
  });
  return leafs;
};

export type MemoryAdapterOptions = {
  leafs: MemoryAdapterLeafs;
  documents:MemoryAdapterDocuments
}

export type MemoryAdapterDocuments = unknown


export class MemoryAdapter {
  private emitter: EventEmitter = new EventEmitter()
  private listeners: Array<EventListeners> = [];
  public leafs:MemoryAdapterLeafs;
  public documents: MemoryAdapterDocuments
  public isReady: boolean = true;
  public get name() { return 'MemoryAdapter';};

  // TODO: fix when will user interfaces for
  public attachParent: false

  constructor(props?: MemoryAdapterOptions) {
    this.leafs = (props?.leafs) ? parseLeafs(props.leafs) : {};
    this.documents = (props?.documents) ? props?.documents : {};
  }

  on(event: string | symbol, listener: (...args: any[]) => void){
    this.emitter.on(event, listener)
    this.listeners.push({
      event,
      listener,
      type: 'on'
    })
  }
  once(event: string | symbol, listener: (...args: any[]) => void){
    this.emitter.once(event, listener)
    this.listeners.push({
      event,
      listener,
      type: 'once'
    })
  }

  close(){
    this.emit('close');
    setTimeout(()=>{
      this.emitter.removeAllListeners()
    },10)
  }

  emit(event: string | symbol, ...args: any[]){
    return this.emitter.emit(event, ...args)
  }


  async addInLeaf(leafName, identifier, value) {
  if (!this.leafs[leafName]) {
    await this.createLeaf(leafName);
  }
  const { meta, data } = this.leafs[leafName];

  if (meta.identifiers.includes(identifier)) {
    // TODO: except unique:false?
      throw new Error(`Identifier ${identifier} already exist`);
  }

  const index = insertSorted(data.keys, value);

  // if(!this.documents[identifier]){
  //   this.documents[identifier] = {_id: identifier}
  // }
  // this.documents[identifier][field] = key;
  meta.size += 1;
  meta.identifiers.splice(index, 0, identifier);
}

async createLeaf(leafName) {
  if (this.leafs[leafName]) {
    throw new Error(`Leaf ${leafName} already exist.`);
  }
  this.leafs[leafName] = {
    meta: new LeafMeta(),
    data: new LeafData(),
  };
}

async getAllInLeaf(leafId) {
  const leaf = this.leafs[leafId];
  return cloneDeep({ identifiers: leaf.meta.identifiers, keys: leaf.data.keys });
}

async getLeftInLeaf(leafId) {
  const leaf = this.leafs[leafId];

  const { meta, data } = leaf;
  const { identifiers } = meta;

  const identifier = identifiers[0];
  const key = data.keys[0];

  return cloneDeep({ identifier, key });
};

async  getRightInLeaf(leafId) {
  const leaf = this.leafs[leafId];

  const { meta, data } = leaf;
  const { identifiers } = meta;

  const len = identifiers.length;
  const identifier = identifiers[len - 1];
  const key = data.keys[len - 1];

  return cloneDeep({ identifier, key });
};

async findInLeaf(leafId, value, op = '$eq') {
  const leaf = this.leafs[leafId];

  if (!leaf) {
    throw new Error(`Trying to search in non-existing leafId ${leafId}`);
  }
  const result = {
    identifiers: [],
    keys: [],
  };
  const { keys } = leaf.data;
  const { identifiers } = leaf.meta;

  const firstIdx = keys.indexOf(value);
  const lastIdx = keys.lastIndexOf(value);

  const strictMatchingKeysLen = (firstIdx > -1) ? 1 + (lastIdx - firstIdx) : 0;

  switch (op) {
    case '$eq':
      if (!strictMatchingKeysLen) {
        return result;
      }
      // const start = strictMatchingKeys[0];
      // const end = strictMatchingKeys[0] + strictMatchingKeysLen;

      result.identifiers.push(...identifiers.slice(firstIdx, lastIdx + 1));
      result.keys.push(...keys.slice(firstIdx, lastIdx + 1));
      return result;
      // return this.leafs[leafId].meta.identifiers.slice(start, end);
    case '$lte':{
      const lt = await this.findInLeaf(leafId, value, '$lt');
      const eq = await this.findInLeaf(leafId, value, '$eq');
      return {
        identifiers: lt.identifiers.concat(eq.identifiers),
        keys: lt.keys.concat(eq.keys)
      }}
    case '$gte':{
      const gt = await this.findInLeaf(leafId, value, '$gt');
      const eq = await this.findInLeaf(leafId, value, '$eq');
      return {
        identifiers: gt.identifiers.concat(eq.identifiers),
        keys: gt.keys.concat(eq.keys)
      }}
    case '$lt':
      if (firstIdx > -1) {
        const localIndex = keys.indexOf(value);
        if (localIndex !== 0) {
          result.identifiers.push(...identifiers.slice(0, localIndex));
          result.keys.push(...keys.slice(0, localIndex));
        }
        // return (localIndex===0) ? [] : this.leafs[leafId].meta.identifiers.slice(0, localIndex-1);
      } else {
        const ltKeys = lowerThanKeys(keys, value);
        result.identifiers.push(...identifiers.slice(0, ltKeys.length));
        result.keys.push(...keys.slice(0, ltKeys.length));
        // return this.leafs[leafId].meta.identifiers.slice(0, keys.length);
      }
      return result;
    case '$gt':
      if (firstIdx > -1) {
        const localIndex = keys.indexOf(value);
        if (localIndex !== -1) {
          result.identifiers.push(...identifiers.slice(localIndex + strictMatchingKeysLen));
          result.keys.push(...keys.slice(localIndex + strictMatchingKeysLen));
        }
      } else {
        const gtKeys = greaterThanKeys(keys, value);
        const len = gtKeys.length;
        if (leafId !== 0 && len > 0) {
          result.identifiers.push(...identifiers.slice(-len));
          result.keys.push(...keys.slice(-len));
        }
      }
      return result;
    default:
      throw new Error(`Not supported op ${op}`);
  }
}

async getDocument(identifier) {
  const doc = this.documents[identifier];
  if (!doc) {
    return null;
  }
  return cloneDeep(doc);
}

async openLeaf(leafName) {
  if (!this.leafs[leafName]) {
    throw new Error('Leaf do not exist');
  }
  return this.leafs[leafName];
};

removeDocument(identifier) {
  if (this.documents[identifier]) {
    delete this.documents[identifier];
  }
}

removeInLeaf(leafId, identifier) {
  const identifiers = [];
  if (!this.leafs[leafId]) {
    throw new Error('Trying to remove in unknown leaf id');
  }
  const { meta, data } = this.leafs[leafId];
  const index = this.leafs[leafId].meta.identifiers.indexOf(identifier);
  if (index >= 0) {
    meta.size -= 1;
    meta.identifiers.splice(index, 1);
    data.keys.splice(index, 1);
    identifiers.push({ identifier, index });
  }

  return identifiers;
}

replaceDocument(doc) {
  if (!this.documents[doc._id]) {
    this.saveDocument(doc);
  }
  this.documents[doc._id] = doc;
}

replaceInLeaf(leafId, identifier, value) {
  if (!this.leafs[leafId]) {
    throw new Error(`Unexistant leaf id ${leafId}`);
  }
  const { meta, data } = this.leafs[leafId];

  if (!meta.identifiers.includes(identifier)) {
    // TODO : except unique:false?
    throw new Error(`Identifier ${identifier} do not exist`);
  }

  const index = meta.identifiers.indexOf(identifier);
  data.keys[index] = value;
}

saveDocument(doc) {
  if (!this.documents[doc._id]) {
    this.documents[doc._id] = doc;
  }
}

async splitLeaf(sourceLeaf, siblingLeaf) {
  if (!this.leafs[sourceLeaf.id]) {
    throw new Error('Source leaf do not exist');
  }
  const source = this.leafs[sourceLeaf.id];
  const { keys } = source.data;
  const { identifiers } = source.meta;

  const sibling = this.leafs[siblingLeaf.id];

  if (!sibling) {
    throw new Error('Sibbling leaf do not exist');
  }
  const midIndex = ~~(keys.length / 2);

  // console.log(this.leafs,sourceLeaf.name,{source:source.data.keys})
  // console.dir(this, {depth:null});

  const rightKeys = keys.splice(midIndex);
  const rightIdentifiers = identifiers.splice(midIndex);
  const midKey = rightKeys.slice(0, 1)[0];

  sibling.data.keys = rightKeys;
  sibling.meta.size = rightIdentifiers.length;
  sibling.meta.identifiers = rightIdentifiers;

  source.meta.size = identifiers.length;

  return midKey;
};

}
