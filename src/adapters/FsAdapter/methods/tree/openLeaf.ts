import FsAdapter from '../../FsAdapter';

export default async function openLeaf(this:FsAdapter, leafName) {
  if (!this.leafs[leafName]) {
    throw new Error('Leaf do not exist');
  }
  return this.leafs[leafName];
};
