import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit   {

  cardId:string = '' ;
  cardOwner:string = '' ;
  isLoading:boolean = false

  constructor(private _CartService:CartService , private _ActivatedRoute:ActivatedRoute , private _Router:Router){ }
  ngOnInit(): void {
    this._CartService.getUserCart().subscribe({
      next:(res)=>{
        this.cardId = res.data._id ;
      },
      error:(err)=> console.log(err)
    })
  }

  shippingForm = new FormGroup({
    details : new FormControl(null , [Validators.required]),
    phone: new FormControl(null , [Validators.pattern(/^01[0125][0-9]{8}$/) , Validators.required]),
    city : new FormControl(null , [Validators.required ])
  })


  payementForm(shippingForm:FormGroup){
    this.isLoading = true ;

    if (shippingForm.valid) {
      this._CartService.onlinePayement(this.cardId,shippingForm.value ).subscribe({
        next: res =>{
          location.href = res.session.url
          this.isLoading = false
        },
        error: err=>{
          console.log(err);
          this.isLoading = false
        }
      })
    }
  }


}
