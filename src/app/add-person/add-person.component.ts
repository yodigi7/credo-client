import { Component, OnInit } from "@angular/core";
import { IPhone, IEmail, Person, IDonation, IEvent } from "../person/person";

@Component({
  selector: "app-add-person",
  templateUrl: "./add-person.component.html",
  styleUrls: ["./add-person.component.scss"]
})
export class AddPersonComponent implements OnInit {
  model = new Person();
  phoneModel: IPhone = {};
  emailModel: IEmail = {};
  donationModel: IDonation = {};
  eventModel: IEvent = {};
  submitted = false;

  constructor() {}

  ngOnInit(): void {
    this.resetPage();
  }

  onSubmit(): void {
    window.alert("Person would be added to the DB when connected");
    this.submitted = true;
    this.resetPage();
  }

  removeEmail(email: IEmail): void {
    this.model.emails.splice(this.model.emails.indexOf(email), 1);
  }

  removePhone(phone: IPhone): void {
    this.model.phones.splice(this.model.phones.indexOf(phone), 1);
  }

  removeDonation(donation: IDonation): void {
    this.model.donations.splice(this.model.donations.indexOf(donation), 1);
  }

  removeEvent(event: IEvent): void {
    this.model.events.splice(this.model.events.indexOf(event), 1);
  }

  addPhone(): void {
    if (this.phoneModel.phoneNumber || this.phoneModel.type) {
      this.model.phones.push(this.phoneModel);
      this.phoneModel = {};
    }
  }

  addEmail(): void {
    if (this.emailModel.email || this.emailModel.type) {
      this.model.emails.push(this.emailModel);
      this.emailModel = {};
    }
  }

  addDonation(): void {
    if (this.donationModel.amount || this.donationModel.date) {
      this.model.donations.push(this.donationModel);
      this.donationModel = {};
    }
  }

  addEvent(): void {
    if (this.eventModel.amount || this.eventModel.date || this.eventModel.name) {
      this.model.events.push(this.eventModel);
      this.eventModel = {};
    }
  }

  resetPage(): void {
    this.model = new Person();
    this.phoneModel = {};
    this.emailModel = {};
    this.donationModel = {};
    this.eventModel = {};
    this.submitted = false;
  }
}
