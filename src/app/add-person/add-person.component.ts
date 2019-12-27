import { Component, OnInit } from "@angular/core";
import { Phone, Email, Person } from "../person/person";

@Component({
  selector: "app-add-person",
  templateUrl: "./add-person.component.html",
  styleUrls: ["./add-person.component.scss"]
})
export class AddPersonComponent implements OnInit {
  model = new Person();
  phoneModel: Phone = { phoneNumber: null, type: null };
  emailModel: Email = { email: null, type: null };
  submitted = false;

  constructor() {}

  ngOnInit(): void {}

  onSubmit(): void {
    window.alert("Person would be added to the DB when connected");
    this.submitted = true;
    this.resetPage();
  }

  removeEmail(email: Email): void {
    this.model.emails.splice(this.model.emails.indexOf(email), 1);
  }

  removePhone(phone: Phone): void {
    this.model.phones.splice(this.model.phones.indexOf(phone), 1);
  }

  addPhone(): void {
    console.log(this.phoneModel);
    console.log(this.model.phones);
    this.model.phones.push(this.phoneModel);
    this.phoneModel = { phoneNumber: null, type: null };
  }

  addEmail(): void {
    this.model.emails.push(this.emailModel);
    this.emailModel = { email: null, type: null };
  }

  resetPage(): void {
    this.model = new Person(null, null, null, null, null, null, null, null, null, null, [], [], null);
    this.phoneModel = { phoneNumber: null, type: null };
    this.emailModel = { email: null, type: null };
    this.submitted = false;
  }
}
