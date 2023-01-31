import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SignIn, SignUp } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  isValidUserAuth=new EventEmitter<boolean>(false);
  constructor(private http:HttpClient ,private _router:Router) { }
  signup(data:SignUp){
    this.http.post("http://localhost:3000/users" ,data,{observe:'response'}).subscribe(result=>{
      console.log(result);
      if(result){
        localStorage.setItem("user", JSON.stringify(result.body));
        this._router.navigate(['/']);

      }
    })
console.log("signup data")
  }
  signIn(data:SignIn){
   
    debugger;
    let result=this.http.get(`http://localhost:3000/users?email=${data.email}&password=${data.password}`,
  {observe:'response'}
  ).subscribe((res:any)=>{
    console.log("login result");
    console.log(res)
     if(res && res.body?.length)
     {
      console.log("user logged in")
      this.isValidUserAuth.emit(false);
      this._router.navigate(['/']);
  localStorage.setItem('user', JSON.stringify(res.body));
  this.isValidUserAuth.emit(false);
 
     }
      else{
        console.log("email & password wrong");
        this.isValidUserAuth.emit(true);
        
        
      }
    })
  }
  userAuthReload(){
    if(localStorage.getItem('user'))
    {
      this._router.navigate(['/']);
    }
  }
}
