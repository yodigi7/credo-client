import { Component, OnInit } from "@angular/core";
import { IPhone, IEmail, Person, IDonation, IEvent, IPerson } from "../person/person";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Subscription } from "rxjs";
import { DatabaseServiceService } from "../database-service.service";

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
  searchObservable: Subscription;

  constructor(private snackBar: MatSnackBar, private databaseService: DatabaseServiceService) {}

  ngOnInit(): void {
    this.resetPage();
    this.model.address = {};
    this.model.parish = {};
  }

  onSubmit(): void {
    const tempModel = Person.fromData(this.model);
    this.addModelsToPerson(tempModel);
    this.cleanModel(tempModel);
    if (tempModel.id) {
    } else {
      this.databaseService.addPerson(tempModel).subscribe(
        (resp) => {
          this.openSnackbar("Successfully added to mongoDB");
        },
        error => {
          this.openSnackbar("Failed to add person");
          console.error(error);
        });
    }
    // window.alert("Person would be added to the DB when connected");
    this.openSnackbar("Added Person");
    this.submitted = true;
    this.resetPage();
  }

  openSnackbar(message: string): void {
    this.snackBar.open(message, "Close", { duration: 3000 });
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

  cleanModel(model: IPerson) {
    if (model.phones.length === 0) {
      delete model.phones;
    }
    if (model.emails.length === 0) {
      delete model.emails;
    }
    if (model.donations.length === 0) {
      delete model.donations;
    }
    if (model.events.length === 0) {
      delete model.events;
    }
  }

  search(): void {
    console.log("SEARCHING");
    const tempModel = Person.fromData(this.model);
    this.addModelsToPerson(tempModel);
    this.cleanModel(tempModel);
    // Replace with new getPersons
    // this.searchObservable = this.graphqlService.getPersons(tempModel).subscribe(resp => {
    //   this.searchObservable.unsubscribe();
    //   if (resp.length === 0) {
    //     this.openSnackbar("Failed to find anyone");
    //   } else {
    //     this.model = Person.fromData(resp[0]);
    //     console.log(this.model);
    //   }
    // });
  }

  resetPage(): void {
    console.log("RESETTING PAGE");
    this.model = new Person();
    this.model.address = {};
    this.model.parish = {};
    this.phoneModel = {};
    this.emailModel = {};
    this.donationModel = {};
    this.eventModel = {};
    this.submitted = false;
  }
}
