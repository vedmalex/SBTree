import { SBFRoot } from '../SBFRoot/SBFRoot';
import { SBFTreeOptions } from './SBFTreeOptions';
import { PersistenceAdapter } from "../../adapters/common/PersistenceAdapter";
export declare class SBFTree {
    private _adapter;
    get adapter(): PersistenceAdapter;
    order: number;
    verbose: boolean;
    id: string;
    fillFactor: number;
    fieldName: string;
    isUnique: boolean;
    root: SBFRoot;
    constructor(props: SBFTreeOptions);
    getOptions(): {
        order: number;
        fillFactor: number;
        verbose: boolean;
    };
    createRoot(root?: any): void;
    find(value: any, operator: any): Promise<any>;
    get(identifier: any): Promise<import("../common/Document").Document>;
    insert(identifier: any, value: any): Promise<void>;
    remove(remCmd: any): Promise<void>;
    replace(identifier: any, value: any): Promise<boolean>;
    toJSON(): {
        fieldName: string;
        id: string;
        fillFactor: number;
        isUnique: boolean;
        verbose: boolean;
        order: number;
        root: {
            type: string;
            id: string;
            fieldName: string;
            identifiers: string[];
            keys: import("../../adapters/common/PossibleKeys").PossibleKeys[];
            children: any[];
        };
    };
}
//# sourceMappingURL=SBFTree.d.ts.map