import { FsAdapter } from '../adapters'
import { SBTree } from '../types/SBTree/SBTree'
import Timer from '../utils/time'

const tree = new SBTree({
  adapter: new FsAdapter({ path: '.db', autoSave: true }),
  order: 3,
  uniques: ['email'],
})
const timer = new Timer()

export const start = async function () {
  timer.start()
  console.log('-- Inserting...')
  let inserted
  try {
    await tree.insertDocuments({
      age: 43,
      country: 'United States',
      email: 'bob@valjean.fr',
      _id: '5d6dc94e3c7734812f051d7a',
    })
    await tree.insertDocuments({
      age: 43,
      country: 'United States',
      email: 'ben@valjean.fr',
      _id: '5d6dc94e3c7734812f051d7b',
    })
    await tree.insertDocuments({
      age: 21,
      country: 'Russia',
      email: 'julia@valjean.fr',
      _id: '5d6dc94e3c7734812f051d7c',
    })
    await tree.insertDocuments({
      age: 22,
      country: 'United Kingdom',
      email: 'zack@valjean.fr',
      _id: '5d6dc94e3c7734812f051duk',
    })

    try {
      // Duplicate do isAdded added
      await tree.insertDocuments({
        age: 43,
        country: 'United States',
        email: 'bob@valjean.fr',
        _id: '5d6dc94e3c7734812f051d7d',
      })
    } catch (e) {
      console.log(e.message)
    }

    await tree.insertDocuments({
      age: 29,
      country: 'Belgium',
      email: 'patrick@valjean.fr',
      _id: '5d6dc94e3c7734812f051bel',
    })
    await tree.insertDocuments({
      age: 27,
      country: 'France',
      email: 'valentin@valjean.fr',
      _id: '5d6dc94e3c7734812f051df4',
    })
    await tree.insertDocuments({
      age: 33,
      email: 'goptnik@dourak.ru',
      country: 'Russia',
      _id: '5d6dc93f6059937716f41eed',
    })

    // Bulk insert also works
    await tree.insertDocuments([
      {
        age: 33,
        email: 'basil@valjean.fr',
        country: 'France',
        _id: '5d6dc93a34d1cfc2c45fdc09',
      },
      {
        age: 11,
        email: 'jean@valjean.fr',
        country: 'France',
        _id: '5d6dc077e27058fb6c7d8592',
      },
      {
        age: 18,
        email: 'luc@valjean.fr',
        country: 'France',
        _id: '5d6ded39ea07d9b4c062b744',
      },
      {
        age: 86,
        email: 'charles@valjean.fr',
        country: 'France',
        _id: '5d6ded52666c83c63210d55f',
      },
      {
        age: 44,
        email: 'phillipe@valjean.fr',
        country: 'France',
        _id: '5d6ded6fcb8d55944c7fc5e6',
      },
    ])

    await tree.insertDocuments({
      age: 26,
      country: 'Greenland',
      email: 'lisa@lesmund.gl',
      canDeliver: true,
    })
    // // If you don't have any _i attach, it will create one for you
    inserted = await tree.insertDocuments({
      age: 42,
      email: 'jean.paul@valjean.fr',
    })
  } catch (e) {
    console.log(e.messsage)
  }

  console.log('-- Get doc _id : 5d6dc94e3c7734812f051d7b')
  console.log(await tree.getDocument('5d6dc94e3c7734812f051d7b'))
  console.log('-- Find : {age:33}')
  console.log(await tree.findDocuments({ age: 33 }))
  console.log('-- Find : {email:goptnik@dourak.ru}')

  console.log(await tree.findDocuments({ email: 'goptnik@dourak.ru' }))
  if (inserted) {
    console.log('-- Find : {_id:inserted._id}')
    console.log(await tree.findDocuments({ _id: inserted[0]._id }))
  }
  //
  console.log('-- Find : {age:{$gte:25}}')

  console.log(await tree.findDocuments({ age: { $gte: 25 } }))
  console.log('-- Find : {country:{$nin:["France","Belgium", "Russia"]}}')
  console.log(
    await tree.findDocuments({
      country: { $nin: ['France', 'Belgium', 'Russia'] },
    }),
  )

  console.log("-- Find : {country:{$in:['Belgium']}}")
  console.log(await tree.findDocuments({ country: { $in: ['Belgium'] } }))

  console.log("-- Delete : {country:{$in:['Belgium']}")
  console.log(await tree.deleteDocuments({ country: { $in: ['Belgium'] } }))

  console.log("-- Find : {country:{$in:['Belgium']}}")
  console.log(await tree.findDocuments({ country: { $in: ['Belgium'] } }))

  console.log('-- Find : {canDeliver:true}')
  const [lisa] = await tree.findDocuments({ canDeliver: true })
  if (lisa) {
    console.log(lisa)
    lisa.age = 27
    delete lisa.canDeliver
    lisa.isPending = true

    console.log('-- Replace lisa')
    console.log(await tree.replaceDocuments(lisa))
  }

  console.log('-- Find : {isPending:true}')
  console.log(await tree.findDocuments({ isPending: true }))

  console.log('-- Find : {canDeliver:true}')
  console.log(await tree.findDocuments({ canDeliver: true }))

  console.log("-- Find : {country:{$in:['Greenland']}}")
  console.log(await tree.findDocuments({ country: { $in: ['Greenland'] } }))

  timer.stop()
  console.log(timer.duration.s, 'seconds')
}

tree.onReady(start)
