"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const autosave_1 = __importDefault(require("./autosave"));
async function attachDataSource(source) {
    this.datasource = source;
    if (this.autoLoad) {
        try {
            await this.loadDatabase();
            if (this.autoLoadCallback &&
                typeof this.autoLoadCallback === 'function') {
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
}
exports.default = attachDataSource;
//# sourceMappingURL=attachParent.js.map