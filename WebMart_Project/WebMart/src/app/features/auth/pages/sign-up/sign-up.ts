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
  selector: 'app-sign-up',
  standalone: true,
  templateUrl: './sign-up.html',
  styleUrls: ['./sign-up.scss'],
  imports: [
    CommonModule,        
    ReactiveFormsModule,
    RouterLink,          
  ],
})
export class SignUp {
  signupForm: FormGroup;
  loading = false;
  errorMsg = '';
  successMsg = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signupForm = this.fb.group(
      {
        fullName: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: this.passwordsMatchValidator }
    );
  }

  private passwordsMatchValidator(form: FormGroup) {
    const pass = form.get('password')?.value;
    const confirm = form.get('confirmPassword')?.value;
    return pass === confirm ? null : { passwordsNotMatch: true };
  }

  onSubmit() {
    this.errorMsg = '';
    this.successMsg = '';

    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }

    const { fullName, email, password } = this.signupForm.value;

    const payload = {
      name: fullName,
      email,
      password,
    };

    console.log('FRONT SIGNUP PAYLOAD =>', payload);

    this.loading = true;
    this.authService.signup(payload).subscribe({
      next: (res) => {
        console.log('FRONT SIGNUP RESPONSE =>', res);
        this.loading = false;
        this.successMsg = res?.message || 'Account created successfully.';
        this.signupForm.reset();

        setTimeout(() => {
          this.router.navigate(['/auth/sign-in']);
        }, 1500);
      },
      error: (err: any) => {
        console.error('FRONT SIGNUP ERROR =>', err);
        this.loading = false;
        this.errorMsg =
          err?.error?.message || 'Something went wrong, please try again.';
      },
    });
  }
}