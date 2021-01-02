"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const array_1 = require("./array");
async function draw(fieldNode, preventConsole = false) {
    if (fieldNode.id[0] === 't') {
        !preventConsole && console.log('======== SBTree Tree ========');
        !preventConsole && console.log(`=== Id : ${fieldNode.id}`);
        !preventConsole && console.log(`=== Order :  ${fieldNode.order}`);
        if (Object.keys(fieldNode.fieldTrees).length === 0) {
            !preventConsole && console.log('=== Empty.');
            return [];
        }
        let res = [];
        await array_1.forEach(Object.keys(fieldNode.fieldTrees), async (fieldKey) => {
            const fieldTree = fieldNode.fieldTrees[fieldKey];
            res = res.concat(await draw(fieldTree, preventConsole));
        });
        return res;
    }
    !preventConsole && console.log('======== SBTree Node ========');
    !preventConsole && console.log(`=== Id : ${fieldNode.id}`);
    !preventConsole && console.log(`=== Order :  ${fieldNode.order}`);
    !preventConsole && console.log(`=== Field :  ${fieldNode.fieldName}`);
    const { root } = fieldNode;
    const rows = [];
    const processChildrenToRows = async (_children) => {
        let childToProcess = [];
        const children = [];
        await array_1.forEach(_children, async (child) => {
            if (child.type === 'leaf') {
                children.push((await child.getAll()).keys);
            }
            else if (child.type === 'node') {
                children.push(child.keys);
                childToProcess = childToProcess.concat(child.children);
            }
            else {
                throw new Error(`Received invalid type ${child.type}`);
            }
        });
        rows.push(children);
        return childToProcess;
    };
    const processRootchildren = async (_children) => await processChildrenToRows(_children);
    const processLeafs = async (_leafs) => {
        const toProcessChildren = await processChildrenToRows(_leafs);
        if (toProcessChildren.length > 0) {
            await processLeafs(toProcessChildren);
        }
    };
    const processFromRoot = async (_root) => {
        rows.push(_root.keys);
        if (_root.children.length > 0) {
            const childrenToProcess = await processRootchildren(_root.children);
            if (childrenToProcess.length) {
                await processLeafs(childrenToProcess);
            }
        }
    };
    await processFromRoot(root);
    const spanVal = 2;
    const biggestChildLen = rows[rows.length - 1].length;
    const biggestRepeatTimes = biggestChildLen * spanVal;
    rows.forEach((row, i) => {
        const calc = biggestRepeatTimes - (i * spanVal * 2);
        const repeatTimes = (calc > 0) ? calc : 0;
        !preventConsole && console.log(`${' '.repeat(repeatTimes)}${JSON.stringify(row)}`);
    });
    return rows;
}
;
exports.default = { draw };
//# sourceMappingURL=ascii.js.map