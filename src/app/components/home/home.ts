import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-home',
  imports: [ButtonModule],
  templateUrl: './home.html',
})
export class Home {
  private readonly _router = inject(Router);

  loading = signal(false);

  logOut() {
    sessionStorage.clear();

    this._router.navigate(['login']);
  }
}
