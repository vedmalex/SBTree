import FsAdapter from '../../FsAdapter';
import { PossibleKeys } from "../../../common/PossibleKeys";

export default async function replaceInLeaf(this:FsAdapter, leafId:string, identifier:string , value: PossibleKeys) {
  if (!this.leafs[leafId].meta.identifiers.includes(identifier)) {
    // TODO : except unique:false?
    throw new Error(`Identifier ${identifier} do not exist`);
  }

  const index = this.leafs[leafId].meta.identifiers.indexOf(identifier);
  const data = await this.openLeafData(leafId);
  data.keys[index] = value;
  await this.saveLeafData(leafId, data);
  return index;
}

module.exports = replaceInLeaf;
