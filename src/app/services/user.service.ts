import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SignUp } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class UserService {

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
  userAuthReload(){
    if(localStorage.getItem('user'))
    {
      this._router.navigate(['/']);
    }
  }
}
