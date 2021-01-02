import  { FSLock } from 'fslockjs';
import {EventEmitter} from 'events';

import LeafMeta from './LeafMeta';
import LeafData from './LeafData';
import { SBTree } from '../types/SBTree';

import attachParent from './methods/attachParent';
import addInLeaf from './methods/addInLeaf';
import createLeaf from './methods/createLeaf';
import findInLeaf from './methods/findInLeaf';
import getAllInLeaf from './methods/getAllInLeaf';
import getLeftInLeaf from './methods/getLeftInLeaf';
import getRightInLeaf from './methods/getRightInLeaf';
import getDocument from './methods/getDocument';
import insertSortedInLeaf from './methods/insertSortedInLeaf';
import loadDatabase from './methods/loadDatabase';
import openDocument from './methods/openDocument';
import openLeaf from './methods/openLeaf';
import removeDocument from './methods/removeDocument';
import openLeafData from './methods/openLeafData';
import replaceDocument from './methods/replaceDocument';
import replaceInLeaf from './methods/replaceInLeaf';
import saveDatabase from './methods/saveDatabase';
import saveDocument from './methods/saveDocument';
import saveLeafData from './methods/saveLeafData';
import splitLeaf from './methods/splitLeaf';
import updateDocument from './methods/updateDocument';

export type FsAdapterOptionAutoLoadCallback = ()=> void;
export type FsAdaptepOptions = {
    path: string,
    //TODO : Ideally, when false, we keep a set of deferred job that we execute once saveDatabase is called.
    autoSave?: boolean,
    autoSaveInterval?: number,
    autoLoad?: boolean,
    autoLoadCallback?: FsAdapterOptionAutoLoadCallback,
    parent?: unknown;
    leafs?: FsAdapterLeafs;
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

// TODO: loadDatabase
export type FsAdapterLeafs = {[leafId: string]: {
    id: LeafId;
    // name: string;
    meta: LeafMeta;
}}

export type FsAdapterLastChange = number;
export type FsAdapterLastSave= number;

export default class FsAdapter {
  private emitter: EventEmitter = new EventEmitter()
  private parent: SBTree;
  public queue: FSLock;
  public leafs:FsAdapterLeafs;
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
    this.leafs = (props?.leafs) ? props.leafs : {};
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

  async attachParent(parent: SBTree) {
    return attachParent.call(this, parent)
  }

  async addInLeaf(leafName, identifier, value) {
    return addInLeaf.call(this, leafName, identifier, value);
  }

  async createLeaf(leafId) {
    return createLeaf.call(this, leafId);
  }

async findInLeaf(leafId, value, op = '$eq'): Promise<{ identifiers:Array<any>; keys:Array<any> }> {
  return findInLeaf.call(this, leafId, value, op);
}

async getAllInLeaf(leafId) {
  return getAllInLeaf.call(this,leafId);
}

async getLeftInLeaf(leafId) {
  return getLeftInLeaf.call(this,leafId)
}
async getRightInLeaf (leadId){
  return getRightInLeaf.call(this,leadId)
}
async getDocument(identifier) {
  return getDocument.call(this,identifier)
}
async insertSortedInLeaf(leafId, value){
  return insertSortedInLeaf.call(this,leafId, value)
}
async loadDatabase (){
  return loadDatabase.call(this,)
}
async openDocument(identifer) {
  return openDocument.call(this,identifer)
}
async openLeaf(leafName){
  return openLeaf.call(this,leafName)
}
async removeDocument(identifier){
  return removeDocument.call(this,identifier)
}
async openLeafData(leafName){
  return openLeafData.call(this,leafName)
}
async replaceDocument(doc){
  return replaceDocument.call(this,doc)
}
async replaceInLeaf(leafId, identifier, value){
  return replaceInLeaf.call(this,leafId, identifier, value)
}
async saveDatabase (){
return saveDatabase.call(this,)
}
async saveDocument(doc){
return saveDocument.call(this,doc)
}
async saveLeafData(leafName:string, data:LeafData){
return saveLeafData.call(this,leafName, data)
}
async splitLeaf(sourceLeaf, siblingLeaf) {
return splitLeaf.call(this,sourceLeaf, siblingLeaf)
}
async updateDocument(_doc){
return updateDocument.call(this,_doc)
}

 async removeInLeaf(leafId, identifier) {
  const identifiers = [];
  if (!this.leafs[leafId]) {
    throw new Error('Trying to remove in unknown leaf id');
  }
  const { meta } = this.leafs[leafId];
  const data = await this.openLeafData(leafId);
  const index = this.leafs[leafId].meta.identifiers.indexOf(identifier);
  if (index >= 0) {
    meta.size -= 1;
    meta.identifiers.splice(index, 1);
    data.keys.splice(index, 1);
    await this.saveLeafData(leafId, data);
    identifiers.push({ identifier, index });
  }

  return identifiers;
}

}

//TODO : Optimization possible by just removing the LeafMeta from memory for disk instead, but existance search will be slower.
//TODO : LRU Cache
