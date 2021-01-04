"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertDocuments = void 0;
const lodash_clonedeep_1 = __importDefault(require("lodash.clonedeep"));
const mongo_objectid_1 = __importDefault(require("mongo-objectid"));
const insert_1 = require("../../ops/insert");
async function insertDocuments(documents) {
    if (!this.state.isReady) {
        await this.isReady();
    }
    if (Array.isArray(documents)) {
        let insertedDocumentsResultats = [];
        for (const document of documents) {
            insertedDocumentsResultats.push(...await this.insertDocuments(document));
        }
        return insertedDocumentsResultats;
    }
    else {
        const document = lodash_clonedeep_1.default(documents);
        if (!document._id) {
            document._id = new mongo_objectid_1.default().toString();
        }
        await insert_1.insert.call(this, document);
        this.size += 1;
        return [document];
    }
}
exports.insertDocuments = insertDocuments;
//# sourceMappingURL=insertDocuments.js.map