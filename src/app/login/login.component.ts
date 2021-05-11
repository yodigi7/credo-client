import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { DatabaseServiceService } from "../database-service.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  checkoutForm = this.formBuilder.group({
    username: "",
    password: ""
  });
  constructor(private router: Router, private formBuilder: FormBuilder, private databaseService: DatabaseServiceService) {}

  ngOnInit(): void {}

  authenticate(): void {
    this.databaseService.login(this.checkoutForm.value.username, this.checkoutForm.value.password).subscribe(
      message => {
        console.log("message login");
        this.router.navigateByUrl("/add-person");
      },
      err => {
        console.log("error login");
        console.log(err);
      }
    );
  }
}
