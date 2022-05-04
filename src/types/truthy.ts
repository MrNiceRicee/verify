import Base from '../base';
import error from '../error/error';
import { generalOptions, internalOptions } from '../typedefs';

const isTruthy = (
  from: Base,
  options: generalOptions,
  internal: internalOptions
): Base => {
  if (!from.value) {
    return error(from, options, internal, 'must be truthy', {
      step: 'isTruthy',
    });
  }
  internal.state.set('isTruthy', true);
  return from;
};

export default isTruthy;
