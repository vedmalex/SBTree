import { PossibleKeys } from "./PossibleKeys";
export type LeafDataProps = {
  keys:Array<PossibleKeys>
}
export default class LeafData {
  public keys:Array<PossibleKeys>
  constructor(props?:LeafDataProps) {
    this.keys = props?.keys ?? [];
  }
}
