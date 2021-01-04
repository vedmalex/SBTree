import LeafMeta from '../LeafMeta';
import { LeafId } from './FsAdapter';


export type FsAdapterLeafs = {
  [leafId: string]: {
    id: LeafId;
    meta: LeafMeta;
  };
};
