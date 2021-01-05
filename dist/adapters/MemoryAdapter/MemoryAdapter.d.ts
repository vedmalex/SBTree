import { MemoryAdapterOptions } from './MemoryAdapterOptions';
import { AdapterLeafs, AdapterLeaf } from './MemoryAdapterLeafs';
import { Emittable } from '../common/Emittable';
import { Document } from '../../types/common/Document';
import { SBTree } from '../../types/SBTree/SBTree';
import { OperationResult } from '../../types/common/OperationResult';
import { SiblingsResult } from '../common/SiblingsResult';
import { RemoveInLeafResult } from '../common/RemoveInLeafResult';
import { SBFLeaf } from '../../types/SBFLeaf/SBFLeaf';
export declare type MemoryAdapterDocuments = {
    [key: string]: Document;
};
export declare type PossibleKeys = string | number | boolean;
export declare type QueryOperations = "$eq" | "$in" | "$nin" | "$gte" | "$lte" | "$gt" | "$lt";
export interface PersistenceAdapter {
    readonly isReady: boolean;
    initWith: (tree: SBTree) => Promise<boolean>;
    getDocument(identifier: string): Promise<Document>;
    removeDocument(identifier: string): Promise<void>;
    replaceDocument(doc: Document): Promise<void>;
    saveDocument(doc: Document): Promise<void>;
    openLeaf(leafName: any): Promise<AdapterLeaf>;
    addInLeaf(leafName: string, identifier: string, value: PossibleKeys): Promise<number>;
    replaceInLeaf(leafId: string, identifier: string, value: PossibleKeys): Promise<number>;
    createLeaf(leafName: string): Promise<void>;
    splitLeaf(sourceLeaf: SBFLeaf, siblingLeaf: SBFLeaf): Promise<PossibleKeys>;
    getRightInLeaf(leafId: string): Promise<SiblingsResult>;
    getLeftInLeaf(leafId: string): Promise<SiblingsResult>;
    findInLeaf(leafId: string, value: PossibleKeys, op?: QueryOperations): Promise<OperationResult>;
    getAllInLeaf(leafId: string): Promise<OperationResult>;
    removeInLeaf(leafId: any, identifier: any): Promise<Array<RemoveInLeafResult>>;
}
export declare class MemoryAdapter extends Emittable implements PersistenceAdapter {
    leafs: AdapterLeafs;
    documents: MemoryAdapterDocuments;
    tree: SBTree;
    isReady: boolean;
    initWith(tree: SBTree): Promise<boolean>;
    constructor(props?: MemoryAdapterOptions);
    addInLeaf(leafName: any, identifier: any, value: any): Promise<number>;
    createLeaf(leafName: any): Promise<void>;
    getAllInLeaf(leafId: any): Promise<OperationResult>;
    getLeftInLeaf(leafId: any): Promise<SiblingsResult>;
    getRightInLeaf(leafId: any): Promise<SiblingsResult>;
    findInLeaf(leafId: any, value: any, op?: string): any;
    getDocument(identifier: any): Promise<Document>;
    openLeaf(leafName: any): Promise<AdapterLeaf>;
    removeDocument(identifier: any): Promise<void>;
    removeInLeaf(leafId: any, identifier: any): Promise<RemoveInLeafResult[]>;
    replaceDocument(doc: any): Promise<void>;
    replaceInLeaf(leafId: any, identifier: any, value: any): Promise<number>;
    saveDocument(doc: any): Promise<void>;
    splitLeaf(sourceLeaf: any, siblingLeaf: any): Promise<PossibleKeys>;
}
//# sourceMappingURL=MemoryAdapter.d.ts.map