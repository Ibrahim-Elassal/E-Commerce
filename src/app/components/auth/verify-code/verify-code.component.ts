import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-verify-code',
  templateUrl: './verify-code.component.html',
  styleUrls: ['./verify-code.component.css']
})
export class VerifyCodeComponent implements OnInit  {
  inValid: boolean = false;
  success: boolean = false;
  code : string ='' ;
  errorMsg :string = ''
  isLoading:boolean = false ;
  Loading:boolean = false ;

  constructor(private _AuthService : AuthService , private _Router : Router){


    if(!localStorage.getItem('email')){
      this._Router.navigate(['/login'])
    }
    if(localStorage.getItem('verify') && localStorage.getItem('email')){
      this._Router.navigate(['/resetPassword'])
    }
    }

    verifyCode: FormGroup = new FormGroup({
      resetCode: new FormControl (null, [Validators.required , Validators.minLength(3) , Validators.pattern(/^[0-9]{6}$/) ]),
    });

  handleVerification(verifyCode: FormGroup) {

    this.isLoading = true;
    if (this.verifyCode.valid) {
      this._AuthService.verifyCode(verifyCode.value).subscribe({
        next:(res)=> {
          if(res.status === 'Success'){
            console.log(res);
            console.log(verifyCode.value);

            setTimeout( () => {
              this.success = true;
              setTimeout( () => {
                this.success = false;
              }, 1000 );
            }, 500 );
            this.isLoading = false;
            this._Router.navigate(['/resetPassword'])
            localStorage.setItem('verify' , 'yes') ;
          }
        },
        error:(err)=>{
          if(err.error.statusMsg === 'fail'){
            console.log(err.error.statusMsg);
            this.errorMsg = 'This Code Invalid' ;
            this.isLoading = false;
          }

        }
      })
    }

  }


  handlePassword(){
    this.Loading = true;

    const email  = localStorage.getItem('email');
    let passwordForm = {
      email: email ||''
    };
    console.log(passwordForm);

      this._AuthService.forgetPassword(passwordForm ).subscribe({
        next:(res)=>{
          if(res.statusMsg=== 'success'){
            console.log(res.message);
            this._Router.navigate(['/verifyCode'])
          }
          this.Loading = false;
        },
        error:(err)=>{
          console.log(err.error.message);
          this.errorMsg = err.error.message ;
          this.Loading = false;
        }
      })

    }

    ngOnInit(): void {
    }

  }
