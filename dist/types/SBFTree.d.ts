import { SBFRoot } from './SBFRoot';
import { MemoryAdapter } from '../adapters/MemoryAdapter';
import FsAdapter from '../adapters/FsAdapter';
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
export declare class SBFTree {
    private adapter;
    order: number;
    verbose: boolean;
    id: string;
    fillFactor: number;
    fieldName: string;
    isUnique: boolean;
    root: SBFRoot;
    constructor(props: SBFTreeOptions);
    getAdapter(): MemoryAdapter | FsAdapter;
    getOptions(): {
        order: number;
        fillFactor: number;
        verbose: boolean;
    };
    createRoot(root?: any): void;
    find(value: any, operator: any): Promise<any>;
    get(identifier: any): Promise<any>;
    insert(identifier: any, value: any): Promise<boolean>;
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
            keys: string[];
            children: any[];
        };
    };
}
//# sourceMappingURL=SBFTree.d.ts.map