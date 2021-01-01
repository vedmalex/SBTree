import { SBFLeaf } from './SBFLeaf';
import { SBFNode } from './SBFNode';
import { SBFTree } from './SBFTree';
export declare class SBFRoot {
    private tree;
    get type(): string;
    id: string;
    fieldName: string;
    keys: Array<string>;
    identifiers: Array<string>;
    children: Array<SBFLeaf | SBFNode>;
    constructor(props: any);
    getTree(): SBFTree;
    attachLeaf(index: any, leaf: any): Promise<void>;
    find(value: any, operator?: string): Promise<any>;
    getAll(): Promise<{
        identifiers: Array<string>;
        keys: Array<string>;
    }>;
    get(identifier: any): Promise<any>;
    getAdapter(): import("../adapters").MemoryAdapter | import("../adapters").FsAdapter;
    getFillStatus(): Promise<{
        fillFactor: number;
        order: number;
        leafSize: number;
        fillFactorFilled: boolean;
    }>;
    getTreeOptions(): {
        order: number;
        fillFactor: number;
        verbose: boolean;
    };
    remove(remCmd: any): Promise<void>;
    replace(identifier: any, value: any): Promise<void>;
    insert(identifier: any, value?: any): Promise<void>;
    insertReferenceKey(value: any): Promise<number>;
    isFull(): boolean;
    split(): Promise<void>;
}
//# sourceMappingURL=SBFRoot.d.ts.map