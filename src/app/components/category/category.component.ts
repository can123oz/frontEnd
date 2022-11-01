import { Component, Input, OnInit } from '@angular/core';
import { timeInterval } from 'rxjs';
import { Category } from 'src/app/models/category';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { Product } from 'src/app/models/product';
import { CategoryService } from 'src/app/service/category.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categories: Category[] = [];
  currentCategory:Category = { categoryId:0, categoryName:""};
  products: Product[] = [];

  

  constructor(private categoryService:CategoryService) { }

  ngOnInit(): void {
    this.getAllCategory();
  }

  getAllCategory() {
    this.categoryService.getAll().subscribe( response => {
      this.categories = response.data;
    })
  }

  setCurrentCategory(category : Category) {
    console.log(category);
    //this.productSerive.getProductsByCategory(category.categoryId).subscribe( response => {
    //  this.products = response.data;
    //});
    console.log(this.products);
    this.currentCategory = category;
  }

  getCurrentCategory(category:Category) {
    if(category == this.currentCategory) {
      return "list-group-item active";
    } else {
      return "list-group-item";
    }
  }

}