import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { buildImageUrl } from 'src/_utilities/buildImageUrl';
import { InputBase } from 'src/_inputs/input-base';
import { ImageService } from 'src/_services/image.service';

@Component({
  selector: 'app-dynamic-form-input',
  templateUrl: './dynamic-form-input.component.html'
})
export class DynamicFormInputComponent implements OnInit {
  @Input() input!: InputBase<string>;
  @Input() form!: FormGroup;

  imagePreview: string | undefined;

  constructor(
    private imageService: ImageService,
  ) { }

  ngOnInit(): void {
    if (this.input.controlType === 'image') {
      // load initial preview.
      this.updatePreview(Number(this.input.value));
    }
    if (this.input.controlType === 'checkbox') {
      console.log('checkbox', this.input, typeof(this.input.value));
      console.log(Boolean(this.input.value), typeof(Boolean(this.input.value)))
    }
  }

  get isValid() { return this.form.controls[this.input.key].valid; }

  getInputClasses(input: any): { [key: string]: boolean } {
    return {
      'validationError': this.form.get(input.key)?.errors !== null,
    };
  }


  // ONLY for Image Preview  **************************************************
  onSelectChange(event: any): void {
    if (this.input.controlType !== 'image') { return; }
    // console.log(event.target.options[event.target.selectedIndex].text);
    // console.log(event.target.options[event.target.selectedIndex].value);
    this.updatePreview(event.target.options[event.target.selectedIndex].value);
  }

  private updatePreview(id: number) {
    if (id === 0) return; // prevents errors for 'Add' from where no image selected yet.

    this.imageService.getImageById(id).subscribe(img => {
      this.imagePreview = buildImageUrl(img?.image);
    });

  }
  // **************************************************************************

}
