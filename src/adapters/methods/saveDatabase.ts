import cloneDeep from 'lodash.clonedeep';
import FsAdapter from '../FsAdapter';

export default async function saveDatabase(this:FsAdapter) {
  const leafs = cloneDeep(this.leafs);
  const tree = this.getParent().toJSON();
  const db = {
    leafs,
    tree,
  };
  await this.queue.add('File.create', `${this.path}/sbtree.meta.json`, db).execution();
  this.lastSave = Date.now();
};
