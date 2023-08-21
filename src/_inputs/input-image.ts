import { InputBase } from "./input-base";

export class InputImage extends InputBase<string> {
  override controlType = 'image';
}
