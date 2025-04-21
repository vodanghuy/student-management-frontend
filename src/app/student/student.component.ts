import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Student } from '../student';
import { StudentService } from '../student.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { SubjectService } from '../subject.service';
import { Subject } from '../subject';

@Component({
  selector: 'app-student',
  standalone: false,
  templateUrl: './student.component.html',
  styleUrl: './student.component.css'
})
export class StudentComponent implements OnInit{

  @ViewChild('closeModalBtn') closeModalBtn!: ElementRef;

  public students: Student[] = [];
  public subjects: Subject[] = [];
  public editedStudent: Student | undefined;
  public deletedStudent: Student | undefined;
  public selectedSubject!: string;
  public selectedStudent!: number;

  constructor(private studentService: StudentService, private subjectService: SubjectService){}

  ngOnInit(): void {
      this.getStudents();
      this.getSubjects();
  }

  public getSubjects(): void{
    this.subjectService.getSubjects().subscribe(
      (response: Subject[]) => {
        this.subjects = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
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

  public searchStudent(key: string): void{
    const result: Student[] = [];
    for (const student of this.students) {
      if(student.name.toLowerCase().indexOf(key.toLowerCase()) !== -1){
        result.push(student)
      }
    }
    this.students = result;
    if(result.length === 0 || !key){
      this.getStudents()
    }
  }

  public addSubjectToStudent(addSubjectForm: NgForm): void{
    this.studentService.addSubjectToStudent(parseInt(addSubjectForm.value.students), addSubjectForm.value.subjects.toString()).subscribe(
      (response: Student) => {
        console.log(response);
        this.closeModalBtn.nativeElement.click();
        alert("Add Subject To Student Successfully")
      },
      (error: HttpErrorResponse)=>{
        console.log(error.message);
        alert("Subject existed")
      }
    )
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
    if(mode === 'addSubject'){
      button.setAttribute('data-target', '#addSubjectToStudentModal')
    }
    container?.appendChild(button);
    button.click();
  }
}
