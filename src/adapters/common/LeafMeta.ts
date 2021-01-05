export type LeafMetaProps = { size: number; identifiers: Array<string> }
export default class LeafMeta {
  public size: number
  public identifiers: Array<string>
  constructor(props?: LeafMetaProps) {
    this.size = props?.size ?? 0
    this.identifiers = props?.identifiers ?? []
  }
}
