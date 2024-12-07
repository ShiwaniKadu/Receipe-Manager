import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class guestGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return new Observable(observer => {
      this.authService.getLoggedUser().subscribe(
        (response) => {
          if (response.status) {
            this.router.navigate(['dashboard']);
            observer.next(false);
          } else {
            observer.next(true);
          }
        },
        () => {
          observer.next(true);
        }
      );
    });
  }
}
