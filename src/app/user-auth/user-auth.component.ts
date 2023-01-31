import { Component, OnInit } from '@angular/core';
import { SignIn, SignUp } from '../data-type';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {
  isShow:boolean=false;
  msg:string=''

  constructor(private userservice:UserService) { }

  ngOnInit(): void {
    this.userservice.userAuthReload();
  }
  signUp(data:SignUp){
console.log("hoi");
console.log(data);
this.userservice.signup(data);
  }
  login()
  {
this.isShow=true;
  }
  signIn(data:SignIn){
    debugger;
console.log(data  , "data ")
this.userservice.signIn(data);
this.userservice.isValidUserAuth.subscribe(res=>{
  if(res)
  {
    this.msg="Wrong email & pasword pls check credetials"
  }
})







  }

}
