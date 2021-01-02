import cloneDeep from 'lodash.clonedeep';
import FsAdapter from '../FsAdapter';

export default async function getDocument(this:FsAdapter, identifier) {
  return cloneDeep(await this.openDocument(identifier));
}
