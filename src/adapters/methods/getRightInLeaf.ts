import cloneDeep from 'lodash.clonedeep';
import FsAdapter from '../FsAdapter';

export default async function getRightInLeaf(this:FsAdapter, leafId) {
  const { keys } = await this.openLeafData(leafId);
  if (!keys) {
    console.error(`leafId ${leafId} was not present, had to recreate`);
    await this.createLeaf(leafId);
    return this.getLeftInLeaf(leafId);
  }

  const leaf = this.leafs[leafId];
  const len = leaf.meta.identifiers.length;
  const identifier = leaf.meta.identifiers[len - 1];
  const key = keys[len - 1];

  return cloneDeep({ identifier, key });
};
