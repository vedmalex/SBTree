"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.query = void 0;
const lodash_intersection_1 = __importDefault(require("lodash.intersection"));
const getFieldNamesFromQuery_1 = require("../utils/getFieldNamesFromQuery");
const get_1 = require("./get");
async function resolveDocuments(self, objectIds) {
    const documents = [];
    for (const oid of objectIds) {
        const doc = await self.getDocument(oid);
        documents.push(doc);
    }
    return documents;
}
const findIntersectingIdentifiers = (listOfListOfIdentifiers) => {
    const identifiers = [];
    listOfListOfIdentifiers.forEach((listOfIdentifiers) => {
        identifiers.push(listOfIdentifiers);
    });
    return lodash_intersection_1.default(...identifiers);
};
async function query(query) {
    const self = this;
    const findNested = async function (_promises, _queryFieldName, _queryFieldValue) {
        for (const nestedQueryFieldName in _queryFieldValue) {
            const nestedQueryFieldValue = _queryFieldValue[nestedQueryFieldName];
            const nestedQueryFieldType = typeof nestedQueryFieldValue;
            if (['number', 'string', 'boolean', 'object'].includes(nestedQueryFieldType)) {
                const fTree = self.getFieldTree(`${_queryFieldName}.${nestedQueryFieldName}`);
                if (fTree) {
                    _promises.push(fTree.find(nestedQueryFieldValue, '$eq'));
                }
            }
            else if (nestedQueryFieldType === 'object' && !Array.isArray(nestedQueryFieldValue)) {
                await findNested(_promises, `${_queryFieldName}.${nestedQueryFieldName}`, nestedQueryFieldValue);
            }
            else {
                throw new Error(`Not supported type : ${nestedQueryFieldType}`);
            }
        }
    };
    if (!query)
        return [];
    const fields = getFieldNamesFromQuery_1.getFieldNamesFromQuery(query);
    if (fields.length === 1 && fields.indexOf('_id') > -1) {
        return [await get_1.get.call(this, query._id)];
    }
    const promises = [];
    fields.forEach((queryFieldName) => {
        let queryFieldValue;
        queryFieldName.split('.').forEach((subFieldName) => {
            queryFieldValue = (queryFieldValue && queryFieldValue[subFieldName])
                ? queryFieldValue[subFieldName]
                : query[subFieldName];
        });
        const queryFieldType = typeof queryFieldValue;
        let fieldTree;
        switch (queryFieldType) {
            case 'number':
            case 'boolean':
            case 'string':
                fieldTree = this.getFieldTree(queryFieldName);
                if (!fieldTree) {
                    return;
                }
                promises.push(fieldTree.find(queryFieldValue, '$eq'));
                break;
            case 'object':
                if (Array.isArray(queryFieldValue)) {
                    throw new Error('Not supported array input. Please open a Github issue to specify your need.');
                }
                else {
                    const operators = Object.keys(queryFieldValue).filter((el) => el[0] === '$');
                    if (operators.length === 0) {
                        findNested(promises, queryFieldName, queryFieldValue);
                    }
                    else {
                        fieldTree = this.getFieldTree(queryFieldName);
                        for (const operator of operators) {
                            promises.push(fieldTree.find(queryFieldValue[operator], operator));
                        }
                    }
                }
                break;
            default:
                throw new Error(`Not supported type : ${queryFieldType}`);
        }
    });
    let intermediateIdentifiers = [];
    await Promise
        .all(promises)
        .then((pResults) => {
        for (const pResult of pResults) {
            if (pResult.identifiers.length === 0) {
                intermediateIdentifiers = [];
                break;
            }
            intermediateIdentifiers.push(pResult.identifiers);
        }
    });
    const matchingObjectIds = findIntersectingIdentifiers(intermediateIdentifiers);
    return resolveDocuments(this, matchingObjectIds);
}
exports.query = query;
//# sourceMappingURL=query.js.map