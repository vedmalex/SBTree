
import { parseLeafs } from './methods/parseLeafs';
import { MemoryAdapterOptions } from './MemoryAdapterOptions';
import { AdapterLeafs, AdapterLeaf } from './MemoryAdapterLeafs';
import { Emittable } from '../common/Emittable';
import { addInLeaf } from './methods/addInLeaf';
import { createLeaf } from './methods/createLeaf';
import { getAllInLeaf } from './methods/getAllInLeaf';
import { getLeftInLeaf } from './methods/getLeftInLeaf';
import { getRightInLeaf } from './methods/getRightInLeaf';
import { findInLeaf } from './methods/findInLeaf';
import { getDocument } from './methods/getDocument';
import { openLeaf } from './methods/openLeaf';
import { removeDocument } from './methods/removeDocument';
import { replaceInLeaf } from './methods/replaceInLeaf';
import { replaceDocument } from './methods/replaceDocument';
import { saveDocument } from './methods/saveDocument';
import { splitLeaf } from './methods/splitLeaf';
import { removeInLeaf } from './methods/removeInLeaf';
import { Document } from '../../types/common/Document';
import { SBTree } from '../../types/SBTree/SBTree';
import { OperationResult } from '../../types/common/OperationResult';
import { SiblingsResult } from '../common/SiblingsResult';
import { RemoveInLeafResult } from '../common/RemoveInLeafResult';
import { SBFLeaf } from '../../types/SBFLeaf/SBFLeaf';

export type MemoryAdapterDocuments = {[key:string]: Document}
export type PossibleKeys = string | number | boolean;
export type QueryOperations = "$eq"|"$in"|"$nin"|"$gte"|"$lte"|"$gt"|"$lt";
export interface PersistenceAdapter {
  readonly isReady:boolean;
  initWith:(tree: SBTree)=> Promise<boolean>
  // CRUD
  getDocument(identifier: string):Promise<Document>
  removeDocument(identifier: string ):Promise<void>
  replaceDocument(doc: Document):Promise<void>
  saveDocument(doc: Document): Promise<void>
  //
  openLeaf(leafName): Promise<AdapterLeaf>
  addInLeaf(leafName:string, identifier: string, value:PossibleKeys): Promise<number>
  replaceInLeaf(leafId:string, identifier: string, value:PossibleKeys): Promise<number>
  createLeaf(leafName:string): Promise<void>
  splitLeaf(sourceLeaf:SBFLeaf, siblingLeaf:SBFLeaf): Promise<PossibleKeys>
  getRightInLeaf(leafId:string): Promise<SiblingsResult>
  getLeftInLeaf(leafId:string): Promise<SiblingsResult>
  findInLeaf(leafId:string, value: PossibleKeys, op?:QueryOperations): Promise<OperationResult>
  getAllInLeaf(leafId:string):Promise<OperationResult>
  removeInLeaf(leafId, identifier):Promise<Array<RemoveInLeafResult>>
}

export class MemoryAdapter extends Emittable implements PersistenceAdapter{
  public leafs:AdapterLeafs;
  public documents: MemoryAdapterDocuments
  public tree: SBTree
  isReady: boolean = false
  async initWith(tree: SBTree){
    if (!this.isReady) {
      this.tree = tree;
      this.isReady = true;
      return true;
    } else {
      return true
    };
  }

  // TODO: fix when will user interfaces for

  constructor(props?: MemoryAdapterOptions) {
    super()
    this.leafs = (props?.leafs) ? parseLeafs(props.leafs) : {};
    this.documents = (props?.documents) ? props?.documents : {};
  }

  async addInLeaf(leafName, identifier, value) {
    return (addInLeaf.call(this, leafName, identifier, value) as ReturnType<typeof addInLeaf>)
  }

async createLeaf(leafName) {
  return (createLeaf.call(this, leafName) as ReturnType<typeof createLeaf>)
}

async getAllInLeaf(leafId) {
  return (getAllInLeaf.call(this, leafId) as ReturnType<typeof getAllInLeaf>)
}

async getLeftInLeaf(leafId) {
  return (getLeftInLeaf.call(this, leafId) as ReturnType<typeof getLeftInLeaf>)
};

async  getRightInLeaf(leafId) {
  return (getRightInLeaf.call(this,leafId) as ReturnType<typeof getRightInLeaf>)
};

async findInLeaf(leafId, value, op = '$eq') {
  return (findInLeaf.call(this, leafId, value, op = '$eq') as ReturnType<typeof findInLeaf>)
}

async getDocument(identifier) {
  return (getDocument.call(this, identifier) as ReturnType<typeof getDocument>)
}

async openLeaf(leafName) {
  return (openLeaf.call(this,leafName) as ReturnType<typeof openLeaf>)
}

async removeDocument(identifier) {
  return await (removeDocument.call(this, identifier) as ReturnType<typeof removeDocument>)
}

async removeInLeaf(leafId, identifier) {
  return (removeInLeaf.call(this, leafId, identifier) as ReturnType<typeof removeInLeaf>)
}

async replaceDocument(doc) {
  return (await replaceDocument.call(this,doc) as ReturnType<typeof replaceDocument>)
}

replaceInLeaf(leafId, identifier, value) {
  return (replaceInLeaf.call(this, leafId, identifier, value) as ReturnType<typeof replaceInLeaf>)
}

async saveDocument(doc) {
  return (await saveDocument.call(this, doc) as ReturnType<typeof saveDocument>)
}

async splitLeaf(sourceLeaf, siblingLeaf) {
  return (splitLeaf.call(this, sourceLeaf, siblingLeaf) as ReturnType<typeof splitLeaf>)
};

}

