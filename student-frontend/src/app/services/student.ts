import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Student {
  private api = 'http://localhost:5176/api/students';

  constructor(private http: HttpClient) {}

  private headers() {
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      })
    };
  }

  getStudents() {
    return this.http.get<any[]>(this.api, this.headers());
  }

  addStudent(student: any) {
    return this.http.post(this.api, student, this.headers());
  }

  updateStudent(id: number, student: any) {
    return this.http.put(`${this.api}/${id}`, student, this.headers());
  }

  deleteStudent(id: number) {
    return this.http.delete(`${this.api}/${id}`, this.headers());
  }
}