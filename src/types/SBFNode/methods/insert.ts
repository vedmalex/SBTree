import { SBFLeaf } from '../../SBFLeaf/SBFLeaf';
import { SBFNode } from '../SBFNode';

export async function insert(this: SBFNode, identifier, value) {
  const { children, keys } = this;
  if (!children.length) {
    const leaf = new SBFLeaf({ parent: this });
    await leaf.insert(identifier, value);
    children.push(leaf);
    // this.keys.push(value);
    // throw new Error(`SBFNode cannot insert with no children`);
  }
  let leafIndex = 0;
  keys.forEach((_key) => {
    if (value <= _key)
      return;
    leafIndex++;
  });
  const leaf = children[leafIndex];

  await leaf.insert(identifier, value);

  if (this.isFull()) {
    await this.split();
  }
}
