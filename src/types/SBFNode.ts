import { SBFLeaf } from './SBFLeaf';
import {insertSorted} from '../utils/array';
import {generateNodeId} from '../utils/crypto';

/**
 * SBFTree
 *
 */
export class SBFNode {
  private parent
  public id: string;
  public fieldName: string;
  public keys:Array<string>;
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
  getTree(){
    return this.parent.getTree() || this.parent.getParent().getTree();
  }

  async  attachLeaf(index, leaf) {
  this.children.splice(index, 0, leaf);
};

async find(value) {
  const results = { identifiers: [], keys: [] };
  const { children } = this;
  let leafIndex = 0;
  this.keys.forEach((_key) => {
    if (value <= _key) return;
    leafIndex++;
  });
  const leaf = children[leafIndex];

  // const leaf = this.children[leafIndex];
  const leftRes = await leaf.find(value);

  results.identifiers.push(...leftRes.identifiers);
  results.keys.push(...leftRes.keys);
  //
  // if(leafIndex>0){
  //   console.log('oui', leafIndex)
  //   const left = this.children[leafIndex];
  //   result = result.concat(await left.find(key));
  // }
  // We also check the leaf nearby
  if (children.length > leafIndex + 1) {
    const right = children[leafIndex + 1];
    const rightRes = await right.find(value);
    results.identifiers.push(...rightRes.identifiers);
    results.keys.push(...rightRes.keys);
    // result = result.concat(await right.find(value));
  }

  return results;
  //
  // return leaf.find(value);
};

async  findLowerThan(value, includeKey = false) {
  const result = { identifiers: [], keys: [] };
  const { children, keys } = this;
  let leafIndex = 0;
  const p = [];
  // It might be a bug that we have no keys, but in this case, we take first child
  if (keys.length === 0 && children.length === 1) {
    p.push(children[0].findLowerThan(value, includeKey));
  } else {
    // Let's find our first match leaf
    keys.forEach((_key) => {
      if (value <= _key) return;
      leafIndex++;
    });

    // We first look up all smaller value
    children.slice(0, leafIndex).forEach((child) => {
      p.push(child.getAll());
    });

    // And then we lookup in our children
    p.push(children[leafIndex].findLowerThan(value, includeKey));

    // And the next one if it exist (in case we got duplicate same value
    if (children[leafIndex + 1]) {
      p.push(children[leafIndex + 1].findLowerThan(value, includeKey));
    }
  }
  await Promise.all(p).then((res) => {
    res.forEach((p) => {
      result.identifiers.push(...p.identifiers);
      result.keys.push(...p.keys);
    });
  });
  return result;
}

async findGreaterThan(value, includeKey = false) {
  const result = { identifiers: [], keys: [] };
  const { children,identifiers, keys } = this;

  let leafIndex = 0;
  const p = [];

  if (children.length === 0) {
    if (identifiers[leafIndex]) {
      keys.slice(leafIndex).forEach((_key, i) => {
        if (_key >= value) {
          if (_key === value && !includeKey) {
            return;
          }
          result.identifiers.push(identifiers[leafIndex + i]);
          result.keys.push(_key);
        }
      });
    }
  } else {
    // It might be a bug that we have no keys, but in this case, we take first child
    if (keys.length === 0 && children.length === 1) {
      p.push(children[0].findLowerThan(value, includeKey));
    } else {
      // Let's find our first match leaf
      keys.forEach((_key) => {
        if (value <= _key) return;
        leafIndex++;
      });

      // We lookup in our children
      p.push(children[leafIndex].findGreaterThan(value, includeKey));

      // And all greater value
      children.slice(leafIndex + 1).forEach((child) => {
        p.push(child.getAll());
      });
    }
    await Promise.all(p).then((res) => {
      res.forEach((_el) => {
        result.identifiers.push(..._el.identifiers);
        result.keys.push(..._el.keys);
      });
    });
  }

  return result;
}

getAdapter() {
  return this.getTree().getAdapter();
};

async  getAll() {
  const result = { identifiers: [], keys: [] };

  const p = [];
  this.children.forEach((child) => {
    p.push(child.getAll());
  });

  return new Promise((resolve) => {
    Promise
      .all(p)
      .then((res) => {
        res.forEach((resolvedP) => {
          if (resolvedP.identifiers) {
            result.identifiers.push(...resolvedP.identifiers);
            result.keys.push(...resolvedP.keys);
          } else if (Array.isArray(resolvedP)) {
            resolvedP.forEach((item) => {
              result.identifiers.push(...item.identifiers);
              result.keys.push(...item.keys);
            });
          } else {
            throw new Error(`Unexpected type of resolvedP - type : ${typeof resolvedP}`);
          }
        });
        resolve(result);
      });
  });

};

async getFillStatus  () {
  const parent = this.getParent();
  const adapter = parent.getAdapter();
  const { fillFactor, order } = parent.getTreeOptions();
  if (fillFactor < 0.5) {
    throw new Error(`FillFactor cannot be less than 0.5. Received ${fillFactor}`);
  }
  const maxKeys = order - 1;
  const minKeys = Math.floor(maxKeys * fillFactor);

  try {
    const leaf = await adapter.openLeaf(this.id);
    const { size } = leaf.meta;
    return {
      fillFactor, order, leafSize: size, fillFactorFilled: size >= minKeys,
    };
  } catch (e) {
    if (e.message === 'Leaf do not exist') {
      await adapter.createLeaf(this.id);
      return this.getFillStatus();
    }
    throw e;
  }
}

getTreeOptions() {
  return this.getTree().getOptions();
}

async insert(identifier, value) {
  const { children, keys } = this;
  if (!children.length) {
    const leaf = new SBFLeaf({ parent: this });
    await leaf.insert(identifier, value);
    children.push(leaf);
    // this.keys.push(value);
    // throw new Error(`SBFNode cannot insert with no children`);
  }
  let leafIndex = 0;
  keys.forEach((_key) => {
    if (value <= _key) return;
    leafIndex++;
  });
  const leaf = children[leafIndex];
  await leaf.insert(identifier, value);

  if (this.isFull()) {
    await this.split();
  }
};

async  insertReferenceKey(value) {
  if (this.isFull()) {
    await this.split();
  }
  const index = insertSorted(this.keys, value);
  return index;
};

 isFull() {
  const tree = this.getTree();
  const { order } = tree;
  return this.keys.length >= order;
};

/**
 * Merge the node with it's parent (thus : up).
 * Used mostly from the results of a merge from leafs when it result in emptying parent node keys.
 * Parent node is then called for some mergeUp.
 *
 * @returns {Promise<void>}
 */
async mergeUp  () {
  // console.log('Node - Merge up')
  const parent = this.getParent();
  const { children, id } = this;
  // const
  const selfPos = parent.children.findIndex((el) => el.id === id);
  if (children.length !== 1) {
    throw new Error('We did not tought about resolving this case. ');// todo
  }

  if (parent.children.length === 2 && !await parent.getFillStatus().fillFactorFilled) {
    const siblingPos = (selfPos === 1) ? 0 : 1;
    // Our sibling is the other parent child.
    const sibling = parent.children[siblingPos];

    // We bump up keys of our siblings.
    parent.keys.splice(siblingPos, 0, ...sibling.keys);
    parent.children = [...sibling.children, ...children];
  } else {
    // parent.children.splice(selfPos, 1, children[0]);
    // console.log(selfPos);
    // console.log(parent.keys);
    // console.log(parent)

    // console.log(this)
    // console.log(await parent.getFillStatus())
    throw new Error('Not implemented : MergingUp');
  }
};

async remove(remCmd) {
  const value = remCmd.query[this.fieldName];

  let leafIndex = 0;
  this.keys.forEach((_key) => {
    if (value < _key) return;
    leafIndex++;
  });

  const leaf = this.children[leafIndex];
  if (leaf) {
    await leaf.remove(remCmd);
  }
}

async replace(identifier, value) {
  const { children, keys } = this;
  if (!children.length) {
    throw new Error('SBFNode cannot replace with no children');
  }
  let leafIndex = 0;
  keys.forEach((_key) => {
    if (value <= _key) return;
    leafIndex++;
  });
  const leaf = children[leafIndex];
  await leaf.replace(identifier, value);

  if (this.isFull()) {
    await this.split();
  }
};

async split() {
  // console.log('Node - split')

  const midIndex = ~~(this.keys.length / 2);

  const rightKeys = this.keys.splice(midIndex);
  const leftKeys = this.keys.splice(0);

  const midKey = rightKeys.splice(0, 1)[0];

  const rightChildren = this.children.splice(midIndex + 1);
  const leftChildren = this.children.splice(0);

  const parent = this.getParent();

  const right = new SBFNode({ parent });
  right.keys = rightKeys;
  right.children = rightChildren;
  rightChildren.forEach((child) => {
    child.setParent(right);
  });

  const left = new SBFNode({ parent });
  left.keys = leftKeys;
  left.children = leftChildren;
  leftChildren.forEach((child) => {
    child.setParent(left);
  });

  const currentChildIndex = parent.children.indexOf(this);
  // Remove current referent
  parent.children.splice(currentChildIndex, 1);
  await parent.attachLeaf(currentChildIndex, left);
  await parent.attachLeaf(currentChildIndex + 1, right);
  await parent.insertReferenceKey(midKey);
};

toJSON(){
  const {
    fieldName,
    children,
    type,
    id,
    // identifiers,
    keys,

  } = this;
  return {
    id,
    type,
    fieldName,
    // identifiers:[...identifiers],
    keys: [...keys],
    children: children.map(c=>c.toJSON())
  }
}

}
