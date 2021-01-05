import { SBFNode } from '../../SBFNode/SBFNode'
import { SBFLeaf } from '../SBFLeaf'

export type Siblings = {
  left?: SBFLeaf | SBFNode
  right?: SBFLeaf | SBFNode
  leftStatus?
  rightStatus?
}

export async function mergeWithSiblings(this: SBFLeaf) {
  const parent = this.getParent()

  const selfId = this.id
  const selfPos = parent.children.findIndex((el) => el.id === selfId)
  let hasMerged = false

  const siblings: Siblings = {}

  if (selfPos >= 0) siblings.left = parent.children[selfPos - 1]
  if (parent.children.length > selfPos + 1)
    siblings.right = parent.children[selfPos + 1]

  if (siblings.left) siblings.leftStatus = await siblings.left.getFillStatus()
  if (siblings.right)
    siblings.rightStatus = await siblings.right.getFillStatus()

  if (siblings.right && (selfPos === 0 || !siblings.left)) {
    const rightSib = siblings.right

    const rightSibPos = selfPos + 1
    const { identifiers, keys } = await rightSib.getAll()

    const p = []
    identifiers.forEach((identifier, i) => {
      const key = keys[i]
      p.push(this.insert(identifier, key))
    })
    await Promise.all(p)

    // Kill parent's children
    delete parent.children[rightSibPos]

    // Remove the undefined corpse from the array
    parent.children.splice(rightSibPos, 1)

    //TODO: Repair parent keys FIXME
    // const parentKeys = parent.keys;

    // We remove the children reference in keys
    parent.keys.splice(Math.trunc(selfPos / 2), 1)
    if (parent.keys.length === 0) {
      //   We have no keys, let's merge up.
      await (parent as SBFNode).mergeUp()
    }

    hasMerged = true
  } else if (siblings.left) {
    const leftSib = siblings.left
    const leftSibPos = selfPos - 1
    const { identifiers, keys } = await leftSib.getAll()

    const p = []
    identifiers.forEach((identifier, i) => {
      const key = keys[i]
      p.push(this.insert(identifier, key))
    })
    await Promise.all(p)

    // Kill parent's children
    delete parent.children[leftSibPos]

    // Remove the undefined corpse from the array
    parent.children.splice(leftSibPos, 1)

    // Repair parent keys TODO FIXME
    // const parentKeys = parent.keys;

    // We remove the children reference in keys
    parent.keys.splice(Math.trunc(selfPos / 2), 1)
    if (parent.keys.length === 0) {
      // console.log('====')
      // console.log(parent)
      // throw new Error('Not implemented. Looking for case.')
      // We have no keys, let's merge up.
      await (parent as SBFNode).mergeUp()
      // }
    }
    hasMerged = true
  }

  if (!hasMerged) {
    throw new Error('Failed to merge with siblings')
  }
  return hasMerged
}
