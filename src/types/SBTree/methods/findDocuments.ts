import { query } from '../../ops/query'
import { SBTree } from '../SBTree'

export async function findDocuments(this: SBTree, params) {
  if (!this.isReady) {
    await this.onReady()
  }

  return (await query.call(this, params)) as ReturnType<typeof query>
}
