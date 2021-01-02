import cloneDeep from 'lodash.clonedeep';
import FsAdapter from '../FsAdapter';

export default async function getLeftInLeaf(this:FsAdapter, leafId) {
  const { keys } = await this.openLeafData(leafId);
  if (!keys) {
    console.error(`leafId ${leafId} was not present, had to recreate`);
    await this.createLeaf(leafId);
    return this.getLeftInLeaf(leafId);
  }

  const leaf = this.leafs[leafId];
  const identifier = leaf.meta.identifiers[0];
  const key = keys[0];

  return cloneDeep({ identifier, key });
};
