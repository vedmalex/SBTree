import LeafData from '../LeafData';
import LeafMeta from '../LeafMeta';


export type MemoryAdapterLeafs = {
  [leafId: string]: {
    meta: LeafMeta;
    data: LeafData;
  };
};
