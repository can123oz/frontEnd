import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/service/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {

  constructor(private productService : ProductService, private activatedRoute: ActivatedRoute,
    private form : FormBuilder, private toastr: ToastrService, private router : Router) { }

  //@Input() productToUpdate : Product;
  @Input() deneme2 : string;

  param : any;
  productToUpdate : Product;
  productId : Number;
  productUpdateForm : FormGroup;

  ngOnInit(): void {
    /* console.log("ChildParent product : ", this.productToUpdate);
    console.log("deneme : ", this.deneme2); */
    
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    /* this.activatedRoute.params.subscribe( params => {
      this.param = params["id"]
      
    }) */
    console.log(id);
    this.productId = Number(id);
    this.getProduct(Number(id));
    console.log("en son component içi",this.productToUpdate);
    this.createForm();
  }


  getProduct(id : number)  {
    this.productService.getProductById(id).subscribe(result => {
      console.log(result);
      this.productToUpdate = result.data;
      console.log(this.productToUpdate);
    });
  }

  createForm() {
    this.productUpdateForm = this.form.group({
      productName:["",Validators.compose([
        Validators.required,
        Validators.minLength(2),
      ])],
      unitsInStock:["",Validators.compose([
        Validators.required,
        Validators.min(1)
      ])],
      unitPrice:["",Validators.compose([
        Validators.required,
        Validators.min(10)
      ])],
      categoryId:["",Validators.compose([
        Validators.required,
        Validators.min(1)
      ])],
    });
  }

  updateProduct() {
    console.log(this.productId);
    if (this.productUpdateForm.valid) {
      let product = Object.assign({},this.productUpdateForm.value)
      product.productId = this.productId;
      this.productService.updateProduct(product).subscribe(response => {
        console.log(response);
        this.toastr.success(response.message);
        this.router.navigate([""]);
      }, errorResponse => {
        console.log("error : ", errorResponse);
      });
      
    } else {
      this.toastr.error("Please Fill the inputs");
    }
  }


  routingDeneme() {
    //this.router.navigate(["login"]); //king bunu tavsiye etti
    this.router.navigate(['login'], {
      state: {
        name: 'mazlum'
      }
    });
    //this.router.navigateByUrl("login");

  }

}