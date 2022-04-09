import Big from 'big.js';
import Base from '../base';
import error from '../error';
import { compareOptions, internalOptions } from '../typedefs';

const isGTE = (
  compare: any,
  from: Base,
  options: compareOptions,
  internal: internalOptions
) => {
  if (!from.verifiedNumber) {
    return error(from, options, internal, `must be a verified number`, {
      step: 'isGTE',
    });
  }
  try {
    Big(compare);
  } catch (err) {
    return error(from, options, internal, null, {
      step: 'isGTE',
      overrideError: `${options?.compareName || compare} must be a number`,
    });
  }
  try {
    if (from.verifiedNumber && from.verifiedNumber.gte(compare)) {
      internal.state.set('isGTE', true);
      from.compared = compare;
      return from;
    }
    throw Error('Big error');
  } catch (err) {
    return error(
      from,
      options,
      internal,
      `must be >= ${options?.compareName || compare}`,
      {
        step: 'isGTE',
        compare,
      }
    );
  }
};

export default isGTE;
