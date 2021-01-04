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
    addInLeaf(leafName: any, identifier: any, value: any): Promise<any>;
    createLeaf(leafName: any): Promise<any>;
    getAllInLeaf(leafId: any): Promise<any>;
    getLeftInLeaf(leafId: any): Promise<any>;
    getRightInLeaf(leafId: any): Promise<any>;
    findInLeaf(leafId: any, value: any, op?: string): Promise<any>;
    getDocument(identifier: any): Promise<any>;
    openLeaf(leafName: any): Promise<any>;
    removeDocument(identifier: any): any;
    removeInLeaf(leafId: any, identifier: any): any;
    replaceDocument(doc: any): any;
    replaceInLeaf(leafId: any, identifier: any, value: any): any;
    saveDocument(doc: any): any;
    splitLeaf(sourceLeaf: any, siblingLeaf: any): Promise<any>;
}
//# sourceMappingURL=MemoryAdapter.d.ts.map