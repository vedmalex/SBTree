import { SBFRoot } from '../SBFRoot/SBFRoot';
import { PersistenceAdapter } from '../../adapters/MemoryAdapter/MemoryAdapter';
export declare type SBFTreeOptions = {
    adapter: PersistenceAdapter;
    id: string;
    order: number;
    root: SBFRoot;
    fieldName: string;
    fillFactor: number;
    verbose: boolean;
    isUnique: boolean;
};
//# sourceMappingURL=SBFTreeOptions.d.ts.map