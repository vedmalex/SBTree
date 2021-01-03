import { SBFNode } from './SBFNode';
import { SBFRoot } from './SBFRoot';
export declare class SBFLeaf {
    private parent;
    id: string;
    fieldName: string;
    get type(): string;
    constructor(props: any);
    getParent(): SBFRoot | SBFNode;
    setParent(parent: any): void;
    insert(identifier: any, value: any): Promise<void>;
    find(value: any): Promise<any>;
    getAll(): Promise<any>;
    getFillStatus(): any;
    getLeft(): Promise<any>;
    getRight(): Promise<any>;
    findLowerThan(value: any, includeKey?: boolean): Promise<any>;
    findGreaterThan(value: any, includeKey?: boolean): Promise<any>;
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