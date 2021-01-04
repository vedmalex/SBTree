import { SBFNode } from '../SBFNode';

export function getTreeOptions(this: SBFNode) {
  return this.getTree().getOptions();
}
