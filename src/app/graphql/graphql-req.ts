import { IDonation, IEmail, IEvent, IPhone } from "../person/person";

export interface GetPersonsReq {
  _id?: string;
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
  membershipLevel?: string;
  emails?: Array<IEmail>;
  phones?: Array<IPhone>;
  currentMember?: boolean;
  donations?: Array<IDonation>;
  events?: Array<IEvent>;
  notes?: string;
}

export interface GetPersonReq {
  _id: string;
}
