import FsAdapter from '../FsAdapter';

export default async function openLeafData(this:FsAdapter, leafName) {
  const job = await this.queue.add('File.read', `${this.path}/l/${leafName}.json`).execution();
  let data = {};
  if (job.result.constructor.name !== Error.name) {
    data = job.result;
  }
  this.lastChange = Date.now();

  return data;
}