import { SBFRoot } from '../SBFRoot'

export async function remove(this: SBFRoot, remCmd) {
  const value = remCmd.query[this.fieldName]
  const { identifiers, keys, children } = this
  let leafIndex = 0
  keys.forEach((_key) => {
    if (value < _key) return
    leafIndex++
  })

  if (!children.length) {
    const item = this.keys[leafIndex - 1]
    if (item !== undefined) {
      keys.splice(leafIndex - 1, 1)
      identifiers.splice(leafIndex - 1, 1)
    }
  }
  const leaf = children[leafIndex]
  if (leaf) {
    await leaf.remove(remCmd)

    // This has been added for the case where previous also contains the same value
    if (children[leafIndex - 1]) {
      await children[leafIndex - 1].remove(remCmd)
    }
  }
}
