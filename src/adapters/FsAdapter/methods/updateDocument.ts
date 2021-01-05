import FsAdapter from '../FsAdapter';

export default async function updateDocument(this:FsAdapter, _doc) {
  const job = await this.queue.add('File.appendJSON', `${this.path}/d/${_doc._id}.json`, _doc).execution();
  let data = {};
  if (!(job.result instanceof Error)) {
    data = job.result;
  }
  this.lastChange = Date.now();

  return data;
};
