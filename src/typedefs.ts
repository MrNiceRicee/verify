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
  operator?: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | undefined;
}

interface internalOptions {
  soft: boolean;
  missing?: string;
  status: number;
  name: string;
  state: Map<string, boolean>;
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
