"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.find = void 0;
const findEquals_1 = require("../ops/findEquals");
const findGreaterThan_1 = require("../ops/findGreaterThan");
const findLowerThan_1 = require("../ops/findLowerThan");
async function find(value, operator = '$eq') {
    const self = this;
    const p = [];
    const results = { identifiers: [], keys: [] };
    const valueKeys = Object.keys(value);
    if (valueKeys.includes('$in')) {
        return this.find.call(this, value.$in, '$in');
    }
    switch (operator) {
        case '$eq':
            return findEquals_1.findEquals.call(this, value);
        case '$ne':
            const getAllIdentifier = await this.getAll();
            const excludedIdentifiers = await findEquals_1.findEquals.call(this, value);
            excludedIdentifiers.identifiers.forEach((id) => {
                const idOf = getAllIdentifier.identifiers.indexOf(id);
                if (idOf > -1) {
                    getAllIdentifier.identifiers.splice(idOf, 1);
                    getAllIdentifier.keys.splice(idOf, 1);
                }
            });
            return getAllIdentifier;
        case '$lte':
            return findLowerThan_1.findLowerThan.call(this, value, true);
        case '$lt':
            return findLowerThan_1.findLowerThan.call(this, value, false);
        case '$gt':
            return findGreaterThan_1.findGreaterThan.call(this, value, false);
        case '$gte':
            return findGreaterThan_1.findGreaterThan.call(this, value, true);
        case '$in':
            if (!Array.isArray(value))
                throw new Error('$in operator expect key to be an array');
            for (const el of value) {
                p.push(self.find(el));
            }
            await Promise.all(p)
                .then((resolvedP) => {
                resolvedP.forEach((p) => {
                    results.identifiers.push(...p.identifiers);
                    results.keys.push(...p.keys);
                });
            })
                .catch((err) => {
                console.error('err', err);
            });
            return results;
        case '$nin':
            if (!Array.isArray(value))
                throw new Error('$nin operator expect key to be an array');
            const getAllIdentifiers = await this.getAll();
            const includingIdentifiers = await this.find(value, '$in');
            includingIdentifiers.identifiers.forEach((id) => {
                const idOf = getAllIdentifiers.identifiers.indexOf(id);
                if (idOf > -1) {
                    getAllIdentifiers.identifiers.splice(idOf, 1);
                    getAllIdentifiers.keys.splice(idOf, 1);
                }
            });
            return getAllIdentifiers;
        default:
            throw new Error(`Not handled operator ${operator}`);
    }
}
exports.find = find;
//# sourceMappingURL=find.js.map