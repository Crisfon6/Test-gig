import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  creteForm: FormGroup;
  users: any;
  constructor(private fb: FormBuilder, private service: HttpService) {
    this.users = [];
    this.creteForm = this.fb.group({
      email: ['', Validators.required],
      name: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  ngOnInit(): void {
  this.getusers();
  }
  submit(): any {
    console.log(this.creteForm.value);
    this.service.post(this.creteForm.value).subscribe((data: any) => {
      this.getusers()
    });
  }
  getusers =()=>{
    this.service.get().subscribe((data: any) => {
      this.users = data.results;
      console.log(this.users)
    });
  }
  delete(data: any){
    this.service.delete(data._id).subscribe((data: any) =>{
this.getusers();
    })
  }
  update(data: any){
 let dataSent = {email:data.email,password:data.password,name:data.name};
 console.log(dataSent)
    this.service.put(data._id,dataSent).subscribe((data: any) =>this.getusers())
  }
}
