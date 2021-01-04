import { query } from '../../ops/query';
import { SBTree } from '../SBTree';

export async function findDocuments(this: SBTree, params) {
  if (!this.state.isReady) {
    await this.isReady();
  }

  return (await query.call(this, params));
}
