import { insertSorted } from '../../../utils/array';
import { MemoryAdapter } from '../MemoryAdapter';

export async function addInLeaf(this: MemoryAdapter, leafName, identifier, value) {
  if (!this.leafs[leafName]) {
    await this.createLeaf(leafName);
  }
  const { meta, data } = this.leafs[leafName];

  if (meta.identifiers.includes(identifier)) {
    // TODO: except unique:false?
    throw new Error(`Identifier ${identifier} already exist`);
  }


  const index = insertSorted(data.keys, value);

  // if(!this.documents[identifier]){
  //   this.documents[identifier] = {_id: identifier}
  // }
  // this.documents[identifier][field] = key;
  meta.size += 1;
  meta.identifiers.splice(index, 0, identifier);
}
