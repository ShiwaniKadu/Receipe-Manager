import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'], 
})
export class RegisterComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password_confirmation: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  // Custom validator for matching passwords
  get passwordMismatch() {
    return this.form.get('password')?.value !== this.form.get('password_confirmation')?.value;
  }

  onSubmit() {
    if (this.form.valid && !this.passwordMismatch) {
      this.authService.register(this.form.value).subscribe({
        next: () => this.router.navigate(['login']),
        error: (err) => {
          console.error('Registration failed:', err);
          alert(`Registration failed: ${err.error?.message || 'Unknown error'}`);
        },
      });
    } else if (this.passwordMismatch) {
      alert('Passwords do not match.');
    } else {
      alert('Please fill out all required fields correctly.');
    }
  }
}
