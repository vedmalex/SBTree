import { SBFRoot } from '../../SBFRoot/SBFRoot'
import { SBFTree } from '../SBFTree'

export function createRoot(this: SBFTree, root = null) {
  if (this.root) {
    throw new Error('Already existing root.')
  }
  if (root) {
    const _root = root.root ? root.root : root
    _root.tree = this
    this.root = new SBFRoot(_root)
  } else {
    const { fieldName } = this
    const keys = root && root.keys ? root.keys : null
    this.root = new SBFRoot({ tree: this, keys, fieldName })
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
}
