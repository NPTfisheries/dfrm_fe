import { Component, EventEmitter, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AlertService } from 'src/_services/alert.service';
import { BackendService } from 'src/_services/backend.service';

import { CustomSelectComponent } from 'src/_inputs/custom-select/custom-select.component';
import { MultiSelectComponent } from 'src/_inputs/multi-select/multi-select.component';

@Component({
  selector: 'app-division-form',
  templateUrl: './division-form.component.html',
  styleUrls: ['./division-form.component.css'],
  entryComponents: [CustomSelectComponent, MultiSelectComponent],
})
export class DivisionFormComponent {

  @Output() updateList: EventEmitter<void> = new EventEmitter<void>();

  form!: FormGroup;
  loading = false;
  submitted = false;
  data: any | undefined;

  url: string = ''; // passed from list-page
  addOrEdit: string | undefined;
  routeType: string | undefined; // department, division, project


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
    this.loadData();
  }

  loadData() {
    console.log('Loading Division Form');
    if (this.url !== undefined) {
      if (this.addOrEdit === 'edit') {
        this.backendService.get(this.url).subscribe(data => {
          this.data = data;
          console.log('Project Form data: ', data);
          this.initializeForm(data);
        });
      } else {
        this.initializeForm(null);
      }
    }
  }

  initializeForm(data: any) {
    this.form = this.formBuilder.group({
      name: [this.data?.name || '', Validators.required],
      description: [this.data?.description || '', Validators.required],
      manager: [this.data?.manager?.id || '', Validators.required],
      deputy: [this.data?.deputy?.id || '', Validators.required],
      assistant: [this.data?.assistant?.id || '', Validators.required],
      staff: [this.data?.staff || [], Validators.required],
      department: ['1'],
    });
  }

  onSubmit() {
    console.log(`Attempting to ${this.addOrEdit} a ${this.routeType}`);
    this.submitted = true;
    this.loading = true;

    // stop here if form is invalid
    if (this.form.invalid) {
      this.alertService.error('Error: please check your values and try again.', { id: 'alert-modal', autoClose: true });
      console.log(this.form.value);
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
