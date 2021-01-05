import cloneDeep from 'lodash.clonedeep';
import ObjectId from 'mongo-objectid';
import { insert } from '../../ops/insert';
import { Document } from '../../common/Document';
import { SBTree } from '../SBTree';

/**
 * Allow to insert of or multiple documents
 *
 * @param documents
 * @returns {Promise<[{documents}]>} - copy of the inserted (mutated with _id) document.
 */
export async function insertDocuments(this: SBTree, documents: Partial<Document> | Partial<Document>[]): Promise<Document[]> {
  // This will wait for SBTree to have isReady = true.
  // When so, it will then perform the insertion.
  if (!this.isReady) {
    await this.onReady();
  }

  if (Array.isArray(documents)) {
    let insertedDocumentsResultats = [];
    for (const document of documents) {
      insertedDocumentsResultats.push(...await this.insertDocuments(document));
    }
    return insertedDocumentsResultats;
  } else {
    const document = cloneDeep(documents);

    if (!document._id) {
      document._id = new ObjectId().toString();
    }
    await (insert.call(this, document) as ReturnType<typeof insert>);

    this.size += 1;

    return [document];
  }
}
