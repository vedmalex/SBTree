import cloneDeep from 'lodash.clonedeep';
import FsAdapter from '../FsAdapter';

export default async function saveDatabase(this:FsAdapter) {
  const leafs = cloneDeep(this.leafs);
  const tree = this.getParent().toJSON();
  const db = {
    leafs,
    tree,
  };
  const job = await this.queue.add('File.create', `${this.path}/sbtree.meta.json`, db);
  await job.execution();
  this.lastSave = Date.now();
};
