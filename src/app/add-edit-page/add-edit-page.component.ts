import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AlertService } from 'src/_services/alert.service';
import { BackendService } from 'src/_services/backend.service';

import { formatLabel } from 'src/_helpers/formatLabel';

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
  formatLabel = formatLabel
  loading = false;
  submitted = false;
  data: any | undefined;

  url: string = '';
  addOrEdit: string | undefined;
  routeType: string | undefined;

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
    // console.log('MODAL:', this.url);

    if (this.url !== undefined) {
      if (this.addOrEdit === 'edit') {
        this.backendService.get(this.url).subscribe(data => {
          this.data = data;

          this.initializeFormWithData();
        });
      } else {
        this.initializeFormWithData();
      }

    }

  }

  initializeFormWithData() {
    this.form = this.formBuilder.group({
      name: [this.data?.name || '', Validators.required],
      description: [this.data?.description || '', Validators.required],
      manager: [this.data?.manager || '', Validators.required],
      deputy: [this.data?.deputy || '', Validators.required],
      assistant: [this.data?.assistant || '', Validators.required],
    });
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
    this.backendService.post(this.url, this.form.value).subscribe(response =>
      console.log('ADD/EDIT response:', response)
      );

    this.activeModal.close();
  }
}
