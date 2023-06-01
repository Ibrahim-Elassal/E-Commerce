import { Component, Input, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
  constructor(private _ProductsService:ProductsService,
    private _CartService:CartService ){  }

  isLoading:boolean = true;
  loading :boolean = false ;
  products:any[] = []
  cartLoading:boolean = false
  noItemTosShow:boolean = false;
  cartOwner:any ;
  showSuccessMessage = false;
  showAddMessage = false;
  showDeleteMessage = false;

  @Input() addToWishList  :boolean = false ;

  @Input() item :any;


  ngOnInit(): void {

    this._ProductsService.getAllProducts().subscribe({
    next:  (res:any)=> {
      this.isLoading = false;
      this.products = res.data
      if (this.products == null) {
        this.noItemTosShow = true;
      }else{
        this.noItemTosShow = false;
      }
    },
    error: (err:any) =>{
      this.isLoading = false;
    }
  })

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
  }
  )
 }





addtoWishList(productId : string){
  this._CartService.addWishList(productId).subscribe({
    next:(res)=>{
      console.log(res);
      this.addToWishList = true ;
      this._CartService.numOfwishList.next(res.data.length)
      this.showAddMessage = true;
        setTimeout(() => {
          this.showAddMessage = false;
        }, 2000);

    } ,
    error:(err)=> console.log(err)

  })
}

deleteFromWishList(productId : string){
  this._CartService.removeWishList(productId).subscribe({
    next:(res)=>{
      console.log(res);
      this.addToWishList = false ;
      this._CartService.numOfwishList.next(res.data.length)
      this.showDeleteMessage = true;
      setTimeout(() => {
        this.showDeleteMessage = false;
      }, 2000);
    } ,
    error:(err)=> console.log(err)

  })
}

}


// addToWishList(id:string , event:any)
// {
//   let fillCondition = Array.from(event.target.classList).includes('fa-regular')

//   if (fillCondition) {
//     this._CartService.addWishList(id).subscribe({
//       next:res => {
//         console.log(res);
//         event.target.classList.replace('fa-regular' , 'fa-solid')
//         console.log(event.target);
//         this._CartService.numOfwishList.next(res.data.length)

//       }
//     })

//   }

// }

// removeToWishList(id:string , event:any)
// {
//   let fillCondition = Array.from(event.target.classList).includes('fa-solid')

//   if (fillCondition) {
//     this._CartService.removeWishList(id).subscribe({
//       next:res => {
//         console.log(res);
//         event.target.classList.replace('fa-solid' , 'fa-regular')
//         // console.log(event.target);
//         this._CartService.numOfwishList.next(res.data.length)

//       }
//     })
//   }

// }


// addToCart(id:string , $event:any){

//   $event.target.children[0].classList.remove('d-none')
//   $event.target.children[1].classList.add('d-none')
//   this.cartLoading = true;

//   this._CartService.addToCart(id).subscribe({
//     next: res =>
//     {
//       this.cartLoading = false;
//       console.log(res.data);
//       $event.target.children[0].classList.add('d-none')
//       $event.target.children[1].classList.remove('d-none')

//       this._CartService.numOfProducts.next(res.numOfCartItems)
//       this.cartOwner = res.data.cartOwner
//       console.log(this.cartOwner);

//       localStorage.setItem('cartOwner' , this.cartOwner)
//     },
//     error : err => {
//       this.cartLoading = false;
//       console.log(err)
//       $event.target.children[0].classList.add('d-none')
//       $event.target.children[1].classList.remove('d-none')
//     }



//   })
// }
