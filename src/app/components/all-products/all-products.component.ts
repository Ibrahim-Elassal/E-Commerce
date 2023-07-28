import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';
@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent {
  constructor(private _ProductsService:ProductsService , private _CartService:CartService){ }

  isLoading:boolean = true;
  products:any[] = [] ;
  wishList :number []=[]

  ngOnInit(){
    this.loadWishList()
    this._CartService.userToken.next(localStorage.getItem('userToken')!);
    this._ProductsService.getAllProducts().subscribe({
      next: res=> {
        this.products = res.data
        this.isLoading = false;
      },
      error: err =>console.log(err)
    })

  }

  loadWishList (){
    this._CartService.WishList().subscribe(productIds =>{
      this.wishList = productIds ;

    } )
  }
}
