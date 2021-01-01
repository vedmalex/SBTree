"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.forEach = exports.insertSorted = void 0;
const comparators_1 = require("./comparators");
const constants_1 = require("../constants");
function insertSorted(arr, item) {
    if (!constants_1.validTypes.includes(typeof item)) {
        throw new Error(`Unsupported type typeof ${typeof item}`);
    }
    const comparator = (typeof item == 'string') ? comparators_1.comparatorString : comparators_1.comparatorNum;
    let min = 0;
    let max = arr.length;
    let index = Math.floor((min + max) / 2);
    while (max > min) {
        if (comparator(item, arr[index]) < 0) {
            max = index;
        }
        else {
            min = index + 1;
        }
        index = Math.floor((min + max) / 2);
    }
    if (Array.isArray(item)) {
        arr.splice(index, 0, ...item);
    }
    else {
        arr.splice(index, 0, item);
    }
    return index;
}
exports.insertSorted = insertSorted;
async function forEach(array, eachFn) {
    for (let index = 0; index < array.length; index++) {
        await eachFn(array[index], index, array);
    }
}
exports.forEach = forEach;
//# sourceMappingURL=array.js.map