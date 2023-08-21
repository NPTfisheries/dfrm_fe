import { InputBase } from "./input-base";

export class InputHidden extends InputBase<string> {
  override controlType = 'hidden';
}
