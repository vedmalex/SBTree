import { SBFNode } from '../SBFNode'

export function toJSON(this: SBFNode) {
  const { fieldName, children, type, id, keys } = this
  return {
    id,
    type,
    fieldName,
    keys: [...keys],
    children: children.map((c) => c.toJSON()),
  }
}
