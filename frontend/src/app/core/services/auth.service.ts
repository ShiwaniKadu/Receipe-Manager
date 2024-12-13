import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse, LoginPayload, RegisterPayload, User } from '../model/common.model';
import { ApiEndpoint } from '../constants/constants';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token: string | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  register(payload: RegisterPayload): Observable<ApiResponse<User>> {
    return this.http.post<ApiResponse<User>>(ApiEndpoint.Auth.Register, payload).pipe(
      catchError(this.handleError)
    );
  }

  login(payload: LoginPayload): Observable<ApiResponse<{ token: string; user: User }>> {
    return this.http.post<ApiResponse<{ token: string; user: User }>>(ApiEndpoint.Auth.Login, payload).pipe(
      tap((response: any) => {
        if (response.status) {
          console.log("Token:", response);
          this.token = response.token;
        }
      }),
      catchError(this.handleError)
    );
  }

  getLoggedUser(): Observable<ApiResponse<User>> {
    return this.http.get<ApiResponse<User>>(ApiEndpoint.Auth.LoggedUser).pipe(
      catchError(this.handleError)
    );
  }

  logout(): void {
    this.token = null;
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return this.token;
  }

  isLoggedIn(): boolean {
    return !!this.token;
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Error:', error);
    return throwError(() => new Error(error.error.message || 'An error occurred.'));
  }
}
