import { SBFRoot } from '../SBFRoot/SBFRoot';
import { PersistenceAdapter } from "../../adapters/common/PersistenceAdapter";

export type SBFTreeOptions = {
  adapter: PersistenceAdapter,
  id: string;
  order: number;
  root: SBFRoot;
  fieldName: string;
  fillFactor: number;
  verbose: boolean;
  isUnique: boolean;
};
