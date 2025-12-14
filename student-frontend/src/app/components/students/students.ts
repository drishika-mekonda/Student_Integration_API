import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Student } from '../../services/student';

@Component({
  standalone: true,
  selector: 'app-students',
  imports: [CommonModule, FormsModule],
  templateUrl: './students.html',
  styleUrl: './students.css'
})
export class Students implements OnInit {

  students: any[] = [];
  student = { id: 0, name: '', class: '', section: '' };

  constructor(private service: Student) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.service.getStudents().subscribe(data => {
      this.students = data;
    });
  }

  save(): void {
    if (this.student.id === 0) {
      this.service.addStudent(this.student).subscribe(() => {
        this.loadStudents();
        this.clear();
      });
    } else {
      this.service.updateStudent(this.student.id, this.student).subscribe(() => {
        this.loadStudents();
        this.clear();
      });
    }
  }

  edit(s: any): void {
    this.student = { ...s };
  }

  delete(id: number): void {
    this.service.deleteStudent(id).subscribe(() => {
      this.loadStudents();
    });
  }

  clear(): void {
    this.student = { id: 0, name: '', class: '', section: '' };
  }
}
