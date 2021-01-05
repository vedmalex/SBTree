import { SBFRoot } from '../SBFRoot';
import { OperationResult } from '../../common/OperationResult';

export async function findGreaterThan(this: SBFRoot, key, includeKey = false) {
  const result:OperationResult = { identifiers: [], keys: [] };
  const { children, identifiers, keys } = this;
  // We first see where our key is located;
  let leafIndex = 0;

  keys.forEach((_key) => {
    if (key <= _key)
      return;
    leafIndex++;
  });

  const p = [];

  if (children.length === 0) {
    if (identifiers[leafIndex]) {
      keys.slice(leafIndex).forEach((_key, i) => {
        if (_key >= key) {
          if (_key === key && !includeKey) {
            return;
          }
          result.identifiers.push(identifiers[leafIndex + i]);
          result.keys.push(_key);
        }
      });
    }
  } else {
    // first, we lookup for all greater than matches in the actual leaf where we had our el.
    p.push(children[leafIndex].findGreaterThan(key, includeKey));

    // If our key is in the keys, then right item will contains our key and it's superior elements
    // We need this extra step first
    let start = leafIndex + 1;
    if (keys.includes(key)) {
      p.push(children[start].findGreaterThan(key, includeKey));
      start += 1;
    }

    // All bigger leaf that our leafIndex needs to be included
    if (leafIndex < children.length - 1) {
      children.slice(start).forEach((child) => {
        p.push(child.getAll());
      });
    }

    await Promise.all(p).then((res) => {
      res.forEach((p) => {
        result.identifiers.push(...p.identifiers);
        result.keys.push(...p.keys);
      });
    });
  }

  return result;
}
