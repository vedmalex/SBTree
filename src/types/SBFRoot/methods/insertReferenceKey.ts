import { insertSorted } from '../../../utils/array'
import { SBFRoot } from '../SBFRoot'

export async function insertReferenceKey(this: SBFRoot, value) {
  if (this.isFull()) {
    await this.split()
  }
  const index = insertSorted(this.keys, value)
  return index
}
