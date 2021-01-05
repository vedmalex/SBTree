import { SBFRoot } from '../SBFRoot/SBFRoot';
import { PersistenceAdapter } from '../../adapters/MemoryAdapter/MemoryAdapter';

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
