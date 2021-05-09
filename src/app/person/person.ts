export interface IPhone {
  phoneNumber?: number;
  type?: string;
}

export interface IEmail {
  email?: string;
  type?: string;
}

export interface IPayment {
  amount?: number;
  date?: Date | string;
  notes?: string;
}

export interface IEvent {
  name?: string;
  amount?: number;
  date?: Date | string;
}

export interface IAddress {
  id?: string;
  streetAddress?: string;
  city?: string;
  state?: string;
  zipcode?: string;
}

export interface IParish {
  id?: string;
  name?: string;
}

export interface IPerson {
  id?: string;
  prefix?: string;
  firstName?: string;
  preferredName?: string;
  middleName?: string;
  lastName?: string;
  suffix?: string;
  address?: IAddress;
  parish?: IParish;
  emails?: Array<IEmail>;
  phones?: Array<IPhone>;
  membershipLevel?: string;
  currentMember?: boolean;
  payments?: Array<IPayment>;
  events?: Array<IEvent>;
  notes?: string;
}

export class Person {
  id: string;
  prefix: string;
  firstName: string;
  preferredName: string;
  middleName: string;
  lastName: string;
  suffix: string;
  address: IAddress;
  parish: IParish;
  emails: Array<IEmail>;
  phones: Array<IPhone>;
  membershipLevel: string;
  currentMember: boolean;
  payments: Array<IPayment>;
  events: Array<IEvent>;
  notes?: string;
  constructor() {
    this.emails = [];
    this.phones = [];
    this.payments = [];
    this.events = [];
  }

  static fromData(personInp: IPerson): Person {
    const person = new Person();
    person.id = personInp.id;
    person.prefix = personInp.prefix;
    person.firstName = personInp.firstName;
    person.preferredName = personInp.preferredName;
    person.middleName = personInp.middleName;
    person.lastName = personInp.lastName;
    person.suffix = personInp.suffix;
    person.address = personInp.address ? JSON.parse(JSON.stringify(personInp.address)) : {};
    person.parish = personInp.parish ? JSON.parse(JSON.stringify(personInp.parish)) : {};
    person.emails = personInp.emails ? JSON.parse(JSON.stringify(personInp.emails)) : [];
    person.phones = personInp.phones ? JSON.parse(JSON.stringify(personInp.phones)) : [];
    person.membershipLevel = personInp.membershipLevel;
    person.currentMember = personInp.currentMember;
    person.payments = personInp.payments ? JSON.parse(JSON.stringify(personInp.payments)) : [];
    person.events = personInp.events ? JSON.parse(JSON.stringify(personInp.events)) : [];
    person.notes = personInp.notes;
    return person;
  }
}
