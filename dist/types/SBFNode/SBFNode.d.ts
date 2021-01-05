import { SBFLeaf } from '../SBFLeaf/SBFLeaf';
import { SBFRoot } from '../SBFRoot/SBFRoot';
import { SBFTree } from '../SBFTree/SBFTree';
import { FillStatus } from '../common/FillStatus';
export declare class SBFNode {
    private parent;
    id: string;
    fieldName: string;
    keys: Array<string>;
    children: Array<SBFLeaf | SBFNode>;
    identifiers: Array<string>;
    get type(): string;
    constructor(props: any);
    getParent(): SBFRoot | SBFNode;
    setParent(parent: any): void;
    getTree(): SBFTree;
    getAdapter(): import("../../adapters").MemoryAdapter | import("../../adapters").FsAdapter;
    attachLeaf(index: any, leaf: any): Promise<void>;
    find(value: any): Promise<{
        identifiers: any[];
        keys: any[];
    }>;
    findLowerThan(value: any, includeKey?: boolean): Promise<{
        identifiers: any[];
        keys: any[];
    }>;
    findGreaterThan(value: any, includeKey?: boolean): Promise<{
        identifiers: any[];
        keys: any[];
    }>;
    getAll(): Promise<unknown>;
    getFillStatus(): Promise<FillStatus>;
    getTreeOptions(): {
        order: number;
        fillFactor: number;
        verbose: boolean;
    };
    insert(identifier: any, value: any): Promise<void>;
    insertReferenceKey(value: any): Promise<number>;
    isFull(): boolean;
    mergeUp(): Promise<void>;
    remove(remCmd: any): Promise<void>;
    replace(identifier: any, value: any): Promise<void>;
    split(): Promise<void>;
    toJSON(): any;
}
//# sourceMappingURL=SBFNode.d.ts.map