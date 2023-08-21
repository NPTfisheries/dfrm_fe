import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';

import { InputBase } from 'src/_inputs/input-base';
import { InputService } from 'src/_services/input.service';

@Component({
  selector: 'app-form-container',
  templateUrl: './form-container.component.html',
  styleUrls: ['./form-container.component.css']
})
export class FormContainerComponent implements OnInit {

  @Input() routeType: string | undefined;  // always provided...?
  @Input() data?: any | undefined;
  @Input() url!: string;

  inputs$!: Observable<InputBase<string>[]> | undefined;
  addOrEdit: string = 'Add';

  constructor(
    private inputService: InputService,
  ) { }

  ngOnInit(): void {
    this.inputs$ = this.getInputs(this.routeType, this.data);
    if(this.data) { this.addOrEdit == 'Edit'};
  }

  getInputs(routeType: any, data?: any) {
    console.log('getInputs', routeType, data)

    switch (routeType) {
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
