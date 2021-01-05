import FsAdapter from '../FsAdapter';

//TODO : Optimization possible by just removing the LeafMeta from memory for disk instead, but existance search will be slower.
//TODO : LRU Cache
export async function removeInLeaf(this: FsAdapter, leafId, identifier) {
  const identifiers = [];
  if (!this.leafs[leafId]) {
    throw new Error('Trying to remove in unknown leaf id');
  }
  const { meta } = this.leafs[leafId];
  const data = await this.openLeafData(leafId);
  const index = this.leafs[leafId].meta.identifiers.indexOf(identifier);
  if (index >= 0) {
    meta.size -= 1;
    meta.identifiers.splice(index, 1);
    data.keys.splice(index, 1);
    await this.saveLeafData(leafId, data);
    identifiers.push({ identifier, index });
  }

  return identifiers;
}
