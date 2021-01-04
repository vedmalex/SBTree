import Adapters from '../../../adapters';

export function parseAdapter(_adapterOpts) {
  if (!Adapters[_adapterOpts.name]) {
    throw new Error(`Unknown adapter ${_adapterOpts.name}`);
  }
  return new Adapters[_adapterOpts.name](_adapterOpts);
}
