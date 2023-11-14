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
import { InputPhone } from 'src/_inputs/input-phone';
import { InputFile } from 'src/_inputs/input-file';
import { InputCoordinates } from 'src/_inputs/input-geometry';
import { InputNumber } from 'src/_inputs/input-number';

@Injectable({ providedIn: 'root' })
export class InputService {

  defaultBannerId = 3;
  defaultCardId = 4;

  constructor(private backendService: BackendService) { }

  // TODO: get from a remote source of question metadata
  getDepartmentInputs(data?: any) {
    // console.log('Getting Department Inputs...');
    const inputs: InputBase<string>[] = [
      new InputText({
        key: 'name',
        label: 'Department Name',
        value: data?.name || '',
        required: true,
        order: 1
      }),
      new InputTextarea({
        key: 'description',
        label: 'Description',
        value: data?.description || '',
        required: true,
        order: 2
      }),
      new InputSelect({
        key: 'manager',
        label: 'Manager',
        value: data?.manager.id || '',
        // options: this.buildEmployeeOptions(),
        required: true,
        order: 3
      }),
      new InputSelect({
        key: 'deputy',
        label: 'Deputy',
        value: data?.deputy.id || '',
        // options: this.buildEmployeeOptions(),
        order: 4
      }),
      new InputSelect({
        key: 'assistant',
        label: 'Assistant',
        value: data?.assistant.id || '',
        // options: this.buildEmployeeOptions(),
        order: 5
      }),
      new InputMultiSelect({
        key: 'staff',
        label: 'Staff',
        idArray: this.getIdArray(data?.staff) || [],
        // options: this.buildEmployeeOptions(),
        order: 6
      }),
      new InputImage({
        key: 'img_banner',
        label: 'Choose Banner Image',
        value: data?.img_banner.id || this.defaultBannerId,
        options: this.buildOptions('image'),
        order: 7
      }),
      new InputImage({
        key: 'img_card',
        label: 'Choose Card Image',
        value: data?.img_card.id || this.defaultCardId,
        options: this.buildOptions('image'),
        order: 7
      })
    ]

    return of(inputs.sort((a, b) => a.order - b.order));
  }

  getDivisionInputs(data?: any) {
    // console.log('Getting Division Inputs...');
    const inputs: InputBase<string>[] = [
      new InputText({
        key: 'name',
        label: 'Division Name',
        value: data?.name || '',
        required: true,
        order: 1
      }),
      new InputTextarea({
        key: 'description',
        label: 'Description',
        value: data?.description || '',
        required: true,
        order: 2
      }),
      new InputSelect({
        key: 'manager',
        label: 'Manager',
        value: data?.manager.id || '',
        required: true,
        // options: this.buildEmployeeOptions(),
        order: 3
      }),
      new InputSelect({
        key: 'deputy',
        label: 'Deputy',
        value: data?.deputy.id || '',
        // options: this.buildEmployeeOptions(),
        order: 4
      }),
      new InputSelect({
        key: 'assistant',
        label: 'Assistant',
        value: data?.assistant.id || '',
        // options: this.buildEmployeeOptions(),
        order: 5
      }),
      new InputMultiSelect({
        key: 'staff',
        label: 'Staff',
        idArray: this.getIdArray(data?.staff) || [],
        // options: this.buildEmployeeOptions(),
        order: 6
      }),
      new InputImage({
        key: 'img_banner',
        label: 'Choose Banner Image',
        value: data?.img_banner.id || this.defaultBannerId,
        options: this.buildOptions('image'),
        order: 7
      }),
      new InputImage({
        key: 'img_card',
        label: 'Choose Card Image',
        value: data?.img_card.id || this.defaultCardId,
        options: this.buildOptions('image'),
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
    // console.log('Getting Project Inputs...');
    const inputs: InputBase<string>[] = [
      new InputText({
        key: 'name',
        label: 'Project Name',
        value: data?.name || '',
        required: true,
        order: 1
      }),
      new InputTextarea({
        key: 'description',
        label: 'Description',
        value: data?.description || '',
        required: true,
        order: 2
      }),
      new InputMultiSelect({
        key: 'project_leader',
        label: 'Project Leaders',
        idArray: this.getIdArray(data?.project_leader) || [],
        // options: this.buildEmployeeOptions(),
        required: true,
        order: 3
      }),
      new InputImage({
        key: 'img_banner',
        label: 'Choose Banner Image',
        value: data?.img_banner.id || this.defaultBannerId,
        options: this.buildOptions('image'),
        order: 7
      }),
      new InputImage({
        key: 'img_card',
        label: 'Choose Card Image',
        value: data?.img_card.id || this.defaultCardId,
        options: this.buildOptions('image'),
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
    // console.log('Getting Subproject Inputs...');
    const inputs: InputBase<string>[] = [
      new InputText({
        key: 'name',
        label: 'Subproject Name',
        value: data?.name || '',
        required: true,
        order: 1
      }),
      new InputTextarea({
        key: 'description',
        label: 'Description',
        value: data?.description || '',
        required: true,
        order: 2
      }),
      new InputHidden({
        key: 'project',
        value: data?.project || [],
        required: true,
        order: 99
      }),
      new InputSelect({
        key: 'lead',
        label: 'Subproject Lead',
        value: data?.lead.id || [],
        // options: this.buildEmployeeOptions(),
        required: true,
        order: 4
      }),
      new InputSelect({
        key: 'division',
        label: 'Division',
        value: data?.division.id || '',
        // options: this.buildOptions('division'),
        required: true,
        order: 5
      }),
      new InputImage({
        key: 'img_banner',
        label: 'Choose Banner Image',
        value: data?.img_banner.id || this.defaultBannerId,
        options: this.buildOptions('image'),
        order: 7
      }),
      new InputImage({
        key: 'img_card',
        label: 'Choose Card Image',
        value: data?.img_card.id || this.defaultCardId,
        options: this.buildOptions('image'),
        order: 7
      })
    ]

    return of(inputs.sort((a, b) => a.order - b.order));
  }

  getTaskInputs(data?: any) {
    // console.log('Getting Task Inputs...');
    const inputs: InputBase<string>[] = [
      new InputSelect({
        key: 'task_type',
        label: 'Task Type',
        value: data?.task_type?.id || '',
        // options: this.getObjects('Task'),
        required: true,
        order: 1
      }),
      new InputTextarea({
        key: 'description',
        label: 'Description',
        value: data?.description || '',
        required: true,
        order: 2
      }),
      new InputHidden({
        key: 'subproject',
        value: data?.subproject || [],
        required: true,
        order: 99
      }),
      new InputSelect({
        key: 'supervisor',
        label: 'Task Supervisor',
        value: data?.supervisor.id || [],
        // options: this.buildEmployeeOptions(),
        required: true,
        order: 4
      }),
      new InputImage({
        key: 'img_banner',
        label: 'Choose Banner Image',
        value: data?.img_banner.id || this.defaultBannerId,
        options: this.buildOptions('image'),
        order: 7
      }),
      new InputImage({
        key: 'img_card',
        label: 'Choose Card Image',
        value: data?.img_card.id || this.defaultCardId,
        options: this.buildOptions('image'),
        order: 7
      })
    ]

    return of(inputs.sort((a, b) => a.order - b.order));
  }

  getProfileInputs(data?: any) {
    // console.log('Getting Profile Inputs...');
    const inputs: InputBase<string>[] = [
      new InputText({
        key: 'title',
        label: 'Title',
        value: data?.title || '',
        order: 1
      }),
      new InputTextarea({
        key: 'bio',
        label: 'Bio',
        value: data?.bio || '',
        order: 2
      }),
      new InputText({
        key: 'city',
        label: 'City',
        value: data?.city || '',
        order: 3
      }),
      new InputText({
        key: 'state',
        label: 'State',
        value: data?.state || '',
        order: 4
      }),
      new InputPhone({
        key: 'work_phone',
        label: 'Work Phone',
        value: data?.work_phone || '',
        pattern: "\\+1\\s?\\d{3}\\s?\\d{3}\\s?\\d{4}",
        patternMessage: 'Phone numbers must be provided as "+1 123 456 7890", spaces optional.',
        order: 5
      }),
      new InputPhone({
        key: 'mobile_phone',
        label: 'Mobile Phone',
        value: data?.mobile_phone || '',
        pattern: "\\+1\\s?\\d{3}\\s?\\d{3}\\s?\\d{4}",
        patternMessage: 'Phone numbers must be provided as "+1 123 456 7890", spaces optional.',
        order: 6
      })
    ]

    return of(inputs.sort((a, b) => a.order - b.order));
  }

  getImageInputs(data?: any) {
    // console.log('Getting Image Inputs...');
    const inputs: InputBase<string>[] = [
      new InputText({
        key: 'name',
        label: 'Image Name',
        value: data?.name || '',
        required: true,
        order: 1
      }),
      new InputTextarea({
        key: 'description',
        label: 'Image Description',
        value: data?.description || '',
        required: true,
        order: 2
      }),
      new InputText({
        key: 'photographer',
        label: 'Photographer',
        value: data?.photographer || '',
        required: true,
        order: 3
      }),
      new InputDate({
        key: 'photo_date',
        label: 'Photo Date',
        value: data?.photo_date || '',
        required: true,
        order: 4
      }),
      new InputText({
        key: 'source',
        label: 'source',
        value: data?.source || '',
        required: true,
        order: 5
      })
    ]

    return of(inputs.sort((a, b) => a.order - b.order));
  }

  getDocumentInputs(data?: any) {
    // console.log('Getting Image Inputs...');
    const inputs: InputBase<string>[] = [
      new InputText({
        key: 'title',
        label: 'Title',
        value: data?.title || '',
        required: true,
        order: 1
      }),
      new InputTextarea({
        key: 'description',
        label: 'Description',
        value: data?.description || '',
        required: true,
        order: 2
      }),
      new InputText({
        key: 'primary_author',
        label: 'Primary Author',
        value: data?.primary_author || '',
        required: true,
        order: 3
      }),
      new InputMultiSelect({
        key: 'employee_authors',
        label: 'Employee Authors',
        idArray: this.getIdArray(data?.employee_authors) || [],
        order: 4
      }),
      new InputDate({
        key: 'publish_date',
        label: 'Publish Date',
        value: data?.publish_date || '',
        required: true,
        order: 5
      }),
      new InputText({
        key: 'document_type',
        label: 'Document Type',
        value: data?.document_type || '',
        required: true,
        order: 6
      }),
      new InputText({
        key: 'citation',
        label: 'Citation',
        value: data?.citation || '',
        order: 7
      }),
      new InputText({
        key: 'keywords',
        label: 'Keywords',
        value: data?.keywords || '',
        order: 8
      })
    ]

    return of(inputs.sort((a, b) => a.order - b.order));
  }

  getFacilityInputs(data?: any) {
    // console.log('Getting Facility Inputs...');
    const inputs: InputBase<string>[] = [
      new InputText({
        key: 'name',
        label: 'Name',
        value: data?.properties?.name || '',
        required: true,
        order: 1
      }),
      new InputTextarea({
        key: 'description',
        label: 'Description',
        value: data?.properties?.description || '',
        required: true,
        order: 2
      }),
      new InputSelect({
        key: 'facility_type',
        label: 'Facility Type',
        value: data?.properties?.facility_type?.id || '',
        options: this.getObjects('Facility'),
        required: true,
        order: 3
      }),
      new InputSelect({
        key: 'manager',
        label: 'Manager',
        value: data?.properties?.manager.id || '',
        // options: this.buildEmployeeOptions(),
        required: true,
        order: 4
      }),
      new InputSelect({
        key: 'deputy',
        label: 'Deputy',
        value: data?.properties?.deputy.id || '',
        // options: this.buildEmployeeOptions(),
        order: 5
      }),
      new InputSelect({
        key: 'assistant',
        label: 'Assistant',
        value: data?.properties?.assistant.id || '',
        // options: this.buildEmployeeOptions(),
        order: 6
      }),
      new InputMultiSelect({
        key: 'staff',
        label: 'Staff',
        idArray: this.getIdArray(data?.properties?.staff) || [],
        // options: this.buildEmployeeOptions(),
        order: 7
      }),
      new InputImage({
        key: 'img_banner',
        label: 'Choose Banner Image',
        value: data?.properties?.img_banner.id || this.defaultBannerId,
        options: this.buildOptions('image'),
        required: true,
        order: 8
      }),
      new InputImage({
        key: 'img_card',
        label: 'Choose Card Image',
        value: data?.properties?.img_card.id || this.defaultCardId,
        options: this.buildOptions('image'),
        order: 9
      }),
      new InputPhone({
        key: 'phone_number',
        label: 'Phone Number',
        value: data?.properties?.phone_number || '',
        pattern: "\\+1\\s?\\d{3}\\s?\\d{3}\\s?\\d{4}",
        patternMessage: 'Phone numbers must be provided as "+1 123 456 7890", spaces optional.',
        order: 10
      }),
      new InputText({
        key: 'street_address',
        label: 'Street Address',
        value: data?.properties?.street_address || '',
        required: true,
        order: 11
      }),
      new InputText({
        key: 'mailing_address',
        label: 'Mailing Address',
        value: data?.properties?.mailing_address || '',
        order: 12
      }),
      new InputText({
        key: 'city',
        label: 'City',
        value: data?.properties?.city || '',
        required: true,
        order: 13
      }),
      new InputText({
        key: 'state',
        label: 'State',
        value: data?.properties?.state || '',
        required: true,
        order: 14
      }),
      new InputNumber({
        key: 'zipcode',
        label: 'Zipcode',
        value: data?.properties?.zipcode || '',
        required: true,
        order: 15
      }),
      new InputCoordinates({
        key: 'coordinates',
        label: 'Coordinates',
        value: data?.geometry.coordinates || '',
        required: true,
        order: 16
      })
    ]

    return of(inputs.sort((a, b) => a.order - b.order));
  }

  // for employees
  private buildEmployeeOptions() {
    let options: { key: string, value: string }[] = [];

    this.backendService.getList('users').subscribe((employees: any) => {
      // console.log("buildEmployeeOptions:", employees);
      for (let emp of employees) {
        options.push({ key: emp.id, value: emp.first_name + ' ' + emp.last_name })
      }
    })

    return options;
  }

  // for everything else (id/name)
  private buildOptions(routeType: string) {
    let options: { key: string, value: string }[] = [];

    this.backendService.getList(routeType).subscribe((list: any) => {
      // console.log("buildOptions:", list);
      for (let item of list) {
        options.push({ key: item.id, value: item.name })
      }
    });

    return options;
  }

  getObjects(object_type:string) {
    let options: { key: string, value: string }[] = [];

    this.backendService.objectLookup(object_type).subscribe((list: any) => {
      for(let item of list) {
        options.push({ key: item.id, value: item.name})
      }
    });

    return options;
  }

  getIdArray(data: any) {
    if (!data) { return undefined; } // if no data, don't run the function.

    let ids: number[] = [];
    for (let x of data) {
      ids.push(x.id);
    }

    // console.log('getIdArray:', ids);
    return ids;
  }

}
