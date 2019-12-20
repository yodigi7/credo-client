import { Component, OnInit } from '@angular/core';

export interface Phone {
  phoneNumber: number;
  type: string;
}

export interface Email {
  email: string;
  type: string;
}

export interface Donation {
  amount: number;
  date: Date;
}

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {

  constructor(
    public firstName: string,
    public middleName: string,
    public lastName: string,
    public street: string,
    public city: string,
    public state: string,
    public zipcode: number,
    public membershipLevel: string,
    public phones: Phone[],
    public emails: Email[],
    public donations: Donation[],
    public events: string[],
  ) { }

  ngOnInit() {
  }

}
