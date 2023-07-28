import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  loader = new BehaviorSubject(false)
  constructor(private _HttpClient:HttpClient) { }

  getSpecific(prdoductId:any):Observable<any>
  {
  return this._HttpClient.get(environment.baseUrl+`products/${prdoductId}`)
  }
  getAllProducts() :Observable<any>{
    return this._HttpClient.get(environment.baseUrl+`products`)
  }
  getCategories() :Observable<any>{
    return this._HttpClient.get(environment.baseUrl+`categories`)
  }
  getBrands() :Observable<any>{
    return this._HttpClient.get(environment.baseUrl+`brands`)
  }
  getAllOrders(cartId:any):Observable<any>
  {
    return this._HttpClient.get(environment.baseUrl+`orders/user/${cartId}`)
  }

}

