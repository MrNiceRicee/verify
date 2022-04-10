import Big from 'big.js';
import Base from '../base';
import error from '../error/error';
import { generalOptions, internalOptions } from '../typedefs';

const isInt = (
  from: Base,
  options: generalOptions,
  internal: internalOptions
): Base => {
  try {
    const temp = new Big(from.value);
    if (temp.mod(1).toFixed() !== '0') {
      throw new Error('must be an int');
    }
    from.verifiedNumber = temp;
    from.type = 'number';
    internal.state.set('isInt', true);
    return from;
  } catch (err) {
    return error(from, options, internal, 'must be an int', {
      step: 'isInt',
    });
  }
};

export default isInt;
