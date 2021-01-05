import { SBFRoot } from '../SBFRoot'

export async function attachLeaf(this: SBFRoot, index, leaf) {
  this.children.splice(index, 0, leaf)
  leaf.setParent(this)
}
