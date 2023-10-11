import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { BackendService } from 'src/_services/backend.service';

import { InputBase } from 'src/_inputs/input-base';

@Component({
  selector: 'app-dynamic-form-input',
  templateUrl: './dynamic-form-input.component.html'
})
export class DynamicFormInputComponent implements OnInit {
  @Input() input!: InputBase<string>;
  @Input() form!: FormGroup;

  imagePreview: string | undefined;

  constructor(
    private backendService: BackendService,
  ) { }

  ngOnInit(): void {
    if (this.input.controlType === 'image') {
      // load initial preview.
      this.updatePreview(Number(this.input.value));
    }
  }

  get isValid() { return this.form.controls[this.input.key].valid; }

  getInputClasses(input: any): { [key: string]: boolean } {
    return {
      'validationError': this.form.get(input.key)?.errors !== null,
    };
  }


  // ONLY for Image Preview
  onSelectChange(event: any): void {
    if (this.input.controlType !== 'image') { return; }
    // console.log(event.target.options[event.target.selectedIndex].text);
    // console.log(event.target.options[event.target.selectedIndex].value);
    this.updatePreview(event.target.options[event.target.selectedIndex].value);
  }

  private updatePreview(id: number) {
    if (id === 0) return; // prevents errors for 'Add' from where no image selected yet.

    this.backendService.getImageById(id).subscribe(img => {
      this.imagePreview = img.image.replace('localhost:4200', 'localhost:8000');
    });
  }

}
