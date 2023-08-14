import { AbstractControl, ValidatorFn } from '@angular/forms';

export function phoneFormatValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const phonePattern = /^\+1\s?\d{3}\s?\d{3}\s?\d{4}$/;

    if (!control.value) {
      // If the control is empty, don't perform validation
      return null;
    }

    if (!phonePattern.test(control.value)) {
      // Validation failed
      return { phoneFormat: true };
    }

    // Validation passed
    return null;
  };
}
