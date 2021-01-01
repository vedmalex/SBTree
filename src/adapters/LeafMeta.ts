export default class LeafMeta {
  public size: number;
  public identifiers: Array<string>;
  constructor(props?:{ size: number; identifiers: Array<string>}) {
    this.size = props?.size ??  0;
    this.identifiers = props?.identifiers ?? [];
  }
}
