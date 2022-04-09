import { initialOptions } from './typedefs';
import Base from './base';

const verify = (value: any, options?: initialOptions) => {
  const base = new Base(value, options);

  return base;
};

export default verify;
