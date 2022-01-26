import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';

import { environment } from '../../../environments/environment';

import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Contact } from '../models/contact';

@Injectable({
  providedIn: 'root',
})
export class ContactApiService {
  private contactList$ = new BehaviorSubject<any>([]);
  contactList = this.contactList$.asObservable();

  constructor(private http: HttpClient) {
    this.getContactList();
  }

  private formatErrors(error: any): any {
    return throwError(error.error);
  }

  private get(
    path: string,
    params: HttpParams = new HttpParams()
  ): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http
      .get(`${environment.serverUrl}${path}`, { headers, params })
      .pipe(catchError(this.formatErrors));
  }

  private post(path: string, body: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http
      .post(`${environment.serverUrl}${path}`, JSON.stringify(body), {
        headers,
      })
      .pipe(catchError(this.formatErrors));
  }

  getContactList(): any {
    return this.get(`users`).subscribe(
      (success) => {
        console.log('Success: ', success);
        this.contactList$.next(success.data);
      },
      (error) => {
        console.log('Error: ', error);
      }
    );
  }

  setContact(userData: any): any {
    return this.post('users', userData);
  }
}
