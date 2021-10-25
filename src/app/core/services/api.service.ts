import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = environment;
  // private baseUrl = environment.apiUrl;

  constructor(private _http: HttpClient, private _router: Router, private _snackBar: MatSnackBar) { }

  getApiUrl(url) {
    return this.baseUrl + `/${url}`;
  }

  getOne<T>(url: string): Observable<T> {
    return this._http.get<T>(this.getApiUrl(url))
  }

  // get<T>(url: string, params?): Observable<T> {
  //   let requestParams = params ? new HttpParams({ fromObject: params }) : null;
  //   return this._http.get<T>(this.getApiUrl(url), { params: requestParams })
  //     .pipe(catchError((res: HttpErrorResponse) => this.onRequestError(res)));
  // }

  // post<T>(url: string, body: Object): Observable<T> {
  //   return this._http.post<T>(this.getApiUrl(url), body)
  //     .pipe(catchError((res: HttpErrorResponse) => this.onRequestError(res)));
  // }

  // put<T>(url: string, body: Object): Observable<T> {
  //   return this._http.put<T>(this.getApiUrl(url), body)
  //     .pipe(catchError((res: HttpErrorResponse) => this.onRequestError(res)));

  // }

  // delete<T>(url: string): Observable<T> {
  //   return this._http.delete<T>(this.getApiUrl(url))
  //     .pipe(catchError((res: HttpErrorResponse) => this.onRequestError(res)));
  // }


  // onRequestError(response: HttpErrorResponse) {

  //   console.log(response);

  //   if (response.status === 400 && response.url.indexOf('auth/login') > -1) {
  //     this._snackBar.open('Incorrect username/password' || 'Error', 'Dismiss', {
  //       duration: 5000,
  //       horizontalPosition: 'end'
  //     });

  //     const err = {
  //       statusCode: response.status,
  //       errorMsg: response.message
  //     };


  //     return throwError(err);
  //   }

  //   this._snackBar.open(response.message || 'Error', 'Dismiss', {
  //     duration: 5000,
  //     horizontalPosition: 'end'
  //   });
  //   this._router.navigate(['/dashboard']);

  //   const error = {
  //     statusCode: response.status,
  //     errorMsg: response.message,
  //     // customError: response.error.error
  //   };


  //   return throwError(error);

  // }

}









