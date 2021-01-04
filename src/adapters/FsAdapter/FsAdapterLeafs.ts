import LeafMeta from '../common/LeafMeta';
import { LeafId } from './FsAdapter';


export type FsAdapterLeafs = {
  [leafId: string]: {
    id: LeafId;
    meta: LeafMeta;
  };
};
