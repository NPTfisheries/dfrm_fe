import { Injectable } from '@angular/core';
import { of } from 'rxjs';

import { InputBase } from 'src/_inputs/input-base';
import { InputText } from 'src/_inputs/input-text';
import { InputDate } from 'src/_inputs/input-date';
import { InputSelect } from 'src/_inputs/input-select';
import { InputTextarea } from 'src/_inputs/input-textarea';
import { InputMultiSelect } from 'src/_inputs/input-multi-select';
import { InputHidden } from 'src/_inputs/input-hidden';
import { InputImage } from 'src/_inputs/input-image';
import { InputPhone } from 'src/_inputs/input-phone';
import { InputCoordinates } from 'src/_inputs/input-geometry';
import { InputNumber } from 'src/_inputs/input-number';
import { InputRichText } from 'src/_inputs/input-richtext';
import { InputCheckbox } from 'src/_inputs/input-checkbox';
import { ImageService } from './image.service';


@Injectable({ providedIn: 'root' })
export class InputService {

  defaultBannerId = 3;
  defaultCardId = 4;

  constructor(
    private imageService: ImageService,
  ) { }

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
      new InputRichText({
        key: 'description',
        label: 'Description',
        value: data?.description || '',
        required: true,
        order: 2
      }),
      new InputSelect({
        key: 'manager',
        label: 'Manager',
        value: data?.manager?.id || '',
        selectType: 'users',
        required: true,
        order: 3
      }),
      new InputSelect({
        key: 'deputy',
        label: 'Deputy',
        value: data?.deputy?.id || '',
        selectType: 'users',
        order: 4
      }),
      new InputSelect({
        key: 'assistant',
        label: 'Assistant',
        value: data?.assistant?.id || '',
        selectType: 'users',
        order: 5
      }),
      new InputMultiSelect({
        key: 'staff',
        label: 'Staff',
        idArray: this.getIdArray(data?.staff) || [],
        selectType: 'users',
        order: 6
      }),
      new InputCheckbox({
        key: 'is_active',
        label: 'Active Department',
        value: [false, undefined].includes(data?.is_active) ? undefined : "true",
        order: 7
      }),
      // new InputCheckbox({
      //   key: 'display',
      //   label: 'Display on Website',
      //   value: [false, undefined].includes(data?.display) ? undefined : "true",
      //   order: 8
      // }),
      new InputImage({
        key: 'img_banner',
        label: 'Choose Banner Image',
        value: data?.img_banner.id || this.defaultBannerId,
        options: this.buildImageOptions(),
        order: 9
      }),
      new InputImage({
        key: 'img_card',
        label: 'Choose Card Image',
        value: data?.img_card.id || this.defaultCardId,
        options: this.buildImageOptions(),
        order: 9
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
      new InputRichText({
        key: 'description',
        label: 'Description',
        value: data?.description || '',
        required: true,
        order: 2
      }),
      new InputSelect({
        key: 'manager',
        label: 'Manager',
        value: data?.manager?.id || '',
        selectType: 'users',
        required: true,
        order: 3
      }),
      new InputSelect({
        key: 'deputy',
        label: 'Deputy',
        value: data?.deputy?.id || '',
        selectType: 'users',
        order: 4
      }),
      new InputSelect({
        key: 'assistant',
        label: 'Assistant',
        value: data?.assistant?.id || '',
        selectType: 'users',
        order: 5
      }),
      new InputMultiSelect({
        key: 'staff',
        label: 'Staff',
        idArray: this.getIdArray(data?.staff) || [],
        selectType: 'users',
        order: 6
      }),
      new InputImage({
        key: 'img_banner',
        label: 'Choose Banner Image',
        value: data?.img_banner.id || this.defaultBannerId,
        options: this.buildImageOptions(),
        order: 7
      }),
      new InputImage({
        key: 'img_card',
        label: 'Choose Card Image',
        value: data?.img_card.id || this.defaultCardId,
        options: this.buildImageOptions(),
        order: 7
      }),
      new InputCheckbox({
        key: 'is_active',
        label: 'Active Division',
        value: [false, undefined].includes(data?.is_active) ? undefined : "true",
        order: 8
      }),
      new InputCheckbox({
        key: 'display',
        label: 'Display on Website',
        value: [false, undefined].includes(data?.display) ? undefined : "true",
        order: 8
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
      new InputRichText({
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
        selectType: 'users',
        required: true,
        order: 3
      }),
      new InputImage({
        key: 'img_banner',
        label: 'Choose Banner Image',
        value: data?.img_banner.id || this.defaultBannerId,
        options: this.buildImageOptions(),
        order: 7
      }),
      new InputImage({
        key: 'img_card',
        label: 'Choose Card Image',
        value: data?.img_card.id || this.defaultCardId,
        options: this.buildImageOptions(),
        order: 7
      }),
      new InputCheckbox({
        key: 'is_active',
        label: 'Active Project',
        value: [false, undefined].includes(data?.is_active) ? undefined : "true",
        order: 8
      }),
      new InputCheckbox({
        key: 'display',
        label: 'Display on Website',
        value: [false, undefined].includes(data?.display) ? undefined : "true",
        order: 8
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

  getTaskInputs(data?: any) {
    // console.log('Getting Task Inputs...');
    const inputs: InputBase<string>[] = [
      new InputText({
        key: 'name',
        label: 'Task Name',
        value: data?.name || '',
        required: true,
        order: 1
      }),
      new InputSelect({
        key: 'task_type',
        label: 'Task Type',
        value: data?.task_type?.id || '',
        selectType: 'task types',
        required: true,
        order: 2
      }),
      new InputRichText({
        key: 'description',
        label: 'Description',
        value: data?.description || '',
        required: true,
        order: 3
      }),
      new InputSelect({
        key: 'project',
        label: 'Project',
        value: data?.project?.id || [],
        selectType: 'projects',
        required: true,
        order: 4
      }),
      new InputSelect({
        key: 'division',
        label: 'Division',
        value: data?.division?.id || [],
        selectType: 'divisions',
        required: true,
        order: 5
      }),
      new InputSelect({
        key: 'supervisor',
        label: 'Task Supervisor',
        value: data?.supervisor?.id || [],
        selectType: 'users',
        required: true,
        order: 6
      }),
      new InputMultiSelect({
        key: 'editors',
        label: 'Editors',
        idArray: this.getIdArray(data?.editors) || [],
        selectType: 'users',
        required: true,
        order: 7
      }),
      new InputCheckbox({
        key: 'is_active',
        label: 'Active Task',
        value: [false, undefined].includes(data?.is_active) ? undefined : "true",
        order: 8
      }),
      new InputCheckbox({
        key: 'display',
        label: 'Display on Website',
        value: [false, undefined].includes(data?.display) ? undefined : "true",
        order: 8
      }),
      // new InputHidden({
      //   key: 'img_banner',
      //   value: data?.img_card.id || this.defaultCardId,
      //   order: 99
      // }),
      new InputImage({
        key: 'img_banner',
        label: 'Choose Banner Image',
        value: data?.img_banner.id || this.defaultBannerId,
        options: this.buildImageOptions(),
        order: 9
      }),
      new InputImage({
        key: 'img_card',
        label: 'Choose Card Image',
        value: data?.img_card.id || this.defaultCardId,
        options: this.buildImageOptions(),
        order: 9
      }),
      new InputNumber({
        key: 'sort_order',
        label: 'Sort Order',
        value: data?.sort_order || 1,
        order: 9
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
      new InputRichText({
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
        selectType: 'users',
        order: 4
      }),
      new InputDate({
        key: 'publish_date',
        label: 'Publish Date',
        value: data?.publish_date || '',
        required: true,
        order: 5
      }),
      new InputSelect({
        key: 'document_type',
        label: 'Document Type',
        value: data?.document_type || '',
        selectType: 'document types',
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
        value: data?.name || '',
        required: true,
        order: 1
      }),
      new InputRichText({
        key: 'description',
        label: 'Description',
        value: data?.description || '',
        required: true,
        order: 2
      }),
      new InputSelect({
        key: 'facility_type',
        label: 'Facility Type',
        value: data?.facility_type?.id || '',
        selectType: 'facility types',
        required: true,
        order: 3
      }),
      new InputSelect({
        key: 'manager',
        label: 'Manager',
        value: data?.manager?.id || '',
        selectType: 'users',
        required: true,
        order: 4
      }),
      new InputSelect({
        key: 'deputy',
        label: 'Deputy',
        value: data?.deputy?.id || '',
        selectType: 'users',
        order: 5
      }),
      new InputSelect({
        key: 'assistant',
        label: 'Assistant',
        value: data?.assistant?.id || '',
        selectType: 'users',
        order: 6
      }),
      new InputMultiSelect({
        key: 'staff',
        label: 'Staff',
        idArray: this.getIdArray(data?.staff) || [],
        selectType: 'users',
        order: 7
      }),
      new InputImage({
        key: 'img_banner',
        label: 'Choose Banner Image',
        value: data?.img_banner.id || this.defaultBannerId,
        options: this.buildImageOptions(),
        required: true,
        order: 8
      }),
      new InputImage({
        key: 'img_card',
        label: 'Choose Card Image',
        value: data?.img_card.id || this.defaultCardId,
        options: this.buildImageOptions(),
        order: 9
      }),
      new InputPhone({
        key: 'phone_number',
        label: 'Phone Number',
        value: data?.phone_number || '',
        pattern: "\\+1\\s?\\d{3}\\s?\\d{3}\\s?\\d{4}",
        patternMessage: 'Phone numbers must be provided as "+1 123 456 7890", spaces optional.',
        order: 10
      }),
      new InputText({
        key: 'street_address',
        label: 'Street Address',
        value: data?.street_address || '',
        required: true,
        order: 11
      }),
      new InputText({
        key: 'mailing_address',
        label: 'Mailing Address',
        value: data?.mailing_address || '',
        order: 12
      }),
      new InputText({
        key: 'city',
        label: 'City',
        value: data?.city || '',
        required: true,
        order: 13
      }),
      new InputText({
        key: 'state',
        label: 'State',
        value: data?.state || '',
        required: true,
        order: 14
      }),
      new InputNumber({
        key: 'zipcode',
        label: 'Zipcode',
        value: data?.zipcode || '',
        required: true,
        order: 15
      }),
      new InputSelect({
        key: 'location',
        label: 'Location',
        value: data?.location.id || '',
        selectType: 'points',
        order: 16
      }),
      new InputCheckbox({
        key: 'is_active',
        label: 'Active Facility',
        value: [false, undefined].includes(data?.is_active) ? undefined : "true",
        order: 17
      }),
      
      new InputCheckbox({
        key: 'display',
        label: 'Display on Website',
        value: [false, undefined].includes(data?.display) ? undefined : "true",
        order: 18
      }),
    ]

    return of(inputs.sort((a, b) => a.order - b.order));
  }

  getLocationInputs(data?: any) {
    // console.log('Getting Location Inputs...');
    const inputs: InputBase<string>[] = [
      new InputText({
        key: 'name',
        label: 'Name',
        value: data?.properties?.name || '',
        required: true,
        order: 1
      }),
      new InputRichText({
        key: 'description',
        label: 'Description',
        value: data?.properties?.description || '',
        required: true,
        order: 2
      }),
      new InputCoordinates({
        key: 'geometry',
        label: 'Geometry',
        value: data?.geometry || '',
        // required: true, // ????
        order: 5
      })
    ]

    return of(inputs.sort((a, b) => a.order - b.order));
  }

  getInstrumentInputs(data?: any) {
    // console.log('Getting Instrument Inputs...');
    const inputs: InputBase<string>[] = [
      new InputText({
        key: 'name',
        label: 'Name',
        value: data?.name || '',
        required: true,
        order: 1
      }),
      new InputRichText({
        key: 'description',
        label: 'Description',
        value: data?.description || '',
        order: 2
      }),
      new InputSelect({
        key: 'instrument_type',
        label: 'Type',
        value: data?.instrument_type || '',
        selectType: 'instrument types',
        required: true,
        order: 1
      }),
      new InputText({
        key: 'model',
        label: 'Model',
        value: data?.model || '',
        order: 1
      }),
      new InputText({
        key: 'serial_number',
        label: 'Serial Number',
        value: data?.serial_number || '',
        order: 1
      }),
      new InputText({
        key: 'manufacturer',
        label: 'Manufacturer',
        value: data?.manufacturer || '',
        order: 1
      })//,
      // new InputCheckbox({
      //   key: 'is_active',
      // label: 'Active Instrument',
      // value: [false, undefined].includes(data?.is_active) ? undefined : "true",
      //   order: 6
      // }),
    ]

    return of(inputs.sort((a, b) => a.order - b.order));
  }

  // helpers
  private buildImageOptions() {
    let options: { key: string, value: string }[] = [];

    this.imageService.getImages().subscribe(images => {
      for (let image of images) {
        options.push({ key: String(image.id), value: String(image.name) })
      }

    });
    // console.log('buildImageOptions', options);
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
