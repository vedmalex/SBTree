import LeafData from '../../common/LeafData';
import LeafMeta from '../../common/LeafMeta';
import { MemoryAdapter } from '../MemoryAdapter';

export async function createLeaf(this: MemoryAdapter, leafName) {
  if (this.leafs[leafName]) {
    throw new Error(`Leaf ${leafName} already exist.`);
  }
  this.leafs[leafName] = {
    meta: new LeafMeta(),
    data: new LeafData(),
  };
}
