import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Catergory } from 'src/app/models/category';
import { CategoryResponseModel } from 'src/app/models/categoryResponseModel';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categories: Catergory[] = [];
  apiUrl:string = "https://localhost:44372/api/category";
  
  constructor(private httpClient:HttpClient) { }

  ngOnInit(): void {
    this.getCategory();
  }

  getCategory() {
    this.httpClient
    .get<CategoryResponseModel>(this.apiUrl)
    .subscribe( response => {
      this.categories = response.data;
    })
  }

}
