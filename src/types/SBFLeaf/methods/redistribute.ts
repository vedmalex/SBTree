import { SBFNode } from '../../SBFNode/SBFNode'
import { SBFLeaf } from '../SBFLeaf'

/**
 * Try to balance the leaf in order to get itself to reach fillFactor
 * In order to do that, it will try to borrow siblings (sharing similar parent)
 *
 * @returns {Promise<boolean>}
 */
export async function redistribute(this: SBFLeaf) {
  // console.log('Leaf - redistribute')
  const parent = this.getParent()

  const selfId = this.id
  const selfPos = parent.children.findIndex((el) => el.id === selfId)

  let redistributed = 0

  const siblings: { left?: SBFLeaf | SBFNode; right?: SBFLeaf | SBFNode } = {}

  if (selfPos >= 0) siblings.left = parent.children[selfPos - 1]
  if (parent.children.length > selfPos + 1)
    siblings.right = parent.children[selfPos + 1]

  const borrowFromRight = async () => {
    const rightStatus = await siblings.right.getFillStatus()
    if (
      rightStatus.fillFactorFilled &&
      rightStatus.leafSize > Math.trunc(rightStatus.order / 2)
    ) {
      redistributed += 1
      throw new Error('Missing implementation of actually redistribute')
    } else return false
  }
  const borrowFromLeft = async () => {
    const leftStatus = await siblings.left.getFillStatus()

    if (
      leftStatus.fillFactorFilled &&
      leftStatus.leafSize > Math.trunc(leftStatus.order / 2)
    ) {
      redistributed += 1
      throw new Error('Missing implementation of actually redistribute')
    } else {
      return false
    }
  }

  // We try as much as we can to borrow left first
  if (!siblings.left) {
    try {
      await borrowFromLeft()
    } catch (e) {
      await borrowFromRight()
    }
  } else {
    await borrowFromLeft()
  }

  const hasRedistributed = !!redistributed
  if (!hasRedistributed) {
    throw new Error('Failed to redistribute')
  }
  return hasRedistributed
}
