import { MemoryAdapter } from '../../adapters';
import { SBFTree } from '../SBFTree/SBFTree';
import FsAdapter from '../../adapters/FsAdapter/FsAdapter';
export declare type SBTreeOptions = {
    id: string;
    adapter: MemoryAdapter | FsAdapter;
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