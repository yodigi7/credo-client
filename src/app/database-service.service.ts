import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "./../environments/environment";
import { IPerson } from "./person/person";
// Maybe not need
import stringifyObject from "stringify-object";

@Injectable({
  providedIn: "root"
})
export class DatabaseServiceService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    console.log(username);
    console.log(password);
    const body = `username=${username}&password=${password}`;
    const headers = new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded"
    });
    return this.http.post(environment.databaseBaseUrl + "login", body, {
      headers,
      withCredentials: true,
      observe: "response" as "response"
    });
  }

  addPerson(body: IPerson) {
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    return this.http.post(environment.databaseBaseUrl + "database", JSON.stringify(body), {
      headers,
      withCredentials: true,
      observe: "response" as "response"
    });
  }

  // Not sure if need for serializing data
  buildParameter(queryData: IPerson) {
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
