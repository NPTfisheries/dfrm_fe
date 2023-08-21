import { InputBase } from "./input-base";

export class InputTextarea extends InputBase<string> {
  override controlType = 'textarea';
}
