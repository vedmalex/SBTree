import { PossibleKeys } from '../adapters/common/PossibleKeys'
export const comparatorString = function (a: PossibleKeys, b: PossibleKeys) {
  if (typeof a !== 'string') a = String(a)
  if (typeof b !== 'string') b = String(b)
  return a > b ? 1 : a < b ? -1 : 0
}

export const comparatorNum = function (a: number, b: number) {
  return a > b ? 1 : a < b ? -1 : 0
}
