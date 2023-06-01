import { AddHeaderInterceptor } from './interceptors/add-header.interceptor';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { BrandsComponent } from './components/brands/brands.component';
import { CartComponent } from './components/cart/cart.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ProductsComponent } from './components/products/products.component';
import { BrowserAnimationsModule  } from "@angular/platform-browser/animations";
import { OwlCategoriesComponent } from './components/owl-categories/owl-categories.component';
import { OwlBrandComponent } from './components/owl-brand/owl-brand.component';
import { SearchPipePipe } from './pipes/search-pipe.pipe';
import { BrandSearchPipe } from './pipes/brand-search.pipe';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { WishListComponent } from './components/wish-list/wish-list.component';
import { MainSliderComponent } from './components/main-slider/main-slider.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { AllProductsComponent } from './components/all-products/all-products.component';
import { ForgetPasswordComponent } from './components/auth/forget-password/forget-password.component';
import { VerifyCodeComponent } from './components/auth/verify-code/verify-code.component';
import { ResetPasswordComponent } from './components/auth/reset-password/reset-password.component';
import { SeeMorePipe } from './pipes/see-more.pipe';
import { PriceSearchPipe } from './pipes/price-search.pipe';
import { AllordersComponent } from './components/allorders/allorders.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    BrandsComponent,
    CartComponent,
    CategoriesComponent,
    NotFoundComponent,
    ProductDetailsComponent,
    ProductsComponent,
    OwlCategoriesComponent,
    OwlBrandComponent,
    SearchPipePipe,
    SeeMorePipe,
    BrandSearchPipe,
    PriceSearchPipe,
    CheckOutComponent,
    WishListComponent,
    MainSliderComponent,
    SpinnerComponent,
    AllProductsComponent,
    ForgetPasswordComponent,
    VerifyCodeComponent,
    ResetPasswordComponent,
    AllordersComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
    CarouselModule,
    BrowserAnimationsModule,


  ],
  providers: [
    { provide : HTTP_INTERCEPTORS, useClass: AddHeaderInterceptor,multi: true}
    ],

  bootstrap: [AppComponent]
})
export class AppModule { }
