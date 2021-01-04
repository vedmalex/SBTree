import { SBFRoot } from '../SBFRoot/SBFRoot';
import { MemoryAdapter } from '../../adapters/MemoryAdapter/MemoryAdapter';
import FsAdapter from '../../adapters/FsAdapter/FsAdapter';
import { SBFTreeOptions } from './SBFTreeOptions';
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
    getAdapter(): FsAdapter | MemoryAdapter;
    getOptions(): {
        order: number;
        fillFactor: number;
        verbose: boolean;
    };
    createRoot(root?: any): any;
    find(value: any, operator: any): Promise<any>;
    get(identifier: any): Promise<any>;
    insert(identifier: any, value: any): Promise<any>;
    remove(remCmd: any): Promise<any>;
    replace(identifier: any, value: any): Promise<any>;
    toJSON(): any;
}
//# sourceMappingURL=SBFTree.d.ts.map