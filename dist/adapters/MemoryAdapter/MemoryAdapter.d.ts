import { MemoryAdapterOptions } from '../common/data/MemoryAdapterOptions';
import { AdapterLeafs } from '../common/data/AdapterLeafs';
import { SBTree } from '../../types/SBTree/SBTree';
import { AdapterDocuments } from '../common/data/AdapterDocuments';
import { PersistenceAdapter } from '../common/PersistenceAdapter';
export interface AdapterLeafStorage {
    isReady: boolean;
    leafs: AdapterLeafs;
}
export interface AdapterDocumentStorage {
    isReady: boolean;
    documents: AdapterDocuments;
}
export declare class MemoryAdapter implements PersistenceAdapter, AdapterLeafStorage, AdapterDocumentStorage {
    leafs: AdapterLeafs;
    documents: AdapterDocuments;
    tree: SBTree;
    isReady: boolean;
    initWith(tree: SBTree): Promise<any>;
    constructor(props?: MemoryAdapterOptions);
    addInLeaf(leafName: any, identifier: any, value: any): Promise<number>;
    createLeaf(leafName: any): Promise<void>;
    getAllInLeaf(leafId: any): Promise<import("../../types/common/OperationResult").OperationResult>;
    getLeftInLeaf(leafId: any): Promise<import("../common/SiblingsResult").SiblingsResult>;
    getRightInLeaf(leafId: any): Promise<import("../common/SiblingsResult").SiblingsResult>;
    findInLeaf(leafId: any, value: any, op?: string): any;
    getDocument(identifier: any): Promise<import("../common/data/Document").Document>;
    openLeaf(leafName: any): Promise<import("../common/data/AdapterLeafs").AdapterLeaf>;
    removeDocument(identifier: any): Promise<void>;
    removeInLeaf(leafId: any, identifier: any): Promise<import("../common/RemoveInLeafResult").RemoveInLeafResult[]>;
    replaceDocument(doc: any): Promise<void>;
    replaceInLeaf(leafId: any, identifier: any, value: any): Promise<number>;
    saveDocument(doc: any): Promise<void>;
    splitLeaf(sourceLeaf: any, siblingLeaf: any): Promise<import("../common/PossibleKeys").PossibleKeys>;
}
//# sourceMappingURL=MemoryAdapter.d.ts.map