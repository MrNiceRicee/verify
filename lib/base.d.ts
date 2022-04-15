import Big from 'big.js';
import { initialOptions, keyOptions, generalOptions, compareOptions } from './typedefs';
declare class Base {
    #private;
    value: any;
    type: string | null;
    verifiedNumber: Big | null;
    error: boolean | string;
    failed: boolean;
    compared: any;
    steps: (key?: keyOptions | undefined) => boolean | Map<string, boolean> | undefined;
    constructor(value: any, options?: initialOptions);
    /**
     * @description checks if value is a boolean
     */
    isBoolean(options?: generalOptions): Base;
    /**
     * @description checks if value is a number
     */
    isNumber(options?: generalOptions): Base;
    /**
     * @description checks if value is an int
     */
    isInt(options?: generalOptions): Base;
    /**
     * @description checks if value is a string
     */
    isString(options?: generalOptions): Base;
    /**
     * @description checks if value is an array
     */
    isArray(options?: generalOptions): Base;
    /**
     * @description checks if value is equals to compare
     * @param {any} compare
     */
    isEquals(compare: any, options?: compareOptions): Base;
    /**
     * @description checks if value is greater than or equal to compare
     * @param {any} compare
     */
    isGTE(compare: any, options?: compareOptions): Base;
    /**
     * @description checks if value is greater than to compare
     * @param {any} compare
     */
    isGT(compare: any, options?: compareOptions): Base;
    /**
     * @description checks if value is less than or equal to compare
     * @param {any} compare
     */
    isLTE(compare: any, options?: compareOptions): Base;
    /**
     * @description checks if value is less then to compare
     * @param {any} compare
     */
    isLT(compare: any, options?: compareOptions): Base;
}
export default Base;
