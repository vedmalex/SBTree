import cloneDeep from 'lodash.clonedeep';
import { MemoryAdapter } from '../MemoryAdapter';
import { SiblingsResult } from '../../common/SiblingsResult';

export async function getRightInLeaf(this: MemoryAdapter, leafId) {
  const leaf = this.leafs[leafId];

  const { meta, data } = leaf;
  const { identifiers } = meta;

  const len = identifiers.length;
  const identifier = identifiers[len - 1];
  const key = data.keys[len - 1];

  return cloneDeep({ identifier, key }) as SiblingsResult;
}
