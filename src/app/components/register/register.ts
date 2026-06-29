import { Component, inject, DestroyRef, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { InputTextModule } from 'primeng/inputtext';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { passwordMatchValidator, fullNameValidator } from '../../shared/form.helper';
import { MessageModule } from 'primeng/message';
import { MessageService } from 'primeng/api';
import { APPLICATION_VALIDATION_MESSAGES } from '../../shared/feature.constants';
import { Auth } from '../../services/auth';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { User } from '../../interfaces/user';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [
    CardModule,
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
    MessageModule,
    RouterLink,
    RippleModule,
  ],
  templateUrl: './register.html',
})
export class Register {
  private readonly _authService = inject(Auth);
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _messageService = inject(MessageService);
  private readonly _router = inject(Router);

  protected readonly messages = APPLICATION_VALIDATION_MESSAGES;

  loading = signal(false);
  registerForm = this._formBuilder.group(
    {
      fullName: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required, fullNameValidator()],
      }),
      email: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required, Validators.email],
      }),
      password: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(8)],
      }),
      confirmPassword: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(8)],
      }),
    },
    { validators: passwordMatchValidator() },
  );

  onSubmit(): void {
    this._messageService.add({
      severity: 'secondary',
      summary: 'Please wait...',
      detail: 'Your request is being processed. This may take a moment.',
      icon: 'pi pi-spinner pi-spin',
      key: 'promise',
      sticky: true,
    });

    const postData = { ...this.registerForm.value };
    delete postData.confirmPassword;
    this.loading.set(true);
    this._authService
      .registerUser(postData as User)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: () => {
          this.loading.set(false);
          this._messageService.clear('promise');
          setTimeout(() => {
            this._messageService.add({
              severity: 'success',
              summary: 'Success!',
              detail: 'User registered successfully',
              key: 'promise',
              life: 3000,
            });
          }, 300);

          setTimeout(() => {
            this._router.navigate(['login']);
          }, 2000);
        },
        error: (error) => {
          this.loading.set(false);
          this._messageService.clear('promise');
          setTimeout(() => {
            this._messageService.add({
              severity: 'error',
              summary: 'Error!',
              detail: 'An error occurred during registration, try again',
              key: 'promise',
              life: 3000,
            });
          }, 300);
        },
      });
  }
}
