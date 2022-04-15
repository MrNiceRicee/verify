interface initialOptions {
    soft?: boolean;
    missing?: string;
    status?: number;
    name?: string;
}
interface generalOptions {
    message?: string;
    status?: number;
}
interface compareOptions {
    message?: string;
    status?: number;
    compareName?: string;
}
interface internalOptions {
    soft: boolean;
    missing?: string;
    status: number;
    name: string;
    state: Map<string, boolean>;
}
declare type keyOptions = 'isDefined' | 'isBoolean' | 'isNumber' | 'isInt' | 'isString' | 'isArray' | 'isEquals' | 'isGTE' | 'isGT' | 'isLTE' | 'isLT' | null;
export { initialOptions, internalOptions, generalOptions, compareOptions, keyOptions, };
