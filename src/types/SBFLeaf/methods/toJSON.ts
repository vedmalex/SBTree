import { SBFLeaf } from '../SBFLeaf'

export function toJSON(this: SBFLeaf) {
  const { fieldName, id, type } = this
  return {
    fieldName,
    id,
    type,
  }
}
