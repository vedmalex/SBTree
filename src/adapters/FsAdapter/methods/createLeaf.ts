import FsAdapter from '../FsAdapter';
import LeafData from '../../LeafData';
import LeafMeta from '../../LeafMeta';

export default async function createLeaf(this:FsAdapter,leafId) {
  this.leafs[leafId] = {
    id: leafId,
    meta: new LeafMeta(),
    // TODO: fix why this is that?
    // data: new LeafData(),
  };

  const data = new LeafData();
  await this.saveLeafData(leafId, data);
}
