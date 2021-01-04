import { SBFNode } from '../SBFNode';

export async function attachLeaf(this: SBFNode, index, leaf) {
  this.children.splice(index, 0, leaf);
}
