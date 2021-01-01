export declare type FieldTrees = unknown;
export declare type FieldTreesRoot = unknown;
export declare type FieldNode = {
    id: string;
    order: number;
    fieldName: string;
    fieldTrees: FieldTrees;
    root: FieldTreesRoot;
};
declare function draw(fieldNode: FieldNode, preventConsole?: boolean): Promise<any[]>;
declare const _default: {
    draw: typeof draw;
};
export default _default;
//# sourceMappingURL=ascii.d.ts.map