import { SBFLeaf } from '../SBFLeaf/SBFLeaf';
import {generateNodeId} from '../../utils/crypto';
import { SBFRoot } from '../SBFRoot/SBFRoot';
import { SBFTree } from '../SBFTree/SBFTree';
import { FillStatus } from '../common/FillStatus';
import { attachLeaf } from './methods/attachLeaf';
import { find } from './methods/find';
import { findLowerThan } from './methods/findLowerThan';
import { findGreaterThan } from './methods/findGreaterThan';
import { getAll } from './methods/getAll';
import { getFillStatus } from './methods/getFillStatus';
import { getTreeOptions } from './methods/getTreeOptions';
import { insert } from './methods/insert';
import { insertReferenceKey } from './methods/insertReferenceKey';
import { isFull } from './methods/isFull';
import { mergeUp } from './methods/mergeUp';
import { remove } from './methods/remove';
import { replace } from './methods/replace';
import { split } from './methods/split';
import { toJSON } from './methods/toJSON';
import { PossibleKeys } from '../../adapters/MemoryAdapter/MemoryAdapter';

/**
 * SBFTree
 *
 */
export class SBFNode {
  private parent: SBFRoot | SBFNode
  public id: string;
  public fieldName: string;
  public keys:Array<PossibleKeys>;
  public children: Array<SBFLeaf|SBFNode>
  public identifiers: Array<string>
  public get type(){ return 'node';}
  constructor(props){
    if(!props.parent){
      throw new Error(`SBFNode initialized without parent reference`)
    }
    this.parent = props.parent;
    this.id = (props.id) ? props.id : generateNodeId();

    this.fieldName = (props.parent.fieldName) ? props.parent.fieldName : null;

    this.keys = (props.keys) ? props.keys : [];

    this.children = [];

    if(props.children){
      props.children.forEach((child)=>{
        if(child.type==='leaf'){
          this.children.push(new SBFLeaf({parent:this,...child}))
        }
        if(child.type==='node'){
          this.children.push(new SBFNode({parent:this,...child}))
        }
      })
    }
  }

  getParent(){
    return this.parent;
  }
  setParent(parent){
    this.parent = parent
  }
  getTree(): SBFTree {
    return (this.parent as SBFRoot).getTree() || (this.parent as SBFNode).getParent().getTree();
  }
  getAdapter() {
  return this.getTree().root.getAdapter();
  };


async  attachLeaf(index, leaf) {
  return (attachLeaf.call(this, index, leaf) as ReturnType<typeof attachLeaf>)
}
async find(value){
  return (find.call(this, value) as ReturnType<typeof find>)
}
async  findLowerThan(value, includeKey = false){
  return (findLowerThan.call(this, value, includeKey) as ReturnType<typeof findLowerThan>)
}
async findGreaterThan(value, includeKey = false){
  return (findGreaterThan.call(this, value, includeKey) as ReturnType<typeof findGreaterThan>)
}
async  getAll(){
  return (getAll.call(this ) as ReturnType<typeof getAll>)
}
async getFillStatus():Promise<FillStatus>{
  return (getFillStatus.call(this) as ReturnType<typeof getFillStatus>)
}
getTreeOptions(){
  return (getTreeOptions.call(this, ) as ReturnType<typeof getTreeOptions>)
}
async insert(identifier, value){
  return (insert.call(this, identifier, value) as ReturnType<typeof insert>)
}
async  insertReferenceKey(value){
  return (insertReferenceKey.call(this, value) as ReturnType<typeof insertReferenceKey>)
}
isFull(){
  return (isFull.call(this, ) as ReturnType<typeof isFull>)
}
async mergeUp  (){
  return (mergeUp.call  (this) as ReturnType<typeof mergeUp>)
}
async remove(remCmd){
  return (remove.call(this, remCmd) as ReturnType<typeof remove>)
}
async replace(identifier, value) {
  return (replace.call(this, identifier, value) as ReturnType<typeof replace>)
}
async split(){
  return (split.call(this, ) as ReturnType<typeof split>)
}
toJSON(){
  return (toJSON.call(this, ) as ReturnType<typeof toJSON>)
}

}

