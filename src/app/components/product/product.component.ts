import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products : Product[] = [];
  dataLoaded = false;
  filterText :string = "";
  filterStatus :Boolean = false;

  constructor(private productService:ProductService, private activatedRoute : ActivatedRoute) {  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      console.log("params: ", params);
      if (params["categoryId"]) {
        console.log("ngoninit",params["categoryId"]);
        this.getProductsByCategory(params["categoryId"]);
      } else {
        this.getProducts();
      }
    });
    
  }
  
  checksIfArrayHasIt(index:string) : Boolean {
    let newArray: Product[] = this.products.filter(params => params.productName.toLocaleLowerCase() === index.toLocaleLowerCase());  
    console.log(newArray);
    if (newArray.length > 0) {
      this.filterStatus == true;
      return true;
    } else {
      return false;
    }
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

  getProductsByCategory(categoryId : number) {
    console.log("component.ts id : " , categoryId);
    this.productService.getProductsByCategory(categoryId).subscribe(response => {
      this.products = response.data;
      this.dataLoaded = true;
    });
  }

  addToCart(product:Product) : Boolean {
    console.log(product);
    return true;
  }

} 