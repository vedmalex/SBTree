import { SBFLeaf } from '../SBFLeaf'

export async function insert(this: SBFLeaf, identifier, value) {
  const parent = this.getParent()

  const adapter = parent.getAdapter()
  await adapter.addInLeaf(this.id, identifier, value)
  const isFull = await this.isFull()

  if (isFull) {
    await this.split()
  }
}
