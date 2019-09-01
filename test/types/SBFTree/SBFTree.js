const {expect} = require('chai');
const SBFTree = require('../../../src/types/SBFTree/SBFTree');
const MemoryAdapter = require('../../../src/adapters/MemoryAdapter')
// Vector for verifying with a visual tool : https://www.cs.csubak.edu/~msarr/visualizations/BPlusTree.html
describe('SBFTree', () => {
  let tree;
  let adapter = new MemoryAdapter()
  it('should failed without any field name ', function () {
    expect(()=>{
      tree = new SBFTree({order: 3})
    }).to.throw('SBFTree expect a field to be initialized')
  });
  it('should default on mem adapter + size', function () {
    const t = new SBFTree({adapter,field:'email'});
    expect(t.options.order).to.equal(16)
    expect(t.adapter.constructor.name).to.equal('MemoryAdapter')
  });
  it('should instantiate', async function () {
    tree = new SBFTree({adapter,field:'age',order: 3});
    expect(tree.options.order).to.equal(3)
    expect(tree.field).to.equal('age')

    await tree.insert(40, '5d675592aa2c1a52a0eeaa46');
    await tree.insert(60, '5d6755b71f9edbc997c8d156');
    await tree.insert(70, '5d6755bba792f16bdb3eab7b');
    await tree.insert(80, '5d67592851b41056838b7232');
    await tree.insert(30, '5d67599b94f1fcc963071138');
    await tree.insert(0, '5d6759cd1d493a7fdcb0c43a');
    await tree.insert(90, '5d6761b785c340115a93e87f');
    await tree.insert(50, '5d6761b785c340115a9dd87f');
    await tree.insert(20, '5d6761b785c340115a9dd87f');
    await tree.insert(10, '5d6761b785c340115a9dd87f');

    expect(tree.root.keys).to.deep.equal([30,60]);
    expect(Object.keys(tree.root.childrens).length).to.deep.equal(3);

    expect(tree.root.childrens[0].keys).to.deep.equal([10]);
    expect(Object.keys(tree.root.childrens[0].childrens).length).to.deep.equal(2);

    const bucket1Name = tree.root.childrens[0].childrens[0].name;
    expect(tree.adapter.leafs[bucket1Name].data.keys).to.deep.equal([0]);

    const bucket2Name = tree.root.childrens[0].childrens[1].name;
    expect(tree.adapter.leafs[bucket2Name].data.keys).to.deep.equal([10,20]);

    expect(tree.root.childrens[1].keys).to.deep.equal([40]);
    expect(Object.keys(tree.root.childrens[1].childrens).length).to.deep.equal(2);

    const bucket3Name = tree.root.childrens[1].childrens[0].name;
    expect(tree.adapter.leafs[bucket3Name].data.keys).to.deep.equal([30]);

    const bucket4Name = tree.root.childrens[1].childrens[1].name;
    expect(tree.adapter.leafs[bucket4Name].data.keys).to.deep.equal([40,50]);

    expect(tree.root.childrens[2].keys).to.deep.equal([70, 80]);
    expect(Object.keys(tree.root.childrens[2].childrens).length).to.deep.equal(3);

    const bucket5Name = tree.root.childrens[2].childrens[0].name;
    expect(tree.adapter.leafs[bucket5Name].data.keys).to.deep.equal([60]);

    const bucket6Name = tree.root.childrens[2].childrens[1].name;
    expect(tree.adapter.leafs[bucket6Name].data.keys).to.deep.equal([70]);

    const bucket7Name = tree.root.childrens[2].childrens[2].name;
    expect(tree.adapter.leafs[bucket7Name].data.keys).to.deep.equal([80,90]);

    await tree.insert(85, '507f191e810c19729de860ea');
    expect(tree.root.keys).to.deep.equal([60]);

    expect(tree.root.childrens[0].keys).to.deep.equal([30]);
    expect(tree.root.childrens[0].childrens[0].keys).to.deep.equal([10]);
    expect(tree.root.childrens[0].childrens[1].keys).to.deep.equal([40]);
    expect(tree.root.childrens[1].keys).to.deep.equal([80]);

    expect(tree.root.childrens[1].childrens[0].keys).to.deep.equal([70]);
    expect(tree.root.childrens[1].childrens[1].keys).to.deep.equal([85]);
  });
});
