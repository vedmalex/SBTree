import { FillStatus } from '../../common/FillStatus'
import { SBFNode } from '../SBFNode'

export async function getFillStatus(this: SBFNode): Promise<FillStatus> {
  const parent = this.getParent()
  const adapter = parent.getAdapter()
  const { fillFactor, order } = parent.getTreeOptions()
  if (fillFactor < 0.5) {
    throw new Error(
      `FillFactor cannot be less than 0.5. Received ${fillFactor}`,
    )
  }
  const maxKeys = order - 1
  const minKeys = Math.floor(maxKeys * fillFactor)

  try {
    const leaf = await adapter.openLeaf(this.id)
    const { size } = leaf.meta
    return {
      fillFactor,
      order,
      leafSize: size,
      fillFactorFilled: size >= minKeys,
    }
  } catch (e) {
    if (e.message === 'Leaf do not exist') {
      await adapter.createLeaf(this.id)
      return this.getFillStatus()
    }
    throw e
  }
}
