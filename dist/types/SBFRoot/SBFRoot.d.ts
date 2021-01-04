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
    getAdapter(): import("../../adapters").FsAdapter | import("../../adapters").MemoryAdapter;
    getTreeOptions(): {
        order: number;
        fillFactor: number;
        verbose: boolean;
    };
    attachLeaf(index: any, leaf: any): Promise<any>;
    find(value: any, operator?: string): Promise<any>;
    getAll(): Promise<{
        identifiers: Array<string>;
        keys: Array<string>;
    }>;
    get(identifier: any): Promise<any>;
    getFillStatus(): Promise<FillStatus>;
    remove(remCmd: any): Promise<any>;
    replace(identifier: any, value: any): Promise<any>;
    insert(identifier: any, value?: any): Promise<any>;
    insertReferenceKey(value: any): Promise<any>;
    isFull(): any;
    split(): Promise<any>;
    toJSON(): any;
}
//# sourceMappingURL=SBFRoot.d.ts.map