export class InputBase<T> {
  value: T | undefined;
  valueArray: string[] | undefined;
  idArray: number[] | undefined;
  key: string;
  label: string;
  required: boolean;
  order: number;
  controlType: string;
  type: string;
  options: { key: string, value: string }[];

  constructor(options: {
    value?: T;
    valueArray?: string[];
    idArray?: number[];
    key?: string;
    label?: string;
    required?: boolean;
    order?: number;
    controlType?: string;
    type?: string;
    options?: { key: string, value: string }[];
  } = {}) {
    this.value = options.value;
    this.valueArray = options.valueArray;
    this.idArray = options.idArray;
    this.key = options.key || '';
    this.label = options.label || '';
    this.required = !!options.required;
    this.order = options.order === undefined ? 1 : options.order;
    this.controlType = options.controlType || '';
    this.type = options.type || '';
    this.options = options.options || [];
  }
}
