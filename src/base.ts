import Big from 'big.js';
import {
  internalOptions,
  initialOptions,
  keyOptions,
  generalOptions,
  compareOptions,
} from './typedefs';

import internalBoolean from './types/boolean';
import internalNumber from './types/number';
import internalInt from './types/int';
import internalString from './types/string';
import internalArray from './types/array';

import internalEquals from './comparison/equals';
import internalGTE from './comparison/gte';
import internalGT from './comparison/gt';
import internalLTE from './comparison/lte';
import internalLT from './comparison/lt';
import internalLengthOf from './comparison/lengthOf';

import Defined from './types/defined';
import Truthy from './types/truthy';
import ErrorException from './error/ErrorException';

class Base {
  #options: internalOptions;

  value: any;
  type: string | null;
  verifiedNumber: Big | null;
  error: boolean | string;
  failed: boolean;
  compared: any;
  steps: (
    key?: keyOptions | undefined
  ) => boolean | Map<string, boolean> | undefined;

  constructor(value: any, options?: initialOptions) {
    this.value = value;

    this.#options = {
      soft: options?.soft || false,
      missing: options?.missing,
      status: options?.status || 400,
      name: options?.name || this.value,
      state: new Map(),
    };
    this.type = null;
    this.verifiedNumber = null;
    this.error = false;
    this.failed = false;
    this.compared = null;
    this.steps = (key?: keyOptions) =>
      key ? this.#options.state.get(key) : this.#options.state;
    this.#initialize();
  }

  #initialize() {
    if (!Defined(this.value)) {
      if (this.#options.soft) {
        this.error = this.#options.missing || `missing ${this.#options.name}`;
        this.failed = true;
        this.#options.state.set('isDefined', false);
      } else {
        throw new ErrorException(
          this.#options.missing || `missing ${this.#options.name}`,
          this.#options.status
        );
      }
    }
    this.#options.state.set('isDefined', true);
  }

  isTruthy(options: compareOptions = {}) {
    return Truthy(this, options, this.#options);
  }

  /**
   * @description checks if value is a boolean
   */
  isBoolean(options: generalOptions = {}) {
    return internalBoolean(this, options, this.#options);
  }

  /**
   * @description checks if value is a number
   */
  isNumber(options: generalOptions = {}) {
    return internalNumber(this, options, this.#options);
  }

  /**
   * @description checks if value is an int
   */
  isInt(options: generalOptions = {}) {
    return internalInt(this, options, this.#options);
  }

  /**
   * @description checks if value is a string
   */
  isString(options: generalOptions = {}) {
    return internalString(this, options, this.#options);
  }

  /**
   * @description checks if value is an array
   */
  isArray(options: generalOptions = {}) {
    return internalArray(this, options, this.#options);
  }

  // comparisons

  /**
   * @description checks if value is equals to compare
   * @param {any} compare
   */
  isEquals(compare: any, options: compareOptions = {}) {
    return internalEquals(compare, this, options, this.#options);
  }

  /**
   * @description checks if value is greater than or equal to compare
   * @param {any} compare
   */
  isGTE(compare: any, options: compareOptions = {}) {
    return internalGTE(compare, this, options, this.#options);
  }

  /**
   * @description checks if value is greater than to compare
   * @param {any} compare
   */
  isGT(compare: any, options: compareOptions = {}) {
    return internalGT(compare, this, options, this.#options);
  }

  /**
   * @description checks if value is less than or equal to compare
   * @param {any} compare
   */
  isLTE(compare: any, options: compareOptions = {}) {
    return internalLTE(compare, this, options, this.#options);
  }
  /**
   * @description checks if value is less then to compare
   * @param {any} compare
   */
  isLT(compare: any, options: compareOptions = {}) {
    return internalLT(compare, this, options, this.#options);
  }

  /**
   * @description checks if value length matches operator selected \
   * DEFAULT: eq
   */
  isLength(compare: any, options: compareOptions = {}) {
    return internalLengthOf(compare, this, options, this.#options);
  }
}

export default Base;
