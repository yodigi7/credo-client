import { Component, OnInit } from '@angular/core';
import { PersonComponent, Phone, Email } from '../person/person.component';

@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.scss']
})
export class AddPersonComponent implements OnInit {

  model = new PersonComponent(null, null, null, null, null, null, null, null, [], [], [], []);
  phoneModel: Phone = { phoneNumber: null, type: null };
  emailModel: Email = { email: null, type: null };
  submitted = false;

  constructor() { }

  ngOnInit() { }

  onSubmit() {
    window.alert('Person would be added to the DB when connected');
    this.submitted = true;
    this.resetPage();
  }

  removePhone(phone: Phone) {
    this.model.phones.splice(this.model.phones.indexOf(phone), 1);
  }

  addPhone() {
    console.log(this.phoneModel);
    console.log(this.model.phones);
    this.model.phones.push(this.phoneModel);
    this.phoneModel = { phoneNumber: null, type: null };
  }

  addEmail() {
    this.model.emails.push(this.emailModel);
    this.emailModel = { email: null, type: null };
  }

  resetPage() {
    this.model = new PersonComponent(null, null, null, null, null, null, null, null, [], [], [], []);
    this.phoneModel = { phoneNumber: null, type: null };
    this.emailModel = { email: null, type: null };
    this.submitted = false;
  }
}
