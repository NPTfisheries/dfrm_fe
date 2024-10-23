import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/_services/user.service';
import { FormGroup } from '@angular/forms';

import { InputBase } from 'src/_inputs/input-base';
import { DivisionService } from 'src/_services/division.service';
import { FacilityService } from 'src/_services/facility.service';
import { TaskService } from 'src/_services/task.service';
import { ProjectService } from 'src/_services/project.service';
import { InstrumentService } from 'src/_services/instrument.service';
import { DocumentService } from 'src/_services/document.service';

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
    private facilityService: FacilityService,
    private taskService: TaskService,
    private userService: UserService,
    private divisionService: DivisionService,
    private projectService: ProjectService,
    private instrumentService: InstrumentService,
    private documentService: DocumentService
  ) { }

  ngOnInit(): void {
    this.selectedOption = this.input.value;
    if (['editors', 'employee_authors', 'project_leader', 'staff'].includes(this.input.key)) {
      this.multiple = true;
      this.selectedOption = this.input.idArray
      this.form.get(`${this.input.key}`)?.patchValue(this.input.idArray); //make sure the form value is updated for validation.
    }

    // if (this.input.key === 'project_leader') { console.log('XXX', this.input) };

    this.options$ = this.input.options;
    console.log(this.input.key, 'selectcomponent', this.input.value, this.input.options);
    // console.log(this.input.key);
    // switch (this.input.key) {
    //   case 'facility_type':
    //     this.options$ = this.facilityService.getFacilityTypes().subscribe(ftypes => {
    //       console.log('facility_types:', ftypes);
    //       this.labels = 'name';
    //       this.options$ = ftypes;
    //     });
    //     break;
    //   case 'task_type':
    //     this.options$ = this.taskService.getTaskTypes().subscribe(ttypes => {
    //       console.log('task_types:', ttypes);
    //       this.labels = 'name';
    //       this.options$ = ttypes;
    //     });
    //     break;
    //   case 'instrument_type':
    //     this.options$ = this.instrumentService.getInstrumentTypes().subscribe(itypes => {
    //       console.log('instrument_types:', itypes);
    //       this.labels = 'name';
    //       this.options$ = itypes;
    //     });
    //     break;
    //   case 'division':
    //     this.options$ = this.divisionService.getDivisions().subscribe(divisions => {
    //       this.labels = 'name';
    //       this.options$ = divisions;
    //     });
    //     break;
    //   case 'project':
    //     this.options$ = this.projectService.getProjects().subscribe(projects => {
    //       this.labels = 'name';
    //       this.options$ = projects;
    //     });
    //     break;
    //   case 'document_type':
    //     this.documentService.getDocumentTypes().subscribe(dtypes => {
    //       console.log('document_types:', dtypes);
    //       this.labels = 'document_type';
    //       this.options$ = dtypes;
    //     })
    //     break;
    //   default:
    //     this.userService.getUsers().subscribe(users => {
    //       console.log('user select', users);
    //       this.options$ = users;
    //       this.labels = 'full_name';
    //     })
    // }

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
