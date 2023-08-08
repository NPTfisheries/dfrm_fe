import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AlertService } from 'src/_services/alert.service';
import { BackendService } from 'src/_services/backend.service';

interface Fields {
  [key: string]: string;
}

@Component({
  selector: 'app-add-edit-page',
  templateUrl: './add-edit-page.component.html',
  styleUrls: ['./add-edit-page.component.css']
})
export class AddEditPageComponent {
  form!: FormGroup;
  // formatLabel = formatLabel
  loading = false;
  submitted = false;
  data: any | null = null;

  fields: Fields = {
    name: 'text',
    description: 'text',
    manager: 'text',
    deputy: 'text',
    assistant: 'text',
  };

  get fieldsKeys(): string[] {
    return Object.keys(this.fields);
  }

  trackByFn(index: number, item: string): string {
    return item;
  }

  constructor(
    private formBuilder: FormBuilder,
    private activeModal: NgbActiveModal,
    private backendService: BackendService,
    private alertService: AlertService,
  ) { }

  get f() { return this.form.controls; }

  ngOnInit() {
    this.form = this.formBuilder.group({});

    // Adding form controls dynamically based on fields

    for (const key of this.fieldsKeys) {
      const validators = this.fields[key] === 'text' ? [Validators.required] : [];
      this.form.addControl(key, this.formBuilder.control('', validators));
    }

    // this.backendService.get(data => {
    //   this.data = data;
    // });
  }

  onSubmit() {
    console.log('clicked update department');
    this.submitted = true;
    this.loading = true;

    // stop here if form is invalid
    if (this.form.invalid) {
      this.loading = false;
      return;
    }

    console.log('You submitted on the Add/Edit page!')
    
    // this.activeModal.close();
  }
}
