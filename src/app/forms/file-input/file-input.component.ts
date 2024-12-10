import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-file-input',
  templateUrl: './file-input.component.html'
})
export class FileInputComponent implements OnInit {
  @Input() form!: FormGroup;
  @Input() controlName!: string;
  @Input() maxFileSizeMB?: number; // Maximum allowed file size in MB
  @Input() customErrors: { [key: string]: string } = {};

  get control(): FormControl {
    return this.form.get(this.controlName) as FormControl;
  }

  get isInvalid(): boolean {
    return this.control.touched && this.control.dirty && this.control.invalid;
  }

  get errorMessages(): string[] {
    const errors = this.control.errors || {};
    return Object.keys(errors).map(key => this.customErrors[key] || errors[key]);
  }

  get id(): string {
    return `file-input-${this.controlName}`;
  }

  constructor() {}

  ngOnInit(): void {}

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      // Check for file size
      if (this.maxFileSizeMB && file.size > this.maxFileSizeMB * 1024 * 1024) {
        this.control.setErrors({ fileSize: `File size exceeds ${this.maxFileSizeMB} MB limit.` });
      } else {
        this.control.setErrors(null);
        this.control.setValue(file);
      }
    } else {
      this.control.setValue(null);
      this.control.setErrors({ required: 'A file must be selected.' });
    }

    this.control.markAsTouched();
    this.control.markAsDirty();
  }

}
