import { SBFLeaf } from '../SBFLeaf';

export async function getAll(this: SBFLeaf) {
  const adapter = this.getParent().getAdapter();
  const res = await adapter.getAllInLeaf(this.id);
  return res;
}
