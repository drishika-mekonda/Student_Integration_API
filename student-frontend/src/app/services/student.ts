import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StudentService {

  private apiUrl = 'http://localhost:5176/api/students';

  constructor(private http: HttpClient) {}

  getStudents() {
    return this.http.get<any[]>(this.apiUrl);
  }

  addStudent(student: any) {
    return this.http.post<any>(this.apiUrl, student);
  }

  updateStudent(id: number, student: any) {
    return this.http.put<any>(`${this.apiUrl}/${id}`, student);
  }

  deleteStudent(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
