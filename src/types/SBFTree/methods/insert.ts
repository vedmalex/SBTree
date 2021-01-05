import { SBFTree } from '../SBFTree'

export async function insert(this: SBFTree, identifier, value) {
  let { root } = this
  if (!root) {
    this.createRoot()
    root = this.root
  }
  if (this.isUnique) {
    const get = await this.find(value, '$eq')
    if (get.identifiers.length > 0) {
      throw new Error(
        `field ${this.fieldName} value ${value} identifier ${identifier} already exist`,
      )
    }
  }
  await root.insert(identifier, value)
}
