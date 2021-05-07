import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DatabaseServiceService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    console.log(username);
    console.log(password);
    let body = new URLSearchParams();
    body.set('username', username);
    body.set('password', password);
    let body2 = `username=${username}&password=${password}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return this.http.post(environment.databaseBaseUrl + "login", body2, {headers: headers, withCredentials: true, observe: 'response' as 'response'});
  }

  addPerson() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let body = '{ "firstName": "Anthony", "address": { "streetAddress": "Hazeltine" }, "phones": [{ "phoneNumber": "6366345797" }], "emails": [{ "email": "test@gmail.com" }], "parish": { "name": "parish1" } }'
    return this.http.post(environment.databaseBaseUrl + "database", body, {headers: headers, withCredentials: true}).subscribe(msg => {
      console.log("Database message");
      console.log(msg);
    }, err => {
      console.log("Database err");
      console.log(err);
    });
  }
}
