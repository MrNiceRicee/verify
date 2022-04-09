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

interface compareOptions extends generalOptions {
  compareName?: string;
}

interface internalOptions extends initialOptions {
  name?: string;
  state?: Map<string, boolean>;
}

type keyOptions =
  | 'isDefined'
  | 'isBoolean'
  | 'isNumber'
  | 'isInt'
  | 'isString'
  | 'isArray'
  | 'isEquals'
  | 'isGTE'
  | 'isGT'
  | 'isLTE'
  | 'isLT'
  | null;

export {
  initialOptions,
  internalOptions,
  generalOptions,
  compareOptions,
  keyOptions,
};
