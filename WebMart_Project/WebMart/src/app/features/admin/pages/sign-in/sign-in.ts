import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth';

@Component({
  selector: 'app-admin-sign-in',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sign-in.html',
  styleUrl: './sign-in.scss',
})
export class AdminSignIn {
  signinForm: FormGroup;
  loading = false;
  errorMsg = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signinForm = this.fb.group({
      email:    ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    if (this.signinForm.invalid) {
      this.signinForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.errorMsg = '';

    this.authService.signinAdmin(this.signinForm.value).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/admin/dashboard']);
      },
      error: (err) => {
        this.loading = false;
        this.errorMsg = err.message === 'Access denied. Admin only.'
          ? 'This account does not have admin privileges.'
          : 'Invalid email or password.';
      }
    });
  }
}