import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from './student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private apiServerUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  public getStudents(): Observable<Student[]>{
    return this.http.get<Student[]>(`${this.apiServerUrl}/students`)
  }

  public getStudentById(id: number): Observable<Student>{
    return this.http.get<Student>(`${this.apiServerUrl}/students/${id}`)
  }

  public addStudent(student: Student): Observable<Student>{
    return this.http.post<Student>(`${this.apiServerUrl}/students`, student);
  }

  public updateStudent(student: Student): Observable<Student>{
    return this.http.put<Student>(`${this.apiServerUrl}/students`,student)
  }

  public deleteStudent(id: number): Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/students/${id}`);
  }
  public addSubjectToStudent(studentId: number, subjectId: string): Observable<Student>{
    return this.http.post<Student>(`${this.apiServerUrl}/students/${studentId}/subjects/${subjectId}`, null)
  }
}
