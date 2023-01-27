import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { addProduct } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private _router: Router, private productService: ProductService) { }
  menuType: string = 'default';
  sellerName: string = '';
  userName:string='';
  
  searchProduct: undefined | addProduct[];

  ngOnInit(): void {

    this._router.events.subscribe((val: any) => {
      console.log(val.url);
      if (val.url) {
        if (val.url && val.url.includes('seller')) {
          this.menuType = "seller"; 
          let sellerStore = localStorage.getItem('seller');
          console.log(typeof (sellerStore));
          let sellerData = sellerStore && JSON.parse(sellerStore)[0];
          console.log(sellerData);
          this.sellerName = sellerData.name;
          console.log(this.sellerName);
          console.log("inside seller")
        }
        else if(localStorage.getItem('user')){
          let userStore=localStorage.getItem('user')
       let userData=userStore && JSON.parse(userStore);
      this.userName=userData.name;
      console.log(this.userName);
      this.menuType = 'user';
      
        }
        else {
          this.menuType = "default"
          console.log("outside seller")
        }
      }

    })
  }

  logout() {
    debugger;
    localStorage.removeItem('seller')
    console.log("logout")
    this._router.navigate(['home']);

  }
  userlogout()
  {
    localStorage.removeItem('user');
    this._router.navigate(['/auth-user']);
  }
  SearchProduct(query: KeyboardEvent) {
    if(query){
    const element = query.target as HTMLInputElement;
    console.log(element.value);
    this.productService.searchProduct(element.value).subscribe((result) => {
  
      if(result.length>5){
        result.length=5;
      }
      this.searchProduct = result
      console.log(this.searchProduct)
    })}



  }
  hideProduct(){
    this.searchProduct=undefined;
  }
  submitSearch(val:string){
console.log(val);
this._router.navigate([`search/${val}`]);
  }
  redirectDetail(id:number){

 this._router.navigate(['/product-detail/'+id]);
  }


}
