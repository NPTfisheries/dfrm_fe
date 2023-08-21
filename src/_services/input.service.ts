import { Injectable } from '@angular/core';
import { of } from 'rxjs';

import { InputBase } from 'src/_inputs/input-base';
import { InputText } from 'src/_inputs/input-text';
import { InputDate } from 'src/_inputs/input-date';
import { InputSelect } from 'src/_inputs/input-select';
import { InputTextarea } from 'src/_inputs/input-textarea';

@Injectable({ providedIn: 'root'})
export class InputService {

  // TODO: get from a remote source of question metadata
  getInputs() {

    const inputs: InputBase<string>[] = [

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
          {key: '1', value: 'Option 1'},
          {key: '2', value: 'Option 2'},
          {key: '3', value: 'Option 3'}
        ]
      })
    ];

    return of(inputs.sort((a, b) => a.order - b.order));
  }
}
