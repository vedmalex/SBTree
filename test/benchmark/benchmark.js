const {expect} = require('chai');
const {SBTree} = require('../../index');
const fakeData = require('../fixtures/users')
const {Timer} = require('../../src/utils/time');
const {version} = require('../../package.json');
const {each} = require('lodash');


let tree;
let benchmark = {
  writeOp: {
    maxOp: 2600,
    executedOp: 0,
    duration: 0,
    ops: 0
  },
  getOp: {
    maxOp: 2600,
    executedOp: 0,
    duration: 0,
    ops: 0
  },
  findOp: {
    maxOp: 2600,
    executedOp: 0,
    duration: 0,
    ops: 0
  }
}
describe('SBTree - Performance - Benchmark within test ', async function () {
  this.timeout(10000)
  before((done) => {
    console.log(`Will process ${fakeData.length} elements`);
    tree = new SBTree({order: 127});
    tree.on('ready', () => {
      done();
    });
  })

  it('should be fast', async function () {

    const writeData = JSON.parse(JSON.stringify(fakeData));
    const findData = JSON.parse(JSON.stringify(fakeData));
    const getData = JSON.parse(JSON.stringify(fakeData));

    const jobs = [
      ['writeOp', async () => {
        const data = writeData.splice(Math.floor(Math.random() * (writeData.length - 1 + 1) + 0), 1)[0];
        return tree.insertDocuments(data);
      }],
      ['getOp', async () => {
        const data = getData.splice(Math.floor(Math.random() * (getData.length - 1 + 1) + 0), 1)[0];
        return tree.getDocument(data._id);
      }],
      ['findOp', async () => {
        const rand = Math.floor(Math.random() * (findData.length - 1 + 1) + 0);
        const data = findData.splice(rand, 1)[0];
        return tree.findDocuments(data)
      }]
    ];

    const processNext = async (jobFn, jobName) => {
      await jobFn();
      benchmark[jobName].executedOp += 1;
      if (benchmark[jobName].executedOp < benchmark[jobName].maxOp) {
        await processNext(jobFn, jobName)
      }
    };

    for (let _job of jobs) {
      const jobName = _job[0];
      const jobFn = _job[1];
      const timer = new Timer();
      timer.start();

      await processNext(jobFn, jobName);
      timer.stop();
      benchmark[jobName].duration = timer.duration.ms / 1000;
      benchmark[jobName].ops = benchmark[jobName].executedOp / (timer.duration.ms / 1000);

      console.log(`Finished ${jobName} in ${timer.duration.ms} ms [${benchmark[jobName].ops}] ops`)
    }
  });
  it('should display result', function (done) {
    const totalDuration = benchmark.writeOp.duration + benchmark.getOp.duration + benchmark.findOp.duration;
    const totalOps = benchmark.writeOp.executedOp + benchmark.getOp.executedOp + benchmark.findOp.executedOp;
    const avgOps = (benchmark.writeOp.ops + benchmark.getOp.ops + benchmark.findOp.ops) / 3;
    console.log(`======== SBTree ${version} - Benchmark from mocha`)
    console.log(`= Write : ${benchmark.writeOp.ops} op/s [${benchmark.writeOp.executedOp}]`)
    console.log(`= Get : ${benchmark.getOp.ops} op/s [${benchmark.getOp.executedOp}]`)
    console.log(`= Find : ${benchmark.findOp.ops} op/s [${benchmark.findOp.executedOp}]`)
    console.log(`= Total : ${totalOps} operations`)
    console.log(`= Duration : ${totalDuration} s`)
    console.log(`= Avg : ${avgOps} op/s`)
    done();
  });

});

