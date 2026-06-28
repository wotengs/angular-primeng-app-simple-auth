import { inject, Injectable, InjectionToken, Injector } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private _http = inject(HttpClient);

  private _baseUrl = 'http://localhost:3000';

  registerUser(userData: User) {
    return this._http.post(`${this._baseUrl}/users`, userData);
  }

  getUserByEmail(email: string): Observable<User[]> {
    return this._http.get<User[]>(`${this._baseUrl}/users?email=${email}`);
  }

  // logoutUser() {
  //   return this._http.post(`${this._baseUrl}/logout`, {});
  // }
}
