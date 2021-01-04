import { greaterThanKeys } from '../../common/ops/greaterThanKeys';
import { lowerThanKeys } from '../../common/ops/lowerThanKeys';
import { MemoryAdapter } from '../MemoryAdapter';

export async function findInLeaf(this: MemoryAdapter, leafId, value, op = '$eq') {
  const leaf = this.leafs[leafId];

  if (!leaf) {
    throw new Error(`Trying to search in non-existing leafId ${leafId}`);
  }
  const result = {
    identifiers: [],
    keys: [],
  };
  const { keys } = leaf.data;
  const { identifiers } = leaf.meta;

  const firstIdx = keys.indexOf(value);
  const lastIdx = keys.lastIndexOf(value);

  const strictMatchingKeysLen = (firstIdx > -1) ? 1 + (lastIdx - firstIdx) : 0;

  switch (op) {
    case '$eq':
      if (!strictMatchingKeysLen) {
        return result;
      }
      // const start = strictMatchingKeys[0];
      // const end = strictMatchingKeys[0] + strictMatchingKeysLen;
      result.identifiers.push(...identifiers.slice(firstIdx, lastIdx + 1));
      result.keys.push(...keys.slice(firstIdx, lastIdx + 1));
      return result;
    // return this.leafs[leafId].meta.identifiers.slice(start, end);
    case '$lte': {
      const lt = await this.findInLeaf(leafId, value, '$lt');
      const eq = await this.findInLeaf(leafId, value, '$eq');
      return {
        identifiers: lt.identifiers.concat(eq.identifiers),
        keys: lt.keys.concat(eq.keys)
      };
    }
    case '$gte': {
      const gt = await this.findInLeaf(leafId, value, '$gt');
      const eq = await this.findInLeaf(leafId, value, '$eq');
      return {
        identifiers: gt.identifiers.concat(eq.identifiers),
        keys: gt.keys.concat(eq.keys)
      };
    }
    case '$lt':
      if (firstIdx > -1) {
        const localIndex = keys.indexOf(value);
        if (localIndex !== 0) {
          result.identifiers.push(...identifiers.slice(0, localIndex));
          result.keys.push(...keys.slice(0, localIndex));
        }
        // return (localIndex===0) ? [] : this.leafs[leafId].meta.identifiers.slice(0, localIndex-1);
      } else {
        const ltKeys = lowerThanKeys(keys, value);
        result.identifiers.push(...identifiers.slice(0, ltKeys.length));
        result.keys.push(...keys.slice(0, ltKeys.length));
        // return this.leafs[leafId].meta.identifiers.slice(0, keys.length);
      }
      return result;
    case '$gt':
      if (firstIdx > -1) {
        const localIndex = keys.indexOf(value);
        if (localIndex !== -1) {
          result.identifiers.push(...identifiers.slice(localIndex + strictMatchingKeysLen));
          result.keys.push(...keys.slice(localIndex + strictMatchingKeysLen));
        }
      } else {
        const gtKeys = greaterThanKeys(keys, value);
        const len = gtKeys.length;
        if (leafId !== 0 && len > 0) {
          result.identifiers.push(...identifiers.slice(-len));
          result.keys.push(...keys.slice(-len));
        }
      }
      return result;
    default:
      throw new Error(`Not supported op ${op}`);
  }
}
