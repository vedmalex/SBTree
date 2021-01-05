import FsAdapter from '../../FsAdapter';

export default async function removeDocument(this:FsAdapter, identifier) {
  if (!identifier) {
    console.error(identifier);
    throw new Error('Cannot remove document, expected id');
  }
  await this.queue.add('File.remove', `${this.path}/d/${identifier}.json`).execution();
}
