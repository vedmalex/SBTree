import FsAdapter from '../../FsAdapter'
import { Document } from '../../../common/data/Document'
export default async function getDocument(this: FsAdapter, identifier) {
  const job = await this.queue
    .add('File.read', `${this.path}/d/${identifier}.json`)
    .execution()
  let data: Document = null
  if (!(job.result instanceof Error)) {
    data = job.result
  }
  return data
}
