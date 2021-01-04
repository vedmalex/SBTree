import { insertSorted } from '../../../utils/array';
import { SBFNode } from '../SBFNode';

export async function insertReferenceKey(this: SBFNode, value) {
  if (this.isFull()) {
    await this.split();
  }
  const index = insertSorted(this.keys, value);
  return index;
}
