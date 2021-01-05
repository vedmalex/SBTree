import FsAdapter from '../../FsAdapter';

export default async function saveDocument(this:FsAdapter, doc) {
  if (!doc || !doc._id) {
    console.error(doc);
    throw new Error('Cannot save document, expected id');
  }
  await this.queue.add('File.create', `${this.path}/d/${doc._id}.json`, doc).execution();
};
