import Base from '../base';
import { generalOptions, internalOptions } from '../typedefs';
interface extra {
    step: string;
    compare?: any | undefined;
    overrideError?: string | null;
}
declare const error: (base: Base, options: generalOptions, internal: internalOptions, message: string, { step, compare, overrideError }: extra) => Base;
export default error;
