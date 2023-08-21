import { Injectable } from '@angular/core';
import { map, of } from 'rxjs';

import { InputBase } from 'src/_inputs/input-base';
import { InputText } from 'src/_inputs/input-text';
import { InputDate } from 'src/_inputs/input-date';
import { InputSelect } from 'src/_inputs/input-select';
import { InputTextarea } from 'src/_inputs/input-textarea';
import { BackendService } from './backend.service';
import { InputMultiSelect } from 'src/_inputs/input-multi-select';
import { InputHidden } from 'src/_inputs/input-hidden';

@Injectable({ providedIn: 'root' })
export class InputService {

  constructor(private backendService: BackendService) { }

  // getInputs(routeType: string, data?: any) {
  //   switch(routeType):
  //   case 'department':
  //     return this.getDepartmentInputs(data);
  //   case 'division':
  //     return this.getDivisionInputs(data);
  //   case 'project':
  //     return this.getProjectInputs(data);
  //   default:
  //     return of([]);
  // }

  // TODO: get from a remote source of question metadata
  getDepartmentInputs(data?: any) {
    console.log('Getting Department Inputs...');
    const inputs: InputBase<string>[] = [
      new InputText({
        key: 'name',
        label: 'Name',
        value: data?.name || '',
        required: true,
        order: 1
      }),
      new InputTextarea({
        key: 'description',
        label: data?.description || 'Description',
        order: 2
      }),
      new InputSelect({
        key: 'manager',
        label: 'Manager',
        value: '',
        required: true,
        options: this.buildEmployeeOptions(),
        order: 3
      }),
      new InputSelect({
        key: 'deputy',
        label: 'Deputy',
        value: '',
        required: true,
        options: this.buildEmployeeOptions(),
        order: 4
      }),
      new InputSelect({
        key: 'assistant',
        label: 'Assistant',
        value: '',
        required: true,
        options: this.buildEmployeeOptions(),
        order: 5
      }),
      new InputMultiSelect({
        key: 'staff',
        label: 'Staff',
        value: "",
        required: true,
        options: this.buildEmployeeOptions(),
        order: 6
      })
    ]

    return of(inputs.sort((a, b) => a.order - b.order));
  }

  getDivisionInputs(data?: any) {
    console.log('Getting Division Inputs...');
    const inputs: InputBase<string>[] = [
      new InputText({
        key: 'name',
        label: 'Name',
        value: '',
        required: true,
        order: 1
      }),
      new InputTextarea({
        key: 'textarea',
        label: 'Description',
        order: 2
      }),
      new InputSelect({
        key: 'manager',
        label: 'Manager',
        value: '',
        required: true,
        options: this.buildEmployeeOptions(),
        order: 3
      }),
      new InputSelect({
        key: 'deputy',
        label: 'Deputy',
        value: '',
        required: true,
        options: this.buildEmployeeOptions(),
        order: 4
      }),
      new InputSelect({
        key: 'assistant',
        label: 'Assistant',
        value: '',
        required: true,
        options: this.buildEmployeeOptions(),
        order: 5
      }),
      new InputMultiSelect({
        key: 'staff',
        label: 'Staff',
        value: '',
        required: true,
        options: this.buildEmployeeOptions(),
        order: 6
      }),
      new InputHidden({
        key: 'department',
        value: '1', // default
        required: true,
        order: 99
      })
    ]

    return of(inputs.sort((a, b) => a.order - b.order));
  }

  getProjectInputs(data?: any) {
    console.log('Getting Project Inputs...');
    const inputs: InputBase<string>[] = [
      new InputText({
        key: 'name',
        label: 'Name',
        value: data?.name || '',
        required: true,
        order: 1
      }),
      new InputTextarea({
        key: 'textarea',
        label: data?.description || 'Description',
        value: '',
        order: 2
      }),
      new InputMultiSelect({
        key: 'project_leader',
        label: 'Project Leaders',
        value: "",
        required: true,
        options: this.buildEmployeeOptions(),
        order: 3
      }),
      new InputHidden({
        key: 'department',
        value: '1', // default
        required: true,
        order: 99
      })
    ]

    return of(inputs.sort((a, b) => a.order - b.order));
  }


  private buildEmployeeOptions() {
    let options: { key: string, value: string }[] = [];

    this.backendService.get('/api/v1/users/').subscribe((employees: any) => {
      // console.log("buildEmployeeOptions:", employees);
      for (let emp of employees) {
        options.push({ key: emp.id, value: emp.first_name + ' ' + emp.last_name })
      }
    })

    return options;
  }

}
