export interface IPhone {
  phoneNumber: number;
  type: string;
}

export class Phone {
  phoneNumber: number;
  type: string;
}

export interface IEmail {
  email: string;
  type: string;
}

export class Email {
  email: string;
  type: string;
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
  emails: Array<Email>;
  phones: Array<Phone>;
  membershipLevel: string;
  constructor () {
    return Person.fromData({
      emails: [],
      phones: []
    });
  };

  static fromData (personInp: IPerson): Person {
    let person = new Person();
    personInp.prefix = person.prefix;
    personInp.firstName = person.firstName;
    personInp.preferredName = person.preferredName;
    personInp.middleName = person.middleName;
    personInp.lastName = person.lastName;
    personInp.suffix = person.suffix;
    personInp.street = person.street;
    personInp.city = person.city;
    personInp.state = person.state;
    personInp.zipcode = person.zipcode;
    personInp.emails = person.emails;
    personInp.phones = person.phones;
    personInp.membershipLevel = person.membershipLevel;
    return person;
  };
}
