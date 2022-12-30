import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { tick } from '@angular/core/testing';
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first, map } from 'rxjs';
import { LoginModel } from 'src/app/models/loginModel';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private form : FormBuilder, private loginService : LoginService, private toestr : ToastrService, private route: ActivatedRoute) { }

  loginForm : FormGroup;

  ngOnInit(): void {
    this.createLoginForm();

    this.route.paramMap.pipe(
      map(() => window.history.state),
      first()
    ).subscribe((res) => console.log(res));
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