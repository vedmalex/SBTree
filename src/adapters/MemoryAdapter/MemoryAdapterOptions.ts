import { MemoryAdapterDocuments } from './MemoryAdapter';
import { AdapterLeafs } from "./MemoryAdapterLeafs";


export type MemoryAdapterOptions = {
  leafs: AdapterLeafs;
  documents: MemoryAdapterDocuments;
};
