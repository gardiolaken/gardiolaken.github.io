import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Homework } from '../homework.model';
import { Router,NavigationStart} from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private hw_data:DataService, private router: Router) { }

  ngOnInit(): void {
  }

  enter_code(){
    this.hw_data.setCode(this.temp_ans);
    this.router.navigateByUrl('/projects-component/homework')
  }

  temp_ans = ''
  onKey(event:any){
    this.temp_ans = event.target.value;
  }
}
