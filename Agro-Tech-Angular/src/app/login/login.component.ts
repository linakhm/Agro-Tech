import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { LoginService } from "app/components/service/login.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  username: any;
  password: any;
  authenticationError = false;
  otherError = false;

  constructor(private router: Router, private loginService: LoginService) {}

  ngOnInit(): void {}

  onClick() {
    this.loginService.signIn(this.username, this.password).subscribe(
      (res: any) => {
        localStorage.setItem("tocken", res.token);
        localStorage.setItem("roles", res.roles);
        this.router.navigate(["/start"]);
      },
      (err) => {
        if (err.status == 401) {
          this.authenticationError = true;
          localStorage.clear();
        } else {
          this.otherError = true;
        }
      }
    );
  }
}
