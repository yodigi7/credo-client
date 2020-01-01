import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";
import { IPerson, Person } from "../person/person";
import stringifyObject from "stringify-object";
import { map as rxjsmap } from "rxjs/operators";
import { GetPersonsReq, GetPersonReq } from "./graphql-req";

@Injectable({
  providedIn: "root"
})
export class GraphqlService {
  private allData = `_id
            prefix
            firstName
            preferredName
            middleName
            lastName
            suffix
            street
            city
            state
            zipcode
            membershipLevel
            currentMember
            notes
            phones {
              _id
              phoneNumber
              type
            }
            emails {
              _id
              email
              type
            }
            donations {
              _id: ID!
              amount: String
              date: String
              notes: String
            }
            events {
              _id: ID!
              name: String
              amount: String
              date: String
            }`;

  constructor(private apollo: Apollo) {}

  addPerson(person: IPerson) {
    return this.apollo.mutate({
      mutation: gql`
      mutation {
        addPerson${this.buildParameter(person)} {
          _id
        }
      }
      `
    });
  }

  getPerson(queryData: GetPersonReq) {
    return this.apollo
      .query({
        query: gql`
      {
        getPerson(_id: ${queryData._id}) {
          ${this.allData}
        }
      }
      `
      })
      .pipe(
        rxjsmap((resp: any) => {
          resp = resp.data.getPerson;
          if (resp.events) {
            resp.events.map(event => {
              event.date = new Date(event.date);
              return event;
            });
          }
          if (resp.donations) {
            resp.donations.map(donation => {
              donation.date = new Date(donation.date);
              return donation;
            });
          }
          return Person.fromData(resp);
        })
      );
    // TODO: Fix up this, extract into its own function, also create gql response interface
  }

  getPersons(queryData?: GetPersonsReq) {
    return this.apollo
      .query({
        query: gql`
      {
        getPersons${this.buildParameter(queryData)} {
          ${this.allData}
        }
      }
      `
      })
      .pipe(
        rxjsmap((resp: any) => {
          resp = resp.data.getPersons;
          return resp.map(person => {
            if (person.events) {
              person.events.map(event => {
                event.date = new Date(event.date);
                return event;
              });
            }
            if (person.donations) {
              person.donations.map(donation => {
                donation.date = new Date(donation.date);
                return donation;
              });
            }
            return Person.fromData(person);
          });
        })
      );
  }

  buildParameter(queryData: IPerson | GetPersonsReq) {
    // Serialize dates
    if (queryData.events) {
      queryData.events.map(event => {
        event.date = event.date.toString();
        return event;
      });
    }
    if (queryData.donations) {
      queryData.donations.map(donation => {
        donation.date = donation.date.toString();
        return donation;
      });
    }
    // Serialize Person
    let queryString = "";
    if (queryData) {
      for (const key in queryData) {
        if (queryData.hasOwnProperty(key) && (queryData[key] || queryData[key] === false)) {
          if (typeof queryData[key] === "object") {
            queryString += `${key}: "${stringifyObject(queryData[key])}",`;
          } else {
            queryString += `${key}: "${queryData[key]}",`;
          }
        }
      }
      if (queryString.length > 0) {
        queryString = "(" + queryString.substring(0, queryString.length - 1) + ")";
      }
    }
    queryString = queryString.replace(/\"\[/g, "[");
    queryString = queryString.replace(/]\"/g, "]");
    queryString = queryString.replace(/\"true\"/g, "true");
    queryString = queryString.replace(/\"false\"/g, "false");
    queryString = queryString.replace(/\'/g, '"');
    console.log(queryString);
    return queryString;
  }
}
