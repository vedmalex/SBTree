"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemoryAdapter = exports.FsAdapter = void 0;
const FsAdapter_1 = __importDefault(require("./FsAdapter"));
exports.FsAdapter = FsAdapter_1.default;
const MemoryAdapter_1 = require("./MemoryAdapter");
Object.defineProperty(exports, "MemoryAdapter", { enumerable: true, get: function () { return MemoryAdapter_1.MemoryAdapter; } });
exports.default = { FsAdapter: FsAdapter_1.default, MemoryAdapter: MemoryAdapter_1.MemoryAdapter };
//# sourceMappingURL=index.js.map