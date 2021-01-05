import { FsAdapterOptionAutoLoadCallback } from "./FsAdapterOptionAutoLoadCallback";
import { AdapterLeafs } from '../MemoryAdapter/MemoryAdapterLeafs';
export declare type FsAdaptepOptions = {
    path: string;
    autoSave?: boolean;
    autoSaveInterval?: number;
    autoLoad?: boolean;
    autoLoadCallback?: FsAdapterOptionAutoLoadCallback;
    parent?: unknown;
    leafs?: AdapterLeafs;
};
//# sourceMappingURL=FsAdaptepOptions.d.ts.map