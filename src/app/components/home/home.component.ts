import { ProductsService } from './../../services/products.service';
import { Component , OnInit} from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private _ProductsService:ProductsService , private _CartService:CartService){ }

  isLoading:boolean = true;
  products:any[] = [] ;
  wishList :number []=[] ;

  searchTitle:string = '' ;
  searchBrand:string = '' ;
  showSearchResults: boolean = false;

  ngOnInit(){
    this.loadWishList()
    this._CartService.userToken.next(localStorage.getItem('userToken')!);

    this._ProductsService.getAllProducts().subscribe({
      next: res=> {
        this.isLoading = false;
        this.products = res.data
      },
      error: err =>{
        this.isLoading = false;
      },
      complete:()=>{
      }
    })

  }

  loadWishList (){
    this._CartService.WishList().subscribe(productIds =>{
      this.wishList = productIds ;

    } )
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    fluidSpeed: true ,
    dots: false,
    autoplay:true,
    navSpeed: 1000,

    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      }
    },
    nav: true
  }

}
