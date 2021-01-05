import each from 'lodash.foreach'
import LeafData from '../../common/LeafData'
import LeafMeta from '../../common/LeafMeta'

export function parseLeafs(_leafs) {
  const leafs = {}
  each(_leafs, (_leaf, _leafId) => {
    leafs[_leafId] = {
      meta: new LeafMeta(_leaf.meta),
      data: new LeafData(_leaf.data),
    }
  })
  return leafs
}
