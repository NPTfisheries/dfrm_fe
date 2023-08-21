import { InputBase } from "./input-base";

export class InputSelect extends InputBase<string> {
  override controlType = 'select';
}
