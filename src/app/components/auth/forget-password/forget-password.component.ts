import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent {
  isLoading:boolean = false
  errorMsg:string = '' ;


  constructor(private _AuthService : AuthService , private _Router : Router){
    if(localStorage.getItem('email')){
      this._Router.navigate(['/login'])
    }
  }

  passwordForm:FormGroup = new FormGroup({
    email: new FormControl( null  , [Validators.required , Validators.email]),
  })

  handlePassword(passwordForm:FormGroup){
    this.isLoading = true;
    if (this.passwordForm.valid) {
      this._AuthService.forgetPassword(this.passwordForm.value).subscribe({
        next:(res)=>{
          if(res.statusMsg=== 'success'){
            localStorage.setItem('email',passwordForm.value.email)
            this._Router.navigate(['/verifyCode'])
          }
          this.isLoading = false;
        },
        error:(err)=>{
          this.errorMsg = err.error.message ;
          this.isLoading = false;
        }
      })
    }
  }

}
