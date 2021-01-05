import { MemoryAdapterDocuments } from "./MemoryAdapterDocuments";
import { AdapterLeafs } from "./MemoryAdapterLeafs";


export type MemoryAdapterOptions = {
  leafs: AdapterLeafs;
  documents: MemoryAdapterDocuments;
};
