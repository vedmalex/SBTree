import { SBFTree } from '../SBFTree';
export declare function toJSON(this: SBFTree): {
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
        keys: import("../../../adapters/MemoryAdapter/MemoryAdapter").PossibleKeys[];
        children: any[];
    };
};
//# sourceMappingURL=toJSON.d.ts.map