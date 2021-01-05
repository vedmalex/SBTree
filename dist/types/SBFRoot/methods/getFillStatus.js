"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFillStatus = void 0;
async function getFillStatus() {
    const { fillFactor, order } = this.getTreeOptions();
    if (fillFactor < 0.5) {
        throw new Error(`FillFactor cannot be less than 0.5. Received ${fillFactor}`);
    }
    const maxKeys = order - 1;
    const minKeys = Math.floor(maxKeys * fillFactor);
    const size = this.keys.length;
    return {
        fillFactor,
        order,
        leafSize: size,
        fillFactorFilled: size >= minKeys,
    };
}
exports.getFillStatus = getFillStatus;
//# sourceMappingURL=getFillStatus.js.map