export default class LeafData {
  public keys:Array<string>
  constructor(props?:{keys:Array<string>}) {
    this.keys = props?.keys ?? [];
  }
}
