import { MemoryAdapter } from '../../adapters';
import { SBFTree } from '../SBFTree/SBFTree';
import FsAdapter from '../../adapters/FsAdapter/FsAdapter';
import { Emittable } from '../../adapters/common/Emittable';
import { SBTreeState } from './SBTreeState';
import { SBTreeOptions } from './SBTreeOptions';
import { Document } from '../common/Document';
export declare class SBTree extends Emittable {
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
    getOptions(): {
        order: number;
        fillFactor: number;
        verbose: boolean;
    };
    getAdapter(): MemoryAdapter | FsAdapter;
    isReady(): Promise<unknown>;
    setFieldTree(_fieldTreeOpts: {
        fieldName: any;
        id?: any;
        root?: any;
    }): void;
    deleteDocuments(query: any): Promise<Document[]>;
    findDocuments(params: any): Promise<Document[]>;
    getDocument(identifier: any): Promise<any>;
    getFieldTree(fieldName: any): SBFTree;
    insertDocuments(documents: any): Promise<Document[]>;
    replaceDocuments(documents: any): Promise<any[]>;
    loadState(state: any): boolean;
    toJSON(): any;
}
//# sourceMappingURL=SBTree.d.ts.map