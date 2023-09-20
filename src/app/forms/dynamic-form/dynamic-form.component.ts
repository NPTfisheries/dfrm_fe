import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { InputBase } from 'src/_inputs/input-base';
import { InputControlService } from 'src/_services/input-control.service';
import { BackendService } from 'src/_services/backend.service';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent implements OnInit {

  @Output() formSubmitted: EventEmitter<void> = new EventEmitter<void>;
  @Output() formValidityChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input() routeType!: string;
  @Input() inputs: InputBase<string>[] | null = [];
  @Input() slug!: string;
  @Input() addOrEdit!: string 
  form!: FormGroup;

  constructor(
    private ics: InputControlService,
    private backendService: BackendService,
      ) { }

  ngOnInit(): void {
    this.form = this.ics.toFormGroup(this.inputs as InputBase<string>[]);
    this.form.statusChanges.subscribe((status) => {
      this.formValidityChanged.emit(status === 'VALID');
    });
  }

  onSubmit() {
    // dealing with empty arrays - cannot present data as [""] which is the default value for no selection in html.
    if (Array.isArray(this.form.value.staff) && this.form.value.staff.length === 1 && this.form.value.staff[0] === "") {
      this.form.value.staff=[];
      // console.log('Staff was a string, reassigned as empty array:', this.form.value.staff);
    }

    if (Array.isArray(this.form.value.project_leader) && this.form.value.project_leader.length === 1 && this.form.value.project_leader[0] === "") {
      this.form.value.project_leader=[];
      // console.log('Project leader was a string, reassigned as empty array:', this.form.value.project_leader);
    }

    if(this.addOrEdit === 'add') {
      this.backendService.newItem(this.routeType, this.form.value).subscribe({
        next: () => {this.formSubmitted.emit();}
      });
    }

    if(this.addOrEdit === 'edit') {
      if(this.routeType === 'profile') {
        this.backendService.updateProfile(this.form.value).subscribe({
          next: () => {this.formSubmitted.emit();}
        });
      } else {
        this.backendService.updateItem(this.routeType, this.slug, this.form.value).subscribe({
          next: () => {this.formSubmitted.emit();}
        });
      }
    }

  }

}
