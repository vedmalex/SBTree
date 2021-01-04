import { SBFTree } from '../../SBFTree/SBFTree';
import { SBFTreeOptions } from "../../SBFTree/SBFTreeOptions";
import { SBTree } from '../SBTree';

/**
 *
 * @param fieldTreeOpts
 * @param fieldTreeOpts.fieldName - mendatory
 * @param fieldTreeOpts.root -
 * @param fieldTreeOpts.* -
 */
export function setFieldTree(this: SBTree, _fieldTreeOpts: { fieldName; id?; root?; }) {
  const { fieldName } = _fieldTreeOpts;
  if (!fieldName) {
    throw new Error('Expected a fieldName to set a fieldTree');
  }
  if (this.fieldTrees[fieldName]) {
    throw new Error(`Setting on already existing field node ${fieldName}`);
  }
  const { adapter } = this;

  const isUnique = this.uniques.includes(fieldName);
  let isExcluded = this.exclude.includes(fieldName);
  const splittedByDot = fieldName.split('.');

  if (splittedByDot.length > 1 && !isExcluded) {
    isExcluded = this.exclude.includes(splittedByDot[0]);
  }
  if (isExcluded)
    return;

  const fieldTreeOpts: SBFTreeOptions = {
    adapter,
    fieldName,
    ...this.getOptions(),
    isUnique,
    id: _fieldTreeOpts.id,
    root: _fieldTreeOpts.root
  };

  const fieldTree = new SBFTree(fieldTreeOpts);
  this.fieldTrees[fieldName] = fieldTree;
}
