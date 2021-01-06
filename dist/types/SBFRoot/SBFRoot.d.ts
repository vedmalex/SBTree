import { SBFLeaf } from '../SBFLeaf/SBFLeaf';
import { SBFNode } from '../SBFNode/SBFNode';
import { SBFTree } from '../SBFTree/SBFTree';
import { FillStatus } from '../common/FillStatus';
import { PersistenceAdapter } from '../../adapters/common/PersistenceAdapter';
import { PossibleKeys } from '../../adapters/common/PossibleKeys';
import { OperationResult } from '../common/OperationResult';
export declare type SBFRootOptions = {
    id?: string;
    tree: SBFTree;
    fieldName: string;
    keys: Array<PossibleKeys>;
    identifiers?: Array<string>;
    children?: Array<SBFLeaf | SBFNode>;
};
export declare class SBFRoot {
    private tree;
    get type(): string;
    id: string;
    fieldName: string;
    keys: Array<PossibleKeys>;
    identifiers: Array<string>;
    children: Array<SBFLeaf | SBFNode>;
    constructor(props: SBFRootOptions);
    getTree(): SBFTree;
    getAdapter(): PersistenceAdapter;
    getTreeOptions(): {
        order: number;
        fillFactor: number;
        verbose: boolean;
    };
    attachLeaf(index: any, leaf: any): Promise<void>;
    find(value: any, operator?: string): Promise<any>;
    getAll(): Promise<OperationResult>;
    get(identifier: any): Promise<import("../../adapters/common/data/Document").Document>;
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
        keys: PossibleKeys[];
        children: any[];
    };
}
//# sourceMappingURL=SBFRoot.d.ts.map