import { MemoryAdapter } from '../../adapters';
import {generateTreeId} from '../../utils/crypto';
import each from 'lodash.foreach';
import { SBFTree } from '../SBFTree/SBFTree';

import FsAdapter from '../../adapters/FsAdapter/FsAdapter';
import { Emittable } from '../../adapters/common/Emittable';
import { parseAdapter } from './methods/parseAdapter';
import { SBTreeState } from './SBTreeState';
import { SBTreeOptions } from './SBTreeOptions';
import { setFieldTree } from './methods/setFieldTree';
import { deleteDocuments } from './methods/deleteDocuments';
import { findDocuments } from './methods/findDocuments';
import { getDocument } from './methods/getDocument';
import { getFieldTree } from './methods/getFieldTree';
import { insertDocuments } from './methods/insertDocuments';
import { replaceDocuments } from './methods/replaceDocuments';
import { loadState } from './methods/loadState';
import { toJSON } from './methods/toJSON';
import { Document } from '../common/Document';

type toJSONReturn = ReturnType<typeof findDocuments>

const defaultProps = {
  order: 511,
  // FillFactor should not be less than half.
  fillFactor: 0.5,
  verbose:false,
  fieldTrees:{},
  size:0,
  exclude:[],
  uniques:[],
};

/**
 * SBTree
 *
 */
export class SBTree extends Emittable{

  public state: SBTreeState;
  public adapter: MemoryAdapter | FsAdapter;
  public order: number;
  public fillFactor: number;
  public size: number;
  public exclude: Array<string>;
  public uniques: Array<string>;
  public verbose: boolean;
  public id: string;
  public fieldTrees: {[key:string]:SBFTree}

  constructor(props: Partial<SBTreeOptions>) {
    super()
    const self = this;
    this.state = {
      isReady: true
    }
    this.adapter = (props?.adapter) ? parseAdapter(props?.adapter) : new MemoryAdapter();

    if(this.adapter.name !== 'MemoryAdapter'){
      // We will need to sync up first
      this.state.isReady = false;
      self.adapter.once('ready', ()=> self.state.isReady = true);
    }

    this.order= (props.order) ? props.order : defaultProps.order;
    this.fillFactor= (props.fillFactor) ? props.fillFactor : defaultProps.fillFactor;
    this.verbose= (props.verbose) ? props.verbose : defaultProps.verbose;

    this.id = (props.id) ? props.id : generateTreeId();

    this.uniques = (props.uniques) ? props.uniques : defaultProps.uniques;
    this.exclude = (props.exclude) ? props.exclude : defaultProps.exclude;
    this.size = (props.size!==undefined) ? props.size : defaultProps.size;

    this.fieldTrees = (props.fieldTrees!==undefined) ? {} : defaultProps.fieldTrees;
    if(props.fieldTrees){
      each(props.fieldTrees, (_fieldTree, _fieldTreeName)=>{
        this.setFieldTree(_fieldTree);
      })
    }
    if(this.adapter.attachParent){
      this.adapter.attachParent(this).then(()=>{
        this.emit('ready');
      })
    }else{
      setTimeout(()=>{
        this.emit('ready');
      },10)
    }

  }

  getOptions(){
    const {order, fillFactor, verbose} = this;
    return {
      order, fillFactor, verbose
    }
  }



getAdapter() {
  return this.adapter;
}
async isReady() {
    return new Promise((resolve) => {
      if (this.state.isReady) return resolve(true);
      this.once('ready', () => resolve(true));
    });
  }

 setFieldTree(_fieldTreeOpts:{fieldName, id?, root?}){
   return (setFieldTree.call(this,_fieldTreeOpts) as ReturnType<typeof setFieldTree>)
 }
async  deleteDocuments(query){
  return (deleteDocuments.call(this,query) as ReturnType<typeof deleteDocuments>)
}
async findDocuments(params){
  return (findDocuments.call(this,params) as ReturnType<typeof findDocuments>)
}
async getDocument(identifier){
  return (getDocument.call(this,identifier) as ReturnType<typeof getDocument>)
}
 getFieldTree(fieldName) {
   return (getFieldTree.call(this,fieldName) as ReturnType<typeof getFieldTree>)
 }
async insertDocuments(documents){
  return (insertDocuments.call(this,documents) as ReturnType<typeof insertDocuments>)
}
async replaceDocuments(documents){
  return (replaceDocuments.call(this,documents) as ReturnType<typeof replaceDocuments>)
}
loadState(state){
  return (loadState.call(this,state) as ReturnType<typeof loadState>)
}
toJSON(){
  return (toJSON.call(this) as ReturnType<typeof toJSON>)
}

}
