import { NotFoundComponent } from './components/not-found/not-found.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { LoginComponent } from './components/auth/login/login.component';
import { BrandsComponent } from './components/brands/brands.component';
import { CartComponent } from './components/cart/cart.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './Guards/auth.guard';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { WishListComponent } from './components/wish-list/wish-list.component';
import { AllProductsComponent } from './components/all-products/all-products.component';
import { ForgetPasswordComponent } from './components/auth/forget-password/forget-password.component';
import { VerifyCodeComponent } from './components/auth/verify-code/verify-code.component';
import { ResetPasswordComponent } from './components/auth/reset-password/reset-password.component';
import { AllordersComponent } from './components/allorders/allorders.component';



const routes: Routes = [
  {path:'' ,redirectTo:'home', pathMatch:'full'},
  {path:'home'  , canActivate:[AuthGuard], component:HomeComponent},
  {path:'categories' , canActivate:[AuthGuard], component:CategoriesComponent},
  {path:'cart' ,  canActivate:[AuthGuard], component:CartComponent},
  {path:'brands' , canActivate:[AuthGuard], component:BrandsComponent},
  {path:'products' , canActivate:[AuthGuard], component:AllProductsComponent},
  {path:'checkout' , canActivate:[AuthGuard], component:CheckOutComponent},
  {path:'wishList' , canActivate:[AuthGuard], component:WishListComponent},
  {path:'allorders' , canActivate:[AuthGuard], component:AllordersComponent},
  {path:'prductsDetails/:id' , canActivate:[AuthGuard], component:ProductDetailsComponent},
  {path:'login' , component:LoginComponent},
  {path:'verifyCode' , component:VerifyCodeComponent},
  {path:'forgetPassword' , component:ForgetPasswordComponent},
  {path:'resetPassword' , component:ResetPasswordComponent},
  {path:'register' , component:RegisterComponent},
  {path:'**' , component:NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes , {useHash:false ,  scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
