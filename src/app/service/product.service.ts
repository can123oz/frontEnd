import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Product } from '../models/product';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  
  apiUrl:string = "https://localhost:44372/api/";

  //apiUrlProductsByCategory:string = "https://localhost:44372/api/Products/GetByCategoryId/";
  
  constructor(private httpClient:HttpClient) { }

  getProducts():Observable<ListResponseModel<Product>> {
    let newPath : string = this.apiUrl + "products";
    return this.httpClient.get<ListResponseModel<Product>>(newPath);
  }    

  getProductsByCategory(categoryId : Number):Observable<ListResponseModel<Product>> {
    console.log("deneme : ", categoryId);
    let newPath : string = this.apiUrl + "products/GetByCategoryId?categoryId="+categoryId;
    console.log(newPath);
    return this.httpClient.get<ListResponseModel<Product>>(newPath);
  }

  addProduct(product : Product) : Observable<ResponseModel> {
    let newPath : string = this.apiUrl +"products/add";
    return this.httpClient.post<ResponseModel>(newPath,product);
  }

  updateProduct(product : Product) : Observable<ResponseModel> {
    console.log("servise gelen product : ",product);
    let newPath : string = this.apiUrl + "Products/Update";
    return this.httpClient.put<ResponseModel>(newPath,product);
  }

  getProductById(id : Number) {
    let newPath : string = this.apiUrl + "Products/id/"+id;
    return this.httpClient.get<SingleResponseModel<Product>>(newPath);
  }
}