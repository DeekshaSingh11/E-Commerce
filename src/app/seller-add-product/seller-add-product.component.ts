import { Component, OnInit } from '@angular/core';
import { addProduct } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent implements OnInit {
msgData:string='';
  constructor( private _addProduct:ProductService) { }

  ngOnInit(): void {
  }
  submit(data:addProduct){
    console.warn(data);
    this._addProduct.addProduct(data).subscribe((res)=>{
      console.warn(res);
      if(res){
        this.msgData="Product Added Successfully"
      }setTimeout(()=>(this.msgData=''), 3000);
    });
  

    
  }

}
