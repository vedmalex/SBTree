import { SBFNode } from '../SBFNode'

export function isFull(this: SBFNode) {
  const tree = this.getTree()
  const { order } = tree
  return this.keys.length >= order
}
