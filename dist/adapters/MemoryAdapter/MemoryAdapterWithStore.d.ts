import { MemoryAdapter } from './MemoryAdapter';
import { DataStore } from '../../adapters/common/data/DataStore';
import { DataStoreOptions } from '../common/data/DataStoreOptions';
import { MemoryAdapterOptions } from '../common/data/MemoryAdapterOptions';
import { FSLock } from 'fslockjs';
import { SBTree } from '../../types/SBTree/SBTree';
import { AdapterLeafs } from '../common/data/AdapterLeafs';
import { AdapterDocuments } from '../common/data/AdapterDocuments';
export declare type PersisteMemory = {
    leafs: AdapterLeafs;
    tree: ReturnType<typeof SBTree.prototype.toJSON>;
    documents: AdapterDocuments;
};
export declare class MemoryAdapterWithStore extends MemoryAdapter implements DataStore {
    constructor(props: MemoryAdapterOptions & DataStoreOptions);
    datasource: SBTree;
    queue: FSLock;
    saveDatabase(): Promise<void>;
    loadDatabase(): Promise<void>;
    autoSave: boolean;
    autoLoad: boolean;
    autoLoadCallback: () => Promise<void>;
    path: string;
    lastSave: number;
    lastChange: number;
    autoSaveInterval: number;
    autoLoadForceOverwrite: boolean;
    addInLeaf(leafName: any, identifier: any, value: any): Promise<number>;
    removeInLeaf(leafId: any, identifier: any): Promise<import("../common/RemoveInLeafResult").RemoveInLeafResult[]>;
    replaceInLeaf(leafId: any, identifier: any, value: any): Promise<number>;
    replaceDocument(doc: any): Promise<any>;
    removeDocument(identifier: any): Promise<void>;
    saveDocument(identifier: any): Promise<void>;
}
//# sourceMappingURL=MemoryAdapterWithStore.d.ts.map