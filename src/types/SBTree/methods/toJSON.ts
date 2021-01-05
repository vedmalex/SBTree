import { SBTree } from '../SBTree'

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
  }, {})

  return JSON.parse(
    JSON.stringify({
      order,
      fillFactor,
      verbose,
      id,
      size,
      uniques,
      exclude,
      fieldTrees: f,
    }),
  )
}
