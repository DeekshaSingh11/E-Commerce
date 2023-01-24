import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { addProduct } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  productDetail:addProduct | undefined;
  productCount=1;
  constructor(private activatedRoute: ActivatedRoute ,private productService:ProductService ) { }

  ngOnInit(): void {
this.activatedRoute.params.subscribe(params=>{
  console.log(params)
  console.log(params['id'])
  const id=params['id'];
  this.productService.findProduct(id).subscribe(result=>{
    this.productDetail=result;
    console.log(this.productDetail)
  })
})
  }
  handleEvents(val:any){
console.log(val)
if(this.productCount< 20 && val=='inc')
{
this.productCount= this.productCount+1;
}
else if(this.productCount>1 && val=='dec'){
  this.productCount= this.productCount-1;
}
  }

}
