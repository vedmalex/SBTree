import cloneDeep from 'lodash.clonedeep';
import { SBTree } from '../SBTree/SBTree';

export async function get(this:SBTree, identifier) {
  if (!identifier) throw new Error('Expected an objectid');

  const res = await this.adapter.getDocument(identifier);

  return cloneDeep(res) || null;
}
