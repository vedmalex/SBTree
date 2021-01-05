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
    insert(identifier: any, value: any): Promise<void>;
    find(value: any): Promise<import("../common/OperationResult").OperationResult>;
    getAll(): Promise<import("../common/OperationResult").OperationResult>;
    getFillStatus(): Promise<FillStatus>;
    getLeft(): Promise<import("../../adapters/common/SiblingsResult").SiblingsResult>;
    getRight(): Promise<import("../../adapters/common/SiblingsResult").SiblingsResult>;
    findLowerThan(value: any, includeKey?: boolean): Promise<import("../common/OperationResult").OperationResult>;
    findGreaterThan(value: any, includeKey?: boolean): Promise<import("../common/OperationResult").OperationResult>;
    isFillFactorFilled(): any;
    isFull(): any;
    mergeWithSiblings(): Promise<boolean>;
    redistribute(): Promise<true>;
    remove(remCmd: any): Promise<boolean>;
    replace(identifier: any, value: any): Promise<void>;
    split(): Promise<void>;
    toJSON(): {
        fieldName: string;
        id: string;
        type: string;
    };
}
//# sourceMappingURL=SBFLeaf.d.ts.map