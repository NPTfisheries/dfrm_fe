import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { InputBase } from 'src/_inputs/input-base';
import { InputControlService } from 'src/_services/input-control.service';
import { BackendService } from 'src/_services/backend.service';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html'
})
export class DynamicFormComponent implements OnInit {

  @Output() formSubmitted: EventEmitter<void> = new EventEmitter<void>;
  @Output() formValidityChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input() routeType!: string;
  @Input() inputs: InputBase<string>[] | null = [];
  @Input() identifier!: string; // id || slug
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
    // console.log('Dynamic Form submit:', this.routeType, this.form.value);
    // dealing with empty arrays - cannot present data as [""] which is the default value for no selection in html.
    if (Array.isArray(this.form.value.staff) && this.form.value.staff.length === 1 && this.form.value.staff[0] === "" || this.form.value.staff === "") {
      this.form.value.staff=[];
    }

    if (Array.isArray(this.form.value.project_leader) && this.form.value.project_leader.length === 1 && this.form.value.project_leader[0] === "" || this.form.value.project_leader === "") {
      this.form.value.project_leader=[];
    }

    if (Array.isArray(this.form.value.editors) && this.form.value.editors.length === 1 && this.form.value.editors[0] === "" ||  this.form.value.editors === "") {
      this.form.value.editors=[];
    }

    // update booleans - if not adjusted they retain an empty string, non-boolean value.
    if(this.form.value.display === '') { this.form.value.display = false; }
    if(this.form.value.is_active === '') { this.form.value.is_active = false; }

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
        this.backendService.updateItem(this.routeType, this.identifier, this.form.value).subscribe({
          next: () => {this.formSubmitted.emit();}
        });
      }
    }

  }

}
