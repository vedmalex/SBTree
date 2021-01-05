import { SBFTree } from '../SBFTree'

export async function get(this: SBFTree, identifier) {
  return await this.root.get(identifier)
}
