"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const array_1 = require("../../../utils/array");
async function insertSortedInLeaf(leafId, value) {
    const data = await this.openLeafData(leafId);
    if (!data || !data.keys) {
        console.error(`leafId ${leafId} was not present, had to recreate`);
        await this.createLeaf(leafId);
        return this.insertSortedInLeaf(leafId, value);
    }
    const index = array_1.insertSorted(data.keys, value);
    await this.saveLeafData(leafId, data);
    return index;
}
exports.default = insertSortedInLeaf;
//# sourceMappingURL=insertSortedInLeaf.js.map