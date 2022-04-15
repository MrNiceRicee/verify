import { initialOptions } from './src/typedefs';
import Base from './src/base';

const verify = (value: any, options: initialOptions = {}) => {
  const base = new Base(value, options);

  return base;
};

export default verify;
