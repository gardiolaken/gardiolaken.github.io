import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';


import { ProjectsComponent } from './projects/projects.component';


import { HomeworkComponent } from './projects/homework/homework.component';
import { RegisterComponent } from './projects/homework/register/register.component'

import { HttpClientModule } from '@angular/common/http';

import { ApiService } from './api.service';
import { MainComponent } from './projects/homework/main/main.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProjectsComponent,
    HomeworkComponent,
    RegisterComponent,
    MainComponent
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
