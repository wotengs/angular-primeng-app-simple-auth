import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    if (!password || !confirmPassword) return null;

    return password.value === confirmPassword.value ? null : { passwordMismatch: true };
  };
}

export function fullNameValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = (control.value || '').toString().trim();
    if (!value) return null;

    const nameRegex = /^[a-zA-Z]+ [a-zA-Z]+$/;

    return nameRegex.test(value) ? null : { fullName: true };
  };
}
