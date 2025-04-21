import { Component, OnInit } from '@angular/core';
import { SubjectService } from '../subject.service';
import { Subject } from '../subject';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-subject',
  standalone: false,
  templateUrl: './subject.component.html',
  styleUrl: './subject.component.css'
})
export class SubjectComponent implements OnInit{

  public subjects: Subject[] = [];
  public updateSubject: Subject | undefined;
  public deleteSubject: Subject | undefined;

  ngOnInit(): void {
      this.getSubjects();
  }
  constructor(private subjectService: SubjectService){};

  public getSubjects(): void{
    this.subjectService.getSubjects().subscribe(
      (response: Subject[]) =>{
        this.subjects = response
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public addSubject(addForm: NgForm): void{
    this.subjectService.createSubject(addForm.value).subscribe(
      (response: Subject) => {
        console.log(response);
        document.getElementById('add-subject-form')?.click();
        this.getSubjects();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public onUpdateSubject(subject: Subject): void{
    this.subjectService.updateSubject(subject).subscribe(
      (response: Subject) => {
        console.log(response);
        this.getSubjects();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public onDeleteSubject(): void{
    if(this.deleteSubject){
      this.subjectService.deleteSubject(this.deleteSubject.id).subscribe(
        (response: void) => {
          console.log(response);
          this.getSubjects();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      )
    }
  }

  public searchSubject(key: string): void{
    key = key ? key.trim().toLowerCase() : '';
    const result: Subject[] = [];
    for (const subject of this.subjects) {
      if(subject.id.trim().toLowerCase().indexOf(key) !== -1 ||
      subject.name.trim().toLowerCase().indexOf(key) !== -1){
        result.push(subject);
      }
    }
    this.subjects = result;
    if(result.length === 0 || !key){
      this.getSubjects();
    }
  }

  public onOpenModal(subject: Subject | null, mode: string): void{
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    button.type = 'button';
    if(mode === 'add'){
      button.setAttribute('data-target', '#addSubjectModal')
    }
    if(mode === 'edit'){
      if(subject){
        this.updateSubject = subject;
      }
      button.setAttribute('data-target', '#editSubjectModal')
    }
    if(mode === 'delete'){
      if(subject){
        this.deleteSubject = subject;
      }
      button.setAttribute('data-target', '#deleteSubjectModal')
    }
    container?.appendChild(button);
    button.click();
  }
}
