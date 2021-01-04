import { SBFNode } from '../SBFNode/SBFNode';
import { SBFRoot } from '../SBFRoot/SBFRoot';
import { FillStatus } from '../common/FillStatus';
export declare class SBFLeaf {
    private parent;
    id: string;
    fieldName: string;
    get type(): string;
    constructor(props: any);
    getParent(): SBFNode | SBFRoot;
    setParent(parent: any): void;
    insert(identifier: any, value: any): Promise<any>;
    find(value: any): Promise<any>;
    getAll(): Promise<any>;
    getFillStatus(): Promise<FillStatus>;
    getLeft(): Promise<any>;
    getRight(): Promise<any>;
    findLowerThan(value: any, includeKey?: boolean): Promise<any>;
    findGreaterThan(value: any, includeKey?: boolean): Promise<any>;
    isFillFactorFilled(): Promise<any>;
    isFull(): Promise<any>;
    mergeWithSiblings(): Promise<any>;
    redistribute(): Promise<any>;
    remove(remCmd: any): Promise<any>;
    replace(identifier: any, value: any): Promise<any>;
    split(): Promise<any>;
    toJSON(): any;
}
//# sourceMappingURL=SBFLeaf.d.ts.map