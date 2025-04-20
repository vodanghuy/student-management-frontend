import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SubjectComponent } from './subject/subject.component';
import { StudentComponent } from './student/student.component';

const routes: Routes = [
  {path: 'students', component: StudentComponent},
  {path: 'subjects', component: SubjectComponent},
  {path: '', component: AppComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
