"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_isequal_1 = __importDefault(require("lodash.isequal"));
const lodash_get_1 = __importDefault(require("lodash.get"));
const lodash_set_1 = __importDefault(require("lodash.set"));
const lodash_isobject_1 = __importDefault(require("lodash.isobject"));
const lodash_transform_1 = __importDefault(require("lodash.transform"));
const RemoveCommand_1 = require("./RemoveCommand");
const constants_1 = require("../../constants");
function findChangedFields(object, base) {
    function changes(object, base) {
        return lodash_transform_1.default(object, (result, value, key) => {
            if (base[key] !== undefined && !lodash_isequal_1.default(value, base[key])) {
                result[key] = (lodash_isobject_1.default(value) && lodash_isobject_1.default(base[key])) ? changes(value, base[key]) : value;
            }
        });
    }
    return changes(object, base);
}
function findAddedFields(object, base) {
    function addedChanges(object, base) {
        return lodash_transform_1.default(object, (result, value, key) => {
            if (base[key] === undefined) {
                result[key] = (lodash_isobject_1.default(value) && lodash_isobject_1.default(base[key])) ? addedChanges(value, base[key]) : value;
            }
        });
    }
    return addedChanges(object, base);
}
function findDeletedFields(object, base) {
    return findAddedFields(base, object);
}
async function replace(currentDocument, newDocument) {
    const self = this;
    if (!newDocument._id) {
        throw new Error('Expecting document to have an _id');
    }
    const id = newDocument._id.toString();
    const addedFields = findAddedFields(newDocument, currentDocument);
    const changedField = findChangedFields(newDocument, currentDocument);
    const deletedFields = findDeletedFields(newDocument, currentDocument);
    for (const _addedFieldName in addedFields) {
        const _addedFieldValue = newDocument[_addedFieldName];
        const _addedFieldType = typeof _addedFieldValue;
        if (constants_1.validTypes.includes(_addedFieldType)) {
            if (_addedFieldName !== '_id') {
                if (!this.getFieldTree(_addedFieldName)) {
                    this.setFieldTree({ fieldName: _addedFieldName });
                }
                const fieldTree = this.getFieldTree(_addedFieldName);
                if (fieldTree) {
                    await fieldTree.insert(id, _addedFieldValue);
                }
            }
        }
        else {
            this.verbose && console.log(`No index for ${_addedFieldName} : Typeof ${_addedFieldType} : ${JSON.stringify(_addedFieldValue)}`);
        }
    }
    const remCmd = new RemoveCommand_1.RemoveCommand({
        _id: currentDocument._id,
        ...deletedFields,
    });
    for (const _deletedFieldName in deletedFields) {
        const _deletedFieldValue = currentDocument[_deletedFieldName];
        const _deletedFieldType = typeof _deletedFieldValue;
        if (constants_1.validTypes.includes(_deletedFieldType)) {
            if (_deletedFieldName !== '_id') {
                if (!this.getFieldTree(_deletedFieldName)) {
                    this.setFieldTree({ fieldName: _deletedFieldName });
                }
                const fieldTree = this.getFieldTree(_deletedFieldName);
                if (!fieldTree) {
                    throw new Error(`Missing fieldTree for ${_deletedFieldName}`);
                }
                await fieldTree.remove(remCmd);
            }
        }
        else {
            this.verbose && console.log(`No index for ${_deletedFieldName} : Typeof ${_deletedFieldType} : ${JSON.stringify(_deletedFieldValue)}`);
        }
    }
    const replaceProp = async function (_fieldName, _fieldValue) {
        const _fieldType = typeof _fieldValue;
        if (['number', 'string', 'boolean'].includes(_fieldType)) {
            if (!self.getFieldTree(_fieldName)) {
                self.setFieldTree({ fieldName: _fieldName });
            }
            const fieldTree = self.getFieldTree(_fieldName);
            if (!fieldTree) {
                throw new Error(`Missing fieldTree for ${_fieldName}`);
            }
            const res = { _id: currentDocument._id };
            lodash_set_1.default(res, `${_fieldName}`, lodash_get_1.default(currentDocument, `${_fieldName}`));
            const remCmd = new RemoveCommand_1.RemoveCommand(res);
            await fieldTree.remove(remCmd);
            await fieldTree.insert(id, lodash_get_1.default(newDocument, `${_fieldName}`));
        }
        else if (_fieldType === 'object' && !Array.isArray(_fieldType)) {
            for (const _nestedFieldName in _fieldValue) {
                const _nestedFieldValue = _fieldValue[_nestedFieldName];
                await replaceProp(`${_fieldName}.${_nestedFieldName}`, _fieldValue[_nestedFieldName]);
            }
        }
        else {
            throw new Error(`Not supported type : ${_fieldType}`);
        }
    };
    for (const _changedFieldName in changedField) {
        const _changedFieldValue = currentDocument[_changedFieldName];
        const _changedFieldType = typeof _changedFieldValue;
        if (constants_1.validTypes.includes(_changedFieldType)) {
            await replaceProp(_changedFieldName, _changedFieldValue);
        }
        else {
            this.verbose && console.log(`No index for ${_changedFieldName} : Typeof ${_changedFieldType} : ${JSON.stringify(_changedFieldValue)}`);
        }
    }
    await this.adapter.replaceDocument(newDocument);
    return newDocument;
}
module.exports = replace;
//# sourceMappingURL=replace.js.map