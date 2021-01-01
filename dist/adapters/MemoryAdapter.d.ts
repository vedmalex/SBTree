import LeafData from './LeafData';
import LeafMeta from './LeafMeta';
import { AdapterLeafs } from './FsAdapter';
export declare type MemoryAdapterOptions = {
    leafs: AdapterLeafs;
    documents: MemoryAdapterDocuments;
};
export declare type MemoryAdapterDocuments = unknown;
export declare class MemoryAdapter {
    private emitter;
    leafs: AdapterLeafs;
    documents: MemoryAdapterDocuments;
    isReady: boolean;
    get name(): string;
    attachParent: false;
    constructor(props?: MemoryAdapterOptions);
    on(event: string | symbol, listener: (...args: any[]) => void): void;
    once(event: string | symbol, listener: (...args: any[]) => void): void;
    emit(event: string | symbol, ...args: any[]): boolean;
    addInLeaf(leafName: any, identifier: any, value: any): Promise<boolean>;
    createLeaf(leafName: any): Promise<void>;
    getAllInLeaf(leafId: any): Promise<any>;
    getLeftInLeaf(leafId: any): Promise<any>;
    getRightInLeaf(leafId: any): Promise<any>;
    findInLeaf(leafId: any, value: any, op?: string): Promise<{
        identifiers: any[];
        keys: any[];
    }>;
    getDocument(identifier: any): Promise<any>;
    openLeaf(leafName: any): Promise<{
        id?: string;
        name?: string;
        meta: LeafMeta;
        data?: LeafData;
    }>;
    removeDocument(identifier: any): void;
    removeInLeaf(leafId: any, identifier: any): any[];
    replaceDocument(doc: any): void;
    replaceInLeaf(leafId: any, identifier: any, value: any): void;
    saveDocument(doc: any): void;
    splitLeaf(sourceLeaf: any, siblingLeaf: any): Promise<string>;
}
//# sourceMappingURL=MemoryAdapter.d.ts.map