import { Injectable } from '@angular/core';
import { ApiService } from '../../api.service'
import { Homework } from './homework.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private api:ApiService) { }

  private code = ''

  setCode(code){
    this.api.getData(code)
  }

  getCode(){
    return this.code;
  }

  createNew(homework:Homework){
    this.api.postData(homework);
  }



}
