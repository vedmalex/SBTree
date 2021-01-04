import LeafData from '../common/LeafData';
import LeafMeta from '../common/LeafMeta';


export type MemoryAdapterLeafs = {
  [leafId: string]: {
    meta: LeafMeta;
    data: LeafData;
  };
};
