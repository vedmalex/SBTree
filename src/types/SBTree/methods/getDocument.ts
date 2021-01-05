import { get } from '../../ops/get';
import { SBTree } from '../SBTree';

export async function getDocument(this: SBTree, identifier) {
  if (!this.state.isReady) {
    await this.isReady();
  }

  return (await (get.call(this, identifier)) as ReturnType<typeof get>);
}
