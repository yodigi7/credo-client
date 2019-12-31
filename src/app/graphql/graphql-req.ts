interface getPersonsReq {
  _id?: string;
  prefix?: string;
  firstName?: string;
  preferredName?: string;
  middleName?: String
  lastName?: String
  suffix?: String
  street?: String
  city?: String
  state?: String
  zipcode?: String
  membershipLevel?: String
}

interface getPersonReq {
  _id: string;
}
