import FsAdapter from '../../FsAdapter';

export default async function addInLeaf(this:FsAdapter, leafName, identifier, value) {
  if (!this.leafs[leafName]) {
    await this.createLeaf(leafName);
  }
  const { meta } = this.leafs[leafName];
  if (meta.identifiers.includes(identifier)) {
    // TODO: except unique:false?
    throw new Error(`Identifier ${identifier} already exist`);
  }
  const index = await this.insertSortedInLeaf(leafName, value);
  meta.size += 1;
  meta.identifiers.splice(index, 0, identifier);
  return index;
}
