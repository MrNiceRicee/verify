import Base from '../base';
import error from '../error';
import { generalOptions, internalOptions } from '../typedefs';

const isString = (
  from: Base,
  options: generalOptions,
  internal: internalOptions
): Base => {
  if (typeof from.value === 'string') {
    from.type = 'string';
    internal.state.set('isString', true);
    return from;
  }
  return error(from, options, internal, 'must be a string', {
    step: 'isString',
  });
};

export default isString;
