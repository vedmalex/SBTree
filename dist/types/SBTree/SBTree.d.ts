import { MemoryAdapter } from '../../adapters';
import { SBFTree } from '../SBFTree/SBFTree';
import FsAdapter from '../../adapters/FsAdapter/FsAdapter';
import { Emittable } from '../../adapters/common/Emittable';
import { SBTreeState } from './SBTreeState';
import { SBTreeOptions } from './SBTreeOptions';
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
    getAdapter(): FsAdapter | MemoryAdapter;
    isReady(): Promise<unknown>;
    setFieldTree(_fieldTreeOpts: {
        fieldName: any;
        id?: any;
        root?: any;
    }): any;
    deleteDocuments(query: any): Promise<any>;
    findDocuments(params: any): Promise<any>;
    getDocument(identifier: any): Promise<any>;
    getFieldTree(fieldName: any): any;
    insertDocuments(documents: any): Promise<any>;
    replaceDocuments(documents: any): Promise<any>;
    loadState(state: any): any;
    toJSON(): any;
}
//# sourceMappingURL=SBTree.d.ts.map