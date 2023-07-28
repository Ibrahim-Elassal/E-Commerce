import { LoginForm } from '../interfaces/login-form';
import { RegisterForm } from '../interfaces/register-form';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData:any = new BehaviorSubject(null);
  userEmail : any = ''
  constructor(private _HttpClient:HttpClient , private _Router:Router) {
    this.decode()

  }

  decode(){
    let incoded  = localStorage.getItem('userToken')
    if (incoded !== null) {
      let decoded = jwtDecode(incoded)
      this.userData.next(decoded)
    }
  }

  logOut(){
    localStorage.removeItem('userToken');
    this.userData.next(null)
    this._Router.navigate(['/login'])
  }

  register(userData:RegisterForm):Observable<any>
  {
    return this._HttpClient.post(environment.baseUrl + 'auth/signup' , userData)
  }

  logIn(userData:LoginForm):Observable<any>
  {
    return this._HttpClient.post(environment.baseUrl + 'auth/signin' , userData)
  }

  forgetPassword(passwordForm: { email: string }):Observable<any>
  {
    return this._HttpClient.post(environment.baseUrl + 'auth/forgotPasswords' , passwordForm)
  }


  verifyCode(code:string):Observable<any>
  {
    return this._HttpClient.post(environment.baseUrl + 'auth/verifyResetCode' , code)
  }

  resetPassword(userData:string):Observable<any>
  {
    return this._HttpClient.put(environment.baseUrl + 'auth/resetPassword' , userData)
  }

}
