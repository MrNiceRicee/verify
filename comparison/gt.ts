import Big from 'big.js';
import Base from '../base';
import error from '../error';
import { compareOptions, internalOptions } from '../typedefs';

const isGT = (
  compare: any,
  from: Base,
  options: compareOptions,
  internal: internalOptions
) => {
  if (!from.verifiedNumber) {
    return error(from, options, internal, `must be a verified number`, {
      step: 'isGT',
    });
  }
  try {
    Big(compare);
  } catch (err) {
    return error(from, options, internal, null, {
      step: 'isGT',
      overrideError: `${options?.compareName || compare} must be a number`,
    });
  }
  try {
    if (from.verifiedNumber && from.verifiedNumber.gt(compare)) {
      internal.state.set('isGT', true);
      from.compared = compare;
      return from;
    }
    throw Error('Big error');
  } catch (err) {
    return error(
      from,
      options,
      internal,
      `must be > ${options?.compareName || compare}`,
      {
        step: 'isGT',
        compare,
      }
    );
  }
};

export default isGT;
