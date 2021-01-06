import each from 'lodash.foreach'
import LeafData from '../LeafData'
import LeafMeta from '../LeafMeta'
import { AdapterLeaf, AdapterLeafs } from './AdapterLeafs'
import { AdapterOptionsLeafs } from './AdapterOptionsLeafs'
import { AdapterOptionsDocuments } from './AdapterOptionsDocuments'
import { DataStore } from '../../../adapters/common/data/DataStore'
import { DataStoreOptions } from './DataStoreOptions'
import { FsAdaptepOptions } from './FsAdaptepOptions'
import {
  AdapterLeafStorage,
  AdapterDocumentStorage,
} from '../../MemoryAdapter/MemoryAdapter'
import attachDataSource from './attachDataSource'
import { FSLock } from 'fslockjs'
import { SBTree } from '../../../types/SBTree/SBTree'

export function parseLeafs(
  this: AdapterLeafStorage,
  props: AdapterOptionsLeafs,
) {
  const leafs: AdapterLeafs = {}
  if (props?.leafs)
    if (props?.leafs) {
      each(props.leafs, (_leaf: AdapterLeaf, _leafId: string) => {
        leafs[_leafId] = {
          meta: new LeafMeta(_leaf.meta),
          data: _leaf.data ? new LeafData(_leaf.data) : undefined,
          id: _leaf.id ? _leaf.id : undefined,
        }
      })
    }
  this.leafs = leafs
}

export function parseDocments(
  this: AdapterDocumentStorage,
  props: AdapterOptionsDocuments,
) {
  this.documents = props?.documents ?? {}
}

export const defaultFsProps: FsAdaptepOptions = {
  path: '.db',
  //TODO : Ideally, when false, we keep a set of deferred job that we execute once saveDatabase is called.
  autoSave: true,
  autoSaveInterval: 5000,
  autoLoad: true,
  autoLoadCallback: null,
}

export async function initWith(this: DataStore, tree: SBTree) {
  await attachDataSource.call(this, tree)
  return true
}

export function parseDataStore(this: DataStore, props: DataStoreOptions) {
  this.path = props.path ? props.path : defaultFsProps.path
  this.autoSave =
    props.autoSave !== undefined ? props.autoSave : defaultFsProps.autoSave
  this.autoSaveInterval =
    props.autoSaveInterval !== undefined
      ? props.autoSaveInterval
      : defaultFsProps.autoSaveInterval
  this.autoLoad =
    props.autoLoad !== undefined ? props.autoLoad : defaultFsProps.autoLoad
  this.autoLoadCallback =
    props.autoLoadCallback !== undefined
      ? props.autoLoadCallback
      : defaultFsProps.autoLoadCallback

  if (!this.autoLoad && this.autoLoadForceOverwrite === undefined) {
    throw new Error(
      'Not implemented : Overwrite graceful handle. Pass autoLoadForceOverwrite to force.',
    )
  }
  this.lastChange = null
  this.lastSave = null
  this.queue = new FSLock()
  if (props?.parent) {
    attachDataSource.call(this, props.parent)
  }
}
