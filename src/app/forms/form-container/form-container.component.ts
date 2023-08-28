import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';

import { InputBase } from 'src/_inputs/input-base';
import { InputService } from 'src/_services/input.service';
import { BackendService } from 'src/_services/backend.service';
import { DynamicFormComponent } from '../dynamic-form/dynamic-form.component';

@Component({
  selector: 'app-form-container',
  templateUrl: './form-container.component.html',
  styleUrls: ['./form-container.component.css']
})
export class FormContainerComponent implements OnInit {

  @Output() updateList: EventEmitter<any> = new EventEmitter<any>();

  @Input() routeType!: string;  // always provided.
  @Input() projectId: string | null = null;  // provided only for refreshing subprojects.
  @Input() subprojectId: string | null = null;  // povided only for refreshing tasks.

  @Input() data?: any | undefined;
  @Input() slug!: string;

  inputs$!: Observable<InputBase<string>[]> | undefined;
  formValid: boolean = false;

  @ViewChild(DynamicFormComponent) dynamicFormComponent!: DynamicFormComponent;

  constructor(
    private inputService: InputService,
    private backendService: BackendService,
    private activeModal: NgbActiveModal,
  ) { }

  ngOnInit(): void {
    this.inputs$ = this.getInputs(this.routeType, this.data);
  }

  submitDynamicForm() {
    this.dynamicFormComponent.onSubmit();
  }

  handleFormSubmitted() {

    let route = this.routeType;
    if(this.projectId) { route = `${this.routeType}/?project_id=${this.projectId}`}; // subproject list, filtered
    if(this.subprojectId) { route = `${this.routeType}/?subproject_id=${this.subprojectId}`}; // task list, filtered


    this.backendService.getList(route).subscribe(updatedList => {
      console.log('handleFormSubmitted fired.');
      this.updateList.emit(updatedList);
    });
    this.activeModal.close();
  }

  handleFormValidityChanged(valid: boolean) {
    // console.log('handleFormValidity:', valid);
    this.formValid = valid;
  }

  getInputs(routeType: any, data?: any) {
    console.log('getInputs', routeType, data);

    switch (routeType) {
      case 'department':
        return this.inputService.getDepartmentInputs(data);
      case 'division':
        return this.inputService.getDivisionInputs(data);
      case 'project':
        return this.inputService.getProjectInputs(data);
      case 'subproject':
        return this.inputService.getSubprojectInputs(data);
      case 'task':
        return this.inputService.getTaskInputs(data);
      case 'users':
        return this.inputService.getProfileInputs(data);
      case 'image':
        return this.inputService.getImageInputs(data);
      default:
        return
    }
  }

}
