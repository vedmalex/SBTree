"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFieldNamesFromQuery = void 0;
function getFieldNamesFromQuery(query) {
    const fieldNames = [];
    Object.entries(query).forEach((field) => {
        let fieldName = field[0];
        if (fieldName[0] === '$')
            return;
        if (field[1].constructor === Object) {
            const _fields = getFieldNamesFromQuery(field[1]);
            if (_fields[0]) {
                fieldName += '.' + _fields;
            }
        }
        fieldNames.push(fieldName);
    });
    return fieldNames;
}
exports.getFieldNamesFromQuery = getFieldNamesFromQuery;
//# sourceMappingURL=getFieldNamesFromQuery.js.map