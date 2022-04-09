import Base from '../base';
import error from '../error';
import { generalOptions, internalOptions } from '../typedefs';

const isBoolean = (
  from: Base,
  options: generalOptions,
  internal: internalOptions
): Base => {
  if (typeof from.value === 'boolean') {
    from.type = 'boolean';
    internal.state.set('isBoolean', true);
    return from;
  }
  return error(from, options, internal, 'must be a boolean', {
    step: 'isBoolean',
  });
};

export default isBoolean;
