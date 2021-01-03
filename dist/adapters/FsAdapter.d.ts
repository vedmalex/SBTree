import { FSLock } from 'fslockjs';
import LeafMeta from './LeafMeta';
import LeafData from './LeafData';
import { SBTree } from '../types/SBTree';
export declare type FsAdapterOptionAutoLoadCallback = () => void;
export declare type FsAdaptepOptions = {
    path: string;
    autoSave?: boolean;
    autoSaveInterval?: number;
    autoLoad?: boolean;
    autoLoadCallback?: FsAdapterOptionAutoLoadCallback;
    parent?: unknown;
    leafs?: FsAdapterLeafs;
};
export declare const defaultFsProps: FsAdaptepOptions;
export declare type LeafId = string;
export declare type FsAdapterLeafs = {
    [leafId: string]: {
        id: LeafId;
        meta: LeafMeta;
    };
};
export declare type FsAdapterLastChange = number;
export declare type FsAdapterLastSave = number;
export declare type EventListeners = {
    event: string | symbol;
    listener: (...args: any[]) => void;
    type: 'on' | 'once';
};
export default class FsAdapter {
    private emitter;
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
    private listeners;
    get name(): string;
    constructor(props?: FsAdaptepOptions);
    setParent(parent: any): void;
    getParent(): SBTree;
    on(event: string | symbol, listener: (...args: any[]) => void): void;
    once(event: string | symbol, listener: (...args: any[]) => void): void;
    close(): void;
    emit(event: string | symbol, ...args: any[]): boolean;
    attachParent(parent: SBTree): Promise<any>;
    addInLeaf(leafName: any, identifier: any, value: any): Promise<any>;
    createLeaf(leafId: any): Promise<any>;
    findInLeaf(leafId: any, value: any, op?: string): Promise<{
        identifiers: Array<any>;
        keys: Array<any>;
    }>;
    getAllInLeaf(leafId: any): Promise<any>;
    getLeftInLeaf(leafId: any): Promise<any>;
    getRightInLeaf(leadId: any): Promise<any>;
    getDocument(identifier: any): Promise<any>;
    insertSortedInLeaf(leafId: any, value: any): Promise<any>;
    loadDatabase(): Promise<any>;
    openDocument(identifer: any): Promise<any>;
    openLeaf(leafName: any): Promise<any>;
    removeDocument(identifier: any): Promise<any>;
    openLeafData(leafName: any): Promise<any>;
    replaceDocument(doc: any): Promise<any>;
    replaceInLeaf(leafId: any, identifier: any, value: any): Promise<any>;
    saveDatabase(): Promise<any>;
    saveDocument(doc: any): Promise<any>;
    saveLeafData(leafName: string, data: LeafData): Promise<any>;
    splitLeaf(sourceLeaf: any, siblingLeaf: any): Promise<any>;
    updateDocument(_doc: any): Promise<any>;
    removeInLeaf(leafId: any, identifier: any): Promise<any[]>;
}
//# sourceMappingURL=FsAdapter.d.ts.map