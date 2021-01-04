import { generateLeafId } from '../../utils/crypto';
import { SBFNode } from '../SBFNode/SBFNode';
import { SBFRoot } from '../SBFRoot/SBFRoot';
import { insert } from './methods/insert';
import { find } from './methods/find';
import { getAll } from './methods/getAll';
import { getFillStatus } from './methods/getFillStatus';
import { getLeft } from './methods/getLeft';
import { getRight } from './methods/getRight';
import { findLowerThan } from './methods/findLowerThan';
import { findGreaterThan } from './methods/findGreaterThan';
import { isFillFactorFilled } from './methods/isFillFactorFilled';
import { isFull } from './methods/isFull';
import { mergeWithSiblings } from './methods/mergeWithSiblings';
import { redistribute } from './methods/redistribute';
import { remove } from './methods/remove';
import { replace } from './methods/replace';
import { split } from './methods/split';
import { toJSON } from './methods/toJSON';
import { FillStatus } from '../common/FillStatus';

/**
 * SFBLeaf
 *
 */
export class SBFLeaf {
  private parent: SBFRoot | SBFNode
  public id: string
  public fieldName: string;
  public get type(){return 'leaf';}

  constructor(props){
    if(!props.parent){
      throw new Error(`SFBLeaf initialized without parent reference`)
    }

    this.parent = props.parent;

    this.id = (props.id) ? props.id : generateLeafId();
    this.fieldName = (props.parent.fieldName) ? props.parent.fieldName : null;
  }
  getParent(){
    return this.parent;
  }
  setParent(parent){
    this.parent = parent
  }

async insert(identifier, value) {
  return insert.call(this,identifier, value)
}

async find(value) {
  return find.call(this, value)
};

async  getAll() {
  return getAll.call(this)
};

async getFillStatus():Promise<FillStatus>{
  return getFillStatus.call(this)
}

async  getLeft() {
return getLeft.call(this)
};

async  getRight() {
return getRight.call(this)
};

async  findLowerThan(value, includeKey = false) {
return findLowerThan.call(this, value, includeKey)
};

async findGreaterThan(value, includeKey = false) {
return findGreaterThan.call(this, value, includeKey)
};

async isFillFactorFilled() {
  return isFillFactorFilled.call(this)
}

async isFull() {
return isFull.call(this)
}

async  mergeWithSiblings() {
  return mergeWithSiblings.call(this)
}

async redistribute() {
  return redistribute.call(this)
}

async remove(remCmd) {
  return remove.call(this, remCmd)
}

async replace(identifier, value) {
return replace.call(this,identifier, value)
}

async  split() {
return split.call(this)
}

toJSON(){
  return toJSON.call(this);
}

};
