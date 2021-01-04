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
    getParent(): SBFNode | SBFRoot;
    setParent(parent: any): void;
    getTree(): SBFTree;
    getAdapter(): import("../../adapters").FsAdapter | import("../../adapters").MemoryAdapter;
    attachLeaf(index: any, leaf: any): Promise<any>;
    find(value: any): Promise<any>;
    findLowerThan(value: any, includeKey?: boolean): Promise<any>;
    findGreaterThan(value: any, includeKey?: boolean): Promise<any>;
    getAll(): Promise<any>;
    getFillStatus(): Promise<FillStatus>;
    getTreeOptions(): any;
    insert(identifier: any, value: any): Promise<any>;
    insertReferenceKey(value: any): Promise<any>;
    isFull(): any;
    mergeUp(): Promise<any>;
    remove(remCmd: any): Promise<any>;
    replace(identifier: any, value: any): Promise<any>;
    split(): Promise<any>;
    toJSON(): any;
}
//# sourceMappingURL=SBFNode.d.ts.map