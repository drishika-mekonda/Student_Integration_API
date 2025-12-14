import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Authorize {
  private api = 'http://localhost:5176/api/auth';

  constructor(private http: HttpClient) {}

  register(email: string, password: string) {
  return this.http.post(
    `${this.api}/register`,
    {
      Email: email,
      Password: password
    },
    { responseType: 'text' }   
  );
}


  login(email: string, password: string) {
    return this.http.post<any>(`${this.api}/login`, { email, password });
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }

  
}
