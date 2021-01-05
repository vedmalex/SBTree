import each from 'lodash.foreach'
import { SBFLeaf } from '../../SBFLeaf/SBFLeaf'
import { SBFNode } from '../../SBFNode/SBFNode'

export function parseChildren(_children, _parent) {
  const children = []

  each(_children, (_children) => {
    const fieldName = _children.fieldName

    if (_children.type === 'leaf') {
      children.push(new SBFLeaf({ fieldName, parent: _parent, ..._children }))
    } else if (_children.type === 'node') {
      children.push(new SBFNode({ fieldName, parent: _parent, ..._children }))
    }
  })
  return children
}
