import FsAdapter from '../FsAdapter';

export default async function saveDocument(this:FsAdapter, doc) {
  if (!doc || !doc._id) {
    console.error(doc);
    throw new Error('Cannot save document, expected id');
  }
  const job = await this.queue.add('File.create', `${this.path}/d/${doc._id}.json`, doc);
  await job.execution();
};
