import each from 'lodash.foreach';
import FsAdapter from '../FsAdapter';
import LeafMeta from '../LeafMeta';

export default async function loadDatabase(this:FsAdapter) {
  const job = await this.queue.add('File.read', `${this.path}/sbtree.meta.json`).execution();
 if(!job.error){
   const db = job.result;
   if (db) {
     const {
       leafs,
       tree,
      } = db;

      if (tree) {
        each(leafs, (leaf, leafName) => {
          this.leafs[leafName] = { id: leafName, meta: new LeafMeta(leaf.meta) };
        });

        await this.getParent().loadState(tree);
      }
    }
  }

  this.isReady = true;
};
