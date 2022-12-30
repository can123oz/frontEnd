import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/service/product.service';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/service/cart.service';


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
  productBool : Boolean = false;
  selectedProduct : Product;
  deneme: string ="deneme";

  constructor(private productService:ProductService, private activatedRoute : ActivatedRoute, 
    private toastr: ToastrService, private cartService : CartService, private cdr:ChangeDetectorRef) {  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      //console.log("params: ", params);
      if (params["categoryId"]) {
        console.log("ngoninit",params["categoryId"]);
        this.getProductsByCategory(params["categoryId"]);
      } else {
        this.getProducts();
      }
    });  
  }

  getProducts(){
    this.productService.getProducts().subscribe(response => {
      this.products = response.data;
      this.dataLoaded = true;
    });
  }

  getProductsByCategory(categoryId : number) {
    console.log("component.ts id : " , categoryId);
    this.productService.getProductsByCategory(categoryId).subscribe(response => {
      this.products = response.data;
      this.dataLoaded = true;
    });
  }

  addToCart(product:Product) {
    this.toastr.success("Added to Cart", product.productName);
    this.cartService.addToCart(product);
    console.log("product addded to cart ", product);
  }

  update(product : Product) {
    this.cdr.detectChanges();
    this.toastr.success(product.productName);
    this.selectedProduct = product;
    this.productBool = true;
    console.log("parenttaki product: ",this.selectedProduct);
  }

  

/*   sort() {
    console.log("deneme");
    this.products.sort((a:any,b:any) => b - a);
  }
 */
} 