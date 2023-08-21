import { InputBase } from "./input-base";

export class InputDate extends InputBase<string> {
  override controlType = 'date';
}
