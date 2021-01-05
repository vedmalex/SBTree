import { DataStore } from './DataStore'
export default async function autosave(self: DataStore) {
  const next = async (self: DataStore) => {
    if (
      (self.lastChange !== null && self.lastSave === null) ||
      self.lastChange > self.lastSave
    ) {
      await self.saveDatabase()
    }
    setTimeout(async () => {
      if (self.autoSave) {
        await next(self)
      }
    }, self.autoSaveInterval)
  }
  await next(self)
}
