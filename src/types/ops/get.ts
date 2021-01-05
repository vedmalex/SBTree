import cloneDeep from 'lodash.clonedeep'
import { SBTree } from '../SBTree/SBTree'
import { Document } from '../common/Document'

export async function get(this: SBTree, identifier) {
  if (!identifier) throw new Error('Expected an objectid')

  const res = await this.adapter.getDocument(identifier)

  return (cloneDeep(res) || null) as Document
}
