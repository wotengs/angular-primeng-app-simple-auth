import { Component, inject, DestroyRef, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { InputTextModule } from 'primeng/inputtext';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { APPLICATION_VALIDATION_MESSAGES } from '../../shared/feature.constants';
import { MessageService } from 'primeng/api';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-login',
  imports: [
    CardModule,
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
    MessageModule,
    RouterLink,
  ],
  templateUrl: './login.html',
})
export class Login {
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _messageService = inject(MessageService);
  private readonly _authService = inject(Auth);
  protected readonly messages = APPLICATION_VALIDATION_MESSAGES;
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _router = inject(Router);

  loading = signal(false);

  loginForm = this._formBuilder.group({
    email: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(8)],
    }),
  });

  loginUser() {
    const { email, password } = { ...this.loginForm.value };
    this.loading.set(true);
    this._authService
      .getUserByEmail(email as string)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (response) => {
          this.loading.set(false);
          if (response.length > 0 && response[0].password === password) {
            this._router.navigate(['home']);

            sessionStorage.setItem('email', email as string);
            this._messageService.add({
              severity: 'success',
              summary: 'Successfull Login',
              detail: 'Welcome Back ' + response[0].fullName,
            });
          } else {
            this._messageService.add({
              severity: 'error',
              summary: 'Failed Login',
              detail: 'Email or Password is wrong',
            });
          }
        },
        error: (error) => {
          this.loading.set(false);
          this._messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: error.error.message || "We couldn't log you in, try again",
          });
        },
      });
  }
}
