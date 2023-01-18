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
  searchProduct: undefined | addProduct[];

  ngOnInit(): void {

    this._router.events.subscribe((val: any) => {
      console.log(val.url);
      if (val.url) {
        if (val.url && val.url.includes('seller')) {
          this.menuType = "seller"
          //  let sellerdata= JSON.parse(localStorage.getItem('seller'));'
          //  var data = JSON.parse(localStorage.getItem("storeData"));  
          let sellerStore = localStorage.getItem('seller');
          console.log(typeof (sellerStore));
          let sellerData = sellerStore && JSON.parse(sellerStore)[0];
          console.log(sellerData);
          this.sellerName = sellerData.name;
          console.log(this.sellerName);
          console.log("inside seller")
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


}
