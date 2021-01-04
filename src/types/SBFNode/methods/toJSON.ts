import { SBFNode } from '../SBFNode';

export function toJSON(this: SBFNode) {
  const {
    fieldName,
    children,
    type,
    id,
    // identifiers,
    keys,

  } = this;
  return {
    id,
    type,
    fieldName,
    // identifiers:[...identifiers],
    keys: [...keys],
    children: children.map(c => c.toJSON())
  };
}
