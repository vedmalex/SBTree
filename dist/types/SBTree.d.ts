import { MemoryAdapter } from '../adapters';
import { SBFTree } from './SBFTree';
import FsAdapter from '../adapters/FsAdapter';
export declare type Document = {
    _id: string;
    [key: string]: any;
};
export declare type SBTreeState = {
    isReady: boolean;
};
export declare type SBTreeOptions = {
    id: string;
    adapter: MemoryAdapter | FsAdapter;
    order: number;
    fillFactor: number;
    verbose: boolean;
    fieldTrees: {
        [key: string]: SBFTree;
    };
    size: number;
    exclude: Array<string>;
    uniques: Array<string>;
};
export declare class SBTree {
    private emitter;
    state: SBTreeState;
    adapter: MemoryAdapter | FsAdapter;
    order: number;
    fillFactor: number;
    size: number;
    exclude: Array<string>;
    uniques: Array<string>;
    verbose: boolean;
    id: string;
    fieldTrees: {
        [key: string]: SBFTree;
    };
    constructor(props: Partial<SBTreeOptions>);
    on(event: string | symbol, listener: (...args: any[]) => void): void;
    once(event: string | symbol, listener: (...args: any[]) => void): void;
    emit(event: string | symbol, ...args: any[]): boolean;
    getOptions(): {
        order: number;
        fillFactor: number;
        verbose: boolean;
    };
    isReady(): Promise<unknown>;
    setFieldTree(_fieldTreeOpts: any): void;
    deleteDocuments(query: any): Promise<any>;
    findDocuments(params: any): Promise<any>;
    getAdapter(): MemoryAdapter | FsAdapter;
    getDocument(identifier: any): Promise<any>;
    getFieldTree(fieldName: any): SBFTree;
    insertDocuments(documents: Partial<Document> | Partial<Document>[]): Promise<Document[]>;
    replaceDocuments(documents: any): Promise<any[]>;
    loadState(state: any): boolean;
    toJSON(): any;
}
//# sourceMappingURL=SBTree.d.ts.map