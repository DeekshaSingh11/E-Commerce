import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { addProduct } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})
export class SellerUpdateProductComponent implements OnInit {
  productData:undefined | addProduct;
  productMsg:undefined |string;

  constructor(private route:ActivatedRoute , private product:ProductService) { }

  ngOnInit(): void {
    let productId=this.route.snapshot.paramMap.get('id');
    console.warn(productId);
    productId && this.product.findProduct(productId).subscribe((res:any)=>{
      console.log(res);
      this.productData=res;
    })
  }
  submit(data:addProduct){
  if(this.productData){
data.id=this.productData.id;
  }
    console.log(data)
    this.product.updateProduct(data).subscribe((res)=>{
      if (res){
this.productMsg="product has updated"
      }
    });
    setTimeout(()=>{
      this.productMsg=""
    },3000)

  }

}
