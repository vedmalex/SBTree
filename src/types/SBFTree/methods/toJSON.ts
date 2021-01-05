import { SBFTree } from '../SBFTree'

export function toJSON(this: SBFTree) {
  const { fieldName, id, fillFactor, isUnique, verbose, order, root } = this
  return {
    fieldName,
    id,
    fillFactor,
    isUnique,
    verbose,
    order,
    root: root.toJSON(),
  }
}
