import { remove } from '../../ops/remove';
import { SBTree } from '../SBTree';

export async function deleteDocuments(this: SBTree, query) {
  if (!query || query === {}) {
    // this would cause to delete all as we would query all.
    throw new Error('Invalid query');
  }
  if (!this.isReady) {
    await this.onReady();
  }

  return (await (remove.call(this, query)) as ReturnType<typeof remove>);
}
