import LeafData from './LeafData';
import LeafMeta from './LeafMeta';
export declare type MemoryAdapterLeafs = {
    [leafId: string]: {
        meta: LeafMeta;
        data: LeafData;
    };
};
export declare type MemoryAdapterOptions = {
    leafs: MemoryAdapterLeafs;
    documents: MemoryAdapterDocuments;
};
export declare type MemoryAdapterDocuments = unknown;
export declare class MemoryAdapter {
    private emitter;
    private listeners;
    leafs: MemoryAdapterLeafs;
    documents: MemoryAdapterDocuments;
    isReady: boolean;
    get name(): string;
    attachParent: false;
    constructor(props?: MemoryAdapterOptions);
    on(event: string | symbol, listener: (...args: any[]) => void): void;
    once(event: string | symbol, listener: (...args: any[]) => void): void;
    close(): void;
    emit(event: string | symbol, ...args: any[]): boolean;
    addInLeaf(leafName: any, identifier: any, value: any): Promise<void>;
    createLeaf(leafName: any): Promise<void>;
    getAllInLeaf(leafId: any): Promise<any>;
    getLeftInLeaf(leafId: any): Promise<any>;
    getRightInLeaf(leafId: any): Promise<any>;
    findInLeaf(leafId: any, value: any, op?: string): any;
    getDocument(identifier: any): Promise<any>;
    openLeaf(leafName: any): Promise<{
        meta: LeafMeta;
        data: LeafData;
    }>;
    removeDocument(identifier: any): void;
    removeInLeaf(leafId: any, identifier: any): any[];
    replaceDocument(doc: any): void;
    replaceInLeaf(leafId: any, identifier: any, value: any): void;
    saveDocument(doc: any): void;
    splitLeaf(sourceLeaf: any, siblingLeaf: any): Promise<string>;
}
//# sourceMappingURL=MemoryAdapter.d.ts.map