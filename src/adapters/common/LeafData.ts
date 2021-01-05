import { PossibleKeys } from '../MemoryAdapter/MemoryAdapter';
export type LeafDataProps = {
  keys:Array<PossibleKeys>
}
export default class LeafData {
  public keys:Array<PossibleKeys>
  constructor(props?:LeafDataProps) {
    this.keys = props?.keys ?? [];
  }
}
