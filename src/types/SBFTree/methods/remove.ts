import { SBFTree } from '../SBFTree';

export async function remove(this: SBFTree, remCmd) {
  let { root } = this;
  if (!root) {
    this.createRoot();
    root = this.root;
  }
  await root.remove(remCmd);
}
