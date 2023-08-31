import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { BackendService } from 'src/_services/backend.service';

import { InputBase } from 'src/_inputs/input-base';

@Component({
  selector: 'app-dynamic-form-input',
  templateUrl: './dynamic-form-input.component.html',
  styleUrls: ['./dynamic-form-input.component.css']
})
export class DynamicFormInputComponent {
  @Input() input!: InputBase<string>;
  @Input() form!: FormGroup;

  imagePreview: string | undefined;

  constructor(
    private backendService: BackendService,
  ) {}

  get isValid() { return this.form.controls[this.input.key].valid; }

  // for image preview
  onSelectChange(event: any): void {
    if(this.input.controlType !== 'image') { return; }
    
    // console.log(event.target.options[event.target.selectedIndex].value);
    // console.log(event.target.options[event.target.selectedIndex].text);
    const slug = event.target.options[event.target.selectedIndex].text.toLowerCase().replace(' ', '-');
    // console.log(slug);

    this.backendService.getImageBySlug(slug).subscribe(img => {
      this.imagePreview = img.image.replace('localhost:4200', 'localhost:8000');
    })
  }
  

}
