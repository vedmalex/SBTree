import { SBFLeaf } from '../SBFLeaf'

export async function find(this: SBFLeaf, value) {
  const adapter = this.getParent().getAdapter()
  const res = await adapter.findInLeaf(this.id, value)
  return res
}
