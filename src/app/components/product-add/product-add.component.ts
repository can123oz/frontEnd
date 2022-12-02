import { trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  constructor(private formBuilder : FormBuilder, private productService:ProductService,
    private toastr: ToastrService) { }

  productToAdd:Product;
  productAddForm : FormGroup;

  ngOnInit(): void {  
    this.createProductAddForm();
  }

  createProductAddForm() {
    this.productAddForm = this.formBuilder.group({
      productName:["",Validators.required],
      unitPrice:["",Validators.required],
      unitsInStock:["",Validators.required],
      categoryId:["",Validators.required]
    })
  }

  addProduct() {
    if (this.productAddForm.valid) {
      let productModel = Object.assign({},this.productAddForm.value);
      this.productService.addProduct(productModel).subscribe(data => {
        console.log(data);
        this.toastr.success(productModel.productName,data.message);
      }, responseError => {
        let errors = responseError.error.Errors;
        if (errors.length > 0) {
          console.log(...errors);       
          errors.forEach((index:any) => {
            console.log(index.ErrorMessage);
            this.toastr.error("Validation Error",index.ErrorMessage);
          });

        }
      });
    } else {
      this.toastr.error("error");
    }

  }

}
