import { SBFNode } from '../SBFNode'
import { OperationResult } from '../../common/OperationResult'

export async function findLowerThan(this: SBFNode, value, includeKey = false) {
  const result: OperationResult = { identifiers: [], keys: [] }
  const { children, keys } = this
  let leafIndex = 0
  const p = []
  // It might be a bug that we have no keys, but in this case, we take first child
  if (keys.length === 0 && children.length === 1) {
    p.push(children[0].findLowerThan(value, includeKey))
  } else {
    // Let's find our first match leaf
    keys.forEach((_key) => {
      if (value <= _key) return
      leafIndex++
    })

    // We first look up all smaller value
    children.slice(0, leafIndex).forEach((child) => {
      p.push(child.getAll())
    })

    // And then we lookup in our children
    p.push(children[leafIndex].findLowerThan(value, includeKey))

    // And the next one if it exist (in case we got duplicate same value
    if (children[leafIndex + 1]) {
      p.push(children[leafIndex + 1].findLowerThan(value, includeKey))
    }
  }
  await Promise.all(p).then((res) => {
    res.forEach((p) => {
      result.identifiers.push(...p.identifiers)
      result.keys.push(...p.keys)
    })
  })
  return result
}
