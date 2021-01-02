import {generateFieldTreeId} from '../utils/crypto';
import { SBFRoot } from './SBFRoot';
import { MemoryAdapter } from '../adapters/MemoryAdapter';
import FsAdapter from '../adapters/FsAdapter';

export type SBFTreeOptions = {
  id: string;
  order: number;
  root: SBFRoot;
  fieldName: string;
  fillFactor: number;
  verbose: boolean;
  isUnique: boolean;
  adapter: MemoryAdapter | FsAdapter;
}

  const defaultOpts: Partial<SBFTreeOptions> = {
    order: 511,
    fillFactor: 0.5,
    verbose:false,
    isUnique:false
  }

/**
 * SBFTree
 *
 */
export class SBFTree {
  private adapter: MemoryAdapter | FsAdapter
  public order: number;
  public verbose: boolean;
  public id: string;
  public fillFactor: number;
  public fieldName: string;
  public isUnique: boolean;
  public root: SBFRoot;
  constructor(props:SBFTreeOptions){
    this.id = (props?.id) ? props?.id : generateFieldTreeId();
    this.order= (props.order) ? props.order : defaultOpts.order;
    this.verbose= (props.verbose) ? props.verbose : defaultOpts.verbose;
    this.fillFactor= (props.fillFactor) ? props.fillFactor : defaultOpts.fillFactor;

    if(!props.fieldName){
      throw new Error(`SBFTree expect a fieldName to be initialized`);
    }
    this.fieldName = (props.fieldName) ? props.fieldName : null;
    this.isUnique = (props.isUnique!==undefined) ? props.isUnique : defaultOpts.isUnique;
    if(props.root){
      this.createRoot(props.root)
    }else{
      this.root = null;
    }
    if(!props.adapter){
      throw new Error(`SBFTree expect an adapter to be initialized`);
    }
    this.adapter = props.adapter;
  }

  getAdapter(){
    return this.adapter;
  }

  getOptions(){
    const {order, fillFactor, verbose}= this;
    return {
      order, fillFactor, verbose
    }
  }

  createRoot(root = null) {
  if (this.root) {
    throw new Error('Already existing root.');
  }
  if (root) {
    const _root = (root.root) ? root.root : root;
    _root.tree = this;
    this.root = new SBFRoot(_root);
  } else {
    const { fieldName } = this;
    const keys = (root && root.keys) ? root.keys : null;
    this.root = new SBFRoot({ tree: this, keys, fieldName });
  }
  // const {fieldName} = this;
  // let keys = (root && root.keys) ? root.keys : null;
  // this.root = new SBFRoot({tree:this, keys,fieldName});
  //
  // if(root){
  //   root.root.children.forEach((child)=>{
  //     if(child.type==='leaf'){
  //       this.root.children.push(new SBFLeaf({fieldName,parent:this.root,...child}))
  //     }
  //     if(child.type==='node'){
  //       this.root.children.push(new SBFNode({fieldName,parent:this.root,...child}))
  //     }
  //   })
  // }
};

async find(value, operator) {
  let { root } = this;
  if (!root) {
    this.createRoot();
    root = this.root;
  }
  return await root.find(value, operator);
};

async  get(identifier) {
  return await this.root.get(identifier);
};

async  insert(identifier, value) {
  let { root } = this;
  if (!root) {
    this.createRoot();
    root = this.root;
  }
  if (this.isUnique) {
    const get = await this.find(value, '$eq');
    if (get.identifiers.length > 0) {
      return false;
    }
  }
  await root.insert(identifier, value);
};

async  remove(remCmd) {
  let { root } = this;
  if (!root) {
    this.createRoot();
    root = this.root;
  }
  await root.remove(remCmd);
};

async  replace(identifier, value) {
  let { root } = this;
  if (!root) {
    this.createRoot();
    root = this.root;
  }
  if (this.isUnique) {
    const get = await this.find(value, '$eq');
    if (get.identifiers.length > 0) {
      return false;
    }
  }
  await root.replace(identifier, value);
};

};
