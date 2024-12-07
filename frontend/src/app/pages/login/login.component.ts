import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  form: FormGroup;
  isLoading = false; 

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.isLoading = true;
      this.authService.login(this.form.value).subscribe({
        next: () => {
          this.isLoading = false;
          this.router.navigate(['dashboard']); 
        },
        error: (err) => {
          this.isLoading = false;
          console.error('Login failed:', err);
          alert(`Login failed: ${err.error?.message || 'Unknown error'}`);
        },
      });
    } else {
      alert('Please fill out the form correctly.');
    }
  }
}
