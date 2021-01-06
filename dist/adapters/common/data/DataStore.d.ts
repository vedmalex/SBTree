import { FSLock } from 'fslockjs';
import { AdapterLeafs } from './AdapterLeafs';
import { SBTree } from '../../../types/SBTree/SBTree';
export interface DataStore {
    datasource: SBTree;
    queue: FSLock;
    leafs: AdapterLeafs;
    saveDatabase(): Promise<void>;
    loadDatabase(): Promise<void>;
    autoSave: boolean;
    autoLoad: boolean;
    autoLoadCallback: () => Promise<void>;
    path: string;
    lastSave: number;
    lastChange: number;
    autoSaveInterval: number;
    autoLoadForceOverwrite: boolean;
}
//# sourceMappingURL=DataStore.d.ts.map