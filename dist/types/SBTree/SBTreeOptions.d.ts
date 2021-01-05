import { SBFTree } from '../SBFTree/SBFTree';
import { PersistenceAdapter } from "../../adapters/common/PersistenceAdapter";
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