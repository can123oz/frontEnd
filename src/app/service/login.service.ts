import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginModel } from '../models/loginModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient : HttpClient) { }

  urlMain : string = "https://localhost:44372/api/";

  login(loginModel:LoginModel) :Observable<SingleResponseModel<TokenModel>> {
    let url : string = this.urlMain +"Auth/login";
    return this.httpClient.post<SingleResponseModel<TokenModel>>(url,{email:loginModel.email,password:loginModel.password});
  }

  isAuthenticated() {
    if(localStorage.getItem("token")) {
      return true;
    } else {
      return false;
    }
  }

  logOut() {
    localStorage.clear();
  }
}