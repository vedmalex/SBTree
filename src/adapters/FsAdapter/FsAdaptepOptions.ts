import { FsAdapterLeafs } from "./FsAdapterLeafs";
import { FsAdapterOptionAutoLoadCallback } from "./FsAdapterOptionAutoLoadCallback";

export type FsAdaptepOptions = {
  path: string;
  //TODO : Ideally, when false, we keep a set of deferred job that we execute once saveDatabase is called.
  autoSave?: boolean;
  autoSaveInterval?: number;
  autoLoad?: boolean;
  autoLoadCallback?: FsAdapterOptionAutoLoadCallback;
  parent?: unknown;
  leafs?: FsAdapterLeafs;
};
