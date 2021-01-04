import { SBFRoot } from '../SBFRoot/SBFRoot';
import { MemoryAdapter } from '../../adapters/MemoryAdapter/MemoryAdapter';
import FsAdapter from '../../adapters/FsAdapter/FsAdapter';
export declare type SBFTreeOptions = {
    id: string;
    order: number;
    root: SBFRoot;
    fieldName: string;
    fillFactor: number;
    verbose: boolean;
    isUnique: boolean;
    adapter: MemoryAdapter | FsAdapter;
};
//# sourceMappingURL=SBFTreeOptions.d.ts.map