import { AbstractControl, ValidatorFn } from '@angular/forms';

export function zipcodeValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const fiveDigitZipPattern = /^\d{5}$/;

    if (!control.value) {
      // If the control is empty, don't perform validation
      return null;
    }

    if (!fiveDigitZipPattern.test(control.value)) {
      // Validation failed
      return { zipcodeFormat: true };
    }

    // Validation passed
    return null;
  };
}
