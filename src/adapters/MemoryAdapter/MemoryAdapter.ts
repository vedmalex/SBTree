
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

export type MemoryAdapterDocuments = unknown

;

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
    return addInLeaf.call(this, leafName, identifier, value)
  }

async createLeaf(leafName) {
  return createLeaf.call(this, leafName)
}

async getAllInLeaf(leafId) {
  return getAllInLeaf.call(this, leafId)
}

async getLeftInLeaf(leafId) {
  return getLeftInLeaf.call(this, leafId)
};

async  getRightInLeaf(leafId) {
  return getRightInLeaf.call(this,leafId)
};

async findInLeaf(leafId, value, op = '$eq') {
  return findInLeaf.call(this, leafId, value, op = '$eq')
}

async getDocument(identifier) {
  return getDocument.call(this, identifier)
}

async openLeaf(leafName) {
  return openLeaf.call(this,leafName)
}

removeDocument(identifier) {
  return removeDocument.call(this, identifier)
}

removeInLeaf(leafId, identifier) {
  return this.removeInLeaf.call(this, leafId, identifier)
}

replaceDocument(doc) {
  return replaceDocument.call(this,doc)
}

replaceInLeaf(leafId, identifier, value) {
  return replaceInLeaf.call(this, leafId, identifier, value)
}

saveDocument(doc) {
  return saveDocument.call(this, doc)
}

async splitLeaf(sourceLeaf, siblingLeaf) {
  return splitLeaf.call(this, sourceLeaf, siblingLeaf)
};

}
