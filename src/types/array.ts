import Base from '../base';
import error from '../error/error';
import { generalOptions, internalOptions } from '../typedefs';

const isArray = (
  from: Base,
  options: generalOptions,
  internal: internalOptions
): Base => {
  if (Array.isArray(from.value)) {
    from.type = 'array';
    internal.state.set('isArray', true);
    return from;
  }
  return error(from, options, internal, 'must be an array', {
    step: 'isArray',
  });
};

export default isArray;
