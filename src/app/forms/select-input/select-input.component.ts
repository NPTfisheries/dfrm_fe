import { Component, OnInit, Input } from '@angular/core';
import { BackendService } from 'src/_services/backend.service';
import { FormGroup } from '@angular/forms';

import { InputBase } from 'src/_inputs/input-base';

@Component({
  selector: 'app-select-input',
  templateUrl: './select-input.component.html',
})
export class SelectInputComponent implements OnInit {

  @Input() input!: InputBase<string>;
  @Input() form!: FormGroup;


  options$: any | undefined;
  selectedOption!: any;
  labels!: string;
  multiple: boolean = false;

  constructor(
    private backendService: BackendService,
  ) { }

  ngOnInit(): void {
    this.selectedOption = this.input.value;
    if (['staff', 'project_leader'].includes(this.input.key)) {
      this.multiple = true;
      this.selectedOption = this.input.idArray
      this.form.get(`${this.input.key}`)?.patchValue(this.input.idArray); //make sure the form value is updated for validation.
    }

    if (this.input.key === 'project_leader') { console.log('XXX', this.input) };

    switch (this.input.key) {
      case 'facility_type':
        this.options$ = this.backendService.objectLookup('Facility').subscribe(ftypes => {
          this.labels = 'name';
          this.options$ = ftypes;
        });
        break;
      case 'task_type':
        this.options$ = this.backendService.objectLookup('Task').subscribe(ttypes => {
          this.labels = 'name';
          this.options$ = ttypes;
        });
        break;
      case 'division':
        this.options$ = this.backendService.getList('division').subscribe(divisions => {
          this.labels = 'name';
          this.options$ = divisions;          
        });
        break;
      case 'document_type':
        this.labels = 'document_type';
        this.options$ = ["Annual Report", "Journal Article", "Technical Memo","Presentation Slides","Other"];
        break;
      default:
        this.options$ = this.backendService.getList('users').subscribe(users => {
          this.labels = 'full_name';
          this.options$ = users;
        });
    }

  }

  updateValue() {
    // console.log(this.selectedOption);
    this.form.get(`${this.input.key}`)?.patchValue(this.selectedOption);
  }

  getInputClasses(input: any): { [key: string]: boolean } {
    return {
      'validationError': this.form.get(input.key)?.errors !== null
    };
  }
}
