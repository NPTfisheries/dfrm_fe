import { Component, EventEmitter, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AlertService } from 'src/_services/alert.service';
import { BackendService } from 'src/_services/backend.service';

import { CustomSelectComponent } from 'src/_inputs/custom-select/custom-select.component';
import { MultiSelectComponent } from 'src/_inputs/multi-select/multi-select.component';

@Component({
  selector: 'app-add-edit-page',
  templateUrl: './add-edit-page.component.html',
  styleUrls: ['./add-edit-page.component.css'],
  entryComponents: [CustomSelectComponent, MultiSelectComponent],
})
export class AddEditPageComponent {

  @Output() updateList: EventEmitter<void> = new EventEmitter<void>();

  form!: FormGroup;
  loading = false;
  submitted = false;
  data: any | undefined;

  url: string = ''; // passed from list-page
  addOrEdit: string | undefined;
  routeType: string | undefined; // project, division, department

  trackByFn(index: number, item: string): string {
    return item;
  }

  constructor(
    private formBuilder: FormBuilder,
    private activeModal: NgbActiveModal,
    private alertService: AlertService,
    private backendService: BackendService,
  ) { }

  get f() { return this.form.controls; }

  ngOnInit() {
    // console.log('MODAL:', this.url);
    this.loadData();
  }

  loadData() {
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
    if (this.routeType !== 'project') {
      this.form = this.formBuilder.group({
        name: [this.data?.name || '', Validators.required],
        description: [this.data?.description || '', Validators.required],
        manager: [this.data?.manager || '', Validators.required],
        deputy: [this.data?.deputy || '', Validators.required],
        assistant: [this.data?.assistant || '', Validators.required],
        staff: [this.data?.staff || [], Validators.required],
        ...(this.routeType === 'division' ? { department: [this.data?.department || '', Validators.required] } : {}),
      });
    } else {
      this.form = this.formBuilder.group({
        name: [this.data?.name || '', Validators.required],
        description: [this.data?.description || '', Validators.required],
        project_leader: [this.data?.project_leader || '', Validators.required],
      });
    }
  }

  onSubmit() {
    console.log(`Attempting to ${this.addOrEdit} a ${this.routeType}`);
    this.submitted = true;
    this.loading = true;

    // stop here if form is invalid
    if (this.form.invalid) {
      this.alertService.error('Error: please check your values and try again.', { id: 'alert-modal', autoClose: true });
      this.loading = false;
      return;
    }

    if (this.addOrEdit === 'add') {
      this.backendService.post(this.url, this.form.value).subscribe(response => {
        console.log('Add response:', response);
      });
    }
    if (this.addOrEdit === 'edit') {
      this.backendService.put(this.url, this.form.value).subscribe(response => {
        console.log('Edit response:', response);
      });
    }

    this.activeModal.close('success');
    this.updateList.emit();
  }
  
}
