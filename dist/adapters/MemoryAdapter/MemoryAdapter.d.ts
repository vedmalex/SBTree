import { MemoryAdapterOptions } from './MemoryAdapterOptions';
import { AdapterLeafs } from './MemoryAdapterLeafs';
import { SBTree } from '../../types/SBTree/SBTree';
import { MemoryAdapterDocuments } from './MemoryAdapterDocuments';
import { PersistenceAdapter } from '../common/PersistenceAdapter';
export declare class MemoryAdapter implements PersistenceAdapter {
    leafs: AdapterLeafs;
    documents: MemoryAdapterDocuments;
    tree: SBTree;
    isReady: boolean;
    initWith(tree: SBTree): Promise<boolean>;
    constructor(props?: MemoryAdapterOptions);
    addInLeaf(leafName: any, identifier: any, value: any): Promise<number>;
    createLeaf(leafName: any): Promise<void>;
    getAllInLeaf(leafId: any): Promise<import("../../types/common/OperationResult").OperationResult>;
    getLeftInLeaf(leafId: any): Promise<import("../common/SiblingsResult").SiblingsResult>;
    getRightInLeaf(leafId: any): Promise<import("../common/SiblingsResult").SiblingsResult>;
    findInLeaf(leafId: any, value: any, op?: string): any;
    getDocument(identifier: any): Promise<import("../../types/common/Document").Document>;
    openLeaf(leafName: any): Promise<import("./MemoryAdapterLeafs").AdapterLeaf>;
    removeDocument(identifier: any): Promise<void>;
    removeInLeaf(leafId: any, identifier: any): Promise<import("../common/RemoveInLeafResult").RemoveInLeafResult[]>;
    replaceDocument(doc: any): Promise<void>;
    replaceInLeaf(leafId: any, identifier: any, value: any): Promise<number>;
    saveDocument(doc: any): Promise<void>;
    splitLeaf(sourceLeaf: any, siblingLeaf: any): Promise<import("../common/PossibleKeys").PossibleKeys>;
}
//# sourceMappingURL=MemoryAdapter.d.ts.map