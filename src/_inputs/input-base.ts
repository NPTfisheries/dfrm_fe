export class InputBase<T> {
  value: T | undefined;
  valueArray: string[] | undefined;
  idArray: number[] | undefined;
  key: string;
  label: string;
  order: number;
  controlType: string;
  type: string;
  options: { key: string, value: string }[];

  // validators https://angular.io/api/forms/Validators#description
  required: boolean;
  min: number | null;
  max: number | null;
  minlength: string;
  maxlength: string;
  pattern: string;
  patternMessage: string;

  constructor(options: {
    value?: T;
    valueArray?: string[];
    idArray?: number[];
    key?: string;
    label?: string;
    order?: number;
    controlType?: string;
    type?: string;
    options?: { key: string, value: string }[];
    // validators
    required?: boolean;
    min?: number;
    max?: number;
    minlength?: string;
    maxlength?: string;
    pattern?: string;
    patternMessage?: string;

  } = {}) {
    this.value = options.value;
    this.valueArray = options.valueArray;
    this.idArray = options.idArray;
    this.key = options.key || '';
    this.label = options.label || '';
    this.order = options.order === undefined ? 1 : options.order;
    this.controlType = options.controlType || '';
    this.type = options.type || '';
    this.options = options.options || [];
    // validators
    this.required = !!options.required;
    this.min = options.min || null;
    this.max = options.max || null;
    this.minlength = options.minlength || '';
    this.maxlength = options.maxlength || '';
    this.pattern = options.pattern || '';
    this.patternMessage = options.patternMessage || '';
  }
}
