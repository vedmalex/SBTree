"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveCommand = void 0;
class RemoveCommand {
    constructor(res) {
        this._id = res._id;
        this.fields = Object.keys(res).filter((_f) => _f !== '_id');
        this.query = res;
    }
}
exports.RemoveCommand = RemoveCommand;
//# sourceMappingURL=RemoveCommand.js.map