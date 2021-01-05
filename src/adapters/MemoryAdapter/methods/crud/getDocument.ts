import cloneDeep from 'lodash.clonedeep'
import { MemoryAdapter } from '../../MemoryAdapter'
import { Document } from '../../../../types/common/Document'

export async function getDocument(this: MemoryAdapter, identifier: string) {
  const doc = this.documents[identifier] as Document
  if (!doc) {
    return null
  } else {
    return cloneDeep(doc) as Document
  }
}
