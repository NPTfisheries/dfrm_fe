import { InputBase } from "./input-base";

export class InputFile extends InputBase<string> {
  override controlType = 'file';
}
