import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/authorize';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-register',
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  email = '';
  password = '';

  successMessage = '';
  errorMessage = '';
  isLoading = false;

  constructor(private auth: AuthService, private router: Router) {}

  register() {
    if (!this.email || !this.password) {
      this.errorMessage = 'Email and password are required';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.auth.register(this.email, this.password).subscribe({
      next: () => {
        this.successMessage = 'Registration successful. Please login.';
        this.isLoading = false;
        setTimeout(() => this.router.navigate(['/login']), 1500);
      },
      error: err => {
        console.error(err);
        this.errorMessage =
          err?.error?.message || 'Registration failed';
        this.isLoading = false;
      }
    });
  }
}
