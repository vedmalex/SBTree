import { MemoryAdapter } from '../../MemoryAdapter'

export async function openLeaf(this: MemoryAdapter, leafName) {
  if (!this.leafs[leafName]) {
    throw new Error('Leaf do not exist')
  }
  return this.leafs[leafName]
}
