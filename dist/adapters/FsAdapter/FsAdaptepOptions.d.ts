import { FsAdapterOptionAutoLoadCallback } from './FsAdapterOptionAutoLoadCallback';
import { AdapterLeafs } from '../MemoryAdapter/MemoryAdapterLeafs';
import { SBTree } from '../../types/SBTree/SBTree';
export declare type FsAdaptepOptions = {
    path: string;
    autoSave?: boolean;
    autoSaveInterval?: number;
    autoLoad?: boolean;
    autoLoadCallback?: FsAdapterOptionAutoLoadCallback;
    parent?: SBTree;
    leafs?: AdapterLeafs;
};
//# sourceMappingURL=FsAdaptepOptions.d.ts.map