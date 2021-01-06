import { FSLock } from 'fslockjs'

import LeafData from '../common/LeafData'
import { SBTree } from '../../types/SBTree/SBTree'
// adapter CRUD
import getDocument from './methods/crud/getDocument'
import removeDocument from './methods/crud/removeDocument'
import replaceDocument from './methods/crud/replaceDocument'
import saveDocument from './methods/crud/saveDocument'
// adapter tree operations
import openLeaf from './methods/tree/openLeaf'
import addInLeaf from './methods/tree/addInLeaf'
import replaceInLeaf from './methods/tree/replaceInLeaf'
import createLeaf from './methods/tree/createLeaf'
import splitLeaf from './methods/tree/splitLeaf'
import getRightInLeaf from './methods/tree/getRightInLeaf'
import getLeftInLeaf from './methods/tree/getLeftInLeaf'
import findInLeaf from './methods/tree/findInLeaf'
import getAllInLeaf from './methods/tree/getAllInLeaf'
import { removeInLeaf } from './methods/tree/removeInLeaf'
// datastore
import saveDatabase from '../common/data/saveDatabase'
import loadDatabase from '../common/data/loadDatabase'

// adapter specific
import insertSortedInLeaf from './methods/insertSortedInLeaf'
import openLeafData from './methods/openLeafData'
import saveLeafData from './methods/saveLeafData'
import { FsAdaptepOptions } from '../common/data/FsAdaptepOptions'
import { PersistenceAdapter } from '../common/PersistenceAdapter'
import { AdapterLeafs } from '../common/data/AdapterLeafs'
import { DataStore } from '../common/data/DataStore'
import { FsAdapterOptionAutoLoadCallback } from '../common/data/DataStoreOptions'
import { initWith, parseDataStore, parseLeafs } from '../common/data/parseLeafs'

export type LeafId = string
export type FsAdapterLastChange = number
export type FsAdapterLastSave = number

export default class FsAdapter implements PersistenceAdapter, DataStore {
  public datasource: SBTree
  public queue: FSLock
  public leafs: AdapterLeafs
  public path: string
  public autoSave: boolean
  public autoSaveInterval: number
  public autoLoad: boolean
  public autoLoadCallback: FsAdapterOptionAutoLoadCallback
  public autoLoadForceOverwrite: boolean
  public lastChange: FsAdapterLastChange
  public lastSave: FsAdapterLastSave

  public isReady: boolean = false

  async initWith(tree: SBTree) {
    return initWith.call(this, tree)
  }

  constructor(props?: FsAdaptepOptions) {
    parseLeafs.call(this, props)
    parseDataStore.call(this, props)
  }

  async addInLeaf(leafName, identifier, value) {
    return addInLeaf.call(this, leafName, identifier, value) as ReturnType<
      typeof addInLeaf
    >
  }

  async createLeaf(leafId) {
    return createLeaf.call(this, leafId) as ReturnType<typeof createLeaf>
  }

  async findInLeaf(
    leafId,
    value,
    op = '$eq',
  ): Promise<{ identifiers: Array<any>; keys: Array<any> }> {
    return findInLeaf.call(this, leafId, value, op) as ReturnType<
      typeof findInLeaf
    >
  }

  async getAllInLeaf(leafId) {
    return getAllInLeaf.call(this, leafId) as ReturnType<typeof getAllInLeaf>
  }

  async getLeftInLeaf(leafId) {
    return getLeftInLeaf.call(this, leafId) as ReturnType<typeof getLeftInLeaf>
  }
  async getRightInLeaf(leadId) {
    return getRightInLeaf.call(this, leadId) as ReturnType<
      typeof getRightInLeaf
    >
  }
  async getDocument(identifier) {
    return getDocument.call(this, identifier) as ReturnType<typeof getDocument>
  }
  async insertSortedInLeaf(leafId, value) {
    return insertSortedInLeaf.call(this, leafId, value) as ReturnType<
      typeof insertSortedInLeaf
    >
  }
  async loadDatabase() {
    return loadDatabase.call(this) as ReturnType<typeof loadDatabase>
  }
  async openLeaf(leafName) {
    return openLeaf.call(this, leafName) as ReturnType<typeof openLeaf>
  }
  async removeDocument(identifier) {
    return removeDocument.call(this, identifier) as ReturnType<
      typeof removeDocument
    >
  }
  async openLeafData(leafName) {
    return openLeafData.call(this, leafName) as ReturnType<typeof openLeafData>
  }
  async replaceDocument(doc) {
    return replaceDocument.call(this, doc) as ReturnType<typeof replaceDocument>
  }
  async replaceInLeaf(leafId, identifier, value) {
    return replaceInLeaf.call(this, leafId, identifier, value) as ReturnType<
      typeof replaceInLeaf
    >
  }
  async saveDatabase() {
    return saveDatabase.call(this) as ReturnType<typeof saveDatabase>
  }
  async saveDocument(doc) {
    return saveDocument.call(this, doc) as ReturnType<typeof saveDocument>
  }
  async saveLeafData(leafName: string, data: LeafData) {
    return saveLeafData.call(this, leafName, data) as ReturnType<
      typeof saveLeafData
    >
  }
  async splitLeaf(sourceLeaf, siblingLeaf) {
    return splitLeaf.call(this, sourceLeaf, siblingLeaf) as ReturnType<
      typeof splitLeaf
    >
  }

  async removeInLeaf(leafId, identifier) {
    return removeInLeaf.call(this, leafId, identifier) as ReturnType<
      typeof removeInLeaf
    >
  }
}
