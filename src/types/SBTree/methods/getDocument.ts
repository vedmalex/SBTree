import { get } from '../../ops/get';
import { SBTree } from '../SBTree';

export async function getDocument(this: SBTree, identifier) {
  if (!this.isReady) {
    await this.onReady();
  }

  return (await (get.call(this, identifier)) as ReturnType<typeof get>);
}
