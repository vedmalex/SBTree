"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = void 0;
async function remove(remCmd) {
    const parent = this.getParent();
    const adapter = parent.getAdapter();
    const identifier = remCmd._id;
    const selfPos = parent.children.findIndex((el) => el.id === this.id);
    const removed = await adapter.removeInLeaf(this.id, identifier);
    if (removed.length === 0) {
        return false;
    }
    if (removed.length > 1)
        throw new Error('Unexpected amount of removed entities in same leaf');
    if (removed[0].index === 0) {
        const newLeft = await adapter.getLeftInLeaf(this.id);
        if (newLeft.key) {
            parent.keys.splice(selfPos - 1, 1, newLeft.key);
        }
        else {
            parent.keys.splice(selfPos - 1, 1);
        }
    }
    const fillFactorFilled = await this.isFillFactorFilled();
    if (fillFactorFilled) {
        return true;
    }
    try {
        await this.redistribute();
    }
    catch (e) {
        try {
            await this.mergeWithSiblings();
        }
        catch (e) {
            return true;
        }
    }
}
exports.remove = remove;
//# sourceMappingURL=remove.js.map