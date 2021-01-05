import { SBFTree } from '../SBFTree'

export async function find(this: SBFTree, value, operator) {
  let { root } = this
  if (!root) {
    this.createRoot()
    root = this.root
  }
  return await root.find(value, operator)
}
