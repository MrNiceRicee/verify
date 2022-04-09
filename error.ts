import Base from './base';
import { generalOptions, internalOptions } from './typedefs';
import ErrorException from './ErrorException';

interface extra {
  step?: string;
  compare?: any;
  overrideError?: string;
}

const error = (
  base: Base,
  options: generalOptions,
  internal: internalOptions,
  message: string,
  { step, compare, overrideError }: extra = {}
) => {
  if (internal.soft) {
    base.error =
      base.error ||
      overrideError ||
      options?.message ||
      `${internal.name} ${message}`;
    base.failed = true;
    base.compared = compare;
    internal.state.set(step, false);
    return base;
  }
  throw new ErrorException(
    overrideError || options?.message || `${internal.name} ${message}`,
    options?.status || internal.status
  );
};

export default error;
