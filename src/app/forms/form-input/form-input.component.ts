import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.css']
})
export class FormInputComponent implements OnInit {
  @Input() form!: FormGroup;
  @Input() label!: string;
  @Input() controlName!: string;
  @Input() type: 'text' | 'password' | 'select' = 'text';
  @Input() options: { value: string; label: string; }[] = [];
  @Input() customErrors: { [key: string]: string } = {};

  get control(): FormControl {
    return this.form.get(this.controlName) as FormControl;
  }

  get isInvalid(): boolean {
    return this.control.touched && this.control.dirty && this.control.invalid;
  }

  get errorMessages(): string[] {
    const errors = this.control.errors || {};
    return Object.keys(errors).map(key => this.customErrors[key] || key);
  }

  get id(): string {
    return `form-control-${this.controlName}`;
  }

  constructor() { }

  ngOnInit(): void { }
}
