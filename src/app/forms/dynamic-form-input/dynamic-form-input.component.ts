import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { InputBase } from 'src/_inputs/input-base';

@Component({
  selector: 'app-dynamic-form-input',
  templateUrl: './dynamic-form-input.component.html',
  styleUrls: ['./dynamic-form-input.component.css']
})
export class DynamicFormInputComponent {
  @Input() input!: InputBase<string>;
  @Input() form!: FormGroup;

  get isValid() { return this.form.controls[this.input.key].valid; }
}
