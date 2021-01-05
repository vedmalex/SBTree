import { insertSorted } from '../../../../utils/array';
import { MemoryAdapter } from '../../MemoryAdapter';

export async function addInLeaf(this: MemoryAdapter, leafName, identifier, value) {
  if (!this.leafs[leafName]) {
    await this.createLeaf(leafName);
  }
  const { meta, data } = this.leafs[leafName];
  if (meta.identifiers.includes(identifier)) {
    // TODO: except unique:false?
    throw new Error(`Identifier ${identifier} already exist`);
  }
  const index = insertSorted(data.keys, value);
  meta.size += 1;
  meta.identifiers.splice(index, 0, identifier);
  return index;
}
