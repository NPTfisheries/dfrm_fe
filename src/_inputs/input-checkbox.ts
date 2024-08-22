import { InputBase } from "./input-base";

export class InputCheckbox extends InputBase<string> {
  override controlType = 'checkbox';
  override type = 'checkbox';
}
