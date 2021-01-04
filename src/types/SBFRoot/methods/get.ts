import { SBFRoot } from '../SBFRoot';

export async function get(this: SBFRoot, identifier) {
  const adapter = this.getAdapter();
  return await adapter.getDocument(identifier);
}
