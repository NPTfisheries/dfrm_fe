import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { InputBase } from 'src/_inputs/input-base';

@Injectable({ providedIn: 'root'})
export class InputControlService {
    toFormGroup(inputs: InputBase<string>[]) {
        const group: any = {};

        inputs.forEach(input => {
            group[input.key] = input.required ? new FormControl(input.value || '', Validators.required)
                : new FormControl(input.value || '');
        });
        return new FormGroup(group);
    }
}
