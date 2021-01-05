import { SBFNode } from '../../SBFNode/SBFNode';
import { SBFLeaf } from '../SBFLeaf';
export declare type Siblings = {
    left?: SBFLeaf | SBFNode;
    right?: SBFLeaf | SBFNode;
    leftStatus?: any;
    rightStatus?: any;
};
export declare function mergeWithSiblings(this: SBFLeaf): Promise<boolean>;
//# sourceMappingURL=mergeWithSiblings.d.ts.map