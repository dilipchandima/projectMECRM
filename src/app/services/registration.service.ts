import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RegistrationService {
  constructor(private http: Http) { }

  private headers = new Headers({ 'Content-Type': 'application/json' });
  private regUrl = '/api/user/signup';
  // private getUserUrl = '/api/user/';
  // redirectUrl: string;

  signup(user: any): Observable<any> {
    return this.http.post(this.regUrl, user, { headers: this.headers });
  }
}
