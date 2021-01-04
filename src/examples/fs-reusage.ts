import { FsAdapter } from '../adapters';
import { SBTree } from '../types/SBTree/SBTree';
import Timer from '../utils/time';

const tree = new SBTree({ adapter:new FsAdapter({ path: '.db', autoSave: false }), order: 3, uniques:["email"] });
const timer = new Timer();

export const start = async function () {
  timer.start();

  console.log('-- Find : {country:{$in:[\'Greenland\']}}');
  console.log(await tree.findDocuments({ age:{$gt:60}}));

  timer.stop();
  console.log(timer.duration.s, 'seconds');
  tree.close()
};

tree.once('ready', ()=> start().then(_=>"closed"));
