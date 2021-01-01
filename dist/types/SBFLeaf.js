"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SBFLeaf = void 0;
const crypto_1 = require("../utils/crypto");
class SBFLeaf {
    constructor(props) {
        if (!props.parent) {
            throw new Error(`SFBLeaf initialized without parent reference`);
        }
        this.parent = props.parent;
        this.id = (props.id) ? props.id : crypto_1.generateLeafId();
        this.fieldName = (props.parent.fieldName) ? props.parent.fieldName : null;
    }
    get type() { return 'leaf'; }
    getParent() {
        return this.parent;
    }
    setParent(parent) {
        this.parent = parent;
    }
    async insert(identifier, value) {
        const parent = this.getParent();
        const adapter = parent.getAdapter();
        await adapter.addInLeaf(this.id, identifier, value);
        const isFull = await this.isFull();
        if (isFull) {
            await this.split();
        }
    }
    async find(value) {
        const adapter = this.getParent().getAdapter();
        const res = await adapter.findInLeaf(this.id, value);
        return res;
    }
    ;
    async getAll() {
        const adapter = this.getParent().getAdapter();
        const res = await adapter.getAllInLeaf(this.id);
        return res;
    }
    ;
    async getFillStatus() {
        const parent = this.getParent();
        const adapter = parent.getAdapter();
        const { fillFactor, order } = parent.getTreeOptions();
        if (fillFactor < 0.5) {
            throw new Error(`FillFactor cannot be less than 0.5. Received ${fillFactor}`);
        }
        const maxKeys = order - 1;
        const minKeys = Math.floor(maxKeys * fillFactor);
        try {
            const leaf = await adapter.openLeaf(this.id);
            const { size } = leaf.meta;
            return {
                fillFactor,
                order,
                leafSize: size,
                fillFactorFilled: size >= minKeys,
            };
        }
        catch (e) {
            if (e.message === 'Leaf do not exist') {
                await adapter.createLeaf(this.id);
                return this.getFillStatus();
            }
            throw e;
        }
    }
    async getLeft() {
        const adapter = this.getParent().getAdapter();
        const res = await adapter.getLeftInLeaf(this.id);
        return res;
    }
    ;
    async getRight() {
        const adapter = this.getParent().getAdapter();
        const res = await adapter.getRightInLeaf(this.id);
        return res;
    }
    ;
    async findLowerThan(value, includeKey = false) {
        const op = includeKey ? '$lte' : '$lt';
        const adapter = this.getParent().getAdapter();
        const res = await adapter.findInLeaf(this.id, value, op);
        return res;
    }
    ;
    async findGreaterThan(value, includeKey = false) {
        const op = includeKey ? '$gte' : '$gt';
        const adapter = this.getParent().getAdapter();
        const res = await adapter.findInLeaf(this.id, value, op);
        return res;
    }
    ;
    async isFillFactorFilled() {
        const parent = this.getParent();
        const adapter = parent.getAdapter();
        const { fillFactor, order } = parent.getTreeOptions();
        if (fillFactor < 0.5) {
            throw new Error(`FillFactor cannot be less than 0.5. Received ${fillFactor}`);
        }
        const maxKeys = order - 1;
        const minKeys = Math.floor(maxKeys * fillFactor);
        try {
            const leaf = await adapter.openLeaf(this.id);
            return leaf.meta.size >= minKeys;
        }
        catch (e) {
            if (e.message === 'Leaf do not exist') {
                await adapter.createLeaf(this.id);
                return this.isFillFactorFilled();
            }
            throw e;
        }
    }
    async isFull() {
        const parent = this.getParent();
        const adapter = parent.getAdapter();
        const { order } = parent.getTreeOptions();
        try {
            const leaf = await adapter.openLeaf(this.id);
            return leaf.meta.size >= order;
        }
        catch (e) {
            if (e.message === 'Leaf do not exist') {
                await adapter.createLeaf(this.id);
                return this.isFull();
            }
            throw e;
        }
    }
    async mergeWithSiblings() {
        const parent = this.getParent();
        const selfId = this.id;
        const selfPos = parent.children.findIndex((el) => el.id === selfId);
        let hasMerged = false;
        const siblings = {};
        if (selfPos >= 0)
            siblings.left = parent.children[selfPos - 1];
        if (parent.children.length > selfPos + 1)
            siblings.right = parent.children[selfPos + 1];
        if (siblings.left)
            siblings.leftStatus = await siblings.left.getFillStatus();
        if (siblings.right)
            siblings.rightStatus = await siblings.right.getFillStatus();
        if (siblings.right && (selfPos === 0 || !siblings.left)) {
            const rightSib = siblings.right;
            const rightSibPos = selfPos + 1;
            const { identifiers, keys } = await rightSib.getAll();
            const p = [];
            identifiers.forEach((identifier, i) => {
                const key = keys[i];
                p.push(this.insert(identifier, key));
            });
            await Promise.all(p);
            delete parent.children[rightSibPos];
            parent.children.splice(rightSibPos, 1);
            const parentKeys = parent.keys;
            parent.keys.splice(Math.trunc(selfPos / 2), 1);
            if (parent.keys.length === 0) {
                await parent.mergeUp();
            }
            hasMerged = true;
        }
        else if (siblings.left) {
            const leftSib = siblings.left;
            const leftSibPos = selfPos - 1;
            const { identifiers, keys } = await leftSib.getAll();
            const p = [];
            identifiers.forEach((identifier, i) => {
                const key = keys[i];
                p.push(this.insert(identifier, key));
            });
            await Promise.all(p);
            delete parent.children[leftSibPos];
            parent.children.splice(leftSibPos, 1);
            const parentKeys = parent.keys;
            parent.keys.splice(Math.trunc(selfPos / 2), 1);
            if (parent.keys.length === 0) {
                await parent.mergeUp();
            }
            hasMerged = true;
        }
        if (!hasMerged) {
            throw new Error('Failed to merge with siblings');
        }
        return hasMerged;
    }
    async redistribute() {
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
            if (rightStatus.fillFactorFilled && (rightStatus.leafSize > Math.trunc(rightStatus.order / 2))) {
                redistributed += 1;
                throw new Error('Missing implementation of actually redistribute');
            }
            else
                return false;
        };
        const borrowFromLeft = async () => {
            const leftStatus = await siblings.left.getFillStatus();
            if (leftStatus.fillFactorFilled && (leftStatus.leafSize > Math.trunc(leftStatus.order / 2))) {
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
    async remove(remCmd) {
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
    async replace(identifier, value) {
        const parent = this.getParent();
        const adapter = parent.getAdapter();
        await adapter.replaceInLeaf(this.id, identifier, value);
        const isFull = await this.isFull();
        if (isFull) {
            await this.split();
        }
    }
    async split() {
        const parent = this.getParent();
        const adapter = parent.getAdapter();
        const newLeaf = new SBFLeaf({ parent });
        await adapter.createLeaf(newLeaf.id);
        const midKey = await adapter.splitLeaf(this, newLeaf);
        const index = await parent.insertReferenceKey(midKey);
        await parent.attachLeaf(index + 1, newLeaf);
    }
}
exports.SBFLeaf = SBFLeaf;
;
//# sourceMappingURL=SBFLeaf.js.map