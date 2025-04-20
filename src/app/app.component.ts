import { Component, OnInit } from '@angular/core';
import { Student } from './student';
import { StudentService } from './student.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{

  public students: Student[] = [];
  public editedStudent: Student | undefined;
  public deletedStudent: Student | undefined;

  constructor(private studentService: StudentService){}

  ngOnInit(): void {
      this.getStudents();
  }

  public getStudents(): void{
    this.studentService.getStudents().subscribe(
      (response: Student[]) => {
        this.students = response
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public addStudent(addForm: NgForm): void{
    document.getElementById('add-employee-form')?.click();
    this.studentService.addStudent(addForm.value).subscribe(
      (response: Student) => {
        console.log(response);
        this.getStudents();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public editStudent(student: Student): void{
    if(this.editedStudent){
      this.studentService.updateStudent(student).subscribe(
        (response: Student) => {
          console.log(response);
          this.getStudents();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      )
    }
  }

  public deleteStudent(): void{
    if(this.deletedStudent){
      this.studentService.deleteStudent(this.deletedStudent.id).subscribe(
        (response: void) => {
          this.getStudents();
        },
        (error: HttpErrorResponse) => {
          alert(error.message)
        }
      )
    }
  }

  public onOpenModal(student: Student | null, mode: string): void{
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal')
    if(mode === 'add'){
      button.setAttribute('data-target', '#addStudentModal')
    }
    if(mode === 'edit'){
      if(student){
        this.editedStudent = student;
      }
      button.setAttribute('data-target', '#editStudentModal')
    }
    if(mode === 'delete'){
      if(student){
        this.deletedStudent = student;
      }
      button.setAttribute('data-target', '#deleteStudentModal')
    }
    container?.appendChild(button);
    button.click();
  }
}
