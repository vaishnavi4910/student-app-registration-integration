import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { MessageModule } from 'primeng/message';
import { CardModule } from 'primeng/card';

import { Api } from '../../services/api';
@Component({
  selector: 'app-login',
  standalone: true,

  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    CheckboxModule,
    MessageModule,
    CardModule,
    DividerModule
  ],

  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {

  private fb = inject(FormBuilder);
  private api = inject(Api);
  private router = inject(Router);

  loginForm: FormGroup;

  formSubmitted = false;
  loggingIn = false;
  loginErrorMessage = '';

  constructor() {
    this.loginForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],

      password: [
        '',
        [
          Validators.required
        ]
      ],

      rememberMe: [false]
    });
  }

 



  onLogin(): void {
  this.formSubmitted = true;
  this.loginErrorMessage = '';

  if (this.loginForm.invalid) {
    this.loginForm.markAllAsTouched();
    return;
  }

  const requestBody = {
    email: this.loginForm.get('email')?.value.trim(),
    password: this.loginForm.get('password')?.value
  };

  console.log('Data sent to login API:', requestBody);

  this.loggingIn = true;

  this.api.login(requestBody).subscribe({

   next: (response: any) => {
  console.log('Complete login response:', response);

  this.loggingIn = false;

  if (response.success === true) {
    this.formSubmitted = false;
    this.loginErrorMessage = '';

    // Navigate to the Student Grid after successful login
    this.router.navigate(['/admin/students']);
  } else {
    // Stay on the Login page when login fails
    this.loginErrorMessage =
      response.message || 'Invalid email or password.';
  }
},

    error: (error: any) => {
      console.error('Login HTTP error:', error);
      console.error('Backend error body:', error.error);

      this.loggingIn = false;

      this.loginErrorMessage =
        error.error?.message ||
        'Invalid email or password. Please try again.';
    }
  });
}


goToRegister(): void {
  this.router.navigate(['/register']);
}




}