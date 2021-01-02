import { FsAdapter } from '../adapters';
import { SBTree } from '../types/SBTree';
import Timer from '../utils/time';

const tree = new SBTree({ adapter:new FsAdapter({ path: '.db', autoSave: false }), order: 3 });
const timer = new Timer();

export const start = async function () {
  // await (tree.adapter as FsAdapter).loadDatabase();
  timer.start();

  console.log('-- Find : {country:{$in:[\'Greenland\']}}');
  console.log(await tree.findDocuments({ age:{$gt:60}}));

  timer.stop();
  await (tree.adapter as FsAdapter).saveDatabase();
  console.log(timer.duration.s, 'seconds');
};

tree.on('ready', start);
