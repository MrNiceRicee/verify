import Big from 'big.js';
import Base from '../base';
import error from '../error/error';
import { generalOptions, internalOptions } from '../typedefs';

const isNumber = (
  from: Base,
  options: generalOptions,
  internal: internalOptions
): Base => {
  try {
    from.verifiedNumber = new Big(from.value);
    from.type = 'number';
    internal.state.set('isNumber', true);
    return from;
  } catch (err) {
    return error(from, options, internal, 'must be a number', {
      step: 'isNumber',
    });
  }
};

export default isNumber;
