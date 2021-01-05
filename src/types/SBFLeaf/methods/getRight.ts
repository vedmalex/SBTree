import { SBFLeaf } from '../SBFLeaf'

export async function getRight(this: SBFLeaf) {
  const adapter = this.getParent().getAdapter()
  const res = await adapter.getRightInLeaf(this.id)
  return res
}
