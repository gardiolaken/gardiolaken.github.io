import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { fromEventPattern } from 'rxjs';
import { HomeComponent } from './home/home.component';

import { ProjectsComponent } from './projects/projects.component';

import { HomeworkComponent } from './projects/homework/homework.component' ;
import { RegisterComponent } from './projects/homework/register/register.component' ;
import { MainComponent } from './projects/homework/main/main.component'



const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'home-component', component: HomeComponent},
  { path: 'projects-component', component: ProjectsComponent},

  { path: 'projects-component/homework', component: HomeworkComponent},
  { path: 'projects-component/homework/register', component: RegisterComponent},
  { path: 'projects-component/homework/main' , component: MainComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
