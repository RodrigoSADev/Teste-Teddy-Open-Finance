import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shell-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  formBuilder = inject(FormBuilder);
  router = inject(Router);

  loginForm = this.formBuilder.group({
    user: ['', [Validators.required]],
  });

  onSubmit() {
    if (this.loginForm.valid) {
      this.router.navigate(['/clientes']);
    }
  }
}
