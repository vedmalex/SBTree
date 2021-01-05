import { PossibleKeys } from "../PossibleKeys";
export default function getStrictMatchingKeys(arr:Array<PossibleKeys>, val:PossibleKeys) {
  const indexes = []; let
    i = -1;
  while ((i = arr.indexOf(val, i + 1)) !== -1) {
    indexes.push(i);
  }
  return indexes;
}
