import { FSLock } from 'fslockjs';
import LeafMeta from './LeafMeta';
import LeafData from './LeafData';
import { SBTree } from '../types/SBTree';
export declare type FsAdapterOptionAutoLoadCallback = () => void;
export declare type FsAdaptepOptions = {
    path: string;
    autoSave: boolean;
    autoSaveInterval: number;
    autoLoad: boolean;
    autoLoadCallback?: FsAdapterOptionAutoLoadCallback;
    parent?: unknown;
    leafs?: AdapterLeafs;
};
export declare const defaultFsProps: FsAdaptepOptions;
export declare type LeafId = string;
export declare type AdapterLeafs = {
    [leafId: string]: {
        id?: LeafId;
        name?: string;
        meta: LeafMeta;
        data?: LeafData;
    };
};
export declare type FsAdapterLastChange = number;
export declare type FsAdapterLastSave = number;
export default class FsAdapter {
    private emitter;
    private parent;
    queue: FSLock;
    leafs: AdapterLeafs;
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
    on(event: string | symbol, listener: (...args: any[]) => void): void;
    once(event: string | symbol, listener: (...args: any[]) => void): void;
    emit(event: string | symbol, ...args: any[]): boolean;
    addInLeaf(leafName: any, identifier: any, value: any): Promise<void>;
    attachParent(parent: SBTree): Promise<void>;
    createLeaf(leafId: any): Promise<void>;
    findInLeaf(leafId: any, value: any, op?: string): any;
    getAllInLeaf(leafId: any): any;
    getLeftInLeaf(leafId: any): any;
    getRightInLeaf(leafId: any): Promise<any>;
    getDocument(identifier: any): Promise<any>;
    insertSortedInLeaf(leafId: any, value: any): any;
    loadDatabase(): Promise<void>;
    openDocument(identifer: any): Promise<{}>;
    openLeaf(leafName: any): Promise<{
        id?: string;
        name?: string;
        meta: LeafMeta;
        data?: LeafData;
    }>;
    removeDocument(identifier: any): Promise<void>;
    openLeafData(leafName: any): Promise<LeafData>;
    replaceDocument(doc: any): Promise<void>;
    replaceInLeaf(leafId: any, identifier: any, value: any): Promise<number>;
    saveDatabase(): Promise<void>;
    saveDocument(doc: any): Promise<void>;
    saveLeafData(leafName: any, data: LeafData): Promise<{}>;
    splitLeaf(sourceLeaf: any, siblingLeaf: any): Promise<string>;
    updateDocument(_doc: any): Promise<{}>;
}
//# sourceMappingURL=FsAdapter.d.ts.map