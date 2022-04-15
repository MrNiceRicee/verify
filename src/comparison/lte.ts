import Big from 'big.js';
import Base from '../base';
import error from '../error/error';
import { compareOptions, internalOptions } from '../typedefs';

const isLTE = (
  compare: any,
  from: Base,
  options: compareOptions,
  internal: internalOptions
): Base => {
  if (!from.verifiedNumber) {
    return error(from, options, internal, `must be a verified number`, {
      step: 'isLTE',
    });
  }
  try {
    // eslint-disable-next-line no-new
    new Big(compare);
  } catch (err) {
    return error(from, options, internal, '', {
      step: 'isLTE',
      overrideError: `${options?.compareName || compare} must be a number`,
    });
  }

  if (from.verifiedNumber && from.verifiedNumber.lte(compare)) {
    internal.state.set('isLTE', true);
    from.compared = compare;
    return from;
  }

  return error(
    from,
    options,
    internal,
    `must be <= ${options?.compareName || compare}`,
    {
      step: 'isLTE',
      compare,
    }
  );
};

export default isLTE;
