import  {generateRootId} from '../../utils/crypto';

import { SBFLeaf } from '../SBFLeaf/SBFLeaf';
import  { SBFNode } from '../SBFNode/SBFNode';
import { SBFTree } from '../SBFTree/SBFTree';
import { SBTree } from '../SBTree/SBTree';
import { FillStatus } from '../common/FillStatus';
import { parseChildren } from './ops/parseChildren';
import { attachLeaf } from './methods/attachLeaf';
import { find } from './methods/find';
import { getAll } from './methods/getAll';
import { get } from './methods/get';
import { getFillStatus } from './methods/getFillStatus';
import { remove } from './methods/remove';
import { replace } from './methods/replace';
import { insert } from './methods/insert';
import { insertReferenceKey } from './methods/insertReferenceKey';
import { isFull } from './methods/isFull';
import { split } from './methods/split';
import { toJSON } from './methods/toJSON';

/**
 * SBFRoot
 *
 */
export class SBFRoot {
  private tree: SBFTree;
  public get type(){ return 'root'}
  public id: string;
  public fieldName: string;
  public keys: Array<string>
  /**
   * Used when SBFRoot holds value (when size = 0)
   *  */
  public identifiers: Array<string>
  public children: Array<SBFLeaf|SBFNode>
  constructor(props) {
    if (!props.tree) {
      throw new Error(`SBFRoot is initialized without any tree referenced`);
    }
    this.tree = props.tree;
    this.id = (props.id) ? props.id : generateRootId();

    this.fieldName = (props.tree.fieldName) ? props.tree.fieldName : null;

    this.keys = (props.keys) ? props.keys : [];
    // Used when SBFRoot holds value (when size = 0)
    this.identifiers = (props.identifiers) ? props.identifiers : [];

    this.children = (props.children) ? parseChildren(props.children, this) : [];
  }

  getTree() {
    return (this.tree);
  }
getAdapter() {
  return this.getTree().getAdapter();
};

getTreeOptions() {
  return this.getTree().getOptions();
};

async attachLeaf(index, leaf){
  return attachLeaf.call(this,index, leaf)
}
async  find(value, operator = '$eq') {
  return find.call(this,value, operator = '$eq')
}
async  getAll():Promise<{identifiers:Array<string>; keys: Array<string>}>{
  return getAll.call(this)
}
async get(identifier) {
  return get.call(this,identifier)
}
async getFillStatus ():Promise<FillStatus>{
  return getFillStatus.call (this)
}
async remove(remCmd){
  return remove.call(this,remCmd)
}
async replace(identifier, value){
  return replace.call(this,identifier, value)
}
async insert(identifier, value = null){
  return insert.call(this,identifier, value = null)
}
async insertReferenceKey(value) {
  return insertReferenceKey.call(this,value)
}
isFull(){
  return isFull.call(this,)
}
async split(){
  return split.call(this,)
}
toJSON(){
  return toJSON.call(this,)
}

};



