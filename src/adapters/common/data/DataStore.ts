import { FSLock } from 'fslockjs'
import { AdapterLeafs } from '../../MemoryAdapter/MemoryAdapterLeafs'
import { SBTree } from '../../../types/SBTree/SBTree'

export interface DataStore {
  datasource: SBTree
  readonly queue: FSLock
  readonly leafs: AdapterLeafs
  saveDatabase(): Promise<void>
  loadDatabase(): Promise<void>
  readonly autoSave: boolean
  readonly autoLoad: boolean
  readonly autoLoadCallback: () => Promise<void>
  readonly path: string
  lastSave: number
  lastChange: number
  readonly autoSaveInterval: number
}
