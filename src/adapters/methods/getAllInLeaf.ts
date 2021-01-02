import cloneDeep from 'lodash.clonedeep';
import FsAdapter from '../FsAdapter';

export default async function getAllInLeaf(this:FsAdapter,leafId) {
  const { keys } = await this.openLeafData(leafId);
  if (!keys) {
    console.error(`leafId ${leafId} was not present, had to recreate`);
    await this.createLeaf(leafId);
    return this.getAllInLeaf(leafId);
  }
  return cloneDeep({ identifiers: this.leafs[leafId].meta.identifiers, keys });
};
