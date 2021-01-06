import { MemoryAdapter } from './MemoryAdapter'
import { DataStore } from '../../adapters/common/data/DataStore'
import { DataStoreOptions } from '../common/data/DataStoreOptions'
import { MemoryAdapterOptions } from '../common/data/MemoryAdapterOptions'
import { FSLock } from 'fslockjs'
import cloneDeep from 'lodash.clonedeep'
import { SBTree } from '../../types/SBTree/SBTree'
import { parseLeafs, parseDocments } from '../common/data/parseLeafs'
import { AdapterLeafs } from '../common/data/AdapterLeafs'
import { AdapterDocuments } from '../common/data/AdapterDocuments'

export type PersisteMemory = {
  leafs: AdapterLeafs
  tree: ReturnType<typeof SBTree.prototype.toJSON>
  documents: AdapterDocuments
}

export class MemoryAdapterWithStore extends MemoryAdapter implements DataStore {
  constructor(props: MemoryAdapterOptions & DataStoreOptions) {
    super(props)
  }
  datasource: SBTree
  queue: FSLock
  async saveDatabase() {
    const leafs = cloneDeep(this.leafs) as typeof MemoryAdapter.prototype.leafs
    const documents = cloneDeep(
      this.documents,
    ) as typeof MemoryAdapter.prototype.documents

    const tree = this.datasource.toJSON()

    const db = {
      leafs,
      tree,
      documents,
    }
    await this.queue
      .add('File.create', `${this.path}/sbtree.meta.json`, db)
      .execution()
    this.lastSave = Date.now()
  }
  async loadDatabase() {
    const job = await this.queue
      .add('File.read', `${this.path}/sbtree.meta.json`)
      .execution()
    if (!job.error) {
      const db = job.result as PersisteMemory
      if (db) {
        if (db.tree) {
          parseLeafs.call(this, db)
          parseDocments.call(this, db)
          await this.datasource.loadState(db.tree)
        }
      }
    }
  }
  autoSave: boolean
  autoLoad: boolean
  autoLoadCallback: () => Promise<void>
  path: string
  lastSave: number
  lastChange: number
  autoSaveInterval: number
  autoLoadForceOverwrite: boolean
}
