import { query } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { addProduct } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor( private productService:ProductService , private activatedRoute: ActivatedRoute) { }
  productList:addProduct[] | undefined;
  ngOnInit(): void {
    
    this.activatedRoute.params.subscribe(params => {
      const userQuery = params['query'];
      console.log(userQuery);
   if( userQuery && this.productService.searchProduct(userQuery).subscribe(result=>{
    this.productList=result
    console.log(this.productList);
   })){

   }
    });
    
  }

}
