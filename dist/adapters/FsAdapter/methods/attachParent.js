"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const autosave_1 = __importDefault(require("../../common/ops/autosave"));
async function attachParent(source) {
    this.datasource = source;
    if (this.autoLoad) {
        try {
            await this.loadDatabase();
            if (this.autoLoadCallback && typeof this.autoLoadCallback === 'function') {
                await this.autoLoadCallback();
            }
        }
        catch (e) {
            console.error(e);
            process.exit(1);
        }
    }
    if (this.autoSave === true) {
        autosave_1.default(this);
    }
    this.emit('ready');
}
exports.default = attachParent;
//# sourceMappingURL=attachParent.js.map