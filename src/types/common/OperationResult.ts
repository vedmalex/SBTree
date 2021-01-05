import { PossibleKeys } from '../../adapters/MemoryAdapter/MemoryAdapter';

export type OperationResult = {
  identifiers: Array<string>;
  keys: Array<PossibleKeys>;
};
