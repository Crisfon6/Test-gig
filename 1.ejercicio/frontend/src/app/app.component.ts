import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  creteForm: FormGroup;
  usersForm: FormGroup;
  usersData: any;
  constructor(private fb: FormBuilder, private service: HttpService) {
    this.usersData = [];
    this.usersForm = this.fb.group({
      userArray: this.fb.array([])
    })
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
      this.usersData = data.results;
      this.createUserForm();
      console.log(this.usersForm)
    });
  }
  get userArray() {
    return this.usersForm.get('userArray') as FormArray;
  }
  getGroupUser(i:number){
    return this.userArray.controls[i] as FormGroup;
  }
  

  createUserForm(){
    this.usersData.forEach((user:any)=>{
      let tempGroup= this.fb.group({
        _id:[user._id],
        email: [user.email, Validators.required],
        name: [user.name, Validators.required],
        password: [user.password, Validators.required],
      });
      this.userArray.push(tempGroup);
    })
  }
  delete(i:number){
console.log(this.getGroupUser(i).value._id)
    this.service.delete(this.getGroupUser(i).value._id).subscribe((data: any) =>{
this.getusers();
    })
  }
  update(i: number){
    let data = this.getGroupUser(i).value;
 let dataSent = {email:data.email,password:data.password,name:data.name};
 console.log(dataSent)
    this.service.put(data._id,dataSent).subscribe((data: any) =>this.getusers())
  }
}
