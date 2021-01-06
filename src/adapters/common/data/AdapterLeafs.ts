import LeafData from '../LeafData'
import LeafMeta from '../LeafMeta'

export type AdapterLeaf = {
  meta: LeafMeta
  data?: LeafData // if data stored in leaf
  id?: string // if data is stored externally
}

export type AdapterLeafs = {
  [leafId: string]: AdapterLeaf
}
