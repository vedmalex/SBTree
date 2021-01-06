import { SBTree } from '../../../types/SBTree/SBTree';
export declare type FsAdapterOptionAutoLoadCallback = () => Promise<void>;
export declare type DataStoreOptions = {
    path: string;
    autoSave?: boolean;
    autoSaveInterval?: number;
    autoLoad?: boolean;
    autoLoadCallback?: FsAdapterOptionAutoLoadCallback;
    parent?: SBTree;
};
//# sourceMappingURL=DataStoreOptions.d.ts.map