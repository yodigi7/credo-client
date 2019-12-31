import { Injectable } from '@angular/core';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import { IPerson } from '../person/person';
import { QueryStore } from 'apollo-client/data/queries';
import stringifyObject from 'stringify-object';

@Injectable({
  providedIn: 'root'
})
export class GraphqlService {

  constructor(private apollo: Apollo) { }

  addPerson(person: IPerson) {
    return this.apollo.mutate({
      mutation: gql`
      mutation {
        addPerson${this.buildParameter(person)} {
          _id
        }
      }
      `,
    })
  }

  getPerson(queryData: getPersonReq) {
    return this.apollo.query({
      query: gql`
      {
        getPerson(_id: ${queryData._id}) {
          ${this.allData}
        }
      }
      `,
    })
  }

  getPersons(queryData?: getPersonsReq) {
    return this.apollo.query({
      query: gql`
      {
        getPersons${this.buildParameter(queryData)} {
          ${this.allData}
        }
      }
      `,
    })
  }

  buildParameter(queryData: IPerson | getPersonsReq) {
    let queryString = "";
    if (queryData) {
      for (const key in queryData) {
        if (queryData.hasOwnProperty(key) && queryData[key]) {
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
    queryString = queryString.replace(/\'/g, "\"");
    return queryString;
  }

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
          phones {
            _id
            number
            type
          }
          emails {
            _id
            email
            type
          }`;
}
