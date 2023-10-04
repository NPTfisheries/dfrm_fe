import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { InputBase } from 'src/_inputs/input-base';

@Injectable({ providedIn: 'root' })
export class InputControlService {
  toFormGroup(inputs: InputBase<string>[]) {
    const group: any = {};

    inputs.forEach(input => {
      // build validators
      let validators = [];
      if (input.required) { validators.push(Validators.required) }
      if (input.min) { validators.push(Validators.min(Number(input.min))) }
      if (input.max) { validators.push(Validators.max(Number(input.max))) }
      if (input.minlength) { validators.push(Validators.minLength(Number(input.minlength))) }
      if (input.maxlength) { validators.push(Validators.maxLength(Number(input.maxlength))) }
      if (input.pattern) { validators.push(Validators.pattern(input.pattern)) }

      if (input.key === 'coordinates') {
        // Handle the 'coordinates' field specially -> GeoJSON
        group[input.key] = new FormGroup({
          type: new FormControl('Point'),
          coordinates: new FormControl(input.value || [], validators)
        });
      } else {
        group[input.key] = new FormControl(input.value || '', validators);
      }


      // if (input.key === 'coordinates') {
      //   // Handle the 'coordinates' field specially -> GeoJSON
      //   group['coordinates'] = new FormGroup({
      //     type: new FormControl('Point'),
      //     coordinates: new FormControl(input.value || [])
      //   });
      // } else {
      //   group[input.key] = input.required ? new FormControl(input.value || '', Validators.required)
      //     : new FormControl(input.value || '');
      // }

    });

    return new FormGroup(group);
  }
}
