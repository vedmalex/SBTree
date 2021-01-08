import { SBTree } from '../types/SBTree/SBTree'
import Timer from '../utils/time'
import { MemoryAdapterWithStore } from '../adapters/MemoryAdapter/MemoryAdapterWithStore'

const tree = new SBTree({
  adapter: new MemoryAdapterWithStore({ path: '.dbms', autoSave: true }),
  order: 3,
  uniques: ['email'],
})
const timer = new Timer()

export const start = async function () {
  timer.start()

  console.log("-- Find : {country:{$in:['Greenland']}}")
  console.log(await tree.findDocuments({ age: { $gt: 60 } }))

  timer.stop()
  console.log(timer.duration.s, 'seconds')
}

tree.onReady(() => start().then((_) => 'closed'))

// сделать автозагрузку и автосохранение для memory store
// посмотреть на даты обновления и прочее, скорее всего в них нужно смотреть
