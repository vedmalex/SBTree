export declare class Emittable {
    private emitter;
    private listeners;
    on(event: string | symbol, listener: (...args: any[]) => void): void;
    once(event: string | symbol, listener: (...args: any[]) => void): void;
    close(): void;
    emit(event: string | symbol, ...args: any[]): boolean;
}
//# sourceMappingURL=Emittable.d.ts.map