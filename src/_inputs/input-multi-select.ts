import { InputBase } from "./input-base";

export class InputMultiSelect extends InputBase<string> {
  override controlType = 'multi-select';
}
