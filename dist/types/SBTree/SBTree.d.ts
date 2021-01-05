import { SBFTree } from '../SBFTree/SBFTree';
import { SBTreeOptions } from './SBTreeOptions';
import { PersistenceAdapter } from "../../adapters/common/PersistenceAdapter";
export declare class SBTree {
    adapter: PersistenceAdapter;
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
    protected isReady: Promise<boolean>;
    onReady(process?: () => any): Promise<any>;
    constructor(props: Partial<SBTreeOptions>);
    getOptions(): {
        order: number;
        fillFactor: number;
        verbose: boolean;
    };
    getAdapter(): PersistenceAdapter;
    setFieldTree(_fieldTreeOpts: {
        fieldName: any;
        id?: any;
        root?: any;
    }): void;
    deleteDocuments(query: any): Promise<import("../common/Document").Document[]>;
    findDocuments(params: any): Promise<import("../common/Document").Document[]>;
    getDocument(identifier: any): Promise<import("../common/Document").Document>;
    getFieldTree(fieldName: any): SBFTree;
    insertDocuments(documents: any): Promise<import("../common/Document").Document[]>;
    replaceDocuments(documents: any): Promise<any[]>;
    loadState(state: any): boolean;
    toJSON(): any;
}
//# sourceMappingURL=SBTree.d.ts.map