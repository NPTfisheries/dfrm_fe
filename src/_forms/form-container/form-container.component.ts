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

  inputs$: Observable<InputBase<any>[]>;
  
  constructor(
    private backendService: BackendService,
    private inputService: InputService,
  ) {
    // this.inputs$ = this.inputService.getInputs();
    // this.inputs$ = this.inputService.getProjectInputs();
    // this.inputs$ = this.inputService.getDepartmentInputs();
    this.inputs$ = this.inputService.getDivisionInputs();

  }

}
