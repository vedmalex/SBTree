import { AdapterOptionsDocuments } from './AdapterOptionsDocuments'
import { AdapterOptionsLeafs } from './AdapterOptionsLeafs'
import { DataStoreOptions } from './DataStoreOptions';

export type MemoryAdapterOptions = DataStoreOptions & AdapterOptionsDocuments & AdapterOptionsLeafs
