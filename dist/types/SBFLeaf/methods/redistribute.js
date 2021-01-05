"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redistribute = void 0;
async function redistribute() {
    const parent = this.getParent();
    const selfId = this.id;
    const selfPos = parent.children.findIndex((el) => el.id === selfId);
    let redistributed = 0;
    const siblings = {};
    if (selfPos >= 0)
        siblings.left = parent.children[selfPos - 1];
    if (parent.children.length > selfPos + 1)
        siblings.right = parent.children[selfPos + 1];
    const borrowFromRight = async () => {
        const rightStatus = await siblings.right.getFillStatus();
        if (rightStatus.fillFactorFilled &&
            rightStatus.leafSize > Math.trunc(rightStatus.order / 2)) {
            redistributed += 1;
            throw new Error('Missing implementation of actually redistribute');
        }
        else
            return false;
    };
    const borrowFromLeft = async () => {
        const leftStatus = await siblings.left.getFillStatus();
        if (leftStatus.fillFactorFilled &&
            leftStatus.leafSize > Math.trunc(leftStatus.order / 2)) {
            redistributed += 1;
            throw new Error('Missing implementation of actually redistribute');
        }
        else {
            return false;
        }
    };
    if (!siblings.left) {
        try {
            await borrowFromLeft();
        }
        catch (e) {
            await borrowFromRight();
        }
    }
    else {
        await borrowFromLeft();
    }
    const hasRedistributed = !!redistributed;
    if (!hasRedistributed) {
        throw new Error('Failed to redistribute');
    }
    return hasRedistributed;
}
exports.redistribute = redistribute;
//# sourceMappingURL=redistribute.js.map