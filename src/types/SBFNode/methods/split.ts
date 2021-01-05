import { SBFNode } from '../SBFNode'

export async function split(this: SBFNode) {
  // console.log('Node - split')
  const midIndex = ~~(this.keys.length / 2)

  const rightKeys = this.keys.splice(midIndex)
  const leftKeys = this.keys.splice(0)

  const midKey = rightKeys.splice(0, 1)[0]

  const rightChildren = this.children.splice(midIndex + 1)
  const leftChildren = this.children.splice(0)

  const parent = this.getParent()

  const right = new SBFNode({ parent })
  right.keys = rightKeys
  right.children = rightChildren
  rightChildren.forEach((child) => {
    child.setParent(right)
  })

  const left = new SBFNode({ parent })
  left.keys = leftKeys
  left.children = leftChildren
  leftChildren.forEach((child) => {
    child.setParent(left)
  })

  const currentChildIndex = parent.children.indexOf(this)
  // Remove current referent
  parent.children.splice(currentChildIndex, 1)
  await parent.attachLeaf(currentChildIndex, left)
  await parent.attachLeaf(currentChildIndex + 1, right)
  await parent.insertReferenceKey(midKey)
}
