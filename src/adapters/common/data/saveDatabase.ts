import cloneDeep from 'lodash.clonedeep'
import { DataStore } from './DataStore'

export default async function saveDatabase(this: DataStore) {
  const leafs = cloneDeep(this.leafs)
  const tree = this.datasource.toJSON()
  const db = {
    leafs,
    tree,
  }
  await this.queue
    .add('File.create', `${this.path}/sbtree.meta.json`, db)
    .execution()
  this.lastSave = Date.now()
}
