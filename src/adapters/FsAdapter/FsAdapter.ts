import  { FSLock } from 'fslockjs';
import {EventEmitter} from 'events';

import LeafData from '../common/LeafData';
import { SBTree } from '../../types/SBTree/SBTree';

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
import { EventListeners } from '../common/EventListeners';
import { FsAdaptepOptions } from './FsAdaptepOptions';
import { FsAdapterOptionAutoLoadCallback } from './FsAdapterOptionAutoLoadCallback';
import { FsAdapterLeafs } from './FsAdapterLeafs';
import { Emittable } from '../common/Emittable';
import { removeInLeaf } from './methods/removeInLeaf';

export const defaultFsProps: FsAdaptepOptions = {
    path: '.db',
    //TODO : Ideally, when false, we keep a set of deferred job that we execute once saveDatabase is called.
    autoSave: true,
    autoSaveInterval: 5000,
    autoLoad: true,
    autoLoadCallback: null,
}

export type LeafId = string
export type FsAdapterLastChange = number;
export type FsAdapterLastSave = number;

export default class FsAdapter extends Emittable{
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
    super();
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

  async attachParent(parent: SBTree) {
    return (attachParent.call(this, parent) as ReturnType<typeof attachParent>)
  }

  async addInLeaf(leafName, identifier, value) {
    return (addInLeaf.call(this, leafName, identifier, value) as ReturnType<typeof addInLeaf>);
  }

  async createLeaf(leafId) {
    return (createLeaf.call(this, leafId) as ReturnType<typeof createLeaf>);
  }

async findInLeaf(leafId, value, op = '$eq'): Promise<{ identifiers:Array<any>; keys:Array<any> }> {
  return (findInLeaf.call(this, leafId, value, op) as ReturnType<typeof findInLeaf>);
}

async getAllInLeaf(leafId) {
  return (getAllInLeaf.call(this,leafId) as ReturnType<typeof getAllInLeaf>);
}

async getLeftInLeaf(leafId) {
  return (getLeftInLeaf.call(this,leafId) as ReturnType<typeof getLeftInLeaf>)
}
async getRightInLeaf (leadId){
  return (getRightInLeaf.call(this,leadId) as ReturnType<typeof getRightInLeaf>)
}
async getDocument(identifier) {
  return (getDocument.call(this,identifier) as ReturnType<typeof getDocument>)
}
async insertSortedInLeaf(leafId, value){
  return (insertSortedInLeaf.call(this,leafId, value) as ReturnType<typeof insertSortedInLeaf>)
}
async loadDatabase (){
  return (loadDatabase.call(this,) as ReturnType<typeof loadDatabase>)
}
async openDocument(identifer) {
  return (openDocument.call(this,identifer) as ReturnType<typeof openDocument>)
}
async openLeaf(leafName){
  return (openLeaf.call(this,leafName) as ReturnType<typeof openLeaf>)
}
async removeDocument(identifier){
  return (removeDocument.call(this,identifier) as ReturnType<typeof removeDocument>)
}
async openLeafData(leafName){
  return (openLeafData.call(this,leafName) as ReturnType<typeof openLeafData>)
}
async replaceDocument(doc){
  return (replaceDocument.call(this,doc) as ReturnType<typeof replaceDocument>)
}
async replaceInLeaf(leafId, identifier, value){
  return (replaceInLeaf.call(this,leafId, identifier, value) as ReturnType<typeof replaceInLeaf>)
}
async saveDatabase (){
return (saveDatabase.call(this,) as ReturnType<typeof saveDatabase>)
}
async saveDocument(doc){
return (saveDocument.call(this,doc) as ReturnType<typeof saveDocument>)
}
async saveLeafData(leafName:string, data:LeafData){
return (saveLeafData.call(this,leafName, data) as ReturnType<typeof saveLeafData>)
}
async splitLeaf(sourceLeaf, siblingLeaf) {
return (splitLeaf.call(this,sourceLeaf, siblingLeaf) as ReturnType<typeof splitLeaf>)
}
async updateDocument(_doc){
return (updateDocument.call(this,_doc) as ReturnType<typeof updateDocument>)
}

async removeInLeaf(leafId, identifier) {
  return (removeInLeaf.call(this, leafId, identifier) as ReturnType<typeof removeInLeaf>)
}

}

