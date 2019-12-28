import { Component, OnInit } from "@angular/core";
import { IPhone, IEmail, Person, IDonation, IEvent, IPerson } from "../person/person";

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
    if (!this.isEmptyPhone(this.phoneModel)) {
      this.model.phones.push(this.phoneModel);
      this.phoneModel = {};
    }
  }

  addEmail(): void {
    if (this.isEmptyEmail(this.emailModel)) {
      this.model.emails.push(this.emailModel);
      this.emailModel = {};
    }
  }

  addDonation(): void {
    if (this.isEmptyDonation(this.donationModel)) {
      this.model.donations.push(this.donationModel);
      this.donationModel = {};
    }
  }

  addEvent(): void {
    if (!this.isEmptyEvent(this.eventModel)) {
      this.model.events.push(this.eventModel);
      this.eventModel = {};
    }
  }

  isEmptyPhone(phoneModel: IPhone) {
    return !(phoneModel.phoneNumber || phoneModel.type);
  }

  isEmptyEmail(emailModel: IEmail) {
    return !(emailModel.email || emailModel.type);
  }

  isEmptyDonation(donationModel: IDonation) {
    return !(donationModel.amount || donationModel.date || donationModel.notes);
  }

  isEmptyEvent(eventModel: IEvent) {
    return !(eventModel.amount || eventModel.date || eventModel.name);
  }

  addModelsToPerson(model: IPerson) {
    if (!this.isEmptyPhone(this.phoneModel)) {
      model.phones.push(this.phoneModel);
      this.phoneModel = {};
    }
    if (!this.isEmptyEmail(this.emailModel)) {
      model.emails.push(this.emailModel);
      this.emailModel = {};
    }
    if (!this.isEmptyDonation(this.donationModel)) {
      model.donations.push(this.donationModel);
      this.donationModel = {};
    }
    if (!this.isEmptyEvent(this.eventModel)) {
      model.events.push(this.eventModel);
      this.eventModel = {};
    }
  }

  cleanModel() {
    if (this.model.phones.length === 0) {
      delete this.model.phones;
    }
    if (this.model.emails.length === 0) {
      delete this.model.emails;
    }
    if (this.model.donations.length === 0) {
      delete this.model.donations;
    }
    if (this.model.events.length === 0) {
      delete this.model.events;
    }
  }

  dirtyModel() {
    if (!this.model.phones) {
      this.model.phones = [];
    }
    if (!this.model.emails) {
      this.model.emails = [];
    }
    if (!this.model.donations) {
      this.model.donations = [];
    }
    if (!this.model.events) {
      this.model.events = [];
    }
  }

  search(): void {
    let tempModel = Person.fromData(this.model);
    this.addModelsToPerson(tempModel);
    this.cleanModel();
    window.alert(`Would search for person and populate the rest of the data, you gave me: ${JSON.stringify(tempModel)}`)
    this.dirtyModel();
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
