import FsAdapter from '../FsAdapter';

export default async function openDocument(this:FsAdapter, identifer) {
  const job = await this.queue.add('File.read', `${this.path}/d/${identifer}.json`).execution();
  let data = {};
  if (!(job.result instanceof Error)) {
    data = job.result;
  }
  return data;
};
