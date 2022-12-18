import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {

  constructor(private loginService : LoginService, private toastr : ToastrService) { }

  ngOnInit(): void {
  }

  logOut() {
    let token = localStorage.getItem("token");
    if (token) {
      this.loginService.logOut();
      this.toastr.info("logged out");
    }
  }


}
