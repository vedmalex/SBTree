"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Emittable = void 0;
const events_1 = require("events");
class Emittable {
    constructor() {
        this.emitter = new events_1.EventEmitter();
        this.listeners = [];
    }
    on(event, listener) {
        this.emitter.on(event, listener);
        this.listeners.push({
            event,
            listener,
            type: 'on',
        });
    }
    once(event, listener) {
        this.emitter.once(event, listener);
        this.listeners.push({
            event,
            listener,
            type: 'once',
        });
    }
    close() {
        this.emit('close');
        setTimeout(() => {
            this.emitter.removeAllListeners();
        }, 10);
    }
    emit(event, ...args) {
        return this.emitter.emit(event, ...args);
    }
}
exports.Emittable = Emittable;
//# sourceMappingURL=Emittable.js.map