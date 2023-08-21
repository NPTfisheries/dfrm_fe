import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { BackendService } from 'src/_services/backend.service';

import { InputBase } from 'src/_inputs/input-base';
import { InputService } from 'src/_services/input.service';

@Component({
  selector: 'app-form-container',
  templateUrl: './form-container.component.html',
  styleUrls: ['./form-container.component.css']
})
export class FormContainerComponent {

  inputs$!: Observable<InputBase<string>[]> | undefined;
  routeType: string | undefined;
  data?: any | undefined;

  constructor(
    private backendService: BackendService,
    private inputService: InputService,
  ) {
    // this.inputs$ = this.getInputs(this.routeType, this.data);
    // this.inputs$ = this.inputService.getDepartmentInputs(this.data);
    // this.inputs$ = this.inputService.getDivisionInputs(this.data);
  }

  getInputs(routeType: any, data?:any) {
    switch (routeType) {
      // case 'department':
      //   this.inputs$ = this.inputService.getDepartmentInputs(data);
      //   break;
      // case 'division':
      //   this.inputs$ = this.inputService.getDivisionInputs(data);
      //   break;
      // case 'project':
      //   this.inputs$ = this.inputService.getProjectInputs(data);
      //   break;
      case 'department':
        return this.inputService.getDepartmentInputs(data);
      case 'division':
        return this.inputService.getDivisionInputs(data);
      case 'project':
        return this.inputService.getProjectInputs(data);
      default:
        return
    }
  }

}
