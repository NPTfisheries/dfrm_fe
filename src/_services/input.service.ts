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

  // TODO: get from a remote source of question metadata
  getDepartmentInputs() {
    const inputs: InputBase<string>[] = [
      new InputText({
        key: 'name',
        label: 'Name',
        value: 'Name Value',
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
        value: 'Name Value',
        required: true,
        options: this.buildEmployeeOptions(),
        order: 3
      }),
      new InputSelect({
        key: 'deputy',
        label: 'Deputy',
        value: 'Name Value',
        required: true,
        options: this.buildEmployeeOptions(),
        order: 4
      }),
      new InputSelect({
        key: 'assistant',
        label: 'Assistant',
        value: 'Name Value',
        required: true,
        options: this.buildEmployeeOptions(),
        order: 5
      }),
      new InputMultiSelect({
        key: 'staff',
        label: 'Staff',
        value: "PL Val",
        required: true,
        options: this.buildEmployeeOptions(),
        order: 6
      })
    ]

    return of(inputs.sort((a, b) => a.order - b.order));
  }

  getDivisionInputs() {
    
    const inputs: InputBase<string>[] = [
      new InputText({
        key: 'name',
        label: 'Name',
        value: 'Name Value',
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
        value: 'Name Value',
        required: true,
        options: this.buildEmployeeOptions(),
        order: 3
      }),
      new InputSelect({
        key: 'assistant',
        label: 'Manager',
        value: 'Name Value',
        required: true,
        options: this.buildEmployeeOptions(),
        order: 4
      }),
      new InputSelect({
        key: 'assistant',
        label: 'Assistant',
        value: 'Name Value',
        required: true,
        options: this.buildEmployeeOptions(),
        order: 5
      }),
      new InputMultiSelect({
        key: 'staff',
        label: 'Staff',
        value: "PL Val",
        required: true,
        options: this.buildEmployeeOptions(),
        order: 6
      }),
      new InputHidden({
        key: 'department',
        value: '1',
        required: true,
        order: 99
      })
    ]

    return of(inputs.sort((a, b) => a.order - b.order));
   }

  getProjectInputs() {
    const inputs: InputBase<string>[] = [
      new InputText({
        key: 'name',
        label: 'Name',
        value: 'Name Value',
        required: true,
        order: 1
      }),
      new InputTextarea({
        key: 'textarea',
        label: 'Description',
        order: 2
      }),
      new InputMultiSelect({
        key: 'project_leader',
        label: 'Project Leaders',
        value: "PL Val",
        required: true,
        options: this.buildEmployeeOptions(),
        order: 3
      }),
      new InputHidden({
        key: 'department',
        value: '1',
        required: true,
        order: 99
      })
    ]

    return of(inputs.sort((a, b) => a.order - b.order));
  }

  getInputs() {
    const inputs: InputBase<string>[] = [

      new InputSelect({
        key: 'employee',
        label: 'Employee Select',
        value: 'Name Value',
        required: true,
        options: this.buildEmployeeOptions(),
        order: 1
      }),

      new InputText({
        key: 'name',
        label: 'Name Input (TEXT)',
        value: 'Name Value',
        required: true,
        order: 1
      }),

      new InputText({
        key: 'email',
        label: 'Email Input',
        type: 'email',
        order: 2
      }),

      new InputDate({
        key: 'date',
        label: 'Date Input',
        type: 'date',
        order: 3
      }),

      new InputTextarea({
        key: 'textarea',
        label: 'Text Area Input',
        order: 4
      }),

      new InputSelect({
        key: 'select1',
        label: 'Select Input',
        // Key has to be string --> b/c typed.
        options: [
          { key: '1', value: 'Option 1' },
          { key: '2', value: 'Option 2' },
          { key: '3', value: 'Option 3' }
        ]
      })
    ];

    return of(inputs.sort((a, b) => a.order - b.order));
  }

  private buildEmployeeOptions() {
    let options: { key: string, value: string }[] = [];

    this.backendService.get('/api/v1/users/').subscribe((employees: any) => {
      console.log("BEO", employees);
      for (let emp of employees) {
        options.push({ key: emp.id, value: emp.first_name + ' ' + emp.last_name })
      }
    })

    return options;
  }

}
