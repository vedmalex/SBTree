import { MemoryAdapter } from '../../MemoryAdapter'

export function saveDocument(this: MemoryAdapter, doc) {
  if (!this.documents[doc._id]) {
    this.documents[doc._id] = doc
  }
}
