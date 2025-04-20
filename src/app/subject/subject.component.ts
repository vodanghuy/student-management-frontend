import { Component, OnInit } from '@angular/core';
import { SubjectService } from '../subject.service';
import { Subject } from '../subject';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-subject',
  standalone: false,
  templateUrl: './subject.component.html',
  styleUrl: './subject.component.css'
})
export class SubjectComponent implements OnInit{

  public subjects: Subject[] = [];
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

  public onOpenModal(subject: Subject, mode: string): void{
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    button.type = 'button';
    if(mode === 'add'){
      button.setAttribute('data-target', '#addSubjectModal')
    }
    if(mode === 'edit'){
      button.setAttribute('data-target', '#editSubjectModal')
    }
    if(mode === 'delete'){
      button.setAttribute('data-target', '#deleteSubjectModal')
    }
    container?.appendChild(button);
    button.click();
  }
}
