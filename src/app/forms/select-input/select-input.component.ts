import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/_services/user.service';
import { FormGroup } from '@angular/forms';

import { InputBase } from 'src/_inputs/input-base';
import { DivisionService } from 'src/_services/division.service';
import { FacilityService } from 'src/_services/facility.service';
import { TaskService } from 'src/_services/task.service';
import { ProjectService } from 'src/_services/project.service';

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
    private projectService: ProjectService
  ) { }

  ngOnInit(): void {
    this.selectedOption = this.input.value;
    if (['editors', 'employee_authors', 'project_leader', 'staff'].includes(this.input.key)) {
      this.multiple = true;
      this.selectedOption = this.input.idArray
      this.form.get(`${this.input.key}`)?.patchValue(this.input.idArray); //make sure the form value is updated for validation.
    }

    // if (this.input.key === 'project_leader') { console.log('XXX', this.input) };

    switch (this.input.key) {
      case 'facility_type':
        this.options$ = this.facilityService.getFacilityTypes().subscribe(ftypes => {
          this.labels = 'name';
          this.options$ = ftypes;
        });
        break;
      case 'task_type':
        this.options$ = this.taskService.getTaskTypes().subscribe(ttypes => {
          this.labels = 'name';
          this.options$ = ttypes;
        });
        break;
      case 'division':
      case 'division_id':
        this.options$ = this.divisionService.getDivisions().subscribe(divisions => {
          this.labels = 'name';
          this.options$ = divisions;
        });
        break;
      case 'project':
      case 'project_id':
        this.options$ = this.projectService.getProjects().subscribe(projects => {
          this.labels = 'name';
          this.options$ = projects;
        });
        break;
      case 'document_type':
        this.labels = 'document_type';
        this.options$ = ["Annual Report", "Journal Article", "Technical Memo", "Presentation Slides", "Other"];
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
