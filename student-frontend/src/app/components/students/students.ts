import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StudentService } from '../../services/student';

@Component({
  standalone: true,
  selector: 'app-students',
  imports: [CommonModule, FormsModule],
  templateUrl: './students.html',
  styleUrl: './students.css'
})
export class Students {

  students = signal<any[]>([]);
  student = signal({
    id: 0,
    name: '',
    class: '',
    section: ''
  });

  constructor(private service: StudentService) {
    this.loadStudents();
  }

  loadStudents() {
    this.service.getStudents().subscribe(data => {
      this.students.set(data);
    });
  }

  setName(value: string) {
    this.student.set({ ...this.student(), name: value });
  }

  setClass(value: string) {
    this.student.set({ ...this.student(), class: value });
  }

  setSection(value: string) {
    this.student.set({ ...this.student(), section: value });
  }

  save() {
    const s = this.student();

    if (s.id === 0) {
      this.service.addStudent(s).subscribe(() => this.loadStudents());
    } else {
      this.service.updateStudent(s.id, s).subscribe(() => this.loadStudents());
    }

    this.clear();
  }

  edit(s: any) {
    this.student.set({ ...s });
  }

  delete(id: number) {
    this.service.deleteStudent(id).subscribe(() => this.loadStudents());
  }

  clear() {
    this.student.set({
      id: 0,
      name: '',
      class: '',
      section: ''
    });
  }
}
