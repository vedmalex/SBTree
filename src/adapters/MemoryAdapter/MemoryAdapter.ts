// adapter crud
import { getDocument } from './methods/crud/getDocument'
import { removeDocument } from './methods/crud/removeDocument'
import { replaceDocument } from './methods/crud/replaceDocument'
import { saveDocument } from './methods/crud/saveDocument'
// adapter tree
import { openLeaf } from './methods/tree/openLeaf'
import { addInLeaf } from './methods/tree/addInLeaf'
import { replaceInLeaf } from './methods/tree/replaceInLeaf'
import { createLeaf } from './methods/tree/createLeaf'
import { splitLeaf } from './methods/tree/splitLeaf'
import { getRightInLeaf } from './methods/tree/getRightInLeaf'
import { getLeftInLeaf } from './methods/tree/getLeftInLeaf'
import { findInLeaf } from './methods/tree/findInLeaf'
import { getAllInLeaf } from './methods/tree/getAllInLeaf'
import { removeInLeaf } from './methods/tree/removeInLeaf'

import { initWith, parseDocments, parseLeafs } from '../common/data/parseLeafs'

import { MemoryAdapterOptions } from '../common/data/MemoryAdapterOptions'
import { AdapterLeafs } from '../common/data/AdapterLeafs'
import { SBTree } from '../../types/SBTree/SBTree'
import { AdapterDocuments } from '../common/data/AdapterDocuments'
import { PersistenceAdapter } from '../common/PersistenceAdapter'

export interface AdapterLeafStorage {
  isReady: boolean
  leafs: AdapterLeafs
}
export interface AdapterDocumentStorage {
  isReady: boolean
  documents: AdapterDocuments
}
export class MemoryAdapter
  implements PersistenceAdapter, AdapterLeafStorage, AdapterDocumentStorage {
  public leafs: AdapterLeafs
  public documents: AdapterDocuments
  public tree: SBTree
  isReady: boolean = false

  async initWith(tree: SBTree) {
    return initWith.call(this, tree)
  }

  // TODO: fix when will user interfaces for

  constructor(props?: MemoryAdapterOptions) {
    parseLeafs.call(this, props)
    parseDocments.call(this, props)
  }

  async addInLeaf(leafName, identifier, value) {
    return addInLeaf.call(this, leafName, identifier, value) as ReturnType<
      typeof addInLeaf
    >
  }

  async createLeaf(leafName) {
    return createLeaf.call(this, leafName) as ReturnType<typeof createLeaf>
  }

  async getAllInLeaf(leafId) {
    return getAllInLeaf.call(this, leafId) as ReturnType<typeof getAllInLeaf>
  }

  async getLeftInLeaf(leafId) {
    return getLeftInLeaf.call(this, leafId) as ReturnType<typeof getLeftInLeaf>
  }

  async getRightInLeaf(leafId) {
    return getRightInLeaf.call(this, leafId) as ReturnType<
      typeof getRightInLeaf
    >
  }

  async findInLeaf(leafId, value, op = '$eq') {
    return findInLeaf.call(this, leafId, value, op) as ReturnType<
      typeof findInLeaf
    >
  }

  async getDocument(identifier) {
    return getDocument.call(this, identifier) as ReturnType<typeof getDocument>
  }

  async openLeaf(leafName) {
    return openLeaf.call(this, leafName) as ReturnType<typeof openLeaf>
  }

  async removeDocument(identifier) {
    return await (removeDocument.call(this, identifier) as ReturnType<
      typeof removeDocument
    >)
  }

  async removeInLeaf(leafId, identifier) {
    return removeInLeaf.call(this, leafId, identifier) as ReturnType<
      typeof removeInLeaf
    >
  }

  async replaceDocument(doc) {
    return (await replaceDocument.call(this, doc)) as ReturnType<
      typeof replaceDocument
    >
  }

  async replaceInLeaf(leafId, identifier, value) {
    return replaceInLeaf.call(this, leafId, identifier, value) as ReturnType<
      typeof replaceInLeaf
    >
  }

  async saveDocument(doc) {
    return (await saveDocument.call(this, doc)) as ReturnType<
      typeof saveDocument
    >
  }

  async splitLeaf(sourceLeaf, siblingLeaf) {
    return splitLeaf.call(this, sourceLeaf, siblingLeaf) as ReturnType<
      typeof splitLeaf
    >
  }
}
