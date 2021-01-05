import { replace } from '../../ops/replace'
import { SBTree } from '../SBTree'

export async function replaceDocuments(this: SBTree, documents) {
  if (!this.isReady) {
    await this.onReady()
  }
  if (Array.isArray(documents)) {
    for (const document of documents) {
      await this.replaceDocuments(document)
    }
    return documents
  }

  const currentDocument = await this.getDocument(documents._id)
  return [
    await (replace.call(this, currentDocument, documents) as ReturnType<
      typeof replace
    >),
  ]
}
