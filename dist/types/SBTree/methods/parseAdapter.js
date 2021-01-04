"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseAdapter = void 0;
const adapters_1 = __importDefault(require("../../../adapters"));
function parseAdapter(_adapterOpts) {
    if (!adapters_1.default[_adapterOpts.name]) {
        throw new Error(`Unknown adapter ${_adapterOpts.name}`);
    }
    return new adapters_1.default[_adapterOpts.name](_adapterOpts);
}
exports.parseAdapter = parseAdapter;
//# sourceMappingURL=parseAdapter.js.map