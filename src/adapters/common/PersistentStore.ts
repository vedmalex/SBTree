
export interface PersistentStore {
  saveDatabase(): Promise<void>;
  loadDatabase(): Promise<void>;
  readonly autoSave: boolean;
  readonly lastSave: number;
  readonly lastChange: number;
  readonly autoSaveInterval: number;
}
