import { MemoryAdapter } from '../../MemoryAdapter';

export function removeDocument(this: MemoryAdapter, identifier) {
  if (this.documents[identifier]) {
    delete this.documents[identifier];
  }
}
