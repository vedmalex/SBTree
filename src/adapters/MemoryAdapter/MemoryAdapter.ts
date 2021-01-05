
import {EventEmitter} from 'events';
import { EventListeners } from '../common/EventListeners';
import { parseLeafs } from './methods/parseLeafs';
import { MemoryAdapterOptions } from './MemoryAdapterOptions';
import { MemoryAdapterLeafs } from './MemoryAdapterLeafs';
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

export type MemoryAdapterDocuments = unknown
export class MemoryAdapter extends Emittable{
  public leafs:MemoryAdapterLeafs;
  public documents: MemoryAdapterDocuments
  public isReady: boolean = true;
  public get name() { return 'MemoryAdapter';};

  // TODO: fix when will user interfaces for
  public attachParent: false

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

removeDocument(identifier) {
  return (removeDocument.call(this, identifier) as ReturnType<typeof removeDocument>)
}

removeInLeaf(leafId, identifier) {
  return (removeInLeaf.call(this, leafId, identifier) as ReturnType<typeof removeInLeaf>)
}

replaceDocument(doc) {
  return (replaceDocument.call(this,doc) as ReturnType<typeof replaceDocument>)
}

replaceInLeaf(leafId, identifier, value) {
  return (replaceInLeaf.call(this, leafId, identifier, value) as ReturnType<typeof replaceInLeaf>)
}

saveDocument(doc) {
  return (saveDocument.call(this, doc) as ReturnType<typeof saveDocument>)
}

async splitLeaf(sourceLeaf, siblingLeaf) {
  return (splitLeaf.call(this, sourceLeaf, siblingLeaf) as ReturnType<typeof splitLeaf>)
};

}

