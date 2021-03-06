import cloneDeep from 'lodash.clonedeep'
import { MemoryAdapter } from '../../MemoryAdapter'
import { SiblingsResult } from '../../../common/SiblingsResult'

export async function getLeftInLeaf(this: MemoryAdapter, leafId) {
  const leaf = this.leafs[leafId]

  const { meta, data } = leaf
  const { identifiers } = meta

  const identifier = identifiers[0]
  const key = data.keys[0]

  return cloneDeep({ identifier, key }) as SiblingsResult
}
