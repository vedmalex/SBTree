import { MemoryAdapter } from '../MemoryAdapter';

export function replaceDocument(this: MemoryAdapter, doc) {
  if (!this.documents[doc._id]) {
    this.saveDocument(doc);
  }
  this.documents[doc._id] = doc;
}
