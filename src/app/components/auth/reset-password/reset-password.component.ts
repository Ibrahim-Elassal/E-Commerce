import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  isLoading:boolean = false ;
  errorMsg : string = '' ;

  constructor(private _AuthService : AuthService , private _Router : Router){
    if(!localStorage.getItem('email')){
      this._Router.navigate(['/login'])
    }
    if(!localStorage.getItem('verify')){
      this._Router.navigate(['/verifyCode'])
    }
    if(localStorage.getItem('email')&& localStorage.getItem('verify')){
      this._Router.navigate(['/resetPassword'])
    }
     if(!localStorage.getItem('email') && !localStorage.getItem('verify')){
      this._Router.navigate(['/login'])
    }
    if(localStorage.getItem('email')&& !localStorage.getItem('verify')){
      this._Router.navigate(['/verifyCode'])
    }
    if(!localStorage.getItem('email')&& localStorage.getItem('verify')){
      localStorage.removeItem('verify');
      this._Router.navigate(['/login'])
    }

  }


  resetPasswordForm:FormGroup = new FormGroup({
    email: new FormControl( null  , [Validators.required , Validators.email]),
    newPassword: new FormControl(null , [Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/) , Validators.required])

  })


  handleResetPassword(resetPasswordForm:FormGroup){
      this.resetPasswordForm.value.email = localStorage.getItem('email')
      console.log(resetPasswordForm.value );
      this._AuthService.resetPassword(resetPasswordForm.value).subscribe({
        next:(res)=>{
          localStorage.setItem('userToken' , res.token )
          console.log(res);
          this._AuthService.decode()
          this._Router.navigate(['/home'])
          localStorage.removeItem('email')
          localStorage.removeItem('verify')
        },
        error:(err)=>{
          if(err.error.statusMsg === 'fail'){
            this.errorMsg = err.error.message ;
          }

        }
      })
    }
    
    // show & hide password
    showPassword = false;
    toggleShowPassword() {
      this.showPassword = !this.showPassword;
    }

    ngOnInit(): void { }

  }
