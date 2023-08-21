import { InputBase } from "./input-base";

export class InputText extends InputBase<string> {
  override controlType = 'text';
}
