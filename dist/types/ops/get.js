"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get = void 0;
const cloneDeep = require('lodash.clonedeep');
async function get(identifier) {
    if (!identifier)
        throw new Error('Expected an objectid');
    const res = await this.adapter.getDocument(identifier);
    return cloneDeep(res) || null;
}
exports.get = get;
//# sourceMappingURL=get.js.map