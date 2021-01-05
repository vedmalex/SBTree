import { SBFTree } from '../SBFTree/SBFTree';
import { PersistenceAdapter } from '../../adapters/MemoryAdapter/MemoryAdapter';
export declare type SBTreeOptions = {
    id: string;
    adapter: PersistenceAdapter;
    order: number;
    fillFactor: number;
    verbose: boolean;
    fieldTrees: {
        [key: string]: SBFTree;
    };
    size: number;
    exclude: Array<string>;
    uniques: Array<string>;
};
//# sourceMappingURL=SBTreeOptions.d.ts.map