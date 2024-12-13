import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class authGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return new Observable(observer => {
      if(this.authService.isLoggedIn()){
        observer.next(true)
      }else {
        this.router.navigate(['/login'])
        observer.next(false)
      }
      // this.authService.getLoggedUser().subscribe(
      //   (response) => {
      //     console.log('response', response)
      //     if (response.status) {
      //       observer.next(true);
      //     } else {
      //       this.router.navigate(['login']);
      //       observer.next(false);
      //     }
      //   },
      //   () => {
      //     this.router.navigate(['login']);
      //     observer.next(false);
      //   }
      // );
    });
  }
}
