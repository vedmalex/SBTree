import { SBFRoot } from '../SBFRoot'

export async function insert(this: SBFRoot, identifier, value = null) {
  const { children } = this

  if (['string', 'number', 'boolean', 'object'].includes(typeof value)) {
    if (children.length === 0) {
      const idx = await this.insertReferenceKey(value)
      this.identifiers.splice(idx, 0, identifier)
    } else {
      let leafIndex = 0
      this.keys.forEach((_key) => {
        if (value <= _key) return
        leafIndex++
      })
      const leaf = children[leafIndex]
      await leaf.insert(identifier, value)
    }
  } else {
    throw new Error(`Unexpected insertion of type ${typeof value}`)
  }

  if (this.isFull()) {
    await this.split()
  }
}
