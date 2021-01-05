import FsAdapter from '../FsAdapter'

export default async function saveLeafData(this: FsAdapter, leafName, data) {
  const job = await this.queue
    .add('File.create', `${this.path}/l/${leafName}.json`, data)
    .execution()
  let res = {}
  if (!(job.result instanceof Error)) {
    res = job.result
  }
  this.lastChange = Date.now()

  return res
}
