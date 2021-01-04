import { SBFNode } from '../SBFNode';

/**
 * Merge the node with it's parent (thus : up).
 * Used mostly from the results of a merge from leafs when it result in emptying parent node keys.
 * Parent node is then called for some mergeUp.
 *
 * @returns {Promise<void>}
 */
export async function mergeUp(this: SBFNode) {
  // console.log('Node - Merge up')
  const parent = this.getParent();
  const { children, id } = this;
  // const
  const selfPos = parent.children.findIndex((el) => el.id === id);
  if (children.length !== 1) {
    throw new Error('We did not tought about resolving this case. '); // todo
  }

  if (parent.children.length === 2 && !(await parent.getFillStatus()).fillFactorFilled) {
    const siblingPos = (selfPos === 1) ? 0 : 1;
    // Our sibling is the other parent child.
    const sibling = parent.children[siblingPos];

    // We bump up keys of our siblings.
    parent.keys.splice(siblingPos, 0, ...(sibling as SBFNode).keys);
    parent.children = [...(sibling as SBFNode).children, ...children];
  } else {
    // parent.children.splice(selfPos, 1, children[0]);
    // console.log(selfPos);
    // console.log(parent.keys);
    // console.log(parent)
    // console.log(this)
    // console.log(await parent.getFillStatus())
    throw new Error('Not implemented : MergingUp');
  }
}
