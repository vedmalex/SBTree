import FsAdapter from '../../FsAdapter'
import LeafData from '../../../common/LeafData'
import LeafMeta from '../../../common/LeafMeta'

export default async function createLeaf(this: FsAdapter, leafId) {
  this.leafs[leafId] = {
    id: leafId,
    meta: new LeafMeta(),
    // TODO: fix why this is that?
    // data: new LeafData(),
  }

  const data = new LeafData()
  await this.saveLeafData(leafId, data)
}
