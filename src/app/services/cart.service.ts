import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import {  map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  numOfProducts = new BehaviorSubject(0)
  numOfwishList = new BehaviorSubject(0)
  userToken = new BehaviorSubject(null || '')
  headers:any

  constructor(private _HttpClient:HttpClient) {
    this.userToken.next(JSON.parse(JSON.stringify(localStorage.getItem('userToken'))))

    this.userToken.subscribe({
      next: (x) => {
        this.headers = x
        this.getUserCart().subscribe({
          next:res => this.numOfProducts.next(res.numOfCartItems),
          error:err => console.log(err)

        })
        this.getWishList().subscribe({
          next:res => this.numOfwishList.next(res.count)

        })
      }
    })
  }

  addToCart(Id:string):Observable<any>
  {
    return this._HttpClient.post(environment.baseUrl+ 'cart' ,
    {productId:Id}
    )

  }

  getUserCart():Observable<any>
  {
    return this._HttpClient.get(environment.baseUrl+'cart')
  }

  removeCartItem(id:string):Observable<any>
  {
    return this._HttpClient.delete(environment.baseUrl+`cart/${id}` )
  }

  clearCartItems():Observable<any>
  {
    return this._HttpClient.delete(environment.baseUrl+'cart' )
  }

  UpdateItemQ(id:string , count:number):Observable<any>
  {
    return this._HttpClient.put(environment.baseUrl+`cart/${id}`, {count:count} )
  }

  onlinePayement(cartId:string , shippingAddress:any  ):Observable<any>
  {
    return this._HttpClient.post(environment.baseUrl+`orders/checkout-session/${cartId}/?url=http://localhost:4200` ,
    {
      shippingAddress: shippingAddress
    })
  }

  addWishList(productId:string):Observable<any>
  {
    return this._HttpClient.post(environment.baseUrl+'wishlist' , {productId : productId}  )
  }

  removeWishList(productId:string):Observable<any>
  {
    return this._HttpClient.delete(environment.baseUrl+`wishlist/${productId}` )
  }

  getWishList():Observable<any>
  {
    return this._HttpClient.get(environment.baseUrl+'wishlist' )
  }

  WishList ():Observable<any>{
    return this._HttpClient.get(environment.baseUrl+ 'wishlist').pipe(
      map((result:any)=>{
        console.log(result);

        let productIds: any[]  = [] ;
        result.data.forEach((item:any) => productIds.push(item.id));
            return productIds
      })
    )
  }

}
