import { AdapterOptionsLeafs } from './AdapterOptionsLeafs';
import { AdapterOptionsDocuments } from './AdapterOptionsDocuments';
import { DataStore } from '../../../adapters/common/data/DataStore';
import { DataStoreOptions } from './DataStoreOptions';
import { FsAdaptepOptions } from './FsAdaptepOptions';
import { AdapterLeafStorage, AdapterDocumentStorage } from '../../MemoryAdapter/MemoryAdapter';
import { SBTree } from '../../../types/SBTree/SBTree';
export declare function parseLeafs(this: AdapterLeafStorage, props: AdapterOptionsLeafs): void;
export declare function parseDocments(this: AdapterDocumentStorage, props: AdapterOptionsDocuments): void;
export declare const defaultFsProps: FsAdaptepOptions;
export declare function initWith(this: DataStore, tree: SBTree): Promise<boolean>;
export declare function parseDataStore(this: DataStore, props: DataStoreOptions): void;
//# sourceMappingURL=parseLeafs.d.ts.map