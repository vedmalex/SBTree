import cloneDeep from 'lodash.clonedeep'
import { MemoryAdapter } from '../../MemoryAdapter'
import { OperationResult } from '../../../../types/common/OperationResult'

export async function getAllInLeaf(this: MemoryAdapter, leafId) {
  const leaf = this.leafs[leafId]
  return cloneDeep({
    identifiers: leaf.meta.identifiers,
    keys: leaf.data.keys,
  }) as OperationResult
}
