import { SBFLeaf } from '../SBFLeaf'

export async function getLeft(this: SBFLeaf) {
  const adapter = this.getParent().getAdapter()
  const res = await adapter.getLeftInLeaf(this.id)
  return res
}
