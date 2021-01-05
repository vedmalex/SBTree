import { FSLock } from 'fslockjs';
import LeafData from '../common/LeafData';
import { SBTree } from '../../types/SBTree/SBTree';
import { FsAdaptepOptions } from './FsAdaptepOptions';
import { FsAdapterOptionAutoLoadCallback } from './FsAdapterOptionAutoLoadCallback';
import { FsAdapterLeafs } from './FsAdapterLeafs';
import { Emittable } from '../common/Emittable';
export declare const defaultFsProps: FsAdaptepOptions;
export declare type LeafId = string;
export declare type FsAdapterLastChange = number;
export declare type FsAdapterLastSave = number;
export default class FsAdapter extends Emittable {
    private parent;
    queue: FSLock;
    leafs: FsAdapterLeafs;
    path: string;
    autoSave: boolean;
    autoSaveInterval: number;
    autoLoad: boolean;
    autoLoadCallback: FsAdapterOptionAutoLoadCallback;
    autoLoadForceOverwrite: boolean;
    isReady: boolean;
    lastChange: FsAdapterLastChange;
    lastSave: FsAdapterLastSave;
    get name(): string;
    constructor(props?: FsAdaptepOptions);
    setParent(parent: any): void;
    getParent(): SBTree;
    attachParent(parent: SBTree): Promise<void>;
    addInLeaf(leafName: any, identifier: any, value: any): Promise<void>;
    createLeaf(leafId: any): Promise<void>;
    findInLeaf(leafId: any, value: any, op?: string): Promise<{
        identifiers: Array<any>;
        keys: Array<any>;
    }>;
    getAllInLeaf(leafId: any): any;
    getLeftInLeaf(leafId: any): any;
    getRightInLeaf(leadId: any): Promise<any>;
    getDocument(identifier: any): Promise<any>;
    insertSortedInLeaf(leafId: any, value: any): any;
    loadDatabase(): Promise<void>;
    openDocument(identifer: any): Promise<{}>;
    openLeaf(leafName: any): Promise<{
        id: string;
        meta: import("../common/LeafMeta").default;
    }>;
    removeDocument(identifier: any): Promise<void>;
    openLeafData(leafName: any): Promise<import("../common/LeafData").LeafDataProps>;
    replaceDocument(doc: any): Promise<void>;
    replaceInLeaf(leafId: any, identifier: any, value: any): Promise<number>;
    saveDatabase(): Promise<void>;
    saveDocument(doc: any): Promise<void>;
    saveLeafData(leafName: string, data: LeafData): Promise<{}>;
    splitLeaf(sourceLeaf: any, siblingLeaf: any): Promise<string | number | boolean>;
    updateDocument(_doc: any): Promise<{}>;
    removeInLeaf(leafId: any, identifier: any): Promise<any[]>;
}
//# sourceMappingURL=FsAdapter.d.ts.map