import autosave from './autosave'
import { SBTree } from '../../../types/SBTree/SBTree'
import { DataStore } from './DataStore'

export default async function attachDataSource(
  this: DataStore,
  source: SBTree,
) {
  this.datasource = source

  if (this.autoLoad) {
    try {
      await this.loadDatabase()
      if (
        this.autoLoadCallback &&
        typeof this.autoLoadCallback === 'function'
      ) {
        await this.autoLoadCallback()
      }
    } catch (e) {
      console.error(e)
      process.exit(1)
    }
  }
  if (this.autoSave === true) {
    autosave(this)
  }
}
