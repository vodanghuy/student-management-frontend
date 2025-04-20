import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from './subject';

@Injectable({
  providedIn: 'root'
})
export class SubjectService{

  private apiServerUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  public getSubjects(): Observable<Subject[]>{
    return this.http.get<Subject[]>(`${this.apiServerUrl}/subjects`)
  }
  public getSubjectById(id: string): Observable<Subject>{
    return this.http.get<Subject>(`${this.apiServerUrl}/subjects/${id}`)
  }
  public createSubject(subject: Subject): Observable<Subject>{
    return this.http.post<Subject>(`${this.apiServerUrl}/subjects`, subject)
  }
  public updateSubject(subject: Subject): Observable<Subject>{
    return this.http.put<Subject>(`${this.apiServerUrl}/subjects`, subject)
  }
  public deleteSubject(id: string): Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/subjects/${id}`)
  }
}
