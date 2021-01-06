import { SBFTree } from '../SBFTree/SBFTree';
import { SBTreeOptions } from './SBTreeOptions';
import { PersistenceAdapter } from '../../adapters/common/PersistenceAdapter';
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
    deleteDocuments(query: any): Promise<import("../../adapters/common/data/Document").Document[]>;
    findDocuments(params: any): Promise<import("../../adapters/common/data/Document").Document[]>;
    getDocument(identifier: any): Promise<import("../../adapters/common/data/Document").Document>;
    getFieldTree(fieldName: any): SBFTree;
    insertDocuments(documents: any): Promise<import("../../adapters/common/data/Document").Document[]>;
    replaceDocuments(documents: any): Promise<any[]>;
    loadState(state: ReturnType<typeof SBTree.prototype.toJSON>): boolean;
    toJSON(): {
        order: number;
        fillFactor: number;
        verbose: boolean;
        id: string;
        size: number;
        uniques: string[];
        exclude: string[];
        fieldTrees: {
            [key: string]: {
                fieldName: string;
                id: string;
                fillFactor: number;
                isUnique: boolean;
                verbose: boolean;
                order: number;
                root: {
                    type: string;
                    id: string;
                    fieldName: string;
                    identifiers: string[];
                    keys: import("../../adapters/common/PossibleKeys").PossibleKeys[];
                    children: any[];
                };
            };
        };
    };
}
//# sourceMappingURL=SBTree.d.ts.map