import { SBFNode } from '../SBFNode';

export async function findGreaterThan(this: SBFNode, value, includeKey = false) {
  const result = { identifiers: [], keys: [] };
  const { children, identifiers, keys } = this;

  let leafIndex = 0;
  const p = [];

  if (children.length === 0) {
    if (identifiers[leafIndex]) {
      keys.slice(leafIndex).forEach((_key, i) => {
        if (_key >= value) {
          if (_key === value && !includeKey) {
            return;
          }
          result.identifiers.push(identifiers[leafIndex + i]);
          result.keys.push(_key);
        }
      });
    }
  } else {
    // It might be a bug that we have no keys, but in this case, we take first child
    if (keys.length === 0 && children.length === 1) {
      p.push(children[0].findLowerThan(value, includeKey));
    } else {
      // Let's find our first match leaf
      keys.forEach((_key) => {
        if (value <= _key)
          return;
        leafIndex++;
      });

      // We lookup in our children
      p.push(children[leafIndex].findGreaterThan(value, includeKey));

      // And all greater value
      children.slice(leafIndex + 1).forEach((child) => {
        p.push(child.getAll());
      });
    }
    await Promise.all(p).then((res) => {
      res.forEach((_el) => {
        result.identifiers.push(..._el.identifiers);
        result.keys.push(..._el.keys);
      });
    });
  }

  return result;
}
