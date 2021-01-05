import { FsAdapterOptionAutoLoadCallback } from "./FsAdapterOptionAutoLoadCallback";
import { AdapterLeafs } from '../MemoryAdapter/MemoryAdapterLeafs';

export type FsAdaptepOptions = {
  path: string;
  //TODO : Ideally, when false, we keep a set of deferred job that we execute once saveDatabase is called.
  autoSave?: boolean;
  autoSaveInterval?: number;
  autoLoad?: boolean;
  autoLoadCallback?: FsAdapterOptionAutoLoadCallback;
  parent?: unknown;
  leafs?: AdapterLeafs;
};
