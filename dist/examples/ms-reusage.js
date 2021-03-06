"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.start = void 0;
const SBTree_1 = require("../types/SBTree/SBTree");
const time_1 = __importDefault(require("../utils/time"));
const MemoryAdapterWithStore_1 = require("../adapters/MemoryAdapter/MemoryAdapterWithStore");
const tree = new SBTree_1.SBTree({
    adapter: new MemoryAdapterWithStore_1.MemoryAdapterWithStore({ path: '.dbms', autoSave: true }),
    order: 3,
    uniques: ['email'],
});
const timer = new time_1.default();
const start = async function () {
    timer.start();
    console.log("-- Find : {country:{$in:['Greenland']}}");
    console.log(await tree.findDocuments({ age: { $gt: 60 } }));
    timer.stop();
    console.log(timer.duration.s, 'seconds');
};
exports.start = start;
tree.onReady(() => exports.start().then((_) => 'closed'));
//# sourceMappingURL=ms-reusage.js.map