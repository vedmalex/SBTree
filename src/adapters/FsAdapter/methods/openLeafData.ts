import FsAdapter from '../FsAdapter';
import { LeafDataProps } from '../../common/LeafData';

export default async function openLeafData(this:FsAdapter, leafName): Promise<LeafDataProps>{
  const job = await this.queue.add('File.read', `${this.path}/l/${leafName}.json`,{}).execution();
  let data:LeafDataProps = {keys:[]};
  if (!(job.result instanceof Error)) {
    data = job.result;
  }
  this.lastChange = Date.now();

  return data;
}
