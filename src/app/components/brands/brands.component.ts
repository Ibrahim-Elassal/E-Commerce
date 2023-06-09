import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit{
  constructor(private _ProductsService:ProductsService){

  }
  brands:any[] = []
  isLoading:boolean = true;

  ngOnInit():void{
    this._ProductsService.getBrands().subscribe(res=>{
      this.brands = res.data;
      this.isLoading = false;

    })
  }
}
