import cloneDeep from 'lodash.clonedeep';

export async function get(identifier) {
  if (!identifier) throw new Error('Expected an objectid');

  const res = await this.adapter.getDocument(identifier);

  return cloneDeep(res) || null;
}
