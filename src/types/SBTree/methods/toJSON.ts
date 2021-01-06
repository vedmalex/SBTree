import { SBTree } from '../SBTree'
import { SBFTree } from '../../SBFTree/SBFTree'

export function toJSON(this: SBTree) {
  const {
    order,
    fillFactor,
    verbose,
    id,
    size,
    uniques,
    exclude,
    fieldTrees,
  } = this

  const f = Object.keys(fieldTrees).reduce((res, cur) => {
    res[cur] = fieldTrees[cur].toJSON()
    return res
  }, {}) as { [key: string]: ReturnType<typeof SBFTree.prototype.toJSON> }

  return {
    order,
    fillFactor,
    verbose,
    id,
    size,
    uniques,
    exclude,
    fieldTrees: f,
  }
}
