import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';

import { InputBase } from 'src/_inputs/input-base';
import { InputService } from 'src/_services/input.service';
import { DynamicFormComponent } from '../dynamic-form/dynamic-form.component';
import { ListPageComponent } from 'src/app/list-page/list-page.component';

@Component({
  selector: 'app-form-container',
  templateUrl: './form-container.component.html'
})
export class FormContainerComponent implements OnInit {

  @Input() context!: ListPageComponent | undefined;

  @Input() routeType!: string;  // always provided.
  @Input() data?: any | undefined;
  @Input() identifier!: string;  // slug || id for update api --> passed to dynamic form.  
  @Input() addOrEdit!: string


  inputs$!: Observable<InputBase<string>[]> | undefined;
  formValid: boolean = false;

  @ViewChild(DynamicFormComponent) dynamicFormComponent!: DynamicFormComponent;

  constructor(
    private inputService: InputService,
    private activeModal: NgbActiveModal,
  ) { }

  ngOnInit(): void {
    this.inputs$ = this.getInputs(this.routeType, this.data);
    // console.log('Context:', this.context);
  }

  submitDynamicForm() {
    this.dynamicFormComponent.onSubmit();
  }

  handleFormSubmitted() {
    this.activeModal.close();
  }

  handleFormValidityChanged(valid: boolean) {
    this.formValid = valid;
  }

  getInputs(routeType: any, data?: any) {
    switch (routeType) {
      case 'department':
        return this.inputService.getDepartmentInputs(data);
      case 'division':
        return this.inputService.getDivisionInputs(data);
      case 'project':
        return this.inputService.getProjectInputs(data);
      case 'task':
        return this.inputService.getTaskInputs(data);
      case 'profile':
        return this.inputService.getProfileInputs(data);
      case 'image':
        return this.inputService.getImageInputs(data);
      case 'document':
        return this.inputService.getDocumentInputs(data);
      case 'facility':
        return this.inputService.getFacilityInputs(data);
      case 'location':
        return this.inputService.getLocationInputs(data);
      default:
        return
    }
  }

}
