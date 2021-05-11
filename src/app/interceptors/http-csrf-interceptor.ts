import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpXsrfTokenExtractor } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({providedIn: 'root'})
export class HttpCsrfInterceptor implements HttpInterceptor {

  constructor(
    private tokenExtractor: HttpXsrfTokenExtractor
  ) {}

  // add application default headers to all requests
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headerName = 'X-CSRF-Token';

    const token = this.tokenExtractor.getToken() as string;
    let newReq = req.clone();

    // because we are using aboslute paths in development mode
    // we can't rely on the built in CSRF behavior
    // if we are not in prod mode and the url is absolute (begins with http)
    // add the csrf token if one exists
    if (token !== null
      && !req.headers.get(headerName)) {
      newReq = req.clone({headers: req.headers.set(headerName, token)});
    }

    return next.handle(newReq);
  }

}