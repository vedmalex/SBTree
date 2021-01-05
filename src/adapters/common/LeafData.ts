export type LeafDataProps = {
  keys:Array<number|string|boolean>
}
export default class LeafData {
  public keys:Array<number|string|boolean>
  constructor(props?:LeafDataProps) {
    this.keys = props?.keys ?? [];
  }
}
