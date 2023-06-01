import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-allorders',
  templateUrl: './allorders.component.html',
  styleUrls: ['./allorders.component.css']
})
export class AllordersComponent implements OnInit  {

 isLoading: boolean = true;
  numberOfOrders:number = 0
  numberOfCartItem:any[] = []
  allCarts :any[] = []

  cartid:any = localStorage.getItem('owner') ;

  constructor (private _CartService : CartService , private _ProductsService : ProductsService , private _Router : Router) {}

  ngOnInit(): void {
  this._CartService.getUserCart().subscribe({
        next:(res)=>{
          this.cartid = res.data.cartOwner ;
          this.getAllOrders()
        },
        error:(err)=> console.log(err)
      })


  }

  getAllOrders (){
    this._ProductsService.getAllOrders(this.cartid).subscribe({
      next:(res)=>{
        this.allCarts = res ;
        this.numberOfOrders = res.length ;
        this.isLoading = false;
        res.forEach((order:any) => {
          this.numberOfCartItem.push(order.cartItems.length)
          });
      },
      error:(err)=> {
        console.log(err)
      } ,
      complete : ()=>{
        this.isLoading = false
      }

    })
  }



}
