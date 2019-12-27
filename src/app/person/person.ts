export class Phone {
  phoneNumber: number;
  type: string;
}

export class Email {
  email: string;
  type: string;
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
  constructor(
    prefix,
    firstName,
    preferredName,
    middleName,
    lastName,
    suffix,
    street,
    city,
    state,
    zipcode,
    emails,
    phones,
    membershipLevel
  ) {
    this.prefix = prefix;
    this.firstName = firstName;
    this.preferredName = preferredName;
    this.middleName = middleName;
    this.lastName = lastName;
    this.suffix = suffix;
    this.street = street;
    this.city = city;
    this.state = state;
    this.zipcode = zipcode;
    this.emails = emails;
    this.phones = phones;
    this.membershipLevel = membershipLevel;
  }
}
