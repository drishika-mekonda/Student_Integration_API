import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Authorize } from '../../services/authorize';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  email = '';
  password = '';

  constructor(private auth: Authorize, private router: Router) {}

  login(): void {
    this.auth.login(this.email, this.password).subscribe({
      next: (res: any) => {
        this.auth.saveToken(res.token);
        alert('Login successful');
        this.router.navigate(['/students']);
      },
      error: err => {
        console.error(err);

        if (err.error?.message) {
          alert(err.error.message);
        } else if (typeof err.error === 'string') {
          alert(err.error);
        } else {
          alert('Invalid email or password');
        }
      }
    });
  }
}
