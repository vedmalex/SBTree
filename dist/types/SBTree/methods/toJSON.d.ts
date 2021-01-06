import { SBTree } from '../SBTree';
export declare function toJSON(this: SBTree): {
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
                keys: import("../../../adapters/common/PossibleKeys").PossibleKeys[];
                children: any[];
            };
        };
    };
};
//# sourceMappingURL=toJSON.d.ts.map