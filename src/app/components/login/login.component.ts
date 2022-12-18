import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { tick } from '@angular/core/testing';
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { LoginModel } from 'src/app/models/loginModel';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private form : FormBuilder, private loginService : LoginService, private toestr : ToastrService) { }

  loginForm : FormGroup;

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.form.group({
      email: ["",Validators.required],
      password: ["",Validators.required]
    })
  }

  login() {
    if(this.loginForm.valid) {
      //console.log(this.loginForm.value);
      let loginModel : LoginModel = Object.assign({},this.loginForm.value);
      this.loginService.login(loginModel).subscribe(response => {
        if (response.success) {
          console.log(response);
          this.toestr.success(response.message);
          localStorage.setItem("token",response.data.token);
        }
      }, errorResponse => {
        console.log(errorResponse);
        this.toestr.error(errorResponse.error);
      });
    }
  }
  

}