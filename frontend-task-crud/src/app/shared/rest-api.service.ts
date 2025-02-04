import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Employee } from '../shared/employee';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RestApiService {
  // Define API
  apiURL = 'https://65c0cfa6dc74300bce8cc64d.mockapi.io/';

  constructor(private http: HttpClient) {}

  /*========================================
    CRUD Methods for consuming RESTful API
  =========================================*/

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  // HttpClient API get() method => Fetch employees list
  getEmployees(): Observable<Employee> {
    return this.http
      .get<Employee>(this.apiURL + '/Contact/profile')
      .pipe(retry(1), catchError(this.handleError));
  }

  // HttpClient API get() method => Fetch employee
  getEmployee(id: any): Observable<Employee> {
    return this.http
      .get<Employee>(this.apiURL + '/Contact/profile/' + id)
      .pipe(retry(1), catchError(this.handleError));
  }

  // HttpClient API post() method => Create employee
  createEmployee(employee: any): Observable<Employee> {
    return this.http
      .post<Employee>(
        this.apiURL + '/Contact/profile',
        JSON.stringify(employee),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  // HttpClient API put() method => Update employee
  updateEmployee(id: any, employee: any): Observable<Employee> {
    return this.http
      .put<Employee>(
        this.apiURL + '/Contact/profile/' + id,
        JSON.stringify(employee),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  // HttpClient API delete() method => Delete employee
  deleteEmployee(id: any) {
    return this.http
      .delete<Employee>(this.apiURL + '/Contact/profile/' + id, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  // Error handling
  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}