import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/_services/user.service';
import { FormGroup } from '@angular/forms';

import { InputBase } from 'src/_inputs/input-base';
import { LookupService } from 'src/_services/lookup.service';
import { DivisionService } from 'src/_services/division.service';

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
    private lookupService: LookupService,
    private userService: UserService,
    private divisionService: DivisionService,
  ) { }

  ngOnInit(): void {
    this.selectedOption = this.input.value;
    if (['staff', 'project_leader', 'employee_authors'].includes(this.input.key)) {
      this.multiple = true;
      this.selectedOption = this.input.idArray
      this.form.get(`${this.input.key}`)?.patchValue(this.input.idArray); //make sure the form value is updated for validation.
    }

    // if (this.input.key === 'project_leader') { console.log('XXX', this.input) };

    switch (this.input.key) {
      case 'facility_type':
        this.options$ = this.lookupService.getLookupsByObjectType('Facility').subscribe(ftypes => {
          this.labels = 'name';
          this.options$ = ftypes;
        });
        break;
      case 'task_type':
        this.options$ = this.lookupService.getLookupsByObjectType('Task').subscribe(ttypes => {
          this.labels = 'name';
          this.options$ = ttypes;
        });
        break;
      case 'division':
        this.options$ =this.divisionService.getDivisions().subscribe(divisions => {
          this.labels = 'name';
          this.options$ = divisions;          
        });
        break;
      case 'document_type':
        this.labels = 'document_type';
        this.options$ = ["Annual Report", "Journal Article", "Technical Memo","Presentation Slides","Other"];
        break;
      default:
        this.userService.getUsers().subscribe(users => {
          this.options$ = users;
          this.labels = 'full_name';
        })
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
