import { InputBase } from "./input-base";

export class InputPhone extends InputBase<string> {
  override controlType = 'phone';
}
