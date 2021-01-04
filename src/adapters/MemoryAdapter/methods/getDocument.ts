import cloneDeep from 'lodash.clonedeep';
import { MemoryAdapter } from '../MemoryAdapter';

export async function getDocument(this: MemoryAdapter, identifier) {
  const doc = this.documents[identifier];
  if (!doc) {
    return null;
  }
  return cloneDeep(doc);
}
