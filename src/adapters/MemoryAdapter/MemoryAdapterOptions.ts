import { MemoryAdapterDocuments } from './MemoryAdapter';
import { MemoryAdapterLeafs } from "./MemoryAdapterLeafs";


export type MemoryAdapterOptions = {
  leafs: MemoryAdapterLeafs;
  documents: MemoryAdapterDocuments;
};
