import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductResponseModel } from 'src/app/models/productResponseModel';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products : Product[] = [];
  dataLoaded = false;
  
  constructor(private productService:ProductService) {  }

  ngOnInit(): void {
    this.getProducts();
  }
  
  getProducts(){
    console.log("api request basladı");
    this.productService.getProducts().subscribe(response => {
      this.products = response.data;
      this.dataLoaded = true;
      console.log("api request bitti");
    });
    console.log("method bitti");
  }

} 