import FsAdapter from '../FsAdapter';
import autosave from '../../common/ops/autosave';

export default async function attachParent(this:FsAdapter, parent) {
  this.setParent(parent);

  if (this.autoLoad) {
    try {
      await this.loadDatabase();
      if (this.autoLoadCallback && typeof this.autoLoadCallback === 'function') {
        await this.autoLoadCallback();
      }
    } catch (e) {
      console.error(e);
      process.exit(1);
    }
  }
  if (this.autoSave === true) {
    autosave(this);
  }
  this.emit('ready');
}
