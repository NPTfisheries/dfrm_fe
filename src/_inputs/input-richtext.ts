import { InputBase } from "./input-base";

export class InputRichText extends InputBase<string> {
  override controlType = 'richtext';
}
