import { Component, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{

  constructor( private _CartService:CartService , private _Router : Router){ }

  isLoading:boolean = true;
  cartDetails!:any
  numOfItem:number = 0;
  data:any;
  cartBtnLoading:boolean = false;
  updateCountLoading:boolean = false;

  counter:any;
  remove:any;

  ngOnInit(): void {
    this._CartService.getUserCart().subscribe({
      next:(res) =>{
        this.isLoading = false
        this.cartDetails = res.data ;
      },
      error: err =>{
        this.isLoading = false
        console.log(err)
      }
    })
  }

  removeItem(productId : string){
    this._CartService.removeCartItem(productId).subscribe({
      next:(response)=> {
        this.cartDetails = response.data  ;
          this._CartService.numOfProducts.next(response.numOfCartItems)
      } ,
      error: (err)=> console.log(err)
    })
  }
  updateItemCount(productId : string , count :number ){
        if(count ==0){
          this.removeItem(productId)
        }
        else {
          this._CartService.UpdateItemQ(productId , count).subscribe({
            next:(res)=> this.cartDetails = res.data ,
            error : (err)=> console.log(err)
          })
        }
  }

  clear:boolean =false

  clearCartItems(){
    this.clear = true
    this._CartService.clearCartItems().subscribe(
      res=>{
        this.cartDetails = []
        this.numOfItem = 0
        this.data = null;
        this.clear = false
        this._CartService.numOfProducts.next(0)
    })
  }


}
