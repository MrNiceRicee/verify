import Big from 'big.js';
import Base from '../base';
import error from '../error/error';
import { compareOptions, internalOptions } from '../typedefs';

const isLT = (
  compare: any,
  from: Base,
  options: compareOptions,
  internal: internalOptions
): Base => {
  if (!from.verifiedNumber) {
    return error(from, options, internal, `must be a verified number`, {
      step: 'isLT',
    });
  }
  try {
    Big(compare);
  } catch (err) {
    return error(from, options, internal, '', {
      step: 'isLT',
      overrideError: `${options?.compareName || compare} must be a number`,
    });
  }
  try {
    if (from.verifiedNumber && from.verifiedNumber.lt(compare)) {
      internal.state.set('isLT', true);
      from.compared = compare;
      return from;
    }
    throw Error('Big error');
  } catch (err) {
    return error(
      from,
      options,
      internal,
      `must be < ${options?.compareName || compare}`,
      {
        step: 'isLT',
        compare,
      }
    );
  }
};

export default isLT;
