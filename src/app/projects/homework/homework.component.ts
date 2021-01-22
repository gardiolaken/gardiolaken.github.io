import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { Homework } from './homework.model'
import { DataService } from './data.service';

@Component({
  selector: 'app-homework',
  templateUrl: './homework.component.html',
  styleUrls: ['./homework.component.css']
})
export class HomeworkComponent implements OnInit {

  constructor(private request:ApiService, private hw_data : DataService) {
    
   }

  homework_list : Homework[] = [];
  homework1 = new Homework();
  firstnumber: number;
  secondnumber: number;
  question : string;
  start_button_invisible = true;
  score : number;
  timer : number;
  answer : number;
  user_answer : number;  
  private skip : boolean;

  

  data(){
    this.request.getData('xd').subscribe((data:Homework[]) =>{
      this.homework_list = data;      
    })
  }

  data2(){
    // this.homework_list.forEach(homework =>{
    //   console.log(homework.HomeWorkID,homework.Difficulty);
    // })

    
  }

  ngOnInit(): void {
    
  }

  ngOnDestroy(): void {
    clearInterval(this.temp);
  }

  temp_ans = ''
  onKey(event:any){
    this.temp_ans = event.target.value;
    console.log(this.temp_ans)
  }


  ans:string;  
  
  check_answer(){   
    this.ans = '';
    this.skip = true;
    this.user_answer = parseInt(this.temp_ans)
    if(this.user_answer == this.answer){      
      this.score = this.score + 1;
      console.log(this.user_answer + "correct");
    }
  }

 

  async start(){    
    console.log(this.hw_data.getCode());
    this.start_button_invisible = false;
    var ctr;
    for (ctr = 0; ctr < 10;ctr++){
      this.problem();      
      document.getElementById("question").innerHTML = this.question;  
      this.skip = false;   
      await this.start_timer();              
    }
    console.log("you scored: " + this.score + " /10");
  }


  problem(){
    this.firstnumber = Math.floor((Math.random() * 10) + 1);
    this.secondnumber = Math.floor((Math.random() * 10) + 1);
    this.answer = this.firstnumber + this.secondnumber;
    this.question = this.firstnumber + " + " + this.secondnumber + " = ";        
  }

  temp:any;
  async start_timer(){    
    var time = 10;       
    document.getElementById("demo").innerHTML = time.toString();    
    return new Promise(async(resolve,reject) =>{          
        this.temp = setInterval(() => {               
          time = time - 1;     
          if(time == 0){
            document.getElementById("demo").innerHTML = "Time's Up!";
          }
          else if(time == -1 || this.skip == true){   
            time = 0;                                    
            clearInterval(this.temp);                       
            resolve("done");          
          }
          else{
            document.getElementById("demo").innerHTML = time.toString();
          }       
        }, 1000);                
    })
  }
}
