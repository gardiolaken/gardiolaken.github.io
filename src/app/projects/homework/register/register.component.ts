import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Homework } from '../homework.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(public dataService: DataService) { }

  ngOnInit(): void {
  }

  register(){
    var homework = new Homework();
    homework.Pass = this.temp_pass;
    homework.Difficulty = this.difficulty;
    this.dataService.createNew(homework);
  }
  difficulty : number;
  temp_pass = ''
  onPass(event:any){
    this.temp_pass = event.target.value;  
  }

}
