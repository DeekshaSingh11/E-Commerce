import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SignIn, SignUp } from '../data-type';
import { SellerService } from '../services/seller.service';

@Component({
selector: 'app-seller-auth',
templateUrl: './seller-auth.component.html',
styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent implements OnInit {

constructor(private _seller:SellerService , private _router:Router) { }
flag=true;
showError:string ='';
ngOnInit(): void {
this._seller.reloadSeller();
}

SignUp(data:SignUp):void{
  let model={
    data :data,
    id:23
  }
  console.log(model);
console.log(data);
this._seller.userSignUp(model);

}
signInForm()
{
this.flag=false;
console.log("open login portal")

}
signUpForm()
{
this.flag=true;
console.log("open signIn portal")
}
SignIn(data:SignIn){
console.log(data)
this._seller.userSignIn(data);
this._seller.isLoggedIn.subscribe((isError)=>{
if(isError){
this.showError="Email or password not correct";
}
})
}
}

