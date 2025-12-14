import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/authorize';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  email = signal('');
  password = signal('');
  error = signal('');

  constructor(private auth: AuthService, private router: Router) {}

  login() {
    this.auth.login(this.email(), this.password()).subscribe({
      next: res => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/students']);
      },
      error: () => this.error.set('Invalid credentials')
    });
  }
}
