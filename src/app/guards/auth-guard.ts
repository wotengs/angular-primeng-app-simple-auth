import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  if (sessionStorage.getItem('email')) {
    return true;
  } else {
    const _router = inject(Router);
    return _router.navigate(['login']);
  }
};
