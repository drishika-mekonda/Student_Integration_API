import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Authorize } from '../../services/authorize';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-register',
  imports: [FormsModule,RouterModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  email = '';
  password = '';

  constructor(private auth: Authorize, private router: Router) {}

register() {
  this.auth.register(this.email, this.password).subscribe({
    next: msg => {
      alert(msg);               // "User registered successfully"
      this.router.navigate(['/login']);
    },
    error: err => {
      alert('Registration failed');
      console.error(err);
    }
  });
}
}