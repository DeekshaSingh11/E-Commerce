import { Component, OnInit } from '@angular/core';
import { addProduct } from '../data-type';
import { ProductService } from '../services/product.service';
import { faCoffee, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent implements OnInit {
  productList:undefined | addProduct[];
  deleteMsg:string='';
  icon=faTrash;
  iedit=faEdit;

  constructor(private _addProduct:ProductService) { }

  ngOnInit(): void {
    this.getAllData()
  }
  getAllData(){
    this._addProduct.getProduct().subscribe((res)=>{
      console.log(res);
      this.productList=res;
     
      })
  }
  deleteProduct(id:number){
    console.log("deleted items");
    this._addProduct.deleteProduct(id).subscribe((res=>{
if(res){
  this.deleteMsg="Item is deleted";
  this.getAllData();
}
setTimeout(() => {
  this.deleteMsg='';
}, 3000);

    }))

  }

}
