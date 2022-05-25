import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
private baseUrl :string;
  constructor(private http:HttpClient) { 
    this.baseUrl = environment.baseUrl;

  }
  post(data:any){
    console.log(data)
    return this.http.post(this.baseUrl,data)
  }
  get(){
    return this.http.get(this.baseUrl)
  }
  put(id:string,data:any){
    return this.http.put(this.baseUrl+`/${id}`,data);
  }
  delete(id:String) {
    return this.http.delete(this.baseUrl+`/${id}`)
  }
}
