import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})

export class ProductDetailsComponent implements OnInit{

    constructor(private _ActivatedRoute:ActivatedRoute , private ProductsService:ProductsService , private _CartService:CartService){

    }
    productsDetails:any
    productId:any;
    isLoading:boolean = true
    cartLoading:boolean = false
    showSuccessMessage = false;
    loading :boolean = false ;

    ngOnInit(): void {
      this._ActivatedRoute.paramMap.subscribe(res=>{
        console.log(res.get('id'));
        this.productId= res.get('id')

        this.ProductsService.getSpecific(this.productId).subscribe(res=>{
          console.log(res.data);
          console.log(res.data.priceAfterDiscount);

          this.productsDetails = res.data
          this.isLoading = false
        })
      })
    }

    customOptions: OwlOptions = {
      loop: true,
      mouseDrag: true,
      touchDrag: true,
      pullDrag: true,
      dots: false,
      navSpeed: 700,
      navText: ['', ''],
      responsive: {
          0: {
              items: 1,
          }

      },
      nav: true,
  }


addToCart (productId : string ) {
  this.loading = true;
  this._CartService.addToCart(productId).subscribe({
    next : (res)=>{
      console.log(res);
      this._CartService.numOfProducts.next(res.numOfCartItems) ;
      this.loading = false;
      this.showSuccessMessage = true;
      setTimeout(() => {
        this.showSuccessMessage = false;
      }, 2000);
    } ,
    error : (err) => {
      this.loading = false;
      console.log(err)
  }
  })
 }


}
