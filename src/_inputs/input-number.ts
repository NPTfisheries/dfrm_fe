import { InputBase } from "./input-base";

export class InputNumber extends InputBase<string> {
  override controlType = 'number';
  override type = 'number';
}
