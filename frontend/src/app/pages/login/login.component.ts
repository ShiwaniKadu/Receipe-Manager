import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form: FormGroup;
  authService = inject(AuthService)
  router = inject(Router)


  constructor(private fb: FormBuilder){
    this.form = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),

    })
  }

  onSubmit() {
    if (this.form.valid) {
      this.authService.login(this.form.value).subscribe({
        next: (response) => {
          if (response && response.token) {
            this.router.navigate(['dashboard']);
          } else {
          }
        },
        error: (err) => {
          console.error('Login error', err);
        }
      });
    }
  }
  get email() {
    return this.form.get('email');
  }
  
  get password() {
    return this.form.get('password');
  }
  
}