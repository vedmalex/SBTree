import {generateFieldTreeId} from '../../utils/crypto';
import { SBFRoot } from '../SBFRoot/SBFRoot';
import { MemoryAdapter } from '../../adapters/MemoryAdapter/MemoryAdapter';
import FsAdapter from '../../adapters/FsAdapter/FsAdapter';
import { createRoot } from './methods/createRoot';
import { find } from './methods/find';
import { get } from './methods/get';
import { insert } from './methods/insert';
import { remove } from './methods/remove';
import { replace } from './methods/replace';
import { toJSON } from './methods/toJSON';
import { SBFTreeOptions } from './SBFTreeOptions';

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

  createRoot(root = null){
    return (createRoot.call(this,root) as ReturnType<typeof createRoot>)
  }

async find(value, operator){
  return (find.call(this,value, operator) as ReturnType<typeof find>)
}

async  get(identifier) {
  return (get.call(this,identifier) as ReturnType<typeof get>)
}

async insert(identifier, value){
  return (insert.call(this,identifier, value) as ReturnType<typeof insert>)
}
async  remove(remCmd){
  return (remove.call(this,remCmd) as ReturnType<typeof remove>)
}
async  replace(identifier, value){
  return (replace.call(this,identifier, value) as ReturnType<typeof replace>)
}
toJSON(){
  return (toJSON.call(this) as ReturnType<typeof toJSON>)
}
};

