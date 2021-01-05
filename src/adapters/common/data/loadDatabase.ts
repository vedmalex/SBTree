import each from 'lodash.foreach'
import LeafMeta from '../LeafMeta'
import { DataStore } from './DataStore'

export default async function loadDatabase(this: DataStore) {
  const job = await this.queue
    .add('File.read', `${this.path}/sbtree.meta.json`)
    .execution()
  if (!job.error) {
    const db = job.result
    if (db) {
      const { leafs, tree } = db

      if (tree) {
        each(leafs, (leaf, leafName) => {
          this.leafs[leafName] = { id: leafName, meta: new LeafMeta(leaf.meta) }
        })

        await this.datasource.loadState(tree)
      }
    }
  }
}
