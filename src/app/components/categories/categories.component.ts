import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit{

  constructor(private _ProductsService:ProductsService){

  }
  categories:any[] = [];
  isLoading:boolean = true;

  ngOnInit():void{
    this._ProductsService.getCategories().subscribe({
     next:(res)=>{
        this.categories = res.data;
        this.isLoading = false;
      } ,
      error:(err)=> console.log(err)

    })
  }
}
