import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import { model, SignIn, SignUp } from '../data-type';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';






@Injectable({
  providedIn: 'root'
})
export class SellerService {
  isSellerLoggedIn=new BehaviorSubject<boolean>(false);
  isLoggedIn=new BehaviorSubject<boolean>(false);
 
  // isLoggedIn=new EventEmitter<boolean>(false)

  constructor(private _http :HttpClient , private _router:Router) { }
  userSignUp(data:model)
{
  console.log("hiiytrtrrt");
let result= this._http.post('http://localhost:3000/seller' , data , 
{observe:'response'}).subscribe(res=>{
  debugger;
  console.log(res);
  this.isSellerLoggedIn.next(true);
  this._router.navigate(['seller-home']);
  localStorage.setItem('seller', JSON.stringify(res.body));
  console.log("hii090990",res);
});

return false;
 
}

reloadSeller(){
  if(localStorage.getItem('seller'))
  {
    this.isSellerLoggedIn.next(true);
    this._router.navigate(['seller-home']);
    console.log("localstorage data")
  }
}

userSignIn(data:SignIn){
  console.log("login-service")
  let result=this._http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`,
  {observe:'response'}
  ).subscribe((res:any)=>{
    console.log("login result");
    console.log(res.body)
     if(res && res.body &&res.body.length)
     {
      console.log("user logged in")
      this._router.navigate(['seller-home']);
  localStorage.setItem('seller', JSON.stringify(res.body));
 
     }
     else{
      console.log("user not logged in")
      this.isLoggedIn.next(true)
     }
  })
}

}

