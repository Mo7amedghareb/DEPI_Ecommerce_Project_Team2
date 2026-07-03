import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  templateUrl: './sign-in.html',
  styleUrls: ['./sign-in.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
  ],
})
export class SignIn {
  signinForm: FormGroup;
  loading = false;
  errorMsg = '';
  successMsg = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signinForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    this.errorMsg = '';
    this.successMsg = '';

    if (this.signinForm.invalid) {
      this.signinForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.signinForm.value;

    const payload = { email, password };

    console.log('FRONT SIGNIN PAYLOAD =>', payload);

    this.loading = true;
    this.authService.signin(payload).subscribe({
      next: (res) => {
        console.log('FRONT SIGNIN RESPONSE =>', res);
        this.loading = false;
        this.successMsg = res?.message || 'Logged in successfully.';

        if (res?.token) {
          localStorage.setItem('token', res.token);
        }

        this.router.navigate(['/']);
      },
      error: (err: any) => {
        console.error('FRONT SIGNIN ERROR =>', err);
        this.loading = false;
        this.errorMsg =
          err?.error?.message || 'Invalid email or password.';
      },
    });
  }
}