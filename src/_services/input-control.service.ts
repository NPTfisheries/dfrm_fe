import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { InputBase } from 'src/_inputs/input-base';

@Injectable({ providedIn: 'root'})
export class InputControlService {
    toFormGroup(inputs: InputBase<string>[]) {
        const group: any = {};

        inputs.forEach(input => {
            if (input.key === 'coordinates') {
              // Handle the 'coordinates' field specially -> GeoJSON
              console.log('Building coordinates input!', input);
              group['coordinates'] = new FormGroup({
                type: new FormControl('Point'),
                coordinates: new FormControl(input.value || [])
              });
            } else {
              group[input.key] = input.required ? new FormControl(input.value || '', Validators.required)
                : new FormControl(input.value || '');
            }
          });
        
        return new FormGroup(group);
    }
}
