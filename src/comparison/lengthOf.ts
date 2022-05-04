import Big from 'big.js';
import Base from '../base';
import error from '../error/error';
import { compareOptions, internalOptions } from '../typedefs';

const operations = {
  eq: '=',
  gt: '>',
  gte: '>=',
  lt: '<',
  lte: '<=',
};

const isLength = (
  compare: number,
  from: Base,
  options: compareOptions,
  internal: internalOptions
): Base => {
  const operator = options.operator ?? 'eq';
  try {
    Big(compare);
  } catch (err) {
    return error(from, options, internal, '', {
      step: 'isLength',
      overrideError: `${options?.compareName || compare} must be a number`,
    });
  }
  if (!['eq', 'gt', 'gte', 'lt', 'lte'].includes(operator)) {
    return error(from, options, internal, '', {
      step: 'isLength',
      overrideError: 'must have a valid operator',
    });
  }
  if (from.type === 'array' && Array.isArray(from.value)) {
    if (!Big(from.value.length)[operator](compare))
      return error(
        from,
        options,
        internal,
        `must have length ${operations[operator]} ${
          options?.compareName || compare
        }`,
        {
          step: 'isLength',
          compare,
        }
      );

    internal.state.set('isLength', true);
    return from;
  }
  // check if string
  if (from.type === 'string' && typeof from.value === 'string') {
    if (!Big(from.value.length)[operator](compare))
      return error(
        from,
        options,
        internal,
        `must have length ${operations[operator]} ${
          options?.compareName || compare
        }`,
        {
          step: 'isLength',
          compare,
        }
      );

    internal.state.set('isLength', true);
    return from;
  }
  return error(from, options, internal, '', {
    step: 'isLength',
    overrideError: 'unknown type',
  });
};

export default isLength;
