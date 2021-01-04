import { SBFNode } from '../SBFNode';

export async function remove(this: SBFNode, remCmd) {
  const value = remCmd.query[this.fieldName];

  let leafIndex = 0;
  this.keys.forEach((_key) => {
    if (value < _key)
      return;
    leafIndex++;
  });

  const leaf = this.children[leafIndex];
  if (leaf) {
    await leaf.remove(remCmd);
  }
}
