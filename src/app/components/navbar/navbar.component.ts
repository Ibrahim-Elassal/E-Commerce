import { Component , OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  loginConfirm : boolean = false
  isLoading : boolean = true
  numOfProducts:number = 0
  isEmptyList:boolean = true;
  wishProductNum:number = 0
  constructor(private _AuthService:AuthService , private _CartService:CartService){
    _CartService.numOfProducts.subscribe({
      next:(x)=> {
        this.numOfProducts = x ;
      }
    })
  }

  ngOnInit(){

    this._AuthService.userData.subscribe({
      next:()=>{
        if (this._AuthService.userData.getValue() !== null) {
          this.loginConfirm = true
        }else{
          this.loginConfirm = false
        }
      }
    })

    this._CartService.numOfwishList.subscribe({
      next: x=>{
        if (x == 0) {
          this.isEmptyList = true
        }else{
          this.isEmptyList = false
        }
        this.wishProductNum = x

      }
    })
  }

  logOut(){
    this._AuthService.logOut()
  }
}
