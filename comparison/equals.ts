import Base from '../base';
import error from '../error/error';
import { compareOptions, internalOptions } from '../typedefs';

const isEquals = (
  compare: any,
  from: Base,
  options: compareOptions,
  internal: internalOptions
): Base => {
  try {
    if (from.verifiedNumber && from.verifiedNumber.eq(compare)) {
      internal.state.set('isEquals', true);
      from.compared = compare;
      return from;
    }
  } catch (err) {
    // see if it's a number
    return error(
      from,
      options,
      internal,
      `must be == ${options?.compareName || compare}`,
      {
        step: 'isEquals',
        compare,
      }
    );
  }
  // not a number comparison
  if (from.value === compare) {
    internal.state.set('isEquals', true);
    from.compared = compare;
    return from;
  }

  return error(
    from,
    options,
    internal,
    `must be == ${options?.compareName || compare}`,
    {
      step: 'isEquals',
      compare,
    }
  );
};

export default isEquals;
