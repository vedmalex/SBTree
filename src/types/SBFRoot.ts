import {insertSorted,forEach} from '../utils/array';
import  {generateRootId} from '../utils/crypto';
import  each from 'lodash.foreach';

import { SBFLeaf } from './SBFLeaf';
import  { SBFNode } from './SBFNode';
import { SBFTree } from './SBFTree';

async function findEquals(value) {
  const result = { identifiers: [], keys: [] };
  const { children, identifiers, keys } = this;

  let leafIndex = 0;
  keys.forEach((_key) => {
    if (value <= _key) return;
    leafIndex += 1;
  });

  const p = [];

  if (children.length === 0) {
    if (identifiers[leafIndex]) {
      keys.slice(leafIndex).forEach((_key, i) => {
        if (_key === value) {
          result.identifiers.push(identifiers[leafIndex + i]);
          result.keys.push(_key);
        }
      });
    }
  } else {
    const left = children[leafIndex];
    if (left) {
      p.push(left.find(value));
    }
    // We also check the leaf nearby
    if (children.length > leafIndex + 1) {
      const right = children[leafIndex + 1];
      p.push(right.find(value));
    }
    await Promise.all(p).then((res) => {
      if (res.length > 0) {
        res.forEach((_pRes) => {
          if (_pRes.identifiers) {
            result.identifiers.push(..._pRes.identifiers);
            result.keys.push(..._pRes.keys);
          }
        });
      }
    });
  }
  return result;
};

async function findGreaterThan(key, includeKey = false) {
  const result = { identifiers: [], keys: [] };
  const { children, identifiers, keys } = this;
  // We first see where our key is located;
  let leafIndex = 0;

  keys.forEach((_key) => {
    if (key <= _key) return;
    leafIndex++;
  });

  const p = [];

  if (children.length === 0) {
    if (identifiers[leafIndex]) {
      keys.slice(leafIndex).forEach((_key, i) => {
        if (_key >= key) {
          if (_key === key && !includeKey) {
            return;
          }
          result.identifiers.push(identifiers[leafIndex + i]);
          result.keys.push(_key);
        }
      });
    }
  } else {
    // first, we lookup for all greater than matches in the actual leaf where we had our el.
    p.push(children[leafIndex].findGreaterThan(key, includeKey));

    // If our key is in the keys, then right item will contains our key and it's superior elements
    // We need this extra step first
    let start = leafIndex + 1;
    if (keys.includes(key)) {
      p.push(children[start].findGreaterThan(key, includeKey));
      start += 1;
    }

    // All bigger leaf that our leafIndex needs to be included
    if (leafIndex < children.length - 1) {
      children.slice(start).forEach((child, i) => {
        p.push(child.getAll());
      });
    }

    await Promise.all(p).then((res) => {
      res.forEach((p) => {
        result.identifiers.push(...p.identifiers);
        result.keys.push(...p.keys);
      });
    });
  }

  return result;
}

async function findLowerThan(key, includeKey = false) {
  const result = { identifiers: [], keys: [] };
  const { children, identifiers, keys } = this;

  // We first see where our key is located;
  let leafIndex = 0;

  keys.forEach((_key) => {
    if (key <= _key) return;
    leafIndex++;
  });

  const p = [];

  if (children.length === 0) {
    if (!identifiers[leafIndex]) {
      leafIndex--;
    }
    if (identifiers[leafIndex]) {
      const last = keys.lastIndexOf(key);
      keys.slice(0, last + 1 || leafIndex + 1).forEach((_key, i) => {
        if (_key <= key) {
          if (_key === key && !includeKey) {
            return;
          }

          result.identifiers.push(identifiers[i]);
          result.keys.push(keys[i]);
        }
      });
    }
  } else {
    // All smaller leaf that our leafIndex needs to be included
    if (leafIndex >= 1) {
      children.slice(0, leafIndex).forEach((child) => {
        p.push(child.getAll());
      });
    }

    // Finally, we lookup for all lower than matches in the actual leaf where we had our el.
    p.push(children[leafIndex].findLowerThan(key, includeKey));

    if (keys.includes(key)) {
      p.push(await children[leafIndex + 1].findLowerThan(key, includeKey));
    }

    await Promise.all(p).then((res) => {
      res.forEach((p) => {
        result.identifiers.push(...p.identifiers);
        result.keys.push(...p.keys);
      });
    }).catch((err) => {
      console.error('err', err);
    });
  }
  return result;
}

const parseChildren = (_children, _parent)=>{
  const children = [];

  each(_children, (_children)=>{
    const fieldName = _children.fieldName;

      if(_children.type==='leaf'){
        children.push(new SBFLeaf({fieldName,parent:_parent,..._children}))
      }
      else if(_children.type==='node'){
        children.push(new SBFNode({fieldName,parent:_parent,..._children}))
      }
  })
  return children;
};


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

async  attachLeaf(index, leaf) {
  this.children.splice(index, 0, leaf);
  // leaf.setParent(this);
}

async  find(value, operator = '$eq') {
  const self = this;
  const p = [];
  const results = { identifiers: [], keys: [] };

  const valueKeys = Object.keys(value);
  if(valueKeys.includes('$in')){
    return this.find.call(this, value.$in, '$in');
  }
  switch (operator) {
    case '$eq':
      return findEquals.call(this, value);
    case '$ne':
      const getAllIdentifier = await this.getAll();
      const excludedIdentifiers = await findEquals.call(this, value);

      excludedIdentifiers.identifiers.forEach((id) => {
        const idOf = getAllIdentifier.identifiers.indexOf(id);
        if (idOf > -1) {
          getAllIdentifier.identifiers.splice(idOf, 1);
          getAllIdentifier.keys.splice(idOf, 1);
        }
      });
      return getAllIdentifier;
    case '$lte':
      return findLowerThan.call(this, value, true);
    case '$lt':
      return findLowerThan.call(this, value, false);
    case '$gt':
      return findGreaterThan.call(this, value, false);
    case '$gte':
      return findGreaterThan.call(this, value, true);
    case '$in':
      if (!Array.isArray(value)) throw new Error('$in operator expect key to be an array');
      for (const el of value) {
        p.push(self.find(el));
      }
      await Promise
        .all(p)
        .then((resolvedP) => {
          resolvedP.forEach((p) => {
            results.identifiers.push(...p.identifiers);
            results.keys.push(...p.keys);
          });
        }).catch((err) => {
          console.error('err', err);
        });

      return results;
    case '$nin':
      if (!Array.isArray(value)) throw new Error('$nin operator expect key to be an array');

      const getAllIdentifiers = await this.getAll();
      const includingIdentifiers = await this.find(value, '$in');

      includingIdentifiers.identifiers.forEach((id) => {
        const idOf = getAllIdentifiers.identifiers.indexOf(id);
        if (idOf > -1) {
          getAllIdentifiers.identifiers.splice(idOf, 1);
          getAllIdentifiers.keys.splice(idOf, 1);
        }
      });
      return getAllIdentifiers;
    default:
      throw new Error(`Not handled operator ${operator}`);
  }
}

async  getAll():Promise<{identifiers:Array<string>; keys: Array<string>}> {
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
}

async get(identifier) {
  const adapter = this.getAdapter();
  return await adapter.getDocument(identifier);
}

getAdapter() {
  return this.getTree().getAdapter();
};

async getFillStatus () {
  const { fillFactor, order } = this.getTreeOptions();
  if (fillFactor < 0.5) {
    throw new Error(`FillFactor cannot be less than 0.5. Received ${fillFactor}`);
  }
  const maxKeys = order - 1;
  const minKeys = Math.floor(maxKeys * fillFactor);
  const size = this.keys.length;
  return {
    fillFactor, order, leafSize: size, fillFactorFilled: size >= minKeys,
  };
};

getTreeOptions() {
  return this.getTree().getOptions();
};

async remove(remCmd) {
  const value = remCmd.query[this.fieldName];
  const { identifiers, keys, children } = this;
  let leafIndex = 0;
  keys.forEach((_key) => {
    if (value < _key) return;
    leafIndex++;
  });

  if (!children.length) {
    const item = this.keys[leafIndex - 1];
    if (item !== undefined) {
      keys.splice(leafIndex - 1, 1);
      identifiers.splice(leafIndex - 1, 1);
    }
  }
  const leaf = children[leafIndex];
  if (leaf) {
    await leaf.remove(remCmd);

    // This has been added for the case where previous also contains the same value
    if (children[leafIndex - 1]) {
      await children[leafIndex - 1].remove(remCmd);
    }
  }
}

async replace(identifier, value) {
  const { children } = this;
  if (children.length === 0) {
    const currIndex = this.identifiers.indexOf(identifier);
    this.keys[currIndex] = value;
  } else {
    let leafIndex = 0;
    this.keys.forEach((_key) => {
      if (value <= _key) return;
      leafIndex++;
    });
    const leaf = children[leafIndex];
    await leaf.replace(identifier, value);
  }

  if (this.isFull()) {
    await this.split();
  }
}

async insert(identifier, value = null) {
  const { children } = this;

  if (['string', 'number', 'boolean', 'object'].includes(typeof value)) {
    if (children.length === 0) {
      const idx = await this.insertReferenceKey(value);
      this.identifiers.splice(idx, 0, identifier);
    } else {
      let leafIndex = 0;
      this.keys.forEach((_key) => {
        if (value <= _key) return;
        leafIndex++;
      });
      const leaf = children[leafIndex];
      await leaf.insert(identifier, value);
    }
  } else {
    throw new Error(`Unexpected insertion of type ${typeof value}`);
  }

  if (this.isFull()) {
    await this.split();
  }
}

async insertReferenceKey(value) {
  if (this.isFull()) {
    await this.split();
  }
  const index = insertSorted(this.keys, value);
  return index;
}

isFull() {
  const tree = this.getTree();
  const { order } = tree;

  return this.keys.length >= order;
}
async split() {
  const {
    children, identifiers, keys, fieldName,
  } = this;

  const midIndex = ~~(keys.length / 2);
  const rightKeys = keys.splice(midIndex);
  const leftKeys = keys.splice(0);

  if (children.length > 0) {
    const midKey = rightKeys.splice(0, 1)[0];

    const rightChildren = children.splice(midIndex + 1);
    const leftChildren = children.splice(0);

    const right = new SBFNode({ fieldName, parent: this });
    right.keys = rightKeys;
    right.children = rightChildren;
    rightChildren.forEach((child) => {
      child.setParent(right);
    });

    const left = new SBFNode({ fieldName, parent: this });
    left.keys = leftKeys;
    left.children = leftChildren;
    leftChildren.forEach((child) => {
      child.setParent(left);
    });

    keys.push(midKey);
    this.children = [left, right];
  } else {
    const midKey = rightKeys.slice(0)[0];

    const rightIdentifiers = identifiers.splice(midIndex);
    const leftIdentifiers = identifiers.splice(0);

    const right = new SBFLeaf({ parent: this });
    // FIXME
    await this.getAdapter().createLeaf(right.id);

    await forEach(rightKeys, async (key, i) => {
      await right.insert(rightIdentifiers[i], key);
    });

    // FIXME
    const left = new SBFLeaf({ parent: this });
    await this.getAdapter().createLeaf(left.id);

    await forEach(leftKeys, async (key, i) => {
      await left.insert(leftIdentifiers[i], key);
    });

    keys.push(midKey);

    this.children = [left, right];
  }
}
};

