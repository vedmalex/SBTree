import { SBFLeaf } from '../SBFLeaf/SBFLeaf';
import { SBFNode } from '../SBFNode/SBFNode';
import { SBFTree } from '../SBFTree/SBFTree';
import { FillStatus } from '../common/FillStatus';
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
    getAdapter(): import("../../adapters").MemoryAdapter | import("../../adapters").FsAdapter;
    getTreeOptions(): {
        order: number;
        fillFactor: number;
        verbose: boolean;
    };
    attachLeaf(index: any, leaf: any): Promise<void>;
    find(value: any, operator?: string): Promise<any>;
    getAll(): Promise<{
        identifiers: Array<string>;
        keys: Array<string>;
    }>;
    get(identifier: any): Promise<any>;
    getFillStatus(): Promise<FillStatus>;
    remove(remCmd: any): Promise<void>;
    replace(identifier: any, value: any): Promise<void>;
    insert(identifier: any, value: any): Promise<void>;
    insertReferenceKey(value: any): Promise<number>;
    isFull(): boolean;
    split(): Promise<void>;
    toJSON(): {
        type: string;
        id: string;
        fieldName: string;
        identifiers: string[];
        keys: string[];
        children: any[];
    };
}
//# sourceMappingURL=SBFRoot.d.ts.map