import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse, LoginPayload, RegisterPayload, User } from '../model/common.model';
import { LocalStorage } from '../constants/constants';
import { ApiEndpoint } from '../constants/constants'; 
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;

  constructor(private _http: HttpClient, private router: Router) {
    if (this.getUserToken()) {
      this.isLoggedIn = true;
    }
  }

  register(payload: RegisterPayload) {
    return this._http.post<ApiResponse<User>>(`${ApiEndpoint.Auth.Register}`, payload);
  }

  login(payload: LoginPayload) {
    return this._http.post<ApiResponse<User>>(`${ApiEndpoint.Auth.Login}`, payload).pipe(
      map((response) => {
        if (response.status && response.token) {
          localStorage.setItem(LocalStorage.token, response.token);
          this.isLoggedIn = true;
          return response;
        } else {
          throw new Error('Login failed'); 
        }
      }),
      catchError(error => {
        return of(null); 
      })
    );
  }

  me() {
    return this._http.get<ApiResponse<User>>(`${ApiEndpoint.Auth.me}`)
    .pipe(
      catchError((error) => {
        console.error('Error fetching user data:', error);
        return of({ status: false, message: 'Failed to fetch user data', data: null }); 
      })
    );
  }
  

  getUserToken() {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem('USER_TOKEN');
    } else {
      return null;
    }
  }

  logout() {
    localStorage.removeItem(LocalStorage.token);
    this.isLoggedIn = false;
    this.router.navigate(['login']);
  }
}
