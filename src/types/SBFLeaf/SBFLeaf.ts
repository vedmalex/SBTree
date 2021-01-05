import { generateLeafId } from '../../utils/crypto'
import { SBFNode } from '../SBFNode/SBFNode'
import { SBFRoot } from '../SBFRoot/SBFRoot'
import { insert } from './methods/insert'
import { find } from './methods/find'
import { getAll } from './methods/getAll'
import { getFillStatus } from './methods/getFillStatus'
import { getLeft } from './methods/getLeft'
import { getRight } from './methods/getRight'
import { findLowerThan } from './methods/findLowerThan'
import { findGreaterThan } from './methods/findGreaterThan'
import { isFillFactorFilled } from './methods/isFillFactorFilled'
import { isFull } from './methods/isFull'
import { mergeWithSiblings } from './methods/mergeWithSiblings'
import { redistribute } from './methods/redistribute'
import { remove } from './methods/remove'
import { replace } from './methods/replace'
import { split } from './methods/split'
import { toJSON } from './methods/toJSON'
import { FillStatus } from '../common/FillStatus'

/**
 * SFBLeaf
 *
 */
export class SBFLeaf {
  private parent: SBFRoot | SBFNode
  public id: string
  public fieldName: string
  public get type() {
    return 'leaf'
  }

  constructor(props) {
    if (!props.parent) {
      throw new Error(`SFBLeaf initialized without parent reference`)
    }

    this.parent = props.parent

    this.id = props.id ? props.id : generateLeafId()
    this.fieldName = props.parent.fieldName ? props.parent.fieldName : null
  }
  getParent() {
    return this.parent
  }
  setParent(parent) {
    this.parent = parent
  }

  async insert(identifier, value) {
    return insert.call(this, identifier, value) as ReturnType<typeof insert>
  }

  async find(value) {
    return find.call(this, value) as ReturnType<typeof find>
  }

  async getAll() {
    return getAll.call(this) as ReturnType<typeof getAll>
  }

  async getFillStatus(): Promise<FillStatus> {
    return getFillStatus.call(this) as ReturnType<typeof getFillStatus>
  }

  async getLeft() {
    return getLeft.call(this) as ReturnType<typeof getLeft>
  }

  async getRight() {
    return getRight.call(this) as ReturnType<typeof getRight>
  }

  async findLowerThan(value, includeKey = false) {
    return findLowerThan.call(this, value, includeKey) as ReturnType<
      typeof findLowerThan
    >
  }

  async findGreaterThan(value, includeKey = false) {
    return findGreaterThan.call(this, value, includeKey) as ReturnType<
      typeof findGreaterThan
    >
  }

  async isFillFactorFilled() {
    return isFillFactorFilled.call(this) as ReturnType<
      typeof isFillFactorFilled
    >
  }

  async isFull() {
    return isFull.call(this) as ReturnType<typeof isFull>
  }

  async mergeWithSiblings() {
    return mergeWithSiblings.call(this) as ReturnType<typeof mergeWithSiblings>
  }

  async redistribute() {
    return redistribute.call(this) as ReturnType<typeof redistribute>
  }

  async remove(remCmd) {
    return remove.call(this, remCmd) as ReturnType<typeof remove>
  }

  async replace(identifier, value) {
    return replace.call(this, identifier, value) as ReturnType<typeof replace>
  }

  async split() {
    return split.call(this) as ReturnType<typeof split>
  }

  toJSON() {
    return toJSON.call(this) as ReturnType<typeof toJSON>
  }
}
