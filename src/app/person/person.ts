export interface IPhone {
  phoneNumber?: number;
  type?: string;
}

export interface IEmail {
  email?: string;
  type?: string;
}

export interface IDonation {
  amount?: number;
  date?: Date;
  notes?: string;
}

export interface IEvent {
  name?: string;
  amount?: number;
  date?: Date;
}

export interface IPerson {
  prefix?: string;
  firstName?: string;
  preferredName?: string;
  middleName?: string;
  lastName?: string;
  suffix?: string;
  street?: string;
  city?: string;
  state?: string;
  zipcode?: string;
  emails?: Array<IEmail>;
  phones?: Array<IPhone>;
  membershipLevel?: string;
  currentMember?: boolean;
  donations?: Array<IDonation>;
  events?: Array<IEvent>;
}

export class Person {
  prefix: string;
  firstName: string;
  preferredName: string;
  middleName: string;
  lastName: string;
  suffix: string;
  street: string;
  city: string;
  state: string;
  zipcode: string;
  emails: Array<IEmail>;
  phones: Array<IPhone>;
  membershipLevel: string;
  currentMember: boolean;
  donations: Array<IDonation>;
  events: Array<IEvent>;
  constructor () {
    this.emails = [];
    this.phones = [];
    this.donations = [];
    this.events = [];
  };

  static fromData (personInp: IPerson): Person {
    let person = new Person();
    person.prefix = personInp.prefix;
    person.firstName = personInp.firstName;
    person.preferredName = personInp.preferredName;
    person.middleName = personInp.middleName;
    person.lastName = personInp.lastName;
    person.suffix = personInp.suffix;
    person.street = personInp.street;
    person.city = personInp.city;
    person.state = personInp.state;
    person.zipcode = personInp.zipcode;
    person.emails = personInp.emails ? personInp.emails : [];
    person.phones = personInp.phones ? personInp.phones : [];
    person.membershipLevel = personInp.membershipLevel;
    person.currentMember = personInp.currentMember;
    person.donations = personInp.donations ? personInp.donations : [];
    person.events = personInp.events ? personInp.events : [];
    return person;
  };
}
