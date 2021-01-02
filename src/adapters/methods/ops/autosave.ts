import FsAdapter from '../../FsAdapter';
export default async function autosave(self:FsAdapter) {
  const next = async (self:FsAdapter) => {
    if ((self.lastChange !== null && self.lastSave === null) || (self.lastChange > self.lastSave)) {
      await self.saveDatabase();
    }
    setTimeout(async () => {
      if (self.autoSave) {
        await next(self);
      }
    }, self.autoSaveInterval);
  };
  await next(self);
};
