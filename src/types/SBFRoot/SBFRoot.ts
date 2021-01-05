import  {generateRootId} from '../../utils/crypto';

import { SBFLeaf } from '../SBFLeaf/SBFLeaf';
import  { SBFNode } from '../SBFNode/SBFNode';
import { SBFTree } from '../SBFTree/SBFTree';
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
import { PersistenceAdapter } from "../../adapters/common/PersistenceAdapter";
import { PossibleKeys } from "../../adapters/common/PossibleKeys";
import { OperationResult } from '../common/OperationResult';

export type SBFRootOptions = {
  id?: string;
  tree: SBFTree
  fieldName:string
  keys: Array<PossibleKeys>
  identifiers?: Array<string>
  children?: Array<SBFLeaf|SBFNode>
}


/**
 * SBFRoot
 *
 */
export class SBFRoot {
  private tree: SBFTree;
  public get type(){ return 'root'}
  public id: string;
  public fieldName: string;
  public keys: Array<PossibleKeys>
  /**
   * Used when SBFRoot holds value (when size = 0)
   *  */
  public identifiers: Array<string>
  public children: Array<SBFLeaf|SBFNode>
  constructor(props: SBFRootOptions) {
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
getAdapter(): PersistenceAdapter {
  return this.tree.adapter;
};

getTreeOptions() {
  return this.getTree().getOptions();
};

async attachLeaf(index, leaf){
  return (attachLeaf.call(this,index, leaf) as ReturnType<typeof attachLeaf>)
}
async  find(value, operator = '$eq') {
  return (find.call(this,value, operator) as ReturnType<typeof find>)
}
async  getAll():Promise<OperationResult>{
  return (getAll.call(this) as ReturnType<typeof getAll>)
}
async get(identifier) {
  return (get.call(this,identifier) as ReturnType<typeof get>)
}
async getFillStatus ():Promise<FillStatus>{
  return (getFillStatus.call (this) as ReturnType<typeof getFillStatus>)
}
async remove(remCmd){
  return (remove.call(this,remCmd) as ReturnType<typeof remove>)
}
async replace(identifier, value){
  return (replace.call(this,identifier, value) as ReturnType<typeof replace>)
}
async insert(identifier, value){
  return (insert.call(this,identifier, value) as ReturnType<typeof insert>)
}
async insertReferenceKey(value) {
  return (insertReferenceKey.call(this,value) as ReturnType<typeof insertReferenceKey>)
}
isFull(){
  return (isFull.call(this,) as ReturnType<typeof isFull>)
}
async split(){
  return (split.call(this,) as ReturnType<typeof split>)
}
toJSON(){
  return (toJSON.call(this,) as ReturnType<typeof toJSON>)
}

};



