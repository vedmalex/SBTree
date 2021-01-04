import { SBFRoot } from '../SBFRoot';

export function toJSON(this: SBFRoot) {
  const {
    type,
    id,
    fieldName,
    identifiers,
    keys,
    children,
  } = this;

  return {
    type,
    id,
    fieldName,
    identifiers: [...identifiers],
    keys: [...keys],
    children: children.map(c => c.toJSON())
  };
}
