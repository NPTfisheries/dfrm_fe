import { Injectable } from '@angular/core';
import { of } from 'rxjs';

import { InputBase } from 'src/_inputs/input-base';
import { InputText } from 'src/_inputs/input-text';
import { InputDate } from 'src/_inputs/input-date';
import { InputSelect } from 'src/_inputs/input-select';
import { InputTextarea } from 'src/_inputs/input-textarea';
import { BackendService } from './backend.service';
import { InputMultiSelect } from 'src/_inputs/input-multi-select';
import { InputHidden } from 'src/_inputs/input-hidden';
import { InputImage } from 'src/_inputs/input-image';

@Injectable({ providedIn: 'root' })
export class InputService {

  constructor(private backendService: BackendService) { }

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
        label: 'Description',
        value: data?.description || '',
        order: 2
      }),
      new InputSelect({
        key: 'manager',
        label: 'Manager',
        value: data?.manager.id || '',
        required: true,
        options: this.buildEmployeeOptions(),
        order: 3
      }),
      new InputSelect({
        key: 'deputy',
        label: 'Deputy',
        value: data?.deputy.id || '',
        required: true,
        options: this.buildEmployeeOptions(),
        order: 4
      }),
      new InputSelect({
        key: 'assistant',
        label: 'Assistant',
        value: data?.assistant.id || '',
        required: true,
        options: this.buildEmployeeOptions(),
        order: 5
      }),
      new InputMultiSelect({
        key: 'staff',
        label: 'Staff',
        idArray: this.getIdArray(data?.staff) || [],
        // valueArray: this.getValueArray(data?.staff) || [],        
        required: true,
        options: this.buildEmployeeOptions(),
        order: 6
      }),
      new InputImage({
        key: 'img_banner',
        label: 'Choose Banner Image',
        value: data?.img_banner || '',
        options: this.buildOptions('/api/v1/image/'),
        order: 7
      }),
      new InputImage({
        key: 'img_card',
        label: 'Choose Card Image',
        value: data?.img_card || '',
        options: this.buildOptions('/api/v1/image/'),
        order: 7
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
        value: data?.name || '',
        required: true,
        order: 1
      }),
      new InputTextarea({
        key: 'description',
        label: 'Description',
        value: data?.description || '',
        order: 2
      }),
      new InputSelect({
        key: 'manager',
        label: 'Manager',
        value: data?.manager.id || '',
        required: true,
        options: this.buildEmployeeOptions(),
        order: 3
      }),
      new InputSelect({
        key: 'deputy',
        label: 'Deputy',
        value: data?.deputy.id || '',
        required: true,
        options: this.buildEmployeeOptions(),
        order: 4
      }),
      new InputSelect({
        key: 'assistant',
        label: 'Assistant',
        value: data?.assistant.id ||'',
        required: true,
        options: this.buildEmployeeOptions(),
        order: 5
      }),
      new InputMultiSelect({
        key: 'staff',
        label: 'Staff',
        idArray: this.getIdArray(data?.staff) || [],
        // valueArray: this.getValueArray(data?.staff) || [],
        required: true,
        options: this.buildEmployeeOptions(),
        order: 6
      }),
      new InputImage({
        key: 'img_banner',
        label: 'Choose Banner Image',
        value: data?.img_banner || '',
        options: this.buildOptions('/api/v1/image/'),
        order: 7
      }),
      new InputImage({
        key: 'img_card',
        label: 'Choose Card Image',
        value: data?.img_card || '',
        options: this.buildOptions('/api/v1/image/'),
        order: 7
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
    // const eos = this.buildEmployeeOptions();
    // console.log('EMPLOYEE OPTIONS', eos);
    // const pls = this.getIdArray(data?.project_leader);
    // console.log('PROJECT LEADS:', pls);
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
        label: 'Description',
        value: data?.description || '',
        order: 2
      }),
      new InputMultiSelect({
        key: 'project_leader',
        label: 'Project Leaders',
        idArray: this.getIdArray(data?.project_leader) || [],
        // valueArray: this.getValueArray(data?.project_leader) || [],
        required: true,
        options: this.buildEmployeeOptions(),
        order: 3
      }),
      new InputImage({
        key: 'img_banner',
        label: 'Choose Banner Image',
        value: data?.img_banner || '',
        options: this.buildOptions('/api/v1/image/'),
        order: 7
      }),
      new InputImage({
        key: 'img_card',
        label: 'Choose Card Image',
        value: data?.img_card || '',
        options: this.buildOptions('/api/v1/image/'),
        order: 7
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

  getSubprojectInputs(data?: any) {
    console.log('Getting Project Inputs...');
    // const eos = this.buildEmployeeOptions();
    // console.log('EMPLOYEE OPTIONS', eos);
    // const pls = this.getIdArray(data?.project_leader);
    // console.log('PROJECT LEADS:', pls);
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
        label: 'Description',
        value: data?.description || '',
        order: 2
      }),
      new InputSelect({
        key: 'project',
        label: 'Project',
        value: data?.project || [],
        required: true,
        options: this.buildOptions('/api/v1/project/'),
        order: 3
      }),
      new InputSelect({
        key: 'lead',
        label: 'Subproject Lead',
        value: data?.lead || [],
        required: true,
        options: this.buildEmployeeOptions(),
        order: 4
      }),
      new InputImage({
        key: 'img_banner',
        label: 'Choose Banner Image',
        value: data?.img_banner || '',
        options: this.buildOptions('/api/v1/image/'),
        order: 7
      }),
      new InputImage({
        key: 'img_card',
        label: 'Choose Card Image',
        value: data?.img_card || '',
        options: this.buildOptions('/api/v1/image/'),
        order: 7
      })
    ]

    return of(inputs.sort((a, b) => a.order - b.order));
  }

  // for employees
  private buildEmployeeOptions() {
    let options: { key: string, value: string }[] = [];

    this.backendService.get('/api/v1/users/').subscribe((employees: any) => {
      console.log("buildEmployeeOptions:", employees);
      for (let emp of employees) {
        options.push({ key: emp.id, value: emp.first_name + ' ' + emp.last_name })
      }
    })

    return options;
  }

  // for everything else (id/name)
  private buildOptions(url: string) {
    let options: { key: string, value: string }[] = [];

    this.backendService.get(url).subscribe((list: any) => {
      console.log("buildOptions:", list);
      for (let item of list) {
        options.push({ key: item.id, value: item.name })
      }
    })

    return options;
  }
  
  getIdArray(data: any) {
    if(!data) { return undefined; } // if no data, don't run the function.

    let ids:number[] = [];
    for (let x of data) {
      ids.push(x.id);
    }

    console.log('getIdArray:', ids);
    return ids;
  }

  // getValueArray(data: any) {
  //   if(!data) { return undefined; } // if no data, don't run the function.

  //   let ids:string[] = [];
  //   for (let x of data) {
  //     ids.push(String(x.id));
  //   }

  //   console.log('getValueArray:', ids);
  //   return ids;
  // }

}
