"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.start = void 0;
const adapters_1 = require("../adapters");
const SBTree_1 = require("../types/SBTree");
const time_1 = __importDefault(require("../utils/time"));
const tree = new SBTree_1.SBTree({ adapter: new adapters_1.FsAdapter({ path: '.db', autoSave: false }), order: 3 });
const timer = new time_1.default();
const start = async function () {
    timer.start();
    console.log('-- Find : {country:{$in:[\'Greenland\']}}');
    console.log(await tree.findDocuments({ age: { $gt: 60 } }));
    timer.stop();
    await tree.adapter.saveDatabase();
    console.log(timer.duration.s, 'seconds');
};
exports.start = start;
tree.on('ready', exports.start);
//# sourceMappingURL=fs-reusage.js.map