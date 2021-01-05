import { MemoryAdapter } from '../MemoryAdapter';
import { RemoveInLeafResult } from '../../common/RemoveInLeafResult';

export async function removeInLeaf(this: MemoryAdapter, leafId, identifier) {
  const identifiers: Array<RemoveInLeafResult> = [];
  if (!this.leafs[leafId]) {
    throw new Error('Trying to remove in unknown leaf id');
  }
  const { meta, data } = this.leafs[leafId];
  const index = this.leafs[leafId].meta.identifiers.indexOf(identifier);
  if (index >= 0) {
    meta.size -= 1;
    meta.identifiers.splice(index, 1);
    data.keys.splice(index, 1);
    identifiers.push({ identifier, index });
  }

  return identifiers;
}
