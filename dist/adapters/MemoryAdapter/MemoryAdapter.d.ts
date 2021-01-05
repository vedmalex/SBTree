import { MemoryAdapterOptions } from './MemoryAdapterOptions';
import { MemoryAdapterLeafs } from './MemoryAdapterLeafs';
import { Emittable } from '../common/Emittable';
export declare type MemoryAdapterDocuments = unknown;
export declare class MemoryAdapter extends Emittable {
    leafs: MemoryAdapterLeafs;
    documents: MemoryAdapterDocuments;
    isReady: boolean;
    get name(): string;
    attachParent: false;
    constructor(props?: MemoryAdapterOptions);
    addInLeaf(leafName: any, identifier: any, value: any): Promise<void>;
    createLeaf(leafName: any): Promise<void>;
    getAllInLeaf(leafId: any): Promise<any>;
    getLeftInLeaf(leafId: any): Promise<any>;
    getRightInLeaf(leafId: any): Promise<any>;
    findInLeaf(leafId: any, value: any, op?: string): any;
    getDocument(identifier: any): Promise<any>;
    openLeaf(leafName: any): Promise<{
        meta: import("../common/LeafMeta").default;
        data: import("../common/LeafData").default;
    }>;
    removeDocument(identifier: any): void;
    removeInLeaf(leafId: any, identifier: any): Promise<any[]>;
    replaceDocument(doc: any): void;
    replaceInLeaf(leafId: any, identifier: any, value: any): void;
    saveDocument(doc: any): void;
    splitLeaf(sourceLeaf: any, siblingLeaf: any): Promise<string | number | boolean>;
}
//# sourceMappingURL=MemoryAdapter.d.ts.map