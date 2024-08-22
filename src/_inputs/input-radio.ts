import { InputBase } from "./input-base";

export class InputRadio extends InputBase<string> {
  override controlType = 'radio';
}
