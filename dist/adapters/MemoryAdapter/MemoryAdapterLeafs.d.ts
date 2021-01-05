import LeafData from '../common/LeafData';
import LeafMeta from '../common/LeafMeta';
export declare type AdapterLeaf = {
    meta: LeafMeta;
    data?: LeafData;
    id?: string;
};
export declare type AdapterLeafs = {
    [leafId: string]: AdapterLeaf;
};
//# sourceMappingURL=MemoryAdapterLeafs.d.ts.map