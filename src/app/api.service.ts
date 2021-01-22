import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Homework } from './projects/homework/homework.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  local_url = "http://localhost:51622/HomeWork/Create";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  getData(code){ 
    return this.http.get("http://localhost:51622/Homework/code");
  }

  ngOnInit() {
    
  }

  postData(hero: Homework): Observable<Homework> {
    return this.http.post<Homework>(this.local_url, hero, this.httpOptions)
  }

}
