import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';

import { InputBase } from 'src/_inputs/input-base';
import { InputService } from 'src/_services/input.service';
import { BackendService } from 'src/_services/backend.service';
import { AlertService } from 'src/_services/alert.service';
import { DynamicFormComponent } from '../dynamic-form/dynamic-form.component';
import { ListPageComponent } from 'src/app/list-page/list-page.component';
import { DetailSubprojectComponent } from 'src/app/detail-page/detail-subproject/detail-subproject.component';
import { DetailTaskComponent } from 'src/app/detail-page/detail-task/detail-task.component';

@Component({
  selector: 'app-form-container',
  templateUrl: './form-container.component.html',
  styleUrls: ['./form-container.component.css']
})
export class FormContainerComponent implements OnInit {

  @Input() context!: ListPageComponent | DetailSubprojectComponent | DetailTaskComponent | undefined;

  @Input() routeType!: string;  // always provided.
  @Input() data?: any | undefined;
  @Input() projectId: string | null = null;  // provided only for refreshing subprojects.
  @Input() subprojectId: string | null = null;  // povided only for refreshing tasks.
  @Input() slug!: string;  // for update api --> passed to dynamic form.
  @Input() addOrEdit!: string 


  inputs$!: Observable<InputBase<string>[]> | undefined;
  formValid: boolean = false;

  @ViewChild(DynamicFormComponent) dynamicFormComponent!: DynamicFormComponent;

  constructor(
    private inputService: InputService,
    private backendService: BackendService,
    private activeModal: NgbActiveModal,
    private alertService: AlertService,
  ) { }

  ngOnInit(): void {
    this.inputs$ = this.getInputs(this.routeType, this.data);
    // console.log('Context:', this.context);
  }

  submitDynamicForm() {
    this.dynamicFormComponent.onSubmit();
  }

  handleFormSubmitted() {
    let route = this.routeType;

    if (this.projectId) { route = `${this.routeType}/?project_id=${this.projectId}` }; // subproject list, filtered
    if (this.subprojectId) { route = `${this.routeType}/?subproject_id=${this.subprojectId}` }; // task list, filtered

    if (route === 'profile') {
      this.backendService.getCurrentUser().subscribe(currentUser => {
        if (this.context) {
          this.context.data = currentUser;
          this.activeModal.close();
        }
      })
    }
    this.backendService.getList(route).subscribe((updatedList: any) => {
      if (this.context) {
        if(route === 'facility') {
          this.context.data = updatedList.features;
          this.activeModal.close();
        } else {
          this.context.data = updatedList;
          this.activeModal.close();
        }

        // this.alertService.success(`New ${this.routeType} succesfully created.`, { autoClose: true});
      }
    });
  }

  handleFormValidityChanged(valid: boolean) {
    this.formValid = valid;
  }

  getInputs(routeType: any, data?: any) {
    // console.log('getInputs', routeType, data);

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
      case 'profile':
        return this.inputService.getProfileInputs(data);
      case 'image':
        return this.inputService.getImageInputs(data);
      case 'facility':
        return this.inputService.getFacilityInputs(data);
      default:
        return
    }
  }

}
