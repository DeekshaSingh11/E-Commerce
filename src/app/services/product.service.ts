import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { addProduct } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  cartData=new EventEmitter<addProduct[]|[]>()

  constructor(private _http:HttpClient) {

   }
   addProduct(data:addProduct){
    console.log("service called")
    return this._http.post("http://localhost:3000/products", data);
   }
   getProduct(){
    console.log("service data get");
    return this._http.get<addProduct[]>("http://localhost:3000/products")
   }
   deleteProduct(id:number){
    console.log("service data deleted");
    return this._http.delete(`http://localhost:3000/products/${id}`);
   }
   findProduct(id:string){
    return this._http.get<addProduct>(`http://localhost:3000/products/${id}`)
   }
   updateProduct(addProduct:addProduct){
    console.log("update service")
    console.log(addProduct)

    return this._http.put<addProduct>(`http://localhost:3000/products/${addProduct.id}`, addProduct)
   }
   popularProduct(){
    return this._http.get<addProduct[]>("http://localhost:3000/products?_limit=3")
   }
   trendyProducts(){
    return this._http.get<addProduct[]>("http://localhost:3000/products?_limit=10 ")
   }
   searchProduct(query:string){
    return this._http.get<addProduct[]>(`http://localhost:3000/products?q=${query}`)
   }
   localAddToCart(data:addProduct){
   let cartData=[];
   let localData=localStorage.getItem('localData');
   if(!localData)
   {
    localStorage.setItem('localData',JSON.stringify([data]))
   }
   else{
    cartData=JSON.parse(localData);
    cartData.push(data);
    localStorage.setItem('localData',JSON.stringify(cartData))
   }
   this.cartData.emit(cartData);
   }
}
