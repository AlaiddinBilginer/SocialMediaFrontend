import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if(!value) {
      return null;
    }

    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    const hasNonAlphanumeric = /[\W_]/.test(value);

    const passwordValid = hasUpperCase && hasLowerCase && hasNumber && hasNonAlphanumeric;

    return passwordValid ? null : { passwordStrength: {
      hasUpperCase,
      hasLowerCase,
      hasNumber,
      hasNonAlphanumeric
    } };
  }
}

export function matchPassword(passwordKey: string, confirmPasswordKey: string): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const password = group.get(passwordKey)?.value;
    const confirmPassword = group.get(confirmPasswordKey)?.value;

    if(password !== confirmPassword) {
      return { passwordMismatch: true };
    }

    return null;
  }
}