import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { fromEventPattern } from 'rxjs';
import { HomeComponent } from './home/home.component';

import { ProjectsComponent } from './projects/projects.component';

import { HomeworkComponent } from './projects/homework/homework.component' ;
import { RegisterComponent } from './projects/homework/register/register.component' ;
import { MainComponent } from './projects/homework/main/main.component';

import { BstVisualizationComponent } from './projects/bst-visualization/bst-visualization.component';

import { AboutComponent } from './about/about.component';

import { ContactComponent } from './contact/contact.component';


const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'home', component: HomeComponent},
  { path: 'projects', component: ProjectsComponent},

  { path: 'projects/homework', component: HomeworkComponent},
  { path: 'projects/homework/register', component: RegisterComponent},
  { path: 'projects/homework/main' , component: MainComponent},

  { path: 'projects/Bst-Visualization', component: BstVisualizationComponent},

  { path: 'resume', component: AboutComponent},

  { path: 'contact', component: ContactComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
