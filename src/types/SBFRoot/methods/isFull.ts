import { SBFRoot } from '../SBFRoot';

export function isFull(this: SBFRoot) {
  const tree = this.getTree();
  const { order } = tree;

  return this.keys.length >= order;
}
