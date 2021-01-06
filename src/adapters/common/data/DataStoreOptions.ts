import { SBTree } from '../../../types/SBTree/SBTree'

export type FsAdapterOptionAutoLoadCallback = () => Promise<void>

export type DataStoreOptions = {
  path: string
  //TODO: Ideally, when false, we keep a set of deferred job that we execute once saveDatabase is called.
  autoSave?: boolean
  autoSaveInterval?: number
  autoLoad?: boolean
  autoLoadCallback?: FsAdapterOptionAutoLoadCallback
  parent?: SBTree
}
